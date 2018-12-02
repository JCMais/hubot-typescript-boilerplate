import { Response, Robot } from 'hubot'
import { SlackAdapter } from 'hubot-slack'

import { AcknowledgeableError } from '../errors/AcknowledgeableError'

// helpful messages related to private messages

const imCache: { [roomId: string]: boolean } = {}

export const isPrivateMessage = async (
  robot: Robot<SlackAdapter>,
  res: Response<SlackAdapter>,
) => {
  // https://api.slack.com/docs/conversations-api#the_conversational_booleans
  const roomId = res.message.room

  if (typeof imCache[roomId] === 'undefined') {
    // @TODO api responses are not strong typed
    //  https://github.com/slackapi/node-slack-sdk/issues/581#issuecomment-396630593
    const conversationInfo = (await robot.slackClient.conversations.info({
      channel: roomId,
    })) as any

    imCache[roomId] =
      conversationInfo.channel.is_im || conversationInfo.channel.is_mpim
  }

  return imCache[roomId]
}

export const assertNotPrivateMessage = async (
  robot: Robot<SlackAdapter>,
  res: Response<SlackAdapter>,
) => {
  const isPrivate = await isPrivateMessage(robot, res)

  if (isPrivate) {
    const error = new AcknowledgeableError(
      '⚠ Cannot do that via private message, use a shared channel',
      robot,
      res,
    )
    throw error
  }
}

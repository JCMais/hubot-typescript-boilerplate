import { ChatPostMessageArguments } from '@slack/client'
import { Response, Robot, SlackMessage } from 'hubot'
import { SlackAdapter } from 'hubot-slack'

/**
 * This is useful because it returns the message object with their ID
 * Differently from res.send which returns nothing.
 *
 * Channels defaults to the one from res.message.room
 */
export const sendUsingApi = async (
  robot: Robot<SlackAdapter>,
  res: Response<SlackAdapter>,
  args: Partial<ChatPostMessageArguments>,
) => {
  // @TODO api responses are not strong typed
  //  https://github.com/slackapi/node-slack-sdk/issues/581#issuecomment-396630593
  return (await robot.slackClient.chat.postMessage({
    channel: res.message.room,
    text: '',
    ...args,
  })) as any
}

// so they are not batched together
export const sendWithDelay = async (
  res: Response<SlackAdapter>,
  message: SlackMessage | string,
  delayMs: number = 400,
) => {
  res.send(message)
  await global.delay(delayMs)
}

export const sendIsTyping = async (
  robot: Robot<SlackAdapter>,
  res: Response<SlackAdapter>,
) => robot.adapter.client.rtm.sendTyping(res.message.room)

export const sendWithDelayAndStartTyping = async (
  robot: Robot<SlackAdapter>,
  res: Response<SlackAdapter>,
  message: SlackMessage | string,
  delayMs?: number,
) => {
  await sendWithDelay(res, message, delayMs)
  await sendIsTyping(robot, res)
}

export const getPermalinkToMessage = async (
  robot: Robot<SlackAdapter>,
  // handles both hubot msgs and slack msgs
  message: { room?: string; id?: string; channel?: string; ts?: string },
) => {
  const channel = message.room || message.channel
  const message_ts = message.id || message.ts

  if (!channel || !message_ts) {
    throw new Error('Invalid message supplied')
  }

  const { permalink } = (await robot.slackClient.chat.getPermalink({
    channel,
    message_ts,
  })) as any

  return permalink as string
}

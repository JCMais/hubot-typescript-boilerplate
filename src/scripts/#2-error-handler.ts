// Description:
//   Handles errors
//
// Configuration:
//   HUBOT_SLACK_CONSCIOUSNESS_CHANNEL = The channel bot specific messages should be posted to
//
// Author:
//   JCMais
import { MessageAttachment } from '@slack/client'
import { Response, Robot } from 'hubot'
import { SlackAdapter } from 'hubot-slack'

import { AcknowledgeableError } from '../errors/AcknowledgeableError'
import { ackFailed, mention } from '../utils'
import { IgnorableError } from '../errors/IgnorableError'

module.exports = async function debug(robot: Robot<SlackAdapter>) {
  process.on('unhandledRejection', error => {
    robot.emit('error', error, error.res)
  })

  let latestRes: Response<SlackAdapter> | null = null

  // catch-all to retrieve latest res
  robot.respond(/.*?/, async res => {
    latestRes = res
  })

  robot.error((error, res) => {
    if (error instanceof IgnorableError) {
      // do nothing
      return
    } else if (error instanceof AcknowledgeableError && res) {
      res.send(error.message)
      ackFailed(robot, res)
    } else {
      const matchingRes = res || latestRes

      robot.logger.error('Got unhandled error', {
        error,
        message: !!matchingRes && matchingRes.message,
      })

      if (matchingRes) {
        ackFailed(robot, matchingRes)
      }

      // zalgo ftw
      const title = '❗ M̵a̶l̸-̸f̷u̴n̶c̵t̸i̶o̴n̷ ̴d̴e̷t̴e̶c̵t̸e̷d̵'

      const attachment: MessageAttachment = {
        title,
        color: 'danger',
        // this expects user messages to not have `
        text: matchingRes
          ? `Was processing message \`${
              matchingRes.message.rawText
            }\` for ${mention(matchingRes.message.user.id)}`
          : 'It happened during an unknown situation',
        fields: [
          {
            title: 'Error',
            value: `\`\`\`${error.stack || error.message}\`\`\``,
          },
        ],
        mrkdwn_in: ['text', 'fields'],
      }

      robot.slackClient &&
        robot.slackClient.chat.postMessage({
          channel: process.env.HUBOT_SLACK_CONSCIOUSNESS_CHANNEL as string,
          text: '',
          attachments: [attachment],
        })
    }
  })
}

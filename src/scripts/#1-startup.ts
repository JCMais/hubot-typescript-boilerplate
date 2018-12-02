// Description:
//   fs.readDir (method used by hubot to iterate over this dir)
//    returns the files sorted on Node.js, so this script is going to be read first.
//   That way you can use this as an startup script
//   Try to not use async methods here, if possible.
import { WebClient } from '@slack/client'
import { Robot } from 'hubot'
import { SlackAdapter } from 'hubot-slack'

import '../augmentations'

const channel = process.env.HUBOT_SLACK_CONSCIOUSNESS_CHANNEL

module.exports = async function startup(robot: Robot<SlackAdapter>) {
  robot.slackClient = new WebClient(robot.adapter.options.token)

  if (!channel) {
    console.error(
      '❗ No consciousness channel set, but you have to specify one',
    )
    process.exit(1)
  }

  await robot.slackClient.chat.postMessage({
    channel: process.env.HUBOT_SLACK_CONSCIOUSNESS_CHANNEL as string,
    text: 'Waking Up ☀',
  })

  process.on('SIGINT', async () => {
    await robot.slackClient.chat.postMessage({
      channel: process.env.HUBOT_SLACK_CONSCIOUSNESS_CHANNEL as string,
      text: 'Going to Sleep 🌙',
    })
    process.exit()
  })

  // nodemon
  process.once('SIGUSR2', async () => {
    await robot.slackClient.chat.postMessage({
      channel: process.env.HUBOT_SLACK_CONSCIOUSNESS_CHANNEL as string,
      text: 'Going to Sleep 🌙',
    })
    process.kill(process.pid, 'SIGUSR2')
  })
}

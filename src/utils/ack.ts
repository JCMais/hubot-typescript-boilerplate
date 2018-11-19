import { Robot, Response } from 'hubot'
import SlackAdapter from 'hubot-slack'

export const ackReceived = async (
  robot: Robot<SlackAdapter>,
  res: Response<SlackAdapter>,
) =>
  robot.slackClient.reactions.add({
    name: 'loading',
    channel: res.message.room,
    timestamp: res.message.id,
  })

export const ackFailed = async (
  robot: Robot<SlackAdapter>,
  res: Response<SlackAdapter>,
) => {
  await robot.slackClient.reactions.remove({
    name: 'loading',
    channel: res.message.room,
    timestamp: res.message.id,
  })
  await robot.slackClient.reactions.add({
    name: 'heavy_multiplication_x',
    channel: res.message.room,
    timestamp: res.message.id,
  })
}

export const ackSucceed = async (
  robot: Robot<SlackAdapter>,
  res: Response<SlackAdapter>,
) => {
  await robot.slackClient.reactions.remove({
    name: 'loading',
    channel: res.message.room,
    timestamp: res.message.id,
  })
  await robot.slackClient.reactions.add({
    name: 'heavy_check_mark',
    channel: res.message.room,
    timestamp: res.message.id,
  })
}

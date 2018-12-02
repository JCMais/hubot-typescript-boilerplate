import { Response, Robot } from 'hubot'
import { SlackAdapter } from 'hubot-slack'

export const ackReceived = async (
  robot: Robot<SlackAdapter>,
  res: Response<SlackAdapter>,
) => {
  try {
    await robot.slackClient.reactions.add({
      name: 'loading',
      channel: res.message.room,
      timestamp: res.message.id,
    })
  } catch (error) {
    robot.logger.error('Error while adding loading reaction', { error })
  }
}

export const ackFailed = async (
  robot: Robot<SlackAdapter>,
  res: Response<SlackAdapter>,
) => {
  try {
    await robot.slackClient.reactions.remove({
      name: 'loading',
      channel: res.message.room,
      timestamp: res.message.id,
    })
  } catch (error) {
    robot.logger.error('Error while removing loading reaction', { error })
  }

  try {
    await robot.slackClient.reactions.add({
      name: 'heavy_multiplication_x',
      channel: res.message.room,
      timestamp: res.message.id,
    })
  } catch (error) {
    robot.logger.error('Error while adding error reaction', { error })
  }
}

export const ackSucceed = async (
  robot: Robot<SlackAdapter>,
  res: Response<SlackAdapter>,
) => {
  try {
    await robot.slackClient.reactions.remove({
      name: 'loading',
      channel: res.message.room,
      timestamp: res.message.id,
    })
  } catch (error) {
    robot.logger.error('Error while removing loading reaction', { error })
  }

  try {
    await robot.slackClient.reactions.add({
      name: 'heavy_check_mark',
      channel: res.message.room,
      timestamp: res.message.id,
    })
  } catch (error) {
    robot.logger.error('Error while adding success reaction', { error })
  }
}

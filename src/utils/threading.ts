import { Robot, Response } from 'hubot'
import SlackAdapter from 'hubot-slack'

import { AcknowledgeableError } from '../errors/AcknowledgeableError'

// helpful methods realted to threads

export const isInsideThread = async (
  robot: Robot<SlackAdapter>,
  res: Response<SlackAdapter>,
) => {
  return !!res.message.thread_ts
}

export const assertNotInsideThread = async (
  robot: Robot<SlackAdapter>,
  res: Response<SlackAdapter>,
) => {
  const inInside = await isInsideThread(robot, res)

  if (inInside) {
    throw new AcknowledgeableError(
      '⚠ Cannot answer that inside threads',
      robot,
      res,
    )
  }
}

import { Response, Robot } from 'hubot'
import { SlackAdapter } from 'hubot-slack'

import { AcknowledgeableError } from '../errors/AcknowledgeableError'

// helpful methods related to threads

export const enterThread = (
  message: { ts: string },
  res: Response<SlackAdapter>,
  infoMessage: false | string = 'Updates will be sent on this thread. 👇',
) => {
  res.message.thread_ts = message.ts

  if (infoMessage) res.send(infoMessage)
}

export const leaveThread = async (
  res: Response<SlackAdapter>,
  hasDelay = true,
) => {
  res.message.thread_ts = null
  // small delay to make sure next messages are not batched with previous ones
  //  and that we are not into the threading anymore
  if (hasDelay) {
    await global.delay(30)
  }
}

export const isInsideThread = async (res: Response<SlackAdapter>) => {
  return !!res.message.thread_ts
}

export const assertNotInsideThread = async (
  robot: Robot<SlackAdapter>,
  res: Response<SlackAdapter>,
) => {
  const isInside = await isInsideThread(res)

  if (isInside) {
    throw new AcknowledgeableError(
      '⚠ Cannot answer that inside threads',
      robot,
      res,
    )
  }
}

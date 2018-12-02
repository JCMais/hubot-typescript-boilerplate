import { Response, Robot } from 'hubot'
import { SlackAdapter } from 'hubot-slack'

import { AcknowledgeableError } from '../errors/AcknowledgeableError'
import { IgnorableError } from '../errors/IgnorableError'

export const ignoreChannelsOtherThan = (
  res: Response<SlackAdapter>,
  channels: string[],
) => {
  if (channels.indexOf(res.message.room) === -1) {
    throw new IgnorableError()
  }
}

export const assertChannels = (
  robot: Robot<SlackAdapter>,
  res: Response<SlackAdapter>,
  channels: string[],
) => {
  if (channels.indexOf(res.message.room) === -1) {
    throw new AcknowledgeableError(
      '🚫 Command cannot be run inside this channel',
      robot,
      res,
    )
  }
}

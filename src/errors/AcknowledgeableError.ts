import { Response, Robot } from 'hubot'
import { SlackAdapter } from 'hubot-slack'

/**
 * An error message that should submit a message
 *  answering an invalid call or something like that.
 * The idea is that the error will be submitted as a message
 *  on the channel that originated the error.
 */
export class AcknowledgeableError extends Error {
  robot: Robot<SlackAdapter>
  res: Response<SlackAdapter>

  constructor(
    message: string,
    robot: Robot<SlackAdapter>,
    res: Response<SlackAdapter>,
  ) {
    super(message)
    this.robot = robot
    this.res = res
  }
}

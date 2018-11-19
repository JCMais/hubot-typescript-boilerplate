import { Robot, Response } from 'hubot'
import SlackAgent from 'hubot-slack'

import { AcknowledgeableError } from '../errors/AcknowledgeableError'

const developerIds = (process.env.HUBOT_SLACK_DEVELOPER_IDS || '').split(',')

/***
 * Block if user is not a developer.
 * Can be useful during the development of a script.
 */
export const workInProgress = async (
  robot: Robot<SlackAgent>,
  res: Response<SlackAgent>,
) => {
  if (developerIds.indexOf(res.message.user.id) === -1) {
    throw new AcknowledgeableError(
      '👷‍♀️ we are still working on that 👷‍♂️',
      robot,
      res,
    )
  }
}

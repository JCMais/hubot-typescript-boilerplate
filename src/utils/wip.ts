import { Response, Robot } from 'hubot'
import { SlackAdapter } from 'hubot-slack'

import { AcknowledgeableError } from '../errors/AcknowledgeableError'

const developerIds = (process.env.HUBOT_SLACK_DEVELOPER_IDS || '').split(',')

/***
 * Block if user is not a developer.
 * Can be useful during the development of a script.
 */
export const assertWorkInProgress = async (
  robot: Robot<SlackAdapter>,
  res: Response<SlackAdapter>,
) => {
  if (developerIds.indexOf(res.message.user.id) === -1) {
    throw new AcknowledgeableError(
      '👷‍♀️ we are still working on that 👷‍♂️',
      robot,
      res,
    )
  }
}

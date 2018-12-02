// Description:
//   <description of the scripts functionality>
//
// Dependencies:
//   "<module name>": "<module version>"
//
// Configuration:
//   LIST_OF_ENV_VARS_TO_SET
//
// Commands:
//   hubot <trigger> - <what the respond trigger does>
//   <trigger> - <what the hear trigger does>
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   JCMais
import { Robot, Response } from 'hubot'
import { SlackAdapter } from 'hubot-slack'
import axios from 'axios'

import {
  assertNotPrivateMessage,
  assertNotInsideThread,
  assertWorkInProgress,
} from '../utils'

module.exports = async function example(robot: Robot<SlackAdapter>) {
  robot.respond(
    /(http(?:s?):\/\/(\S*))/i,
    async (res: Response<SlackAdapter>) => {
      const url = res.match[1]
      res.send(`ok1: ${url}`)

      await axios.get(url)

      res.send(`ok2: ${url}`)
    },
  )

  robot.respond(/test private$/, async (res: Response<SlackAdapter>) => {
    await assertNotPrivateMessage(robot, res)
  })

  robot.respond(/test thread$/, async (res: Response<SlackAdapter>) => {
    await assertNotInsideThread(robot, res)
  })

  robot.respond(/test wip$/, async (res: Response<SlackAdapter>) => {
    await assertWorkInProgress(robot, res)
  })

  robot.respond(/test error$/, async (res: Response<SlackAdapter>) => {
    throw new Error('Are uncaught errors being sent to channel?')
  })
}

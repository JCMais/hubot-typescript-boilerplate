// Description:
//   fs.readDir (method used by hubot to iterate over this dir)
//    returns the files sorted on Node.js, so this script is going to be read first.
//   That way you can use this as an startup script

import { Robot } from 'hubot'
import SlackAdapter from 'hubot-slack'

module.exports = async function startup(robot: Robot<SlackAdapter>) {}

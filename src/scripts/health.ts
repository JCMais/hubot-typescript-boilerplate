// Description:
//   Add /health endpoing that can be used for checking for bot health
import { Robot } from 'hubot'

module.exports = async function example(robot: Robot<{}>) {
  robot.router.get('/health', (req, res) => res.status(200).end())
}

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
import { Robot } from 'hubot';
import axios from 'axios';

module.exports = async function example(robot: Robot<{}>) {
  robot.hear(/(http(?:s?):\/\/(\S*))/i, async res => {
    const url = res.match[1];
    res.send(`ok1: ${url}`);

    res.send('Ok!')

    await axios.get(url);

    res.send(`ok2: ${url}`);
  });
};

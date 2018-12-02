declare module 'hubot-slack' {
  import { RTMClient } from '@slack/client'

  interface Options {
    token: string
  }

  class SlackClient {
    rtm: RTMClient
  }

  export class SlackAdapter {
    options: Options
    client: SlackClient
  }
}

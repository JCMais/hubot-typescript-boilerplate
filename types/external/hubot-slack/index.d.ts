declare module 'hubot-slack' {
  interface Options {
    token: string;
  }

  class SlackAdapter {
    options: Options;
  }

  export = SlackAdapter;
}

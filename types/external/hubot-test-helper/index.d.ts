declare module 'hubot-test-helper' {
  interface User {
    say: (
      userName: string,
      message: string,
      userParams?: object,
    ) => Promise<void>;
    enter: (userName: string, userParams?: object) => Promise<void>;
    leave: (userName: string, userParams?: object) => Promise<void>;
  }

  class Room {
    user: User;
    messages: string[];
  }

  class Helper {
    constructor(paths: string[] | string);
    createRoom(options: any): Room;
  }

  export = Helper;
}

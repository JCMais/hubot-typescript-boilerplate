// https://stackoverflow.com/a/53346014/710693
// This import serves no purpose except to make the file a module
// (so that the following statement is a module augmentation rather
// than a module declaration) and could be replaced with `export {}`.
import * as hubot from 'hubot'

import { Application } from 'express'

declare module 'hubot' {
  interface Message {
    mentions: string[]
  }

  interface Robot<A> {
    router: Application
  }
}

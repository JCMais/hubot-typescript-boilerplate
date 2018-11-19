// https://stackoverflow.com/a/53346014/710693
// This import serves no purpose except to make the file a module
// (so that the following statement is a module augmentation rather
// than a module declaration) and could be replaced with `export {}`.
import * as hubot from 'hubot'

import { Application } from 'express'
import { WebClient, ChatPostMessageArguments } from '@slack/client'
import { EventEmitter } from 'events'
import SlackAdapter from 'hubot-slack'

declare module 'hubot' {
  interface Logger {
    log: (...args: any[]) => void
    emergency: (...args: any[]) => void
    alert: (...args: any[]) => void
    critical: (...args: any[]) => void
    error: (...args: any[]) => void
    warning: (...args: any[]) => void
    notice: (...args: any[]) => void
    info: (...args: any[]) => void
  }

  interface Message {
    /**
     * ID on Slack for this channel/room
     */
    room: string
    mentions: string[]
    thread_ts: string
    reply_broadcast: boolean
    rawText: string
  }

  type SlackMessage = Overwrite<
    ChatPostMessageArguments,
    {
      channel?: string
    }
  >

  interface Response<R> {
    send(message: SlackMessage): void
  }

  interface Robot<A> extends EventEmitter {
    slackClient: WebClient
    router: Application
    logger: Logger
    error: (cb: (error: Error, res?: Response<SlackAdapter>) => void) => void
  }
}

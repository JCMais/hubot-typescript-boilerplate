// https://stackoverflow.com/a/53346014/710693
// This import serves no purpose except to make the file a module
// (so that the following statement is a module augmentation rather
// than a module declaration) and could be replaced with `export {}`.
import * as hubot from 'hubot'

import { Application } from 'express'
import { WebClient, ChatPostMessageArguments } from '@slack/client'
import { EventEmitter } from 'events'
import { SlackAdapter } from 'hubot-slack'

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
    // most of those were added by hubot-slack
    /**
     * ID on Slack for this channel/room
     */
    room: string
    mentions: string[]
    thread_ts: string | null
    reply_broadcast: boolean
    rawText: string
  }

  interface SlackUserApi {
    id: string
    team_id: string
    name: string
    deleted: false
    color: string
    real_name: string
    tz: string
    tz_label: string
    tz_offset: number
    profile: {
      title: string
      phone: string
      skype: string
      real_name: string
      real_name_normalized: string
      display_name: string
      display_name_normalized: string
      status_text: string
      status_emoji: string
      status_expiration: number
      avatar_hash: string
      image_original: string
      email: string
      first_name: string
      last_name: string
      image_24: string
      image_32: string
      image_48: string
      image_72: string
      image_192: string
      image_512: string
      image_1024: string
      status_text_canonical: string
      team: string
      is_custom_image: boolean
    }
    is_admin: boolean
    is_owner: boolean
    is_primary_owner: boolean
    is_restricted: boolean
    is_ultra_restricted: boolean
    is_bot: boolean
    is_app_user: boolean
    updated: number
  }

  interface User {
    real_name: string
    slack: SlackUserApi
    email_address: string
    room: string
  }

  // Added by hubot-slack
  interface MessageReaction {
    type: 'added' | 'removed'
    user: User
    reaction: string
    // if user exists and not a bot
    item_user: User | {}
    item: {
      type: 'message' // can be file too I think
      channel: string
      ts: string
    }
    event_ts: string
    done: boolean
    room: string
  }

  interface MessageEnter extends Message {}

  interface MessageLeave extends Message {}

  type SlackMessage = Overwrite<
    ChatPostMessageArguments,
    {
      channel?: string
    }
  >

  interface Response<R> {
    send(message: SlackMessage | string): void
    reply(message: SlackMessage | string): void
  }

  interface Robot<A> extends EventEmitter {
    // added by us
    slackClient: WebClient

    // not typed on DefinitelyTyped
    events: EventEmitter
    router: Application
    logger: Logger
    error(cb: (error: Error, res?: Response<SlackAdapter>) => void): void

    enter(cb: (res: Response<A>) => void): void
    leave(cb: (res: Response<A>) => void): void

    // added by hubot-slack
    hearReaction(
      matcher: (msg: MessageReaction) => boolean,
      cb: (res: Response<A>) => void,
    ): void

    hearReaction(cb: (res: Response<A>) => void): void
  }
}

import { MessageReaction, Response, Robot } from 'hubot'
import { SlackAdapter } from 'hubot-slack'

import { enterThread, q, sendUsingApi } from '../utils'

const DEFAULT_APPROVALS_NEEDED = 1
const DEFAULT_APPROVAL_WAIT_TIME = 60000

const EMOJI_NEGATIVE = `x` // ❌
const EMOJI_POSITIVE = `heavy_check_mark` // ✔

export class ApprovalTimeoutError extends Error {}
export class NotApprovedError extends Error {}

type RequestApprovalArgs = {
  robot: Robot<SlackAdapter>
  res: Response<SlackAdapter>
  message: string
  approvalIdentifier: string
  approvalsNeeded?: number
  waitTimeMs?: number
}

const approvalIdentifierToEventName = (approvalIdentifier: string) =>
  `evt-approval-${approvalIdentifier}`

const validEmojisForApproval = [EMOJI_NEGATIVE, EMOJI_POSITIVE]

export async function hearApprovalRelatedReactions(
  robot: Robot<SlackAdapter>,
  approvalIdentifier: string,
  conditions?: (msg: MessageReaction) => boolean,
) {
  const eventName = approvalIdentifierToEventName(approvalIdentifier)

  robot.hearReaction(
    msg => {
      return (
        validEmojisForApproval.indexOf(msg.reaction) !== -1 &&
        (!conditions || conditions(msg))
      )
    },
    async res => {
      robot.emit(eventName, res.message)
    },
  )
}

export async function requestApproval({
  robot,
  res,
  message,
  approvalIdentifier,
  approvalsNeeded = DEFAULT_APPROVALS_NEEDED,
  waitTimeMs = DEFAULT_APPROVAL_WAIT_TIME,
}: RequestApprovalArgs): Promise<string[]> {
  const waitTimeSeconds = `${(waitTimeMs / 1000) | 0}s`
  const eventName = approvalIdentifierToEventName(approvalIdentifier)

  return new Promise<string[]>(async (resolve, reject) => {
    const approvalMessage = await sendUsingApi(robot, res, {
      text: `
${message}

Add :${EMOJI_POSITIVE}: to this message to approve. Or :${EMOJI_NEGATIVE}: to disapprove.

I need ${q(
        approvalsNeeded,
      )} approval(s) or a single disapproval, and I will wait the next ${q(
        waitTimeSeconds,
      )} for them.`,
    })

    await enterThread(approvalMessage, res, false)

    const interval = setTimeout(() => {
      robot.off(eventName, eventHandler)
      reject(new ApprovalTimeoutError())
    }, waitTimeMs)

    const approvals: string[] = []

    const eventHandler = (msg: MessageReaction) => {
      // different messages
      if (msg.item.ts !== approvalMessage.ts) {
        return
      }
      // @TODO should own user count?
      // if (msg.user.id === requesterId) {
      //   return
      // }

      if (msg.reaction === EMOJI_NEGATIVE) {
        clearInterval(interval)
        robot.off(eventName, eventHandler)

        return reject(new NotApprovedError(msg.user.id))
      }

      if (msg.type === 'removed') {
        approvals.splice(approvals.indexOf(msg.user.id), 1)
      } else {
        approvals.push(msg.user.id)
      }

      if (approvals.length >= approvalsNeeded) {
        clearInterval(interval)
        robot.off(eventName, eventHandler)

        return resolve(approvals)
      }
    }

    robot.on(eventName, eventHandler)
  })
}

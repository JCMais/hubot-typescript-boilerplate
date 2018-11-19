import { users } from './users'

// This can be helpful for some hardcoded authorization.
// Can get the team ids by opening slack in the browser
//  and adding /groups to any slack channel url, like:
//  https://your-workspace.slack.com/messages/DSOMETHING/groups
//  and then using inspect element on the elements
//  or (better) create a legacy token (https://api.slack.com/custom-integrations/legacy-tokens)
//  and use it on the tester at https://slack.com/api/usergroups.list
export const teams = {
  myteam: {
    id: 'SSOMETHING',
    users: [users.awesome],
    mention: '<!subteam^SSOMETHING|myteam>',
  },
}

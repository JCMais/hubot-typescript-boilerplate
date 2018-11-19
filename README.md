# Hubot Typescript Boilerplate

This is a boilerplate for having your own hubot instance running using Typescript.

Supports all existing hubot scripts written in coffescript / javascript.

It comes with the slack adapter pre-installed.

## Development
Run:
```sh
cp .env.sample .env
```

To create your own .env file. Modify it as desired, then run:
```sh
yarn dev
```

The .env file is only used during development. When running in production use your provider means of setting environment variables.

## Running in Production

First build the code:
```sh
yarn build
```

Then run the bot:
```sh
HUBOT_NAME=my-bot HUBOT_OTHER_ENVS=x yarn start
```
> 
> If using Windows I recommend to install [`cross-env`][cross-env], so you can run like the following:
> ```sh
> cross-env HUBOT_NAME=my-bot HUBOT_OTHER_ENVS=x yarn start
> ```
> 

This will by default use the `shell` adapter, which is great for testing.

This boilerplate comes with the `slack` adapter pre-installed, so you can specify it by running:
```sh
HUBOT_NAME=my-bot HUBOT_ADAPTER=slack HUBOT_SLACK_TOKEN=xoxb-YOUR-TOKEN-HERE yarn start
```

For more documentation about running hubot itself or the slack adapter, please check their corresponding
 docs:  
 https://hubot.github.com/docs/  
 https://slackapi.github.io/hubot-slack/#basic-setup  

## Documentation

The code should be self-documented.

Start by looking into the `.env.sample` file, then the scripts inside `src/scripts`, the files inside the `src/utils` and finally test files.

The folder `types` has some helpers for Typescript.

## Notes

Do not use Hubot [`robot.http`][robot.http] method, it uses [an old lib][node-scoped-http-client] and cannot be easily tested.


Use something more modern, like axios or fetch.

## Testing

We are using [hubot-test-helper][hubot-test-helper].

Testing hubot is not an easy task, mainly because if you have any async call inside your scripts, your tests will need to have some kind of delay.

The best option here is to include a mock for the library you are using to make async calls,
 and include a small delay on your tests for each async interaction.

This boilerplate comes with `axios` installed, and a mock that works with jest, preinstalled. The test example at [`example.spec.ts`][example.spec.ts] can be used as reference. It should be self-documented.

See https://github.com/mtsmfm/hubot-test-helper/issues/19

## Persistence

There is no brain persister installed, it's your job to install one if needed.

## How does the coffee script can be run alongside typescript during development?

They don't.

There is a postinstall hook that calls the script [`tools/compile-coffee-deps.js`][tools/compile-coffee-deps.js]
 which is responsible for compilling the dependencies .coffee files to pure .js.

[cross-env]:https://www.npmjs.com/package/cross-env
[robot.http]:https://hubot.github.com/docs/scripting/#making-http-calls
[node-scoped-http-client]:https://github.com/technoweenie/node-scoped-http-client
[hubot-test-helper]:https://github.com/mtsmfm/hubot-test-helper
[example.spec.ts]: ./src/scripts/__tests__/example.spec.ts
[tools/compile-coffee-deps.js]: ./tools/compile-coffee-deps.js

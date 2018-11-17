import Helper from 'hubot-test-helper'
import mockAxios from 'jest-mock-axios'

const helper = new Helper('../example.ts')

let room = (null as unknown) as ReturnType<typeof helper.createRoom>

beforeEach(() => {
  room = helper.createRoom({
    httpd: false,
  })

  // cleaning up the mess left behind the previous test
  mockAxios.reset()
})

it('should work correctly when user posts a link', async function() {
  const url = 'http://google.com'

  await room.user.say('user1', `hubot ${url}`)

  // we could just mock axios using jest itself, see https://github.com/knee-cola/jest-mock-axios/issues/3#issuecomment-369057670
  mockAxios.mockResponse()

  await global.delay(10)

  expect(mockAxios.get).toHaveBeenCalledWith(url)

  expect(room.messages).toEqual([
    ['user1', 'hubot http://google.com'],
    ['hubot', 'ok1: http://google.com'],
    ['hubot', 'ok2: http://google.com'],
  ])
})

import { Robot } from 'hubot/es2015'

// Hubot does not extends EventEmitter, instead it creates an internal instance
//  and forwards on and emit methods to it
// Here are just adding two other important methods to the hubot Robot prototype

Robot.prototype.off = function(event, listener) {
  this.events.off.apply(this.events, [event, listener])
  return this
}

Robot.prototype.off = function(event) {
  this.events.removeAllListeners.apply(this.events, [event])
  return this
}

global.delay = ms => new Promise(resolve => setTimeout(resolve, ms))

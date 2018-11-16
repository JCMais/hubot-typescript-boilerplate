global.delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms)
})

declare namespace NodeJS {
  interface Global {
    delay: (ms: number) => Promise<void>
  }
}

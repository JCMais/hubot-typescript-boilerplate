// https://stackoverflow.com/questions/43159887/make-a-single-property-optional-in-typescript
type Overwrite<T1, T2> = Pick<T1, Exclude<keyof T1, keyof T2>> & T2

declare namespace NodeJS {
  interface Global {
    delay: (ms: number) => Promise<void>
  }
}

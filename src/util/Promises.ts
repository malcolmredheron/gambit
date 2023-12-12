import {AssertFailed} from "./Assert";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Reason = any;

export type PromiseResolver<T> = {
  resolve: (v: T) => void;
  reject: (reason: Reason) => void;
  promise: Promise<T>;
};

// Allows the synchronous creation of resolve and reject functions, which is not
// guaranteed by the Promise api.
export function promiseResolver<T>(): PromiseResolver<T> {
  let resolve: ((v: T) => void) | undefined = undefined;
  let reject: ((reason: Reason) => void) | undefined = undefined;
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  if (resolve === undefined || reject === undefined) {
    throw new AssertFailed("new Promise() was async");
  }
  return {
    resolve,
    reject,
    promise,
  };
}

// Returns a promise that completes in ms milliseconds.
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// We have some functions that are useful to call in the console from tests
// while debugging. However, the compiler complains if the symbols aren't used.
// This gets around that.
//
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function touch(...v: unknown[]): void {}

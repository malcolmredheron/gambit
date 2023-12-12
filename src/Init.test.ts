import "regenerator-runtime/runtime";

// This file isn't a test but it looks enough like a test that it gets loaded
// by mocha before running tests, giving us a chance to set things up.
//
// However, when running just one test, such as in IntelliJ, this file doesn't
// get loaded. In those cases, call `initTesting` from the test file.

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function initTesting(): void {}

before(async () => {
  installReplHelpers();
});

function installReplHelpers(): void {
  // globalObject.foo = foo;
}

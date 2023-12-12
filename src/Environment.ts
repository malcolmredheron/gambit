import {asType} from "./util/Collection";
import {AssertFailed} from "./util/Assert";

type Environment = "browser" | "node";
const environmentAndGlobalObject: {
  env: Environment;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globalObject: any;
} = (function () {
  try {
    return {env: asType<Environment>("browser"), globalObject: eval("window")};
  } catch (e) {}
  try {
    return {env: asType<Environment>("node"), globalObject: eval("global")};
  } catch (e) {}
  throw new AssertFailed("Unknown environment");
})();

export const environment = environmentAndGlobalObject.env;

// This is useful for adding things to the global namespace, hopefully just for
// testing.
export const globalObject = environmentAndGlobalObject.globalObject;

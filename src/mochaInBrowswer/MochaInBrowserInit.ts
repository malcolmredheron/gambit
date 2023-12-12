import * as mocha from "mocha";

const browserMocha = mocha as unknown as BrowserMocha;
browserMocha.setup({ui: "bdd"});

// Save this off for use in MochaInBrowserExec.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(document as any).mocha = mocha;

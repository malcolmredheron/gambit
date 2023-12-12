// Somehow, importing mocha here does not get us the same thing that we got when
// we imported it in MochaInBroswerInit.ts.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const browserMocha: BrowserMocha = (document as any).mocha;

browserMocha.run();

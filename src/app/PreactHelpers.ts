// Provides a ===-stable handler to pass to a child component.
//
// The newest handler will always be called, but the stable handler returned
// by this function will not change. This is useful because a component never
// needs to rerender because of changes in a handler since the handler is not
// used when rendering.
import {useMemo} from "preact/hooks";

export function stableHandler<P, R>(handler: (arg: P) => R): (arg: P) => R {
  const block = useMemo(() => {
    const block = {
      handler,
      stableHandler: (arg: P) => block.handler(arg),
    };
    return block;
  }, []);
  block.handler = handler;
  return block.stableHandler;
}

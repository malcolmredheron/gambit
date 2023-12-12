import "preact/debug"; // Must be first, they say
import {h, render} from "preact";
import "regenerator-runtime/runtime";
import {AppView} from "./view/AppView";

function main(): void {
  if (process.env.GIT_COMMIT !== undefined) {
    // let crashed = false;
    // Sentry.init({
    //   dsn: "xxx",
    //   release: process.env.GIT_COMMIT,
    //   beforeSend: (event, hint) => {
    //     if (crashed) return null;
    //     crashed = true;
    //     render(
    //       h(ExceptionView, {}),
    //       document.getElementById("exceptionContainer") as Element,
    //     );
    //     return process.env.GIT_COMMIT !== undefined ? event : null;
    //   },
    // });
  }

  render(
    h(
      "div",
      {
        class: "w-full h-full",
      },
      h(AppView, {}),
    ),
    document.getElementById("container") as Element,
  );
}
main();

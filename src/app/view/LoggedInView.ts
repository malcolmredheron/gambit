import {h, VNode} from "preact";

// Calls `render` with a key map and store that are authenticated with the
// server, or shows a UI to log in if needed.
export const LoggedInView = ({
  userInfo,
  clearUserInfo,
}: {
  userInfo: {email: string};
  clearUserInfo: () => void;
}): VNode => {
  return h("div", {class: "w-full h-full flex flex-row justify-center"}, [
    "Logged in as" + userInfo.email,
    h(
      "a",
      {
        href: "#",
        class: "mx-2 text-xs underline clickable",
        onClick: clearUserInfo,
      },
      `Log out`,
    ),
  ]);
};

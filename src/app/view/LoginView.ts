import {h, VNode} from "preact";
import {useState} from "preact/hooks";

export const LoginView = ({
  setUserInfo,
}: {
  setUserInfo: (userInfo: {email: string}) => void;
}): VNode => {
  const initialState = "prompt";
  const [loginState, setLoginState] = useState<"prompt" | "network">(
    initialState,
  );

  if (loginState === "prompt") {
    return h("input", {
      placeholder: "email",
      autoFocus: true,
      autocomplete: "username",
      onKeyPress: (e: KeyboardEvent) => {
        if (e.key !== "Enter") return;
        const email = (e.target! as HTMLInputElement).value;
        lookUpEmail(email);
      },
    });
  }

  return h("div", {}, "<spinner>");

  function lookUpEmail(email: string): void {
    setLoginState("network");

    const xhr = new XMLHttpRequest();
    const url = new URL(window.location.href);
    url.pathname = "auth/login";
    url.searchParams.append("email", email);
    xhr.addEventListener("load", async (event) => {
      if (xhr.status === 200) {
        setUserInfo({email});
      } else {
        // TODO: check and report on the kind of error (bad email, broken
        // server, etc).
        setLoginState("prompt");
      }
    });
    xhr.open("POST", url.href);
    xhr.send();
  }
};

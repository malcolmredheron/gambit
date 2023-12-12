import {h, VNode} from "preact";
import {useState} from "preact/hooks";
import {LoginView} from "./LoginView";
import {LoggedInView} from "./LoggedInView";
import * as Sentry from "@sentry/browser";
import {asType} from "../../util/Collection";

export const AppView = (): VNode => {
  const [userInfo, _setUserInfo] = useState(
    (() => {
      const json = window.localStorage.getItem("userInfo");
      const userInfo =
        json !== null ? asType<{email: string}>(JSON.parse(json)) : undefined;
      if (userInfo) Sentry.setUser({email: userInfo.email});
      return userInfo;
    })(),
  );
  const setUserInfo = (userInfo: {email: string}): void => {
    _setUserInfo(userInfo);
    window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
    Sentry.setUser({email: userInfo.email});
  };
  const clearUserInfo = (): void => {
    _setUserInfo(undefined);
    window.localStorage.removeItem("userInfo");
    Sentry.setUser(null);
  };

  if (userInfo !== undefined) {
    return h(LoggedInView, {
      userInfo,
      clearUserInfo,
    });
  } else {
    return h(LoginView, {setUserInfo});
  }
};

"use client";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
export function useAuth() {
  // hooks
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const { push } = useRouter();
  useEffect(() => {
    console.log("Check auth");
    console.log(cookies.user);

    if (cookies.user === undefined || cookies.user === null) {
      push("/login");
      return;
    }
  }, []);
  return {};
}

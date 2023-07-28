"use client";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
interface useAuthProps {
  notCheckForAuth?: boolean;
}
export function useAuth({ notCheckForAuth }: useAuthProps) {
  // hooks
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const { push } = useRouter();
  useEffect(() => {
    if (notCheckForAuth) {
      return;
    }
    console.log("Check auth");
    console.log(cookies.user);

    if (cookies.user === undefined || cookies.user === null) {
      push("/login");
      return;
    }
  }, []);
  function logout() {
    console.log("LOGOUT");
    removeCookie("user");
    push("/login");
  }

  return { logout };
}

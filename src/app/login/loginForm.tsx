"use client";
import { RootState } from "@/redux/store";
import { authUser } from "@/services/api/users.service";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";
import { TextInput } from "@/components/TextInput";

export function LoginForm() {
  // useStates
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //hooks
  const { push } = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  //functions
  async function submit(data: { username: string; password: string }) {
    const { data: authUserData, funcionou, message } = await authUser(data);
    console.log("Auth user");

    console.log(authUserData, funcionou);
    if (funcionou) {
      let user: { id: string; username: string } = { id: "", username: "" };
      if (authUserData?.id) {
        user.id = authUserData.id;
      }
      if (authUserData?.username) {
        user.username = authUserData.username;
      }
      setCookie("user", user, {
        path: "/",
      });
      push("/");
    } else {
      enqueueSnackbar(message);
    }
  }

  useEffect(() => {
    console.log(username);
  }, [username]);

  return (
    <div className="w-[500px] h-[500px] flex flex-col items-center gap-3">
      <h1>Login</h1>

      <TextInput
        label="Username"
        unmanaged={{
          name: "name",
        }}
        manage={{
          value: username,
          setValue: setUsername,
        }}
      />

      <TextInput
        label="Password"
        unmanaged={{
          name: "password",
        }}
        manage={{
          value: password,
          setValue: setPassword,
        }}
        variant="password"
      />

      <button
        onClick={() => {
          console.log("Entrou");

          submit({ username, password });
        }}
        className="bg-white text-black px-8 py-2 "
      >
        Logar
      </button>
    </div>
  );
}

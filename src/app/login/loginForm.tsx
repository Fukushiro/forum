"use client";
import { RootState } from "@/redux/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
export function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  useEffect(() => {
    console.log(username);
  }, [username]);
  const count = useSelector((state: RootState) => state.user);
  console.log(count);
  return (
    <form className="w-[500px] h-[500px] flex flex-col items-center gap-3 ">
      <h1>Login</h1>
      <input
        type="text"
        className="text-black"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="password"
        className="text-black"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button type="submit" className="bg-white text-black px-8 py-2 ">
        Logar
      </button>
    </form>
  );
}

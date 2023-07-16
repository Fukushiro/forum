import { useSelector } from "react-redux";
import { LoginForm } from "./loginForm";
import { RootState } from "@/redux/store";

export default function Login() {
  async function submit(data: FormData) {
    "use server";
  }
  return (
    <main className="flex justify-center h-screen w-full   items-center">
      <LoginForm />
    </main>
  );
}

import { useSelector } from "react-redux";
import { LoginForm } from "./loginForm";
import { RootState } from "@/redux/store";
import { authUser } from "@/services/api/users.service";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";
import { RedirectType } from "next/dist/client/components/redirect";

export default function Login() {
  return (
    <main className="flex justify-center h-screen w-full   items-center">
      <LoginForm />
    </main>
  );
}

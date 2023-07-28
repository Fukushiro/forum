"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
export function Header() {
  const { logout } = useAuth({ notCheckForAuth: true });
  return (
    <header className="flex flex-row bg-slate-600 p-2 justify-between px-10">
      <div></div>
      <h1>
        <Link href={"/"}>Forum</Link>
      </h1>
      <div>
        <button onClick={logout}>
          <BiLogOut size={20} />
        </button>
      </div>
    </header>
  );
}

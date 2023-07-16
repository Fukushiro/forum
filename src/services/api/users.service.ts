import { PostData } from "@/types/post.types";
import { RetornoPadrao, falhaSemRetorno, success } from "./default.api";
import { api } from "../api";
import { User } from "@/types/user.types";

export async function authUser({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<RetornoPadrao<User>> {
  try {
    const response = await api.post("/users/auth", {
      username,
      password,
    });

    // await new Promise((res) => setTimeout(() => res("p1"), 1000)); //load fake

    return success(response, "Sucesso");
  } catch (e: any) {
    if (e.response.status === 404) {
      return falhaSemRetorno("Usuario não encontrado");
    }
    return falhaSemRetorno(`${e}`);
  }
}

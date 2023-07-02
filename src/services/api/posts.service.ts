import { PostData } from "@/types/post.types";
import { RetornoPadrao, falhaSemRetorno, success } from "./default.api";
import { api } from "../api";

export async function getPosts(): Promise<
  RetornoPadrao<{ content: Array<PostData> }>
> {
  try {
    const response = await api.get("/posts");

    // await new Promise((res) => setTimeout(() => res("p1"), 1000)); //load fake

    return success(response, "Sucesso");
  } catch (e: any) {
    return falhaSemRetorno(`${e}`);
  }
}

export async function createPost({
  text,
  title,
  user,
}: {
  title: string;
  text: string;
  user: string;
}): Promise<RetornoPadrao<{ content: Array<PostData> }>> {
  try {
    const response = await api.post("/posts", {
      title: title,
      text: text,
      user: user,
    });

    // await new Promise((res) => setTimeout(() => res("p1"), 1000)); //load fake

    return success(response, "Sucesso");
  } catch (e: any) {
    return falhaSemRetorno(`${e}`);
  }
}

export async function getPostById({
  id,
}: {
  id: string;
}): Promise<RetornoPadrao<PostData>> {
  console.log(`/posts/${id}`);
  try {
    const response = await api.get(`/posts/${id}`);

    // await new Promise((res) => setTimeout(() => res("p1"), 1000)); //load fake

    return success(response, "Sucesso");
  } catch (e: any) {
    return falhaSemRetorno(`${e}`);
  }
}

import { PostData } from "@/types/post.types";
import { RetornoPadrao, falhaSemRetorno, success } from "./default.api";
import { api } from "../api";
import { User } from "@/types/user.types";
import { fetchApi } from "../fetchApi";
import { CommentData } from "@/types/comment.types";
interface getPostCommentsReturn {
  content: CommentData[];
}
export async function getPostComments({
  idPost,
}: {
  idPost: string;
}): Promise<RetornoPadrao<getPostCommentsReturn>> {
  try {
    const response = await fetchApi(`/comments/post/${idPost}`, {
      data: {
        method: "GET",
      },
      type: {
        type: "noStore",
      },
    });

    await new Promise((res) => setTimeout(() => res("p1"), 1000)); //load fake
    const retorno = await response.json();
    return success({ data: retorno }, "Sucesso");
  } catch (e: any) {
    if (e.response.status === 404) {
      return falhaSemRetorno("Usuario não encontrado");
    }
    return falhaSemRetorno(`${e}`);
  }
}

export async function createComment({
  text,
  postId,
  userId,
}: {
  text: string;
  userId: string;
  postId: string;
}): Promise<RetornoPadrao<getPostCommentsReturn>> {
  try {
    // const response = await fetchApi(`/comments`, {
    //   data: {
    //     method: "POST",
    //     body: {
    //       text: text,
    //       postId: postId,
    //       userId: userId,
    //     },
    //   },
    //   type: {
    //     type: "noStore",
    //   },
    // });

    const response = await api.post("/comments", {
      text: text,
      postId: postId,
      userId: userId,
    });

    await new Promise((res) => setTimeout(() => res("p1"), 1000)); //load fake

    return success(response, "Sucesso");
  } catch (e: any) {
    if (e.response.status === 404) {
      return falhaSemRetorno("Falha ao comentar");
    }
    return falhaSemRetorno(`${e}`);
  }
}
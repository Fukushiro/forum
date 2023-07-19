"use client";
import {
  createComment,
  getPostComments,
} from "@/services/api/comments.service";
import { CommentData } from "@/types/comment.types";
import { ChangeEvent, useEffect, useState } from "react";
import { CommentCard } from "./CommentCard";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";
interface CommentAreaProps {
  idPost: string;
}
export function CommentArea({ idPost }: CommentAreaProps) {
  // hooks
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  // useState
  const [refresh, setRefresh] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [comment, setComment] = useState<string>("");
  // useEffects
  useEffect(() => {
    async function action() {
      const { data, funcionou, message } = await getPostComments({
        idPost: idPost,
      });
      if (funcionou && data != null) {
        setComments(data.content);
      } else {
        enqueueSnackbar(message);
      }
    }
    action();
  }, [refresh]);

  //   functions
  // handlers
  function commentInputHandler(event: ChangeEvent<HTMLInputElement>) {
    setComment(event.target.value);
  }

  async function handleCommentClick() {
    let commentLet = comment;
    setComment("");

    // username={dataComment.user.username}
    // text={dataComment.text}
    // key={dataComment.id}

    setComments((value) => [
      {
        id: uuidv4(),
        text: commentLet,
        user: {
          id: cookies.user.id,
          username: cookies.user.username,
        },
        post: {
          createDate: "dsadas",
          id: idPost,
          text: "sadsa",
          title: "dsadas",
          user: {
            id: cookies.user.id,
            username: cookies.user.username,
          },
        },
      },
      ...value,
    ]);

    await createComment({
      postId: idPost,
      text: commentLet,
      userId: cookies.user.id,
    });

    setRefresh((value) => !value);
  }

  return (
    <div>
      {/* <div className="flex justify-center mt-5">
        <input type="text" className="bg-transparent" />
      </div> */}
      <div className="flex flex-row items-center justify-center mt-5 gap-4">
        <div className="w-72">
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              value={comment}
              onChange={commentInputHandler}
            />
            <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Comment
            </label>
          </div>
        </div>
        {comment !== "" ? (
          <button
            className="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
            onClick={handleCommentClick}
          >
            Comment
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col items-center gap-4 mt-6">
        {comments.length > 0 ? (
          comments.map((dataComment) => (
            <CommentCard
              username={dataComment.user.username}
              text={dataComment.text}
              key={dataComment.id}
            />
          ))
        ) : (
          <>
            <p className="text-red-600">Loading</p>
          </>
        )}
      </div>
    </div>
  );
}

"use client";
// Area where is the main comments ands comment field
import {
  createComment,
  getPostComments,
} from "@/services/api/comments.service";
import { CommentData } from "@/types/comment.types";
import {
  ChangeEvent,
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useState,
} from "react";
import { CommentCard } from "./CommentCard";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";
import { CommentSubArea } from "@/components/CommentSubArea";
import { CommentTextField } from "@/components/CommentTextField";
interface CommentAreaProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  idPost: string;
}
export function CommentArea({ idPost, ...rest }: CommentAreaProps) {
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

    // setComments((value) => [
    //   {
    //     id: uuidv4(),
    //     text: commentLet,
    //     user: {
    //       id: cookies.user.id,
    //       username: cookies.user.username,
    //     },
    //     post: {
    //       createDate: "dsadas",
    //       id: idPost,
    //       text: "sadsa",
    //       title: "dsadas",
    //       user: {
    //         id: cookies.user.id,
    //         username: cookies.user.username,
    //       },
    //     },
    //   },
    //   ...value,
    // ]);

    await createComment({
      postId: idPost,
      text: commentLet,
      userId: cookies.user.id,
    });

    setRefresh((value) => !value);
  }

  return (
    <div {...rest}>
      {/* <div className="flex justify-center mt-5">
        <input type="text" className="bg-transparent" />
      </div> */}
      <div className="flex  mt-8">
        <CommentTextField
          comment={comment}
          setComment={setComment}
          handleCommentClick={handleCommentClick}
        />
      </div>
      <div className="flex flex-col gap-4 mt-6">
        {comments.length > 0 ? (
          comments.map((dataComment) => (
            <CommentSubArea
              comment={dataComment}
              key={dataComment.id}
              layer={1}
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

"use client";
// Sub area where is the sub commentaries of a commentary
import { CommentCard } from "@/app/forum/[id]/CommentCard";
import { createComment, getSubComments } from "@/services/api/comments.service";
import { CommentData } from "@/types/comment.types";
import { useState, useEffect } from "react";
import { CommentTextField } from "./CommentTextField";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";

interface CommentSubAreaProps {
  comment: CommentData;
  layer: number;
}
export function CommentSubArea({ comment, layer }: CommentSubAreaProps) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  // useStates
  const [openSubComments, setUseComments] = useState<boolean>(false);
  const [subComments, setSubComments] = useState<CommentData[]>([]);
  const [commentString, setCommentString] = useState<string>("");
  const [openCommentField, setOpenCommentField] = useState<boolean>(false);
  useEffect(() => {
    if (!openSubComments) {
      return;
    }
    async function action() {
      const { data, funcionou } = await getSubComments({
        idComment: comment.id,
      });
      if (funcionou && !!data?.content) {
        setSubComments(data.content);
      }
    }
    action();
  }, [openSubComments]);
  //   handlers
  function handlerComment() {
    async function action() {
      let commentLet = commentString;
      setCommentString("");
      setSubComments((value) => [
        {
          id: uuidv4(),
          text: commentLet,
          user: {
            id: cookies.user.id,
            username: cookies.user.username,
          },
          post: {
            createDate: "dsadas",
            id: comment.id,
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
        postId: comment.post.id,
        text: commentString,
        userId: cookies.user.id,
        parentComment: comment.id,
      });
    }
    action();
  }
  function handleOpenResponseField() {
    setOpenCommentField(!openCommentField);
  }
  return (
    <div className="w-full flex flex-col items-center">
      <button
        onClick={() => {
          setUseComments(!openSubComments);
        }}
      >
        Abrir
      </button>
      <CommentCard username={comment.user.username} text={comment.text} />
      {openSubComments && layer < 4 && (
        <div className="">
          <div className="mt-8 ml-[200px]">
            <button onClick={handleOpenResponseField}>Responder</button>
            {openCommentField && (
              <CommentTextField
                comment={commentString}
                setComment={setCommentString}
                handleCommentClick={handlerComment}
              />
            )}
            {/* <CommentCard username={comment.user.username} text={comment.text} /> */}
            {subComments.map((subComment) => (
              <CommentSubArea
                comment={subComment}
                layer={layer + 1}
                key={uuidv4()}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

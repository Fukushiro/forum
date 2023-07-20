"use client";
// Sub area where is the sub commentaries of a commentary
import { CommentCard } from "@/app/forum/[id]/CommentCard";
import { createComment, getSubComments } from "@/services/api/comments.service";
import { CommentData } from "@/types/comment.types";
import { useState, useEffect } from "react";
import { CommentTextField } from "./CommentTextField";
import { useCookies } from "react-cookie";

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
      await createComment({
        postId: comment.post.id,
        text: commentString,
        userId: cookies.user.id,
        parentComment: comment.id,
      });
    }
    action();
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
      {openSubComments && layer < 3 && (
        <div>
          <CommentTextField
            comment={commentString}
            setComment={setCommentString}
            handleCommentClick={handlerComment}
          />
          <div className="mt-8 ml-[200px]">
            {/* <CommentCard username={comment.user.username} text={comment.text} /> */}
            {subComments.map((subComment) => (
              <CommentSubArea comment={subComment} layer={layer + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

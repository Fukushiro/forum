// Text field used to register a new commentary
import { CommentData } from "@/types/comment.types";
import { ChangeEvent, MouseEvent } from "react";

export interface CommentTextFieldProps {
  comment: string;
  setComment: Function;
  handleCommentClick: () => void;
}
export function CommentTextField({
  comment,
  setComment,
  handleCommentClick,
}: CommentTextFieldProps) {
  function commentInputHandler(event: ChangeEvent<HTMLInputElement>) {
    setComment(event.target.value);
  }
  return (
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
          onClick={() => {
            handleCommentClick();
          }}
        >
          Comment
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

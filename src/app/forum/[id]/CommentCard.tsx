// Card where the coment and user that made the comment are stored
interface CommentCardProps {
  username: string;
  text: string;
}
export function CommentCard({ text, username }: CommentCardProps) {
  return (
    <div className="flex flex-row bg-slate-700  w-[820px] ">
      <div className="flex flex-col gap-1 items-center bg-slate-500 justify-center w-[10%]">
        <p>{username}</p>
      </div>
      <div className="bg-slate-70 w-[90%]">
        <p className="text-lg p-5 text-start break-words">{text}</p>
      </div>
    </div>
  );
}

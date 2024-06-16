// Card where the coment and user that made the comment are stored
interface CommentCardProps {
  username: string;
  text: string;
  onClick: () => void;
}
export function CommentCard({ text, username, onClick }: CommentCardProps) {
  return (
    <div className="flex flex-row bg-slate-700  " onClick={onClick}>
      <div className="flex flex-col gap-1 items-center bg-slate-500 justify-center w-[100px]">
        <p className="text-sm p-5 text-center break-words">{username}</p>
      </div>
      <div className="bg-slate-70 flex ">
        <p className="text-lg p-5 text-start break-words  ">
          {text}
          Most words are short & don't need to break. But
          Antidisestablishmentarianism is long. The width is set to min-content,
          with a max-width of 11em.
        </p>
      </div>
    </div>
  );
}

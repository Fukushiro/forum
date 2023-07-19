import { Header } from "@/components/Header";
import { getPostComments } from "@/services/api/comments.service";
import { getPostById } from "@/services/api/posts.service";
import { CommentCard } from "./CommentCard";
import { CommentArea } from "./CommentArea";

interface ForumProps {
  params: {
    id: string;
  };
}
export default async function Forum({ params }: ForumProps) {
  const { id } = params;
  const { data, funcionou, message } = await getPostById({ id });

  return (
    <main>
      <Header />
      <div className="flex justify-center mt-8">
        <div className="w-[70%]  flex flex-col">
          <div className="flex flex-col gap-1 items-center bg-slate-500">
            <p>{data?.title}</p>
            <p>Autor: {data?.user.username}</p>
          </div>
          <div className="bg-slate-700">
            <p className="text-lg p-5 text-start break-words">{data?.text}</p>
          </div>
        </div>
      </div>
      {/* comment area */}
      <CommentArea idPost={id} />
    </main>
  );
}

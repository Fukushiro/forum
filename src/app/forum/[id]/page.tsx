import { Header } from "@/components/Header";
import { getPostComments } from "@/services/api/comments.service";
import { getPostById } from "@/services/api/posts.service";
import { CommentCard } from "./CommentCard";
import { CommentArea } from "./CommentArea";
import { AuthComponent } from "@/components/AuthComponent";

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
      <AuthComponent />
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
      <div className="flex justify-center">
        <CommentArea idPost={id} className=" w-[60%]" />
      </div>
    </main>
  );
}

import { PostData } from "@/types/post.types";
import Link from "next/link";
interface PostCardProps {
  post: PostData;
}
export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/forum/${post.id}`} className="appearance-none">
      <div className="lg:w-[600px] md:w-[500px] sm:w-[400px] w-52  flex flex-col">
        <div className="flex flex-col gap-1 items-center bg-slate-500">
          <p>{post.title}</p>
          <p>Autor: {post.user.username}</p>
        </div>
        <div className="bg-slate-700 overflow-hidden">
          <p className="text-lg p-5 text-start">{post.text}</p>
        </div>
      </div>
    </Link>
  );
}

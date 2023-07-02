import { Header } from "@/components/Header";
import { getPostById } from "@/services/api/posts.service";

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
            <p>Autor: autor</p>
          </div>
          <div className="bg-slate-700 overflow-hidden">
            <p className="text-lg p-5 text-start">{data?.text}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

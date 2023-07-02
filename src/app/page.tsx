import { Header } from "@/components/Header";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/services/api/posts.service";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default async function Home() {
  const { data, funcionou } = await getPosts();

  return (
    <main>
      <Header />
      <section className="flex flex-col gap-4 items-center mt-4">
        <div>
          <Link
            href={"/new"}
            className="border px-5 py-2 hover:bg-white hover:text-slate-600"
          >
            Create post
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-4 items-center mt-4">
        {funcionou &&
          data?.content.map((post) => <PostCard key={post.id} post={post} />)}
      </section>
    </main>
  );
}

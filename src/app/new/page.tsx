import { Header } from "@/components/Header";
import { createPost } from "@/services/api/posts.service";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

async function registerNewPost(data: FormData) {
  "use server";
  let text = data.get("text") ? data.get("text")?.toString() : "";
  let title = data.get("title") ? data.get("title")?.toString() : "";
  if (text == undefined || title == undefined) {
    return;
  }
  let value = cookies().get("user")?.value;
  if (!!value) {
    let user = JSON.parse(value);
    const {} = createPost({
      text: text,
      title: title,
      user: user.id,
    });
    redirect("/");
  }
}

export default function New() {
  return (
    <main>
      <Header />
      <form
        action={registerNewPost}
        className=" mx-auto flex flex-col items-center mt-5 gap-4"
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-60 text-black"
            />
          </div>
          <div className="flex gap-4">
            <label htmlFor="text">Text:</label>
            <textarea name="text" id="text" className="w-60 text-black" />
          </div>
          <button
            type="submit"
            className="w-36 border px-5 py-2 hover:bg-white hover:text-slate-600 self-center"
          >
            {" "}
            Cadastrar{" "}
          </button>
        </div>
      </form>
    </main>
  );
}

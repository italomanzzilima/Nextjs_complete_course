import { db } from "@/db";
import { redirect } from "next/navigation";

const SnippetCreatePage = () => {
  async function createSnippet(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    if (!title || !code) {
      return;
    }
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    redirect("/");
  }

  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            id="code"
            name="code"
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-300 p-2 rounded">
          Create Snippet
        </button>
      </div>
    </form>
  );
};

export default SnippetCreatePage;

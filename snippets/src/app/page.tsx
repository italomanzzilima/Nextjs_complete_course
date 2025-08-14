import { db } from "@/db";
import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => (
    <Link
      className="flex justify-between items-center p-2 border rounded hover:bg-black hover:text-white transition-all"
      href={`snippets/${snippet.id}`}
      key={snippet.id}
    >
      <div>{snippet.title}</div>
      <div>View</div>
    </Link>
  ));

  return (
    <div className="mt-5">
      <div className="flex justify-between my-5">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link
          href="snippets/new"
          className="border rounded p-2 hover:bg-black hover:text-white transition-all"
        >
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}

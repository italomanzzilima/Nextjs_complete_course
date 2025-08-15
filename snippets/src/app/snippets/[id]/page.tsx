import { deleteSnippet } from "@/actions";
import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SnippetsShowPageProps {
  params: {
    id: string;
  };
}

const SnippetShowPage = async (props: SnippetsShowPageProps) => {
  const { id } = await props.params;

  const snippet = await db.snippet.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-3">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded cursor-pointer"
          >
            Edit
          </Link>

          {/* Using a form to handle the delete action */}
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded cursor-pointer">
              Delete
            </button>
          </form>
        </div>
      </div>
      <pre className="p-3 border border-gray-200 rounded bg-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};

export default SnippetShowPage;

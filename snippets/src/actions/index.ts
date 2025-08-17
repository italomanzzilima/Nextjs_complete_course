"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { redirect } from "next/navigation";

// create snippet server action
export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be at least 3 characters long.",
      };
    }

    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Code must be longer.",
      };
    }

    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: "Something went wrong",
      };
    }
  }
  // Revalidate the home page to reflect the new snippet
  revalidatePath("/");
  redirect("/");
}

// edit snippet server action
export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: {
      code,
    },
  });

  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

// delete snippet server action
export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  // Revalidate the home page to reflect the deletion
  revalidatePath(`/`);
  redirect(`/`);
}

"use server";

import { z } from "zod";
import { RegisterFormSchema } from "@/libs/rules";

export async function register(state: unknown, formData: FormData) {
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error),
      email: formData.get("email"),
    };
  }

  console.log(validatedFields);
}

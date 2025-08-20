"use server";

import { z } from "zod";
import { RegisterFormSchema } from "@/lib/rules";
import { getCollection } from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function register(state: unknown, formData: FormData) {
  // validates fields
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // checks if the validation is successfull
  if (!validatedFields.success) {
    console.log(z.flattenError(validatedFields.error));
    return {
      errors: z.flattenError(validatedFields.error),
      email: formData.get("email"),
    };
  }
  // extract email and password
  const { email, password } = validatedFields.data;

  // checks if users collection exist and connection is working
  const userCollection = await getCollection("users");
  if (!userCollection) {
    return {
      errors: {
        fieldErrors: {
          email: "Server Error",
          password: [],
          confirmPassword: [],
        },
      },
    };
  }

  // check if email already exists
  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return {
      errors: {
        fieldErrors: {
          email: "Email already exists in our database!",
        },
      },
    };
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // save user in db
  const result = await userCollection?.insertOne({
    email,
    password: hashedPassword,
  });

  console.log(result);
  redirect("/dashboard");
}

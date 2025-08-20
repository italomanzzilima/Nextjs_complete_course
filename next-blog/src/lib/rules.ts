import z from "zod";

// adds validation to register form
export const RegisterFormSchema = z
  .object({
    email: z.email("please enter a valid email").trim(),
    password: z
      .string()
      .min(1, "password is required")
      .min(5, "be at least 5 characters")
      .regex(/[a-zA-Z]/, "contain at least one letter")
      .regex(/[0-9]/, "contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "contain at least one special character")
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((value, ctx) => {
    if (value.password !== value.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

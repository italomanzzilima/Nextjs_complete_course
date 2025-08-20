"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register } from "@/actions/auth";

export default function Register() {
  const [state, action, isPending] = useActionState(register, undefined);

  return (
    <div className="container w-full md:w-1/2">
      <h1 className="title">Register page</h1>
      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={state?.email?.toString()}
          />
          {state?.errors.fieldErrors.email && (
            <p className="error">{state?.errors.fieldErrors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
          {state?.errors?.fieldErrors?.password && (
            <div className="error">
              <p>Password must:</p>
              <ul className="list-disc list-inside ml-4">
                {state?.errors?.fieldErrors?.password.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" name="confirmPassword" id="confirmPassword" />
          {state?.errors.fieldErrors.confirmPassword && (
            <p className="error">{state?.errors.fieldErrors.confirmPassword}</p>
          )}
        </div>
        <div className="flex items-end gap-4">
          <button disabled={isPending} className="btn-primary">
            {isPending ? "Loading..." : "Register"}
          </button>
          <Link href="/" className="text-link">
            or login here
          </Link>
        </div>
      </form>
    </div>
  );
}

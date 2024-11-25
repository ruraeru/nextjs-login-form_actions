"use server";

import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { z } from "zod";

const checkPassword = (password: string) => password === "12345";

const formSchema = z.object({
  email: z.string().email().toLowerCase(),
  username: z.string(),
  password: z
    .string({
      required_error: "Password is require",
    })
    .min(PASSWORD_MIN_LENGTH)
    .refine(checkPassword, "Wrong Password"),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}

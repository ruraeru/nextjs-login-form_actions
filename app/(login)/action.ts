"use server";

import {
  EMAIL_REGEX,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  USERNAME_MIN_LENGTH,
} from "@/lib/constants";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .regex(EMAIL_REGEX, "Only @zod.com emails are allowed"),
  username: z
    .string()
    .min(USERNAME_MIN_LENGTH, "Username should be at least 5 characters long."),
  password: z
    .string({
      required_error: "Password is require",
    })
    .min(PASSWORD_MIN_LENGTH, "Password should be at least 10 characters long.")
    .regex(
      PASSWORD_REGEX,
      "Password should contain at least one number (0123456789)."
    ),
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

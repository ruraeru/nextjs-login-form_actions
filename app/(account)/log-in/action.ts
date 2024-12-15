"use server";

import bcrypt from "bcrypt";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import saveSession from "@/lib/saveSession";
import { revalidatePath } from "next/cache";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "An Account with this email does not exists."),
  password: z
    .string({
      required_error: "Password is require",
    })
    .min(PASSWORD_MIN_LENGTH, "Password should be at least 10 characters long.")
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function login(_: unknown, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const ok = await bcrypt.compare(
      result.data.password,
      user?.password ?? "xx"
    );

    if (ok) {
      return await saveSession(user!.id);
    } else {
      return {
        fieldErrors: {
          password: ["wrong password"],
          email: [],
        },
      };
    }
  }
}

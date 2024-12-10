"use server";

import getSession from "@/lib/session";
import bcrypt from "bcrypt";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { typeToFlattenedError, z } from "zod";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { checkUserPassword } from "@/lib/validator";

const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string",
        required_error: "Where is my username???",
      })
      .toLowerCase()
      .trim(),
    email: z.string().email().toLowerCase(),
    bio: z.string(),
    prevPassword: z.string(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .refine(checkPassword, {
    message: "Both passowrds should be the same!",
    path: ["confirmPassword"],
  });

interface FormState {
  isSuccess: boolean;
  error: typeToFlattenedError<{
    username: string;
    email: string;
    bio: string;
    prevPassword: string;
    password: string;
    confirmPassword: string;
  }> | null;
}
export async function editProfile(
  prevState: any,
  formData: FormData
): Promise<FormState> {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    bio: formData.get("bio"),
    prevPassword: formData.get("prevPassword"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const result = await formSchema.spa(data);
  if (!result.success)
    return { error: result.error.flatten(), isSuccess: false };

  const isValidPassword = await checkUserPassword(result.data.prevPassword);
  if (!isValidPassword) {
    return {
      error: {
        fieldErrors: { prevPassword: ["Please check your password."] },
        formErrors: [],
      },
      isSuccess: false,
    };
  }
  const session = await getSession();
  if (result.data && result.data.password) {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.update({
      where: {
        id: session.id,
      },
      data: {
        email: result.data.email,
        username: result.data.username,
        password: hashedPassword,
        bio: result.data.bio,
      },
    });
    return redirect(`/users/${user.username}`);
  }
  const user = await db.user.update({
    where: {
      id: session.id,
    },
    data: {
      email: result.data?.email,
      username: result.data?.username,
      bio: result.data?.bio,
    },
  });
  return redirect(`/users/${user.username}`);
}

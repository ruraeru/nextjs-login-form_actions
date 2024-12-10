import bcrypt from "bcrypt";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { z } from "zod";
import db from "@/lib/db";
import getSession from "@/lib/session";

const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z.object({
  username: z
    .string({
      invalid_type_error: "Username must be a string",
      required_error: "Where is my username???",
    })
    .toLowerCase()
    .trim(),
  // email: z.string().email().toLowerCase(),
  // bio: z.string(),
  // password: z
  //   .string()
  //   .min(PASSWORD_MIN_LENGTH)
  //   .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  // confirmPassword: z.string().min(PASSWORD_MIN_LENGTH),
});

// .refine(checkPassword, {
//   message: "Both passowrds should be the same!",
//   path: ["confirmPassword"],
// });

export async function modifyUserInfo(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    // email: formData.get("email"),
    // bio: formData.get("bio"),
    // password: formData.get("password"),
    // confirmPassword: formData.get("confirmPassword"),
  };
  const result = await formSchema.spa(data);
  console.log(result.data?.username);
  if (!result.success) {
    return result.error.flatten();
  } else {
    // const hashedPassword = await bcrypt.hash(result.data.password, 12);
    try {
      const user = await db.user.update({
        where: {
          id: 2,
        },
        data: {
          username: result.data.username,
        },
      });
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  }
}

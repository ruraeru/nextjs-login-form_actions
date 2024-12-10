import bcrypt from "bcrypt";

import { getUserAuth } from "@/service/userService";

export const checkUserPassword = async (password: string) => {
  const user = await getUserAuth();
  const validPassword = await bcrypt.compare(password, user?.password + "");
  return validPassword;
};

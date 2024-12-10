import db from "./db";
import getSession from "./session";

export async function isOwner(username: string) {
  const session = await getSession();

  const isOwn = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return Boolean(session.id === isOwn?.id);
}

import db from "./db";
import getSession from "./session";

export async function isOwner(username: string) {
  const session = await getSession();

  const user = await db.user.findUnique({
    where: {
      username,
    },
    include: {
      tweet: {
        include: {
          user: true,
        },
      },
    },
  });
  return Boolean(session.id === user?.id);
}

"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

export async function likePost(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}
export async function dislikePost(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}

const formSchema = z.object({
  comment: z.string(),
  photo: z.any(),
});

export async function addComment(tweetId: number, formData: FormData) {
  const data = {
    comment: formData.get("comment"),
    photo: formData.get("photo"),
  };
  const result = formSchema.safeParse(data);
  const session = await getSession();
  const addComment = await db.response.create({
    data: {
      tweetId,
      payload: result.data?.comment!,
      userId: session.id!,
    },
    select: {
      payload: true,
    },
  });
  revalidatePath(`/tweets/${tweetId}`);
  return addComment.payload;
}

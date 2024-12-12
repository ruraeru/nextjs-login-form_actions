"use server";

import fs from "fs/promises";
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
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    const randomFileName = Date.now();
    await fs.appendFile(
      `./public/images/${randomFileName}.png`,
      Buffer.from(photoData)
    );
    if (data.photo.size === 0) {
      data.photo = null;
    } else {
      data.photo = `/images/${randomFileName}.png`;
    }
  }
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const { comment, photo } = result.data;
    const session = await getSession();
    await db.response.create({
      data: {
        tweetId,
        payload: comment,
        photo: photo !== null ? photo : null,
        userId: session.id!,
      },
    });
  }
  revalidatePath(`/tweets/${tweetId}`);
}

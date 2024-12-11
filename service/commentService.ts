"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";

export async function likeComment(responseId: number) {
  const session = await getSession();
  try {
    const a = await db.likeResponse.create({
      data: {
        responseId,
        userId: session.id!,
      },
      select: {
        reponse: true,
      },
    });
    console.log(a);
    revalidateTag(`like-status-${responseId}`);
  } catch (e) {}
}
export async function dislikeComment(responseId: number) {
  const session = await getSession();
  try {
    await db.likeResponse.delete({
      where: {
        id: {
          responseId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${responseId}`);
  } catch (e) {}
}

export async function getLikeResponseStatus(responseId: number) {
  const session = await getSession();
  const isLiked = await db.likeResponse.findUnique({
    where: {
      id: {
        responseId,
        userId: session.id!,
      },
    },
  });
  const likeCount = await db.likeResponse.count({
    where: {
      responseId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

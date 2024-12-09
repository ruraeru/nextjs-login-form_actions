"use server";

import fs from "fs/promises";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const tweetSchema = z.object({
  title: z.string({
    required_error: "title is required",
  }),
  tweet: z.string({
    required_error: "tweet is required",
  }),
  photo: z.any(),
});

export async function uploadTweet(_: any, formData: FormData) {
  const data = {
    title: formData.get("title"),
    tweet: formData.get("tweet"),
    photo: formData.get("photo"),
  };
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    if (data.photo.size === 0) {
      data.photo = null;
    } else {
      await fs.appendFile(
        `./public/${data.photo.name}`,
        Buffer.from(photoData)
      );
      data.photo = `./public/${data.photo.name}`;
    }
  }
  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const { title, tweet, photo } = result.data;
    const session = await getSession();
    const newTweet = await db.tweet.create({
      data: {
        title,
        tweet,
        photo: data.photo !== null ? data.photo : null,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
      select: {
        id: true,
      },
    });
    redirect(`/tweets/${newTweet.id}`);
  }
}

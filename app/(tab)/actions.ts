"use server";

import fs from "fs/promises";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const IsUrlImage = async (url: string) => {
  if (url === "") {
    return true;
  }
  const fetchUrl = await fetch(url);
  return Boolean(fetchUrl.headers.get("Content-Type")?.includes("image"));
};

const tweetSchema = z.object({
  title: z.string({
    required_error: "title is required",
  }),
  tweet: z.string({
    required_error: "tweet is required",
  }),
  photo: z.string().superRefine(async (url, ctx) => {
    const isImage = await IsUrlImage(url);
    if (!isImage) {
      ctx.addIssue({
        code: "custom",
        message: "This url is not image url",
        path: ["photo"],
        fatal: true,
      });
      return z.NEVER;
    }
  }),
});

export async function uploadTweet(_: any, formData: FormData) {
  const data = {
    title: formData.get("title"),
    tweet: formData.get("tweet"),
    photo: formData.get("photo"),
  };
  // if (data.photo instanceof File) {
  //   const photoData = await data.photo.arrayBuffer();
  //   const randomFileName = Date.now();
  //   if (data.photo.size === 0) {
  //     data.photo = null;
  //   } else {
  //     data.photo = `/images/tweets/${randomFileName}.png`;
  //   }
  //   await fs.appendFile(
  //     `./public/images/tweets/${randomFileName}.png`,
  //     Buffer.from(photoData)
  //   );
  // }
  const result = await tweetSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const { title, tweet, photo } = result.data;
    const session = await getSession();
    const newTweet = await db.tweet.create({
      data: {
        title,
        tweet,
        photo: photo === "" ? null : photo,
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

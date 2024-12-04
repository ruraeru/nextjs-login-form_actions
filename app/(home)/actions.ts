"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const titleSchema = z.string({
  required_error: "title is required",
});

export async function uploadTweet(_: any, formData: FormData) {
  const title = formData.get("title");
  const result = titleSchema.safeParse(title);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    const tweet = await db.tweet.create({
      data: {
        tweet: result.data,
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
    console.log(tweet.id);
    redirect(`/tweets/${tweet.id}`);
  }
}

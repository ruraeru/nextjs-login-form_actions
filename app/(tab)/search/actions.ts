"use server";

import db from "@/lib/db";
import { z } from "zod";

const keywordSchema = z.string().trim();

export async function searchTweet(prevState: any, formData: FormData) {
  const keyword = formData.get("keyword");
  const result = keywordSchema.safeParse(keyword);
  if (!result.success) {
    return {
      data: null,
      error: result.error.flatten(),
      keyword,
    };
  }

  return {
    data: {
      tweets: await getKeywordTweets(result.data),
      users: await getKeywordUsers(result.data),
    },
    error: null,
    keyword,
  };
}

export async function getKeywordTweets(keyword: string) {
  const tweets = await db.tweet.findMany({
    where: {
      title: {
        contains: keyword,
      },
    },
    include: {
      _count: {
        select: {
          response: true,
          like: true,
        },
      },
      user: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export async function getKeywordUsers(keyword: string) {
  const users = await db.user.findMany({
    where: {
      username: {
        contains: keyword,
      },
    },
    select: {
      id: true,
      username: true,
      email: true,
      avatar: true,
      bio: true,
    },
  });
  return users;
}

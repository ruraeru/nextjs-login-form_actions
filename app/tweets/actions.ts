"use server";
import db from "@/lib/db";
export async function getMoreTweets(page: number) {
  const products = await db.tweet.findMany({
    skip: page * 1,
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

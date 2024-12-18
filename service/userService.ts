"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

export const isUsernameExist = async (username: string): Promise<boolean> => {
  const user = await db.user.findUnique({
    where: { username },
    select: { id: true },
  });
  return Boolean(user);
};

export const isEmailExist = async (email: string): Promise<boolean> => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return Boolean(user);
};

export async function isOwner(username: string) {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      username,
    },
    include: {
      tweet: {
        include: {
          _count: true,
          user: true,
        },
      },
    },
  });
  if (!user) {
    notFound();
  }
  const isOwn = Boolean(session.id === user.id);
  return {
    isOwn,
    user,
  };
}

export async function getUserInfo(username: string) {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
  });

  if (!user) {
    notFound();
  }

  return user;
}

export type userInfoType = Prisma.PromiseReturnType<typeof getUserInfo>;

export async function getUserAuth() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      id: true,
      password: true,
    },
  });
  return user;
}

export async function getUserAvatar() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      avatar: true,
      username: true,
    },
  });
  return user;
}

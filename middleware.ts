import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/log-in": true,
  "/create-account": true,
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const { url } = req;
  const session = await getSession();
  const exists = publicOnlyUrls[pathname];

  if (!session.id && !exists) {
    return NextResponse.redirect(new URL("/log-in", url));
  }
  if (session.id && exists) {
    return NextResponse.redirect(new URL("/", url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

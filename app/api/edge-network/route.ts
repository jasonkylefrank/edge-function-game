import { NextResponse } from "next/server";

export const runtime = "edge";

// This is the Next.js "route handler" approach.  I also created a version using Next.js's new "server action" approach.
export async function POST(req: Request) {
  const data = await req.json();

  console.log(
    "Hello from this EDGE function (Route Handler). Data received:",
    data
  );

  return NextResponse.json(data);
}

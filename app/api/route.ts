import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const data = await req.json();

  console.log(
    "Hello from this edge function (Route Handler). Data received:",
    data
  );

  return NextResponse.json(data);
}

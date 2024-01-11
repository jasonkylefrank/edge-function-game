import { NextResponse } from "next/server";

// No runtime is specified, so this function will NOT be an EDGE function.

export async function POST(req: Request) {
  const data = await req.json();

  console.log(
    "Hello from this SERVERLESS function (Route Handler). Data received:",
    data
  );

  return NextResponse.json(data);
}

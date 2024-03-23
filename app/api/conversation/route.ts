import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { prompts } = body;
    if (!prompts.length) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const response = await fetch(process.env.CF_AI_URL + "/conversation", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        prompts,
      }),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (e) {
    console.log("CONVERSATION", e);
    return new NextResponse("Internal error", { status: 500 });
  }
}

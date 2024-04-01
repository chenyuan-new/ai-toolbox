import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
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

    const freeTrial = await checkApiLimit();
    if (!freeTrial) {
      return new NextResponse("Free trial has expired.", { status: 403 });
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

    await increaseApiLimit();
    return NextResponse.json(data);
  } catch (e) {
    console.log("CONVERSATION", e);
    return new NextResponse("Internal error", { status: 500 });
  }
}

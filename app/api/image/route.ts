import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const formData = await req.formData();

    const prompt = formData.get("prompt") as string;

    if (!prompt.length) {
      return new NextResponse("Messages are required", { status: 400 });
    }
    const response = await fetch(process.env.CF_AI_URL+ "/image", {
      method: "post",
      // headers: {
      //   "content-type": `multipart/form-data; boundary=${formData.getBoundary()}`,
      // },
      body: formData,
    });
    return response;
  } catch (e) {
    console.log("IMAGE", e);
    return new NextResponse("Internal error", { status: 500 });
  }
}

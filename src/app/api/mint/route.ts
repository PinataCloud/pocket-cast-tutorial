import { NextResponse as res } from "next/server";

export const maxDuration = 300;

export async function POST(request: Request) {
  try {
    const data = await request.json()

    if (!data.castUrl) {
      return res.json({
        status: 400,
        message: "Please provide a cast URL"
      });
    }
    if (!data.address) {
      return res.json({
      status: 400,
      message: "Please provide an address to mint the cast to"
      });
    }

    const mintCast = await fetch(
      `https://stevedylandev-pocketCastApi.web.val.run/mint?cast=${data.castUrl}&address=${data.address}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.VALTOWN_API_KEY}`,
          contentType: "application/json",
          accept: "application/json",
        },
      },
    );

    const mintCastStatus = await mintCast.json();

    if (mintCastStatus.status !== "success") {
      return res.json({
        status: 500,
        message: `Problem minting cast: ${mintCastStatus}`
      });
    }

    return res.json({ mintCastStatus });
  } catch (error) {
    console.log(error);
    return res.json("Server error");
  }
}

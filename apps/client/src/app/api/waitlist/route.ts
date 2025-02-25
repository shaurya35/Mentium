import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const count = await prisma.waitlist.count();
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("Error fetching count:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    await prisma.waitlist.upsert({
      where: { email },
      create: { email },
      update: {},
    });

    // Get fresh count
    const count = await prisma.waitlist.count();
    
    return NextResponse.json({ count }, { status: 200 });
  } catch (error: any) {
    console.error("Error storing email:", error);
    
    if (error.code === "P2002") {
      const count = await prisma.waitlist.count();
      return NextResponse.json({ count }, { status: 200 });
    }
    
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
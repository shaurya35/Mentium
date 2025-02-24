// pages/api/waitlist.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email } = req.body;

      const newEntry = await prisma.waitlist.create({
        data: { email },
      });

      return res.status(200).json({
        message: "Email stored successfully",
        entry: newEntry,
      });
    } catch (error) {
      console.error("Error storing email:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ error: `Method ${req.method} Not Allowed` });
  }
}

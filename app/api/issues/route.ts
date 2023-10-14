import { NextRequest, NextResponse } from "next/server";
import { string, z } from "zod";
import prisma from "@/prisma/client";

const createIssueShchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required."),
});
export async function POST(requist: NextRequest) {
  const body = await requist.json();
  const validation = createIssueShchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}

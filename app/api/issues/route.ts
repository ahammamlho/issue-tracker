import { NextRequest, NextResponse } from "next/server";
import { string } from "zod";
import prisma from "@/prisma/client";
import { createIssueShchema } from "../../dto/issueShchema";

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

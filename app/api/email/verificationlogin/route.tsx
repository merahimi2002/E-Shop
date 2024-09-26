import TwoStepVerifivationEmail from "@/emails/TwoStepVerification";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { TwoStepVerificationSchema } from "../../validation/validationSchema";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextResponse ) {
  const body = await request.json();
  const validation = TwoStepVerificationSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  if (!process.env.SENDER_EMAIL) {
    return NextResponse.json(
      { message: "SENDER_EMAIL is not defined" },
      { status: 400 }
    );
  }

  await resend.emails.send({
    from: process.env.SENDER_EMAIL!,
    to: body.UserEmail,
    subject: "Two Step Verification Code",
    react: (
      <TwoStepVerifivationEmail
        name={body.UserName}
        VerificationCode={body.VerificationCode}
      />
    ),
  });

  return NextResponse.json({}, { status: 201 });
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import SignUpPasswordForm from "./SignUpPasswordForm";
import prisma from "@/prisma/client";


const SignUpEditPassword = async() => {
  const session = await getServerSession(authOptions);
  if (session) {
    const User = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    });
    if (!User) {
      notFound();
    }
    return <SignUpPasswordForm user={User} />;
  } else notFound();
};

export default SignUpEditPassword;

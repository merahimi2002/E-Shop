import { Html, Body, Container, Tailwind } from "@react-email/components";
import { Preview } from "@react-email/components";

interface TwoStepVerifivationEmailProps {
  name: string;
  VerificationCode: string;
}

const TwoStepVerifivationEmail = ({
  name,
  VerificationCode,
}: TwoStepVerifivationEmailProps) => {
  return (
    <Html>
      <Preview>Two Step Varification Code</Preview>
      <Tailwind>
        <Body>
          <Container className="bg-white p-8 border-solid border-4 border-[#4c00b0] rounded-2xl">
            <img
              src="https://res.cloudinary.com/eshop-project/image/upload/v1726911576/Logo_h2zpg7.png"
              alt="Logo"
              className="w-40 block m-auto h-auto object-contain bg-[#4c00b0] rounded-2xl p-2"
            />
            <h1 className="text-[#4c00b0] text-center">
              Welcome to
              <strong className="text-[#d90077]"> Electro</strong> Shop
            </h1>
            <hr className="border-[#4c00b0]" />
            <h2 className="border-t-2 border-[#4c00b0]">Hi Dear {name}</h2>
            <p className="text-xl">
              To complete your sign-in, please enter the verification code
              below:
            </p>
            <h2 className="text-[#d90077]">{VerificationCode}</h2>
            <p className="text-xl">
              This code will expire in 10 minutes. If you did not request this
              code, please ignore this email or contact our support team.
            </p>
            <h2>Thanks</h2>
            <h2 className="text-[#4c00b0]">
              <strong className="text-[#d90077]"> Electro</strong> Shop Team
            </h2>
            <hr className="border-[#4c00b0]" />
            <p className="text-xl">
              If you have any issues or did not request this, contact us
              immediately at support@electroshop.com.
            </p>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default TwoStepVerifivationEmail;

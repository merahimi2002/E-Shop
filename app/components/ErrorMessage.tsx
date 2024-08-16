import { PropsWithChildren } from "react";
import { MdError } from "react-icons/md";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return (
    <div
      role="alert"
      className="alert text-error border-error bg-base-100 w-fit p-3 mb-6"
    >
      <MdError />
      <span className="font-medium">{children}</span>
    </div>
  );
};

export default ErrorMessage;

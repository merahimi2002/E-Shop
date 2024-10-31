import { useState } from "react";
import { MdError } from "react-icons/md";
import Modals from "./Modals";

interface ModalsErrorProps {
    Message : string,
    Status : boolean
}

const ModalsError = ({ Message , Status }: ModalsErrorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(Status);
  return (
    <Modals isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="flex-center flex-row gap-2">
        <MdError className="text-3xl text-secondary"/>
        <p className="text-xl text-base-200">{Message}</p>
      </div>
    </Modals>
  );
};

export default ModalsError;

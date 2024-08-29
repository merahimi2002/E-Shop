import { IoCloseSharp } from "react-icons/io5";

interface ModalsProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modals = ({ isOpen, onClose, children }: ModalsProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const isClickOutside = event.target === event.currentTarget;

    if (isClickOutside) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-base-200 bg-opacity-35"
      onClick={handleOverlayClick}
    >
      <div className="bg-base-100 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative">
        <button
          className="absolute top-4 right-4 text-3xl text-secondary hover:text-error"
          onClick={onClose}
        >
          <IoCloseSharp />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modals;

import React from "react";
import { FiXCircle } from "react-icons/fi";

type typesProp = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<typesProp> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        isOpen ? "visible bg-black/30" : "invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-gray-900 rounded-lg shadow p-6 transition-all w-1/3 ${
          isOpen ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 py-1 px-2 border border-neutral-200 rounded-md text-gray-400 bg-white hover:bg-gray-300 hover:text-gray-600"
          onClick={onClose}
        >
          <FiXCircle size={18} color="#4F4F4F"></FiXCircle>
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;

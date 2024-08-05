import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (logoutAll: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center">
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-blue-600 rounded-lg p-6 w-full max-w-md text-white shadow-sm shadow-white">
        <h2 className="text-xl font-bold mb-4 ">Log Out</h2>
        <p className="mb-4 ">Do you want to log out of this session or all devices?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            onClick={() => onConfirm(false)}
          >
            Log Out
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
            onClick={() => onConfirm(true)}
          >
            Log Out of All Devices
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

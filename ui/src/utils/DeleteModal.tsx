import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;

  const isDeleteConfirmed = inputValue === "delete";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-blue-600 rounded-lg p-6 w-full max-w-md text-white shadow-sm shadow-white">
        <h2 className="text-lg font-bold mb-4">Warning</h2>
        <p className="mb-4">Your todos data will be lost. Type "delete" to confirm.</p>
        <input
          type="text"
          className={`border p-2 mb-4 w-full rounded-lg ${
            isDeleteConfirmed ? "text-black" : "text-red-500"
          }`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white p-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white p-2 rounded"
            onClick={() => {
              if (isDeleteConfirmed) {
                onConfirm();
                onClose();
              } else {
                alert("Please type 'delete' to confirm.");
              }
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

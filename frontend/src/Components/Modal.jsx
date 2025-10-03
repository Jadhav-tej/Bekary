import React from 'react'

function Modal({ isModelOpen, setIsModelOpen, children }) {
  if (!isModelOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Modal content */}
      <div className="relative bg-white rounded-xl text-lg shadow-lg p-6">
        {/* Close button (top-right) */}
        <button  
        // 7350318680
          onClick={() => setIsModelOpen(false)}
          className="absolute -top-1 right-2   text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;

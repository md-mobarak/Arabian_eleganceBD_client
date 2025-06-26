// import React from 'react';

// function Modal({ showModal, closeModal, children }) {
//   if (!showModal) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
//         <div className="flex justify-between">
//           <h2 className="text-xl font-semibold">Modal Title</h2>
//           <button
//             onClick={closeModal}
//             className="text-gray-500 hover:text-gray-800"
//           >
//             &times;
//           </button>
//         </div>
//         <div className="mt-4">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Modal;


import React from 'react';

function Modal({ showModal, closeModal, children }) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">User Details</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;

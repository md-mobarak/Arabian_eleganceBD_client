// "use client";
// import React from "react";

// export default function ProductModal({ isOpen, onClose, children }) {
//   return (
//     <>
//       {isOpen && (
//         <div className="modal modal-open">
//           <div className="modal-box relative">
//             <button
//               className="btn btn-sm btn-circle absolute right-2 top-2"
//               onClick={onClose}
//             >
//               ✕
//             </button>
//             {children}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


// "use client";
// import React, { useEffect, useRef } from "react";

// export default function ProductModal({ isOpen, onClose, children }) {
//   const dialogRef = useRef(null);

//   useEffect(() => {
//     if (isOpen) {
//       dialogRef.current?.showModal();
//     } else {
//       dialogRef.current?.close();
//     }
//   }, [isOpen]);

//   return (
//     <dialog ref={dialogRef} id="my_modal_1" className="modal">
//       <div className="modal-box">
//         <h3 className="font-bold text-lg">Product Modal</h3>
//         {children}
//         <div className="modal-action">
//           {/* Close button will automatically close the modal */}
//           <button className="btn" onClick={onClose}>
//             Close
//           </button>
//         </div>
//       </div>
//     </dialog>
//   );
// }


// "use client";
// import React, { useEffect, useRef } from "react";
// import { RxCross2 } from "react-icons/rx";
// export default function ProductModal({ isOpen, onClose, children }) {
//   const dialogRef = useRef(null);

//   useEffect(() => {
//     if (isOpen) {
//       dialogRef.current?.showModal();
//     } else {
//       dialogRef.current?.close();
//     }
//   }, [isOpen]);

//   return (
//     <dialog ref={dialogRef} id="my_modal_1" className="modal p-5 rounded-lg shadow-xl">
//       <div className="modal-box">
//       <div className="modal-action relative">
//           <button className="btn  btn-sm btn-circle absolute right-0 top-1" onClick={onClose}>
//             {/* Close */}
//             <RxCross2 className="text-2xl text-red-500 border border-black rounded-xl" />
//           </button>
//         </div>

   
//         <h3 className="font-bold text-lg mb-4">Product Modal</h3>
//         {children}
      
//       </div>
//     </dialog>
//   );
// }

"use client";
import React, { useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";

export default function ProductModal({ isOpen, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className="modal p-5 rounded-lg shadow-xl">
      <div className="modal-box w-full h-screen">
        <div className="modal-action relative">
          <button
            className="btn btn-sm btn-circle absolute right-0 top-1"
            onClick={onClose}
          >
            <RxCross2 className="text-2xl text-red-500 border border-black rounded-xl" />
          </button>
        </div>
        <h3 className="font-bold text-lg mb-4">Product Modal</h3>
        {children}
      </div>
    </dialog>
  );
}

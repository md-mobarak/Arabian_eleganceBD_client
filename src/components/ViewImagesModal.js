"use client";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

const ViewImagesModal = ({ isOpen, onClose, images, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title} Images</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <RxCross2 size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto">
          {images.map((img, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={img}
                alt={`Product Image ${index + 1}`}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewImagesModal;
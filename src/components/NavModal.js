// // components/NavModal.jsx
// import React, { useEffect, useState, useRef } from 'react';
// import NavCard from './NavCard';
// import { FaTimes, FaSearch } from 'react-icons/fa';
// import { baseUrl } from '@/utils/api';
// import Link from 'next/link';


// const NavModal = ({ isOpen, onClose }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const modalRef = useRef(null);

//   // Fetch products based on search term
//   useEffect(() => {
//     if (!isOpen) return;
    
//     const fetchProducts = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(
//           `${baseUrl}/api/v1/product?title=${(searchTerm)}`
//         );
//         const data = await response.json();
//         setProducts(data.products || []);
//       } catch (error) {
//         console.error('Search error:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const timer = setTimeout(() => {
//       if (searchTerm.trim() !== '') {
//         fetchProducts();
//       } else {
//         // Show all products when search is empty
//         fetch(`${baseUrl}/product`)
//           .then(res => res.json())
//           .then(data => setProducts(data.products || []));
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchTerm, isOpen]);

//   // Close modal on ESC key
//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === 'Escape') onClose();
//     };

//     document.addEventListener('keydown', handleEsc);
//     return () => document.removeEventListener('keydown', handleEsc);
//   }, [onClose]);

//   // Close modal when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         onClose();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [onClose]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
//       <div 
//         ref={modalRef}
//         className="bg-white rounded-xl w-full max-w-4xl max-h-[80vh] flex flex-col shadow-xl"
//       >
//         {/* Search Header */}
//         <div className="p-4 border-b">
//           <div className="flex items-center">
//             <div className="relative flex-grow">
//               <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 autoFocus
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search products..."
//                 className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
//               />
//             </div>
//             <button 
//               onClick={onClose}
//               className="ml-4 text-gray-500 hover:text-gray-700"
//             >
//               <FaTimes size={24} />
//             </button>
//           </div>
//         </div>

//         {/* Results Container */}
//         <div className="overflow-y-auto flex-grow">
//           {isLoading ? (
//             <div className="flex justify-center p-8">
//               <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
//             </div>
//           ) : products.length === 0 ? (
//             <div className="text-center py-12 text-gray-500">
//               No products found. Try a different search term.
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
//               {products.slice(0, 8).map(product => (
//                 <NavCard key={product._id} product={product} />
//                 // <Card key={product._id} product={product} />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="p-4 bg-gray-50 border-t text-center">
//           <Link 
//             href={`/shop`} 
//             className="text-orange-500 hover:text-orange-600 font-medium"
//             onClick={onClose}
//           >
//             View all search results
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavModal;


// // components/NavModal.jsx
// import React, { useEffect, useState, useRef } from 'react';
// import NavCard from './NavCard';
// import { FaTimes, FaSearch } from 'react-icons/fa';
// import { baseUrl } from '@/utils/api';
// import Link from 'next/link';
// import { SkeletonLoader } from '@/pages/shop';

// const NavModal = ({ isOpen, onClose }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const modalRef = useRef(null);

//   // Fetch products based on search term
//   useEffect(() => {
//     if (!isOpen) return;
    
//     const fetchProducts = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(
//           `${baseUrl}/api/v1/product?title=${encodeURIComponent(searchTerm)}`
//         );
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           throw new Error('Response is not JSON');
//         }
        
//         const data = await response.json();
//         setProducts(data.products || []);
//       } catch (error) {
//         console.error('Search error:', error);
//         setError(error.message);
//         setProducts([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const timer = setTimeout(() => {
//       if (searchTerm.trim() !== '') {
//         fetchProducts();
//       } else {
//         // Show all products when search is empty
//         fetch(`${baseUrl}/product`)
//           .then(res => {
//             if (!res.ok) throw new Error('Failed to fetch products');
//             return res.json();
//           })
//           .then(data => setProducts(data.products || []))
//           .catch(err => {
//             console.error('Error fetching all products:', err);
//             setError(err.message);
//           });
//       }
//     }, 500); // Increased debounce time to 500ms

//     return () => clearTimeout(timer);
//   }, [searchTerm, isOpen]);



// //   useEffect(() => {
// //     if (!isOpen) return;
    
// //     const fetchProducts = async () => {
// //       setIsLoading(true);
// //       setError(null);
// //       try {
// //         // Build URL with correct query parameter
// //         const url = new URL(`${baseUrl}/api/v1/product`);
// //         if (searchTerm.trim() !== '') {
// //           url.searchParams.append('search', searchTerm);
// //         }

// //         const response = await fetch(url);
        
// //         if (!response.ok) {
// //           throw new Error(`HTTP error! status: ${response.status}`);
// //         }
        
// //         const contentType = response.headers.get('content-type');
// //         if (!contentType || !contentType.includes('application/json')) {
// //           throw new Error('Response is not JSON');
// //         }
        
// //         const data = await response.json();
// //         setProducts(data.products || []);
// //       } catch (error) {
// //         console.error('Search error:', error);
// //         setError(error.message);
// //         setProducts([]);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     const timer = setTimeout(fetchProducts, 500);
// //     return () => clearTimeout(timer);
// //   }, [searchTerm, isOpen]);

  
//   // Close modal on ESC key
//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === 'Escape') onClose();
//     };

//     document.addEventListener('keydown', handleEsc);
//     return () => document.removeEventListener('keydown', handleEsc);
//   }, [onClose]);

//   // Close modal when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         onClose();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [onClose]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
//       <div 
//         ref={modalRef}
//         className="bg-white rounded-xl w-full max-w-4xl max-h-[80vh] flex flex-col shadow-xl"
//       >
//         {/* Search Header */}
//         <div className="p-4 border-b">
//           <div className="flex items-center">
//             <div className="relative flex-grow">
//               <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 autoFocus
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search products..."
//                 className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
//               />
//             </div>
//             <button 
//               onClick={onClose}
//               className="ml-4 text-gray-500 hover:text-gray-700"
//             >
//               <FaTimes size={24} />
//             </button>
//           </div>
//         </div>

//         {/* Results Container */}
//         <div className="overflow-y-auto flex-grow">
//           {error ? (
//             <div className="text-center py-12 text-red-500">
//               Error: {error}. Please try again.
//             </div>
//           ) : isLoading ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
//               {Array.from({ length: 8 }).map((_, index) => (
//                 <SkeletonLoader key={index} />
//               ))}
//             </div>
//           ) : products.length === 0 ? (
//             <div className="text-center py-12 text-gray-500">
//               {searchTerm.trim() ? 
//                 'No products found. Try a different search term.' : 
//                 'No products available.'}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
//               {products.slice(0, 8).map(product => (
//                 <NavCard key={product._id} product={product} />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="p-4 bg-gray-50 border-t text-center">
//           <Link 
//             href={`/shop${searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ''}`} 
//             className="text-orange-500 hover:text-orange-600 font-medium"
//             onClick={onClose}
//           >
//             View all search results
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavModal;

// components/NavModal.jsx
import React, { useEffect, useState, useRef } from 'react';
import NavCard from './NavCard';
import { FaTimes, FaSearch } from 'react-icons/fa';
import { baseUrl } from '@/utils/api';
import Link from 'next/link';
import { SkeletonLoader } from '@/pages/shop';

const NavModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef(null);

  // Fetch products based on search term
  useEffect(() => {
    if (!isOpen) return;
    
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Build URL with correct endpoint and parameters
        const url = new URL(`${baseUrl}/product`);
        
        // Add search parameter only if searchTerm is not empty
        if (searchTerm.trim() !== '') {
          url.searchParams.append('search', searchTerm);
        }
        
        // Add limit to get sufficient results
        url.searchParams.append('limit', '50');

        const response = await fetch(url);
        console.log(response)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }
        
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Search error:', error);
        setError(error.message);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchProducts, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, isOpen]);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl w-full max-w-4xl max-h-[80vh] flex flex-col shadow-xl"
      >
        {/* Search Header */}
        <div className="p-4 border-b">
          <div className="flex items-center">
            <div className="relative flex-grow">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
            <button 
              onClick={onClose}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>
          </div>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto flex-grow">
          {error ? (
            <div className="text-center py-12 text-red-500">
              Error: {error}. Please try again.
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonLoader key={index} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {searchTerm.trim() ? 
                'No products found. Try a different search term.' : 
                'No products available.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
              {products.slice(0, 8).map(product => (
                <NavCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t text-center">
          <Link 
            href={`/shop?search=${encodeURIComponent(searchTerm)}`} 
            className="text-orange-500 hover:text-orange-600 font-medium"
            onClick={onClose}
          >
            View all search results
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavModal;
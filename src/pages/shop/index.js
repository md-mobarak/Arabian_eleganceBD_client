
// "use client";
// import React, { useState, useEffect } from 'react';
// import { GiPriceTag } from 'react-icons/gi';
// import { FaFilter } from 'react-icons/fa';
// import { MdClose } from 'react-icons/md';
// import { useQuery } from '@tanstack/react-query';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import Card from '@/components/Card';
// import { baseUrl } from '@/utils/api';
// // import { baseUrl } from '@/utils/api';

// const SkeletonLoader = () => (
//   <div className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
//     <div className="bg-gray-200 h-64 w-full" />
//     <div className="p-4 space-y-3">
//       <div className="h-4 bg-gray-200 rounded w-3/4" />
//       <div className="flex space-x-2">
//         <div className="h-4 bg-gray-200 rounded w-1/4" />
//         <div className="h-4 bg-gray-200 rounded w-1/4" />
//       </div>
//       <div className="flex justify-between">
//         <div className="h-8 bg-gray-200 rounded-full w-24" />
//         <div className="h-8 bg-gray-200 rounded-full w-24" />
//       </div>
//     </div>
//   </div>
// );

// const Shop = () => {
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     search: '',
//     category: '',
//     minPrice: '',
//     maxPrice: '',
//     page: 1,
//     limit: 12,
//   });

//   const [categories, setCategories] = useState([]);

//   // Fetch categories from backend
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch(`${baseUrl}/category`);
//         if (!response.ok) throw new Error('Failed to fetch categories');
//         const { categories } = await response.json();
//         setCategories([{ _id: '', name: 'All Products' }, ...categories]);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch products with filters
//   const fetchProducts = async () => {
//     const params = new URLSearchParams({
//       ...filters,
//       page: filters.page.toString(),
//       limit: filters.limit.toString()
//     });
    
//     const response = await fetch(`${baseUrl}/product?${params}`);
//     if (!response.ok) throw new Error('Failed to fetch products');
//     return response.json();
//   };

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['products', filters],
//     queryFn: fetchProducts,
//     keepPreviousData: true,
//   });

//   // Handle filter changes
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
//   };

//   // Handle category selection
//   const handleCategoryClick = (categoryId) => {
//     setFilters(prev => ({ ...prev, category: categoryId, page: 1 }));
//   };

//   // Pagination controls
//   const handlePageChange = (pageNumber) => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     setFilters(prev => ({ ...prev, page: pageNumber }));
//   };

//   // Responsive pagination render
//   const renderPagination = () => {
//     if (!data?.totalPages) return null;
    
//     const totalPages = data.totalPages;
//     const visiblePages = [];
//     const maxVisible = 5;

//     let start = Math.max(1, filters.page - Math.floor(maxVisible / 2));
//     let end = Math.min(totalPages, start + maxVisible - 1);

//     if (end - start < maxVisible - 1) {
//       start = Math.max(1, end - maxVisible + 1);
//     }

//     for (let i = start; i <= end; i++) {
//       visiblePages.push(i);
//     }

//     return (
//       <div className="mt-8 flex flex-wrap justify-center gap-2">
//         <button
//           onClick={() => handlePageChange(filters.page - 1)}
//           disabled={filters.page === 1}
//           className="px-4 py-2 bg-orange-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-700 transition-colors"
//         >
//           Previous
//         </button>

//         {start > 1 && (
//           <button
//             onClick={() => handlePageChange(1)}
//             className={`px-4 py-2 rounded-md border ${
//               1 === filters.page 
//                 ? 'bg-orange-600 text-white border-orange-600' 
//                 : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-50'
//             }`}
//           >
//             1
//           </button>
//         )}

//         {start > 2 && <span className="px-4 py-2">...</span>}

//         {visiblePages.map(pageNumber => (
//           <button
//             key={pageNumber}
//             onClick={() => handlePageChange(pageNumber)}
//             className={`px-4 py-2 rounded-md border transition-colors ${
//               filters.page === pageNumber
//                 ? 'bg-orange-600 text-white border-orange-600'
//                 : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-50'
//             }`}
//           >
//             {pageNumber}
//           </button>
//         ))}

//         {end < totalPages - 1 && <span className="px-4 py-2">...</span>}

//         {end < totalPages && (
//           <button
//             onClick={() => handlePageChange(totalPages)}
//             className={`px-4 py-2 rounded-md border ${
//               totalPages === filters.page 
//                 ? 'bg-orange-600 text-white border-orange-600' 
//                 : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-50'
//             }`}
//           >
//             {totalPages}
//           </button>
//         )}

//         <button
//           onClick={() => handlePageChange(filters.page + 1)}
//           disabled={filters.page === totalPages}
//           className="px-4 py-2 bg-orange-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-700 transition-colors"
//         >
//           Next
//         </button>
//       </div>
//     );
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-50">
//         {/* Mobile Filter Toggle */}
//         <button
//           onClick={() => setIsFilterOpen(!isFilterOpen)}
//           className="lg:hidden fixed bottom-6 right-6 z-50 bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-700 transition-colors"
//         >
//           {isFilterOpen ? <MdClose size={24} /> : <FaFilter size={24} />}
//         </button>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="flex gap-8">
//             {/* Filter Sidebar */}
//             <aside
//               className={`w-64 bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 fixed lg:static lg:translate-x-0 z-40 h-[calc(100vh-4rem)] lg:h-auto overflow-y-auto ${
//                 isFilterOpen ? 'translate-x-0' : '-translate-x-full'
//               }`}
//             >
//               <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-gray-800">
//                 <GiPriceTag className="text-orange-600" /> Filters
//               </h2>

//               {/* Categories Section */}
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold mb-4 text-gray-700">Categories</h3>
//                 <div className="space-y-2">
//                   {categories.map(category => (
//                     <button
//                       key={category._id}
//                       onClick={() => handleCategoryClick(category._id)}
//                       className={`w-full text-left p-3 rounded-md transition-colors duration-200 ${
//                         filters.category === category._id
//                           ? 'bg-orange-600 text-white'
//                           : 'bg-gray-50 text-gray-600 hover:bg-orange-100'
//                       }`}
//                     >
//                       {category.name}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Filter */}
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold mb-4 text-gray-700">Price Range</h3>
//                 <div className="flex gap-3">
//                   <input
//                     type="number"
//                     name="minPrice"
//                     value={filters.minPrice}
//                     onChange={handleFilterChange}
//                     placeholder="Min"
//                     className="w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                   />
//                   <input
//                     type="number"
//                     name="maxPrice"
//                     value={filters.maxPrice}
//                     onChange={handleFilterChange}
//                     placeholder="Max"
//                     className="w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                   />
//                 </div>
//               </div>

//               {/* Search Filter */}
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold mb-4 text-gray-700">Search</h3>
//                 <input
//                   type="text"
//                   name="search"
//                   value={filters.search}
//                   onChange={handleFilterChange}
//                   placeholder="Search products..."
//                   className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                 />
//               </div>
//             </aside>

//             {/* Main Content Area */}
//             <main className="flex-1 lg:ml-4">
//               {/* Product Grid */}
//               {isLoading ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                   {Array.from({ length: filters.limit }).map((_, i) => (
//                     <SkeletonLoader key={i} />
//                   ))}
//                 </div>
//               ) : isError ? (
//                 <div className="text-center py-12">
//                   <p className="text-red-500 text-lg">Failed to load products. Please try again later.</p>
//                 </div>
//               ) : data?.products?.length > 0 ? (
//                 <>
//                 <div className='flex justify-center items-center lg:block md:block'>
//                 <div className="grid grid-cols-1  space-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
//                     {data.products.map((product) => (
//                       <Card
//                         key={product._id}
//                         product={{
//                           ...product,
//                           name: product.title,
//                           img: product.images[0],
//                           price: product.price,
//                           oldPrice: Math.round(product.price * 1.2),
//                           discount: '20% Off'
//                         }}
//                       />
//                     ))}
//                   </div>
//                 </div>
//                   {renderPagination()}
//                 </>
//               ) : (
//                 <div className="text-center py-12">
//                   <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
//                 </div>
//               )}
//             </main>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Shop;

"use client";
import React, { useState } from 'react';
import { GiPriceTag } from 'react-icons/gi';
import { FaFilter } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import { baseUrl } from '@/utils/api';

export const SkeletonLoader = () => (
  <div className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
    <div className="bg-gray-200 h-64 w-full" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="flex space-x-2">
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
      <div className="flex justify-between">
        <div className="h-8 bg-gray-200 rounded-full w-24" />
        <div className="h-8 bg-gray-200 rounded-full w-24" />
      </div>
    </div>
  </div>
);

const Shop = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    page: 1,
    limit: 12,
  });

  // Fetch categories with React Query
  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/category`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  // Process categories data
  const categories = categoriesData?.categories 
    ? [{ _id: '', name: 'All Products' }, ...categoriesData.categories]
    : [];

  // Fetch products with React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        ...filters,
        page: filters.page.toString(),
        limit: filters.limit.toString()
      });
      
      const response = await fetch(`${baseUrl}/product?${params}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch products');
      }
      return response.json();
    },
    keepPreviousData: true,
    retry: 2,
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
  };

  const handleCategoryClick = (categoryId) => {
    setFilters(prev => ({ ...prev, category: categoryId, page: 1 }));
  };

  const handlePageChange = (pageNumber) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setFilters(prev => ({ ...prev, page: pageNumber }));
  };

  const renderPagination = () => {
    if (!data?.totalPages) return null;
    
    const totalPages = data.totalPages;
    const visiblePages = [];
    const maxVisible = 5;

    let start = Math.max(1, filters.page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    return (
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => handlePageChange(filters.page - 1)}
          disabled={filters.page === 1}
          className="px-4 py-2 bg-orange-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-700 transition-colors"
        >
          Previous
        </button>

        {start > 1 && (
          <button
            onClick={() => handlePageChange(1)}
            className={`px-4 py-2 rounded-md border ${
              1 === filters.page 
                ? 'bg-orange-600 text-white border-orange-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-50'
            }`}
          >
            1
          </button>
        )}

        {start > 2 && <span className="px-4 py-2">...</span>}

        {visiblePages.map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-4 py-2 rounded-md border transition-colors ${
              filters.page === pageNumber
                ? 'bg-orange-600 text-white border-orange-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-50'
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {end < totalPages - 1 && <span className="px-4 py-2">...</span>}

        {end < totalPages && (
          <button
            onClick={() => handlePageChange(totalPages)}
            className={`px-4 py-2 rounded-md border ${
              totalPages === filters.page 
                ? 'bg-orange-600 text-white border-orange-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-50'
            }`}
          >
            {totalPages}
          </button>
        )}

        <button
          onClick={() => handlePageChange(filters.page + 1)}
          disabled={filters.page === totalPages}
          className="px-4 py-2 bg-orange-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-700 transition-colors"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Error Display */}
        {(categoriesError || isError) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 mx-4">
            <strong>Error: </strong>
            {categoriesError?.message || error?.message}
          </div>
        )}

        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-700 transition-colors"
        >
          {isFilterOpen ? <MdClose size={24} /> : <FaFilter size={24} />}
        </button>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <aside
              className={`w-64 bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 fixed lg:static lg:translate-x-0 z-40 h-[calc(100vh-4rem)] lg:h-auto overflow-y-auto ${
                isFilterOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-gray-800">
                <GiPriceTag className="text-orange-600" /> Filters
              </h2>

              {/* Categories Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Categories</h3>
                <div className="space-y-2">
                  {categoriesLoading ? (
                    Array(5).fill(0).map((_, i) => (
                      <div key={i} className="h-10 bg-gray-200 rounded-md animate-pulse" />
                    ))
                  ) : (
                    categories.map(category => (
                      <button
                        key={category._id}
                        onClick={() => handleCategoryClick(category._id)}
                        className={`w-full text-left p-3 rounded-md transition-colors duration-200 ${
                          filters.category === category._id
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-50 text-gray-600 hover:bg-orange-100'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Price Range</h3>
                <div className="flex gap-3">
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Min"
                    className="w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max"
                    className="w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Search Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Search</h3>
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search products..."
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-4">
              {/* Product Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: filters.limit }).map((_, i) => (
                    <SkeletonLoader key={i} />
                  ))}
                </div>
              ) : data?.products?.length > 0 ? (
                <>
                  <div className='flex justify-center items-center lg:block md:block'>
                    <div className="grid grid-cols-1 space-y-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                      {data.products.map((product) => (
                        <Card
                          key={product._id}
                          product={{
                            ...product,
                            name: product.title,
                            img: product.images[0],
                            price: product.price,
                            oldPrice: Math.round(product.price * 1.2),
                            discount: '20% Off'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  {renderPagination()}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;
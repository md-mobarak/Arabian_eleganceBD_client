
"use client";
import React, { useState, useEffect } from 'react';
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

const  Caps = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tShirtCategoryId, setTShirtCategoryId] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    minPrice: '',
    maxPrice: '',
    page: 1,
    limit: 12,
  });

  // Fetch categories to get T-Shirts ID
  const { data: categoriesData, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/category`);
      if (!response.ok) throw new Error(`Failed to fetch categories: ${response.status}`);
      return response.json();
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  // Set T-Shirts category ID once categories load
  useEffect(() => {
    if (categoriesData?.categories) {
      const tShirtCategory = categoriesData.categories.find(
        cat => cat.name.toLowerCase() === 'caps'
      );
      
      if (tShirtCategory) {
        setTShirtCategoryId(tShirtCategory._id);
      } else {
        console.error("T-Shirts category not found");
      }
    }
  }, [categoriesData]);

  // Fetch products with T-Shirts filter
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', filters, tShirtCategoryId],
    queryFn: async () => {
      // Don't fetch until we have category ID
      if (!tShirtCategoryId) return { products: [], total: 0, totalPages: 0 };
      
      const params = new URLSearchParams({
        ...filters,
        category: tShirtCategoryId,
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
    enabled: !!tShirtCategoryId, // Only fetch when category ID is available
    keepPreviousData: true,
    retry: 2,
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
  };

  const handlePageChange = (pageNumber) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setFilters(prev => ({ ...prev, page: pageNumber }));
  };

  const renderPagination = () => {
    if (!data?.totalPages || data.totalPages <= 1) return null;
    
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
        {/* Combined error display */}
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
              {/* Show loading while fetching category */}
              {!tShirtCategoryId && !categoriesError && !isLoading && (
                <div className="text-center py-12">
                  <p>Loading T-Shirts...</p>
                </div>
              )}

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
                </>
              ) : tShirtCategoryId ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No T-Shirts found matching your criteria.</p>
                </div>
              ) : null}
              
              {/* PAGINATION - Moved outside product grid condition */}
              {!isLoading && data?.totalPages > 1 && renderPagination()}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Caps;
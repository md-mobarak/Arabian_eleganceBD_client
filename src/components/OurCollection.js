// import React, { useEffect, useRef, useState } from 'react';
// import { GiBeveledStar } from 'react-icons/gi';
// import Card from './Card';
// import { SkeletonLoader } from '@/pages/shop';
// import { baseUrl } from '@/utils/api';
// import { useQuery } from '@tanstack/react-query';

// function StylishCard() {
//   // Define filters with default values

//   // Fetch products with React Query
//   // const { data, isLoading, isError, error } = useQuery({
//   //   queryKey: ['products'],
//   //   queryFn: async () => {
//   //     const params = new URLSearchParams({

        
//   //     });
      
//   //     const response = await fetch(`${baseUrl}/product`);
//   //     if (!response.ok) {
//   //       const errorData = await response.json();
//   //       throw new Error(errorData.message || 'Failed to fetch products');
//   //     }
//   //     return response.json();
//   //   },
 
//   // });
//     const [data, setData] = useState([]);


//     useEffect(() => {
//         fetch(`${baseUrl}/product`)
//             .then(res => res.json())
//             .then(data => {
//                  setData(data)
//             })
//     }, [])
//  console.log(data)


//   return (
//     <div className="my-8 lg:px-12 px-8">
//       <div className='grid grid-cols-2 gap-5 lg:my-16'>
//         <div className='my-5'>
//           <div className='flex items-center'>
//             <GiBeveledStar className='text-pink-700 font-bold text-xl' />
//             <p className='font-serif lg:font-semibold text-pink-700 ml-1'>
//               Feature Products
//             </p>
//           </div>
//           <h2 className="lg:text-4xl text-xl font-bold text-gray-600 font-serif">
//             Our Features Collection
//           </h2>
//         </div>
//       </div>

//       <div className='flex justify-center items-center lg:block'>
//         {/* Loading state */}
//         {/* {isLoading && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
//             {Array.from({ length: data }).map((_, i) => (
//               <SkeletonLoader key={i} />
//             ))}
//           </div>
//         )} */}

//         {/* Error state */}
//         {/* {isError && (
//           <div className="text-center py-12">
//             <p className="text-red-600 text-lg">
//               Error: {error.message || 'Failed to load products'}
//             </p>
//           </div>
//         )} */}

//         {/* Success state */}
//         { data?.products?.length > 0 && (
//           <div className='flex justify-center items-center '>
//             <div className=" grid grid-cols-1 space-y-4 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4">
//               {data.products.map((product, index) => (
//                 <div 
//                   key={product._id}
               
//                 >
//                   <Card
//                     product={{
//                       ...product,
//                       name: product.title,
//                       img: product.images[0],
//                       price: product.price,
//                       oldPrice: Math.round(product.price * 1.2),
//                       discount: '20% Off'
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Empty state */}
//         {/* {!isLoading && !isError && (!data?.products || data.products.length === 0) && (
//           <div className="text-center py-12">
//             <p className="text-gray-600 text-lg">
//               No products found matching your criteria.
//             </p>
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// }

// export default StylishCard;

import React, { useEffect, useRef, useState } from 'react';
import { GiBeveledStar } from 'react-icons/gi';
import Card from './Card';
import { SkeletonLoader } from '@/pages/shop';
import { baseUrl } from '@/utils/api';

function StylishCard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    fetch(`${baseUrl}/product`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="my-8 lg:px-12 px-8">
      <div className='grid grid-cols-2 gap-5 lg:my-16'>
        <div className='my-5'>
          <div className='flex items-center'>
            <GiBeveledStar className='text-pink-700 font-bold text-xl' />
            <p className='font-serif lg:font-semibold text-pink-700 ml-1'>
              Feature Products
            </p>
          </div>
          <h2 className="lg:text-4xl text-xl font-bold text-gray-600 font-serif">
            Our Features Collection
          </h2>
        </div>
      </div>

      <div className='flex justify-center items-center lg:block'>
        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 space-y-4 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex flex-col h-full">
                <SkeletonLoader />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">
              Error: {error}
            </p>
          </div>
        )}

        {/* Success state */}
        {!isLoading && !error && data?.products?.length > 0 && (
          <div className='flex justify-center items-center '>
            <div className=" grid grid-cols-1 space-y-4 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4">
              {data?.products?.map((product, index) => (
                <div key={product._id}>
                  <Card
                    product={{
                      ...product,
                      id:product._id,
                      name: product.title,
                      img: product.images[0],
                      price: product.price,
                      oldPrice: Math.round(product.price * 1.2),
                      discount: '20% Off'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && (!data?.products || data.products.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No products found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StylishCard;
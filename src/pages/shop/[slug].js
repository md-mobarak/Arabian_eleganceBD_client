
'use client';
import { useParams, useRouter } from 'next/navigation';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from '@tanstack/react-query';
import { baseUrl } from '@/utils/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GiBeveledStar } from "react-icons/gi";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoMdStar } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard, Autoplay, Thumbs, FreeMode } from "swiper/modules";

const ProductDetails = () => {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState('');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const params = useParams();
  
  // Fetch product data
  const { data: productData, isLoading } = useQuery({
    queryKey: ['product', params?.slug],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/product/${params?.slug}`);
      return res.json();
    }
  });

  // Fetch related products
  const { data: relatedProducts } = useQuery({
    queryKey: ['related-products', productData?.data?.category],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/product?category=${productData?.data?.category}&limit=5`);
      return res.json();
    },
    enabled: !!productData?.data
  });

  const product = productData?.data;
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Cart handling
  const handleCartAction = (actionType) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = {
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity: 1
    };

    const existingIndex = cart.findIndex(i => 
      i._id === item._id && 
      i.size === item.size && 
      i.color === item.color
    );

    if(existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
    if(actionType === 'buyNow') {
      router.push('/checkout');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton height={500} className="rounded-xl" />
            <div className="flex gap-2">
              {[1,2,3,4].map((_, i) => (
                <Skeleton key={i} height={80} width={80} className="rounded-lg" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton width={300} height={40} />
            <Skeleton width={200} height={30} />
            <div className="flex gap-2">
              {[1,2,3].map((_, i) => (
                <Skeleton key={i} width={60} height={40} className="rounded-md" />
              ))}
            </div>
            <Skeleton height={100} />
            <Skeleton width={120} height={50} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Mobile Product Title - Only shown on small screens */}
        <div className="md:hidden mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{product?.title}</h1>
          <div className="text-2xl font-semibold text-primary mt-1">
            ${product?.price}
            {product?.discount > 0 && (
              <span className="ml-3 text-lg text-gray-500 line-through">
                ${Math.round(product?.price / (1 - product?.discount/100))}
              </span>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 px-4 sm:px-0">
          {/* Image Gallery Section */}
          <div className="space-y-4">
            {/* Main Image Swiper */}
            <Swiper
              navigation
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }} 
              modules={[Navigation, Thumbs]}
              className="rounded-xl shadow-lg"
            >
              {product?.images?.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="relative aspect-square bg-gray-50">
                    <Image
                      src={img}
                      alt={`${product.title} - Image ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      quality={80}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnails Carousel */}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={12}
              slidesPerView={4}
              freeMode
              watchSlidesProgress
              modules={[FreeMode, Thumbs]}
              className="mt-4"
              breakpoints={{
                0: {
                  slidesPerView: 3,
                  spaceBetween: 8
                },
                640: {
                  slidesPerView: 4,
                  spaceBetween: 12
                }
              }}
            >
              {product?.images?.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="relative aspect-square cursor-pointer border-2 rounded-lg overflow-hidden">
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Desktop Product Title - Hidden on mobile */}
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold text-gray-900">{product?.title}</h1>
              <div className="text-2xl font-semibold text-primary mt-1">
                ${product?.price}
                {product?.discount > 0 && (
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    ${Math.round(product?.price / (1 - product?.discount/100))}
                  </span>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {product?.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      selectedSize === size
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            {product?.colors?.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Select Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product?.colors?.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor === color 
                          ? 'border-primary ring-2 ring-offset-2 ring-primary'
                          : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleCartAction('add')}
                className={`flex-1 py-3 rounded-lg font-medium bg-orange-600 hover:bg-orange-700 text-white`}
              >
                {product?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button
                onClick={() => handleCartAction('buyNow')}
                className={`flex-1 py-3 rounded-lg font-medium bg-black hover:bg-gray-800 text-white`}
              >
                Buy Now
              </button>
            </div>

            {/* Product Details */}
            <div className="space-y-4 pt-4 border-t">
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-600 text-base md:text-xl">{product?.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <dt className="font-medium">Category</dt>
                  <dd className="text-gray-600">{product?.category?.name}</dd>
                </div>
                <div className="space-y-1">
                  <dt className="font-medium">Brand</dt>
                  <dd className="text-gray-600">{product?.brand || 'N/A'}</dd>
                </div>
                <div className="space-y-1">
                  <dt className="font-medium">Stock</dt>
                  <dd className={product?.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {product?.stock > 0 ? `${product?.stock} Available` : 'Out of Stock'}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts?.products?.length > 0 && 
          <div className="my-10 lg:my-20 px-4 sm:px-6 lg:px-10">
            <div className="relative mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className='flex items-center'>
                    <GiBeveledStar className='text-pink-700 font-bold text-xl' />
                    <p className='font-serif font-semibold text-pink-700 ml-2'>Categories</p>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-600 font-serif">Related Products</h1>
                </div>
                
                {/* Custom Navigation Buttons */}
                <div className="flex justify-center space-x-4">
                  <button
                    ref={prevRef}
                    className="bg-black text-white p-2 w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md hover:bg-gray-700 transition-all duration-500"
                  >
                    <GoArrowLeft className="text-xl md:text-2xl" />
                  </button>
                  <button
                    ref={nextRef}
                    className="bg-black text-white p-2 w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md hover:bg-gray-700 transition-all duration-500"
                  >
                    <GoArrowRight className="text-xl md:text-2xl" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Related Products Swiper */}
            <Swiper
              spaceBetween={20}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onSwiper={(swiper) => {
                if (prevRef.current && nextRef.current) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              }}
              modules={[Navigation, Mousewheel, Keyboard, Autoplay]}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                480: {
                  slidesPerView: 1.5,
                },
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 2.5,
                },
                1024: {
                  slidesPerView: 3,
                },
                1280: {
                  slidesPerView: 4,
                }
              }}
              className="related-products-swiper"
            >
              {relatedProducts?.products?.map((product, index) => (
                <SwiperSlide key={index}>
                  <div 
                    onClick={() => router.push(`/shop/${product._id}`)}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-48 md:h-56">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.title}</h3>
                      <div className="flex items-center mt-2">
                        {Array(5).fill(0).map((_, i) => (
                          <IoMdStar
                            key={i}
                            className={`text-lg ${i < Math.floor(product.rating) ? "text-pink-600" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="text-gray-600 text-sm ml-1">({product.ratingCount || 80})</span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div>
                          <p className="text-xl font-bold text-gray-800">${product.price}</p>
                          {product.discount > 0 && (
                            <p className="text-gray-500 line-through">
                              ${Math.round(product.price / (1 - product.discount/100))}
                            </p>
                          )}
                        </div>
                        <button className="bg-black text-white px-3 py-1.5 rounded-md text-sm hover:bg-gray-800 transition-colors">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        }
      </main>
      <Footer />
    </>
  );
};

export default ProductDetails;
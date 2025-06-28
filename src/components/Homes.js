"use client";
import React from 'react'
import HeroSection from './HeroSection'
import ScrollingText from './ScrollingText'
import StayingProduct from './StayingProduct'
// import CategoryHighlights from './CategoryHighlights'
import UpToProduct from './UpToProduct'
import OurCollection from './OurCollection'
import WorkProcessing from './WorkProcessing'
import TrendingProducts from './TrendingProducts'
import Testimonials from './Testimonials'
import OfferCard from './OfferCard'
import Blogs from './Blogs'
import OurNewsletter from './OurNewsletter'
import BlogDetails from './BlogDetails'
// import CartDrawer from './CartDrawer'
import dynamic from 'next/dynamic';
// import React from 'react';

const CartDrawer = dynamic(
  () => import('../components/CartDrawer'),
  { ssr: false } // Server-side rendering বন্ধ করুন
);
// const CategoryHighlights = dynamic(
//   () => import('./CategoryHighlights'),
//   { ssr: false } // Server-side rendering বন্ধ করুন
// );
const CategoryHighlights = dynamic(() => import("./CategoryHighlights").then(mod => mod.default), { 
  ssr: false 
});



function Homes() {
  return (
    <div className=''>
    <CartDrawer></CartDrawer>
    <HeroSection></HeroSection>
    <ScrollingText ></ScrollingText>
    <StayingProduct></StayingProduct>
    <CategoryHighlights></CategoryHighlights>
    <UpToProduct></UpToProduct>
    <OurCollection></OurCollection>
    <WorkProcessing></WorkProcessing>
    <TrendingProducts></TrendingProducts>
    <OfferCard></OfferCard>
    <Testimonials></Testimonials>
<div className='bg-[#FFF7F0]'>
      <Blogs></Blogs>
  <OurNewsletter></OurNewsletter>
</div>
 
    </div>
  )
}

export default Homes
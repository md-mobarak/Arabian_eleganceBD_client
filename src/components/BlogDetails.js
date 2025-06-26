// "use client";

// const { Thumbs } = require("swiper")

// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
// import Image from "next/image";
// import Link from "next/link";

// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// export default function BlogDetails() {
//   const headerRef = useRef(null);
//   const contentRef = useRef(null);
//   const affiliateRef = useRef(null);
//   const imagesRef = useRef(null);

//   useEffect(() => {
//     // Header animation
//     gsap.fromTo(
//       headerRef.current,
//       { opacity: 0, y: -50 },
//       { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }
//     );

//     // Content fade-in animation
//     gsap.fromTo(
//       contentRef.current,
//       { opacity: 0, y: 50 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: contentRef.current,
//           start: "top 75%",
//         },
//       }
//     );

//     // Affiliate section animation
//     gsap.fromTo(
//       affiliateRef.current,
//       { opacity: 0, scale: 0.8 },
//       {
//         opacity: 1,
//         scale: 1,
//         duration: 1.2,
//         ease: "elastic.out(1, 0.5)",
//         scrollTrigger: {
//           trigger: affiliateRef.current,
//           start: "top 80%",
//         },
//       }
//     );

//     // Images stagger animation
//     gsap.fromTo(
//       imagesRef.current?.children || [],
//       { opacity: 0, y: 30 },
//       {
//         opacity: 1,
//         y: 0,
//         stagger: 0.2,
//         duration: 0.8,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: imagesRef.current,
//           start: "top 80%",
//         },
//       }
//     );

//     // Smooth scroll
//     const anchors = document.querySelectorAll('a[href^="#"]');
//     anchors.forEach((anchor) => {
//       anchor.addEventListener("click", function (e) {
//         e.preventDefault();
//         const targetId = this.getAttribute("href");
//         if (targetId) {
//           gsap.to(window, { duration: 1, scrollTo: targetId, ease: "power2.inOut" });
//         }
//       });
//     });
//   }, []);

//   return (
//     <article className="max-w-6xl mx-auto px-4 py-12 space-y-16">
//       {/* Header Section */}
//       <header
//         ref={headerRef}
//         className="text-center py-10 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-2xl shadow-xl text-white"
//       >
//         <h1 className="text-5xl font-bold mb-4 leading-tight">ব্লগিং মাস্টারি: কীভাবে আপনার ব্লগ ট্রাফিক বাড়াবেন</h1>
//         <p className="text-xl font-light">২০২৫ সালের জন্য প্রমাণিত কৌশল এবং টিপস</p>
//       </header>

//       {/* Images Section */}
//       <div ref={imagesRef} className="space-y-6">
//         <Image
//           src="https://html.pixelfit.agency/pesco/assets/images/blog/blog-big-1.png"
//           alt="Blog Main Image"
//           width={1200}
//           height={600}
//           className="w-full h-auto rounded-xl shadow-2xl"
//         />
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Image
//             src="https://html.pixelfit.agency/pesco/assets/images/blog/blog-sm-1.png"
//             alt="Secondary Image 1"
//             width={600}
//             height={400}
//             className="w-full h-auto rounded-xl shadow-lg"
//           />
//           <Image
//             src="https://html.pixelfit.agency/pesco/assets/images/blog/blog-sm-2.png"
//             alt="Secondary Image 2"
//             width={600}
//             height={400}
//             className="w-full h-auto rounded-xl shadow-lg"
//           />
//         </div>
//       </div>

//       {/* Blog Content */}
//       <div ref={contentRef} className="space-y-10">
//         <div className="prose prose-lg lg:prose-xl max-w-none text-gray-800">
//           <h2 className="text-3xl font-bold text-purple-700">ভূমিকা</h2>
//           <p>
//             ব্লগিং একটি আনন্দদায়ক অভিজ্ঞতা হতে পারে, কিন্তু আপনার সাইটে ট্রাফিক আনতে প্রচুর প্রচেষ্টা এবং কৌশল প্রয়োজন। এই নিবন্ধে, আমরা
//             আপনাকে আপনার ব্লগ দর্শক বৃদ্ধি এবং কার্যকরভাবে আয় করার মূল পদ্ধতিগুলি সম্পর্কে গাইড করব।
//           </p>

//           <h3 className="text-2xl font-semibold text-pink-600">ট্রাফিক কেন গুরুত্বপূর্ণ?</h3>
//           <p>
//             আপনার ব্লগে যত বেশি ট্রাফিক আসবে, তত বেশি আয় করার সুযোগ থাকবে। অ্যাফিলিয়েট মার্কেটিং, বিজ্ঞাপন স্থাপন এবং পার্টনারশিপ সবই
//             নির্ভর করে নিয়মিত এবং সক্রিয় দর্শকদের উপর।
//           </p>

//           <h3 className="text-2xl font-semibold text-pink-600">কার্যকর ট্রাফিক কৌশল</h3>
//           <ul className="list-disc pl-6">
//             <li>উচ্চতর সার্চ র‍্যাঙ্কিংয়ের জন্য SEO অপটিমাইজেশন</li>
//             <li>দর্শক সম্পৃক্ততার জন্য সোশ্যাল মিডিয়া প্রচার</li>
//             <li>অন্যান্য ব্লগার এবং ইনফ্লুয়েন্সারদের সাথে সহযোগিতা</li>
//             <li>উচ্চ-মানের, শেয়ারযোগ্য কন্টেন্ট তৈরি</li>
//           </ul>
//         </div>

//         {/* Google Ads Space */}
//         <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-8 rounded-xl shadow-inner text-center">
//           <p className="text-gray-800 font-medium text-lg mb-2">আপনার বিজ্ঞাপন এখানে</p>
//           <p className="text-gray-600">এই ব্লগে আপনার পণ্য বা পরিষেবা বিজ্ঞাপন দিন।</p>
//         </div>

//         {/* More Content */}
//         <div className="prose prose-lg lg:prose-xl max-w-none text-gray-800">
//           <h2 className="text-3xl font-bold text-purple-700">SEO অপটিমাইজেশন টিপস</h2>
//           <p>আপনার ব্লগ পোস্টগুলিকে সার্চ ইঞ্জিনের জন্য অপটিমাইজ করা অত্যন্ত গুরুত্বপূর্ণ। এখানে কিছু মূল টিপস রয়েছে:</p>
//           <ul className="list-disc pl-6">
//             <li>মূল কীওয়ার্ড নির্ধারণ করুন এবং সেগুলি আপনার শিরোনাম, মেটা বিবরণ এবং কন্টেন্টে ব্যবহার করুন</li>
//             <li>উচ্চ-মানের ব্যাকলিংক তৈরি করুন</li>
//             <li>পাঠযোগ্য URL ব্যবহার করুন</li>
//             <li>পেজ লোড স্পিড অপটিমাইজ করুন</li>
//           </ul>
//         </div>
//       </div>

//       {/* Affiliate Section */}
//       <div
//         ref={affiliateRef}
//         className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8 rounded-2xl shadow-xl"
//       >
//         <h3 className="text-2xl font-bold text-gray-800 mb-6">প্রস্তাবিত পণ্য</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
//             <h4 className="font-bold text-xl mb-2 text-purple-700">SEO টুলকিট</h4>
//             <p className="text-gray-600 mb-4">বাজারের সেরা টুল দিয়ে আপনার ব্লগ অপটিমাইজ করুন।</p>
//             <Link
//               href="https://www.amazon.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
//             >
//               Amazon-এ কিনুন
//             </Link>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
//             <h4 className="font-bold text-xl mb-2 text-pink-600">অ্যাফিলিয়েট মার্কেটিং গাইড</h4>
//             <p className="text-gray-600 mb-4">সফল অ্যাফিলিয়েট মার্কেটিংয়ের গোপন কৌশল শিখুন।</p>
//             <Link
//               href="https://www.amazon.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-300"
//             >
//               Amazon-এ কিনুন
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Conclusion */}
//       <footer className="text-center py-10 border-t border-gray-200">
//         <h4 className="text-2xl font-bold text-gray-800 mb-4">উপসংহার</h4>
//         <p className="text-gray-600 max-w-2xl mx-auto">
//           এই পদক্ষেপগুলি অনুসরণ করে আপনার ব্লগে আরও বেশি ট্রাফিক আনুন এবং অ্যাফিলিয়েট মার্কেটিংয়ের মাধ্যমে আপনার আয় সর্বোচ্চ করুন। পরীক্ষা-নিরীক্ষা চালিয়ে যান এবং ধারাবাহিক থাকুন!
//         </p>
//       </footer>
//     </article>
//   );
// }




// 2nd is 

// "use client"

// import React, { useEffect, useRef } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { gsap } from "gsap"
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
// import { motion } from "framer-motion"
// import { FaAmazon, FaBookmark, FaStar } from "react-icons/fa"
// import { IoMdShare } from "react-icons/io"
// // import { Swiper, SwiperSlide } from "swiper/react"
// // import { Navigation, Autoplay } from "swiper/modules"
// import "swiper/css"
// import "swiper/css/navigation"
// import "swiper/css/autoplay"
// import Swiper, { Autoplay, Navigation } from "swiper"
// import { SwiperSlide } from "swiper/react"

// gsap.registerPlugin(ScrollTrigger)

// export default function BlogDetails() {
//   const headerRef = useRef<HTMLDivElement>(null)
//   const contentRef = useRef<HTMLDivElement>(null)
//   const commentsRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const header = headerRef.current
//     const content = contentRef.current
//     const comments = commentsRef.current

//     if (header && content && comments) {
//       gsap.from(header, {
//         opacity: 0,
//         y: -50,
//         duration: 1,
//         ease: "power3.out",
//       })

//       gsap.from(content.children, {
//         opacity: 0,
//         y: 50,
//         stagger: 0.2,
//         duration: 0.8,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: content,
//           start: "top 80%",
//         },
//       })

//       gsap.from(comments, {
//         opacity: 0,
//         y: 50,
//         duration: 0.8,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: comments,
//           start: "top 80%",
//         },
//       })
//     }
//   }, [])

//   return (
//     <article className="max-w-6xl mx-auto px-4 py-12">
//       <header ref={headerRef} className="mb-12">
//         <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
//           The Future of AI: Transforming Industries and Everyday Life
//         </h1>
//         <div className="flex flex-wrap items-center text-gray-600 mb-4">
//           <Image
//             src="/placeholder.svg?height=40&width=40"
//             alt="Author"
//             width={40}
//             height={40}
//             className="rounded-full mr-3"
//           />
//           <span className="mr-4">By John Doe</span>
//           <span className="mr-4">Published on May 15, 2023</span>
//           <span className="flex items-center">
//             <FaStar className="text-yellow-400 mr-1" />
//             <FaStar className="text-yellow-400 mr-1" />
//             <FaStar className="text-yellow-400 mr-1" />
//             <FaStar className="text-yellow-400 mr-1" />
//             <FaStar className="text-yellow-400 mr-1" />
//             (128 reviews)
//           </span>
//         </div>
//         <div className="flex flex-wrap items-center space-x-4">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-4 py-2 bg-purple-600 text-white rounded-full flex items-center mb-2 sm:mb-0"
//           >
//             <FaBookmark className="mr-2" /> Save for later
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-4 py-2 bg-pink-600 text-white rounded-full flex items-center mb-2 sm:mb-0"
//           >
//             <IoMdShare className="mr-2" /> Share
//           </motion.button>
//         </div>
//       </header>

//       <div ref={contentRef} className="space-y-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Image
//             src="/placeholder.svg?height=400&width=600"
//             alt="AI Concept 1"
//             width={600}
//             height={400}
//             className="rounded-xl shadow-lg"
//           />
//           <Image
//             src="/placeholder.svg?height=400&width=600"
//             alt="AI Concept 2"
//             width={600}
//             height={400}
//             className="rounded-xl shadow-lg"
//           />
//         </div>

//         <p className="text-xl leading-relaxed text-gray-700">
//           Artificial Intelligence (AI) is rapidly evolving, reshaping industries and transforming our daily lives in
//           ways we could only imagine a few years ago. From healthcare to finance, education to entertainment, AI's
//           impact is far-reaching and profound.
//         </p>

//         <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 my-4">
//           <h3 className="text-lg font-semibold text-yellow-800">Pro Tip</h3>
//           <p className="text-yellow-800">
//             Stay ahead of the AI curve by continuously updating your skills. Check out our recommended courses below!
//           </p>
//         </div>

//         <h2 className="text-3xl font-semibold mt-8 mb-4">The Rise of AI in Healthcare</h2>
//         <p className="text-lg text-gray-700 mb-4">
//           In the healthcare sector, AI is revolutionizing patient care, drug discovery, and medical imaging. Machine
//           learning algorithms can now predict diseases with remarkable accuracy, often outperforming human doctors in
//           certain diagnostic tasks.
//         </p>

//         <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl shadow-inner my-8">
//           <h3 className="text-2xl font-semibold mb-4">Must-Have AI Tools for Healthcare Professionals</h3>
//           <ul className="list-disc list-inside space-y-2">
//             <li>AI-powered Diagnostic Assistants</li>
//             <li>Predictive Analytics Platforms</li>
//             <li>Automated Medical Imaging Analysis</li>
//           </ul>
//           <Link href="https://www.amazon.com" target="_blank" rel="noopener noreferrer">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="mt-6 bg-white text-purple-600 px-6 py-3 rounded-full inline-flex items-center shadow-md hover:shadow-lg transition-shadow duration-300"
//             >
//               <FaAmazon className="mr-2" /> Shop AI Healthcare Tools on Amazon
//             </motion.div>
//           </Link>
//         </div>

//         {/* Google Ads Placeholder */}
//         <div className="bg-gray-200 p-4 text-center rounded-xl">
//           <p className="text-gray-600">Google Ads Placeholder</p>
//         </div>

//         <h2 className="text-3xl font-semibold mt-8 mb-4">AI in Finance: Smarter Investments, Safer Transactions</h2>
//         <p className="text-lg text-gray-700 mb-4">
//           The financial sector is leveraging AI to enhance fraud detection, automate trading, and provide personalized
//           financial advice. AI-driven algorithms can analyze vast amounts of data in real-time, identifying patterns and
//           insights that humans might miss.
//         </p>

//         <div className="bg-gradient-to-r from-blue-100 to-green-100 p-6 rounded-xl shadow-inner my-8">
//           <h3 className="text-2xl font-semibold mb-4">Top AI-Powered Financial Tools</h3>
//           <ul className="list-disc list-inside space-y-2">
//             <li>Robo-Advisors for Automated Investing</li>
//             <li>AI-Enhanced Fraud Detection Systems</li>
//             <li>Predictive Analytics for Market Trends</li>
//           </ul>
//           <Link href="https://www.amazon.com" target="_blank" rel="noopener noreferrer">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-full inline-flex items-center shadow-md hover:shadow-lg transition-shadow duration-300"
//             >
//               <FaAmazon className="mr-2" /> Explore AI Finance Tools on Amazon
//             </motion.div>
//           </Link>
//         </div>

//         <h2 className="text-3xl font-semibold mt-8 mb-4">The Future of AI: Challenges and Opportunities</h2>
//         <p className="text-lg text-gray-700 mb-4">
//           As AI continues to advance, we face both exciting opportunities and significant challenges. Ethical
//           considerations, job displacement, and the need for new regulations are just a few of the issues we must
//           address as we move into an AI-driven future.
//         </p>

//         <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl shadow-inner my-8">
//           <h3 className="text-2xl font-semibold mb-4">Stay Ahead with These AI Resources</h3>
//           <ul className="list-disc list-inside space-y-2">
//             <li>Comprehensive Guide to AI Ethics</li>
//             <li>AI and the Future of Work</li>
//             <li>Latest AI Research and Breakthroughs</li>
//           </ul>
//           <Link href="https://www.amazon.com" target="_blank" rel="noopener noreferrer">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="mt-6 bg-white text-yellow-600 px-6 py-3 rounded-full inline-flex items-center shadow-md hover:shadow-lg transition-shadow duration-300"
//             >
//               <FaAmazon className="mr-2" /> Discover AI Books and Courses on Amazon
//             </motion.div>
//           </Link>
//         </div>

//         <h2 className="text-3xl font-semibold mt-8 mb-4">Conclusion</h2>
//         <p className="text-lg text-gray-700 mb-4">
//           The AI revolution is here, and its impact will only grow in the coming years. By staying informed and adapting
//           to these changes, we can harness the power of AI to create a better, more efficient world. The future is AI,
//           and it's up to us to shape it responsibly.
//         </p>
//       </div>

//       <div className="mt-12 p-6 bg-gray-100 rounded-xl">
//         <h3 className="text-2xl font-semibold mb-4">Join the AI Revolution</h3>
//         <p className="text-lg text-gray-700 mb-4">
//           Stay updated with the latest in AI. Subscribe to our newsletter for cutting-edge insights, tutorials, and
//           exclusive offers on AI tools and resources.
//         </p>
//         <form className="flex flex-col sm:flex-row gap-4">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="flex-grow px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
//           />
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-300"
//           >
//             Subscribe
//           </motion.button>
//         </form>
//       </div>

//       {/* Related Products Section */}
//       <div className="mt-12">
//         <h2 className="text-3xl font-semibold mb-6">Related Products You Might Like</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[1, 2, 3].map((product) => (
//             <div
//               key={product}
//               className="border rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
//             >
//               <Image
//                 src={`/placeholder.svg?height=200&width=300`}
//                 alt={`Product ${product}`}
//                 width={300}
//                 height={200}
//                 className="rounded-lg mb-4"
//               />
//               <h3 className="text-xl font-semibold mb-2">AI Product {product}</h3>
//               <p className="text-gray-600 mb-4">
//                 Description of AI Product {product}. This amazing tool will revolutionize your workflow.
//               </p>
//               <Link href="https://www.amazon.com" target="_blank" rel="noopener noreferrer">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
//                 >
//                   Check on Amazon
//                 </motion.button>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Comment Section */}
//       <div ref={commentsRef} className="mt-12">
//         <h2 className="text-3xl font-semibold mb-6">Reader Comments</h2>
//         <Swiper
//           modules={[Navigation, Autoplay]}
//           spaceBetween={30}
//           slidesPerView={1}
//           navigation
//           autoplay={{ delay: 5000, disableOnInteraction: false }}
//           breakpoints={{
//             640: {
//               slidesPerView: 2,
//             },
//             768: {
//               slidesPerView: 3,
//             },
//           }}
//         >
//           {[1, 2, 3, 4, 5].map((comment) => (
//             <SwiperSlide key={comment}>
//               <div className="bg-white p-6 rounded-xl shadow-md">
//                 <div className="flex items-center mb-4">
//                   <Image
//                     src={`/placeholder.svg?height=40&width=40`}
//                     alt={`User ${comment}`}
//                     width={40}
//                     height={40}
//                     className="rounded-full mr-3"
//                   />
//                   <div>
//                     <h4 className="font-semibold">User {comment}</h4>
//                     <p className="text-gray-500 text-sm">2 days ago</p>
//                   </div>
//                 </div>
//                 <p className="text-gray-700">
//                   Great article! I learned so much about AI and its impact on various industries. Can't wait to see what
//                   the future holds.
//                 </p>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* Comment Form */}
//       <div className="mt-12">
//         <h3 className="text-2xl font-semibold mb-4">Leave a Comment</h3>
//         <form className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
//               Comment
//             </label>
//             <textarea
//               id="comment"
//               name="comment"
//               rows={4}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//             ></textarea>
//           </div>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-300"
//           >
//             Submit Comment
//           </motion.button>
//         </form>
//       </div>

//       {/* Google Ads Placeholder */}
//       <div className="mt-12 bg-gray-200 p-4 text-center rounded-xl">
//         <p className="text-gray-600">Google Ads Placeholder</p>
//       </div>
//     </article>
//   )
// }



// 3rd 

// "use client"

// import React, { useEffect, useRef } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { gsap } from "gsap"
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
// import { motion } from "framer-motion"
// import { FaAmazon, FaBookmark, FaStar } from "react-icons/fa"
// import { IoMdShare } from "react-icons/io"
// // import { Swiper, SwiperSlide } from "swiper/react"
// // import { Navigation, Autoplay } from "swiper/modules"
// import "swiper/css"
// import "swiper/css/navigation"
// import "swiper/css/autoplay"
// import Swiper, { Autoplay, Navigation } from "swiper"

// gsap.registerPlugin(ScrollTrigger)

// // interface BlogDetailsProps {
// //   slug: string
// // }

// export default function BlogDetails({ slug }) {
//   const headerRef = useRef<HTMLDivElement>(null)
//   const contentRef = useRef<HTMLDivElement>(null)
//   const commentsRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const header = headerRef.current
//     const content = contentRef.current
//     const comments = commentsRef.current

//     if (header && content && comments) {
//       gsap.from(header, {
//         opacity: 0,
//         y: -50,
//         duration: 1,
//         ease: "power3.out",
//       })

//       gsap.from(content.children, {
//         opacity: 0,
//         y: 50,
//         stagger: 0.2,
//         duration: 0.8,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: content,
//           start: "top 80%",
//         },
//       })

//       gsap.from(comments, {
//         opacity: 0,
//         y: 50,
//         duration: 0.8,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: comments,
//           start: "top 80%",
//         },
//       })
//     }
//   }, [])

//   return (
//     <article className="max-w-6xl mx-auto px-4 py-12">
//       <header ref={headerRef} className="mb-12">
//         <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
//           The Future of AI: Transforming Industries and Everyday Life
//         </h1>
//         <div className="flex flex-wrap items-center text-gray-600 mb-4">
//           <Image
//             src="/placeholder.svg?height=40&width=40"
//             alt="Author"
//             width={40}
//             height={40}
//             className="rounded-full mr-3"
//           />
//           <span className="mr-4">By John Doe</span>
//           <span className="mr-4">Published on May 15, 2023</span>
//           <span className="flex items-center">
//             <FaStar className="text-yellow-400 mr-1" />
//             <FaStar className="text-yellow-400 mr-1" />
//             <FaStar className="text-yellow-400 mr-1" />
//             <FaStar className="text-yellow-400 mr-1" />
//             <FaStar className="text-yellow-400 mr-1" />
//             (128 reviews)
//           </span>
//         </div>
//         <div className="flex flex-wrap items-center space-x-4">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-4 py-2 bg-purple-600 text-white rounded-full flex items-center mb-2 sm:mb-0"
//           >
//             <FaBookmark className="mr-2" /> Save for later
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-4 py-2 bg-pink-600 text-white rounded-full flex items-center mb-2 sm:mb-0"
//           >
//             <IoMdShare className="mr-2" /> Share
//           </motion.button>
//         </div>
//       </header>

//       <div ref={contentRef} className="space-y-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Image
//             src="/placeholder.svg?height=400&width=600"
//             alt="AI Concept 1"
//             width={600}
//             height={400}
//             className="rounded-xl shadow-lg"
//           />
//           <Image
//             src="/placeholder.svg?height=400&width=600"
//             alt="AI Concept 2"
//             width={600}
//             height={400}
//             className="rounded-xl shadow-lg"
//           />
//         </div>

//         <p className="text-xl leading-relaxed text-gray-700">
//           Artificial Intelligence (AI) is rapidly evolving, reshaping industries and transforming our daily lives in
//           ways we could only imagine a few years ago. From healthcare to finance, education to entertainment, AI's
//           impact is far-reaching and profound.
//         </p>

//         <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 my-4">
//           <h3 className="text-lg font-semibold text-yellow-800">Pro Tip</h3>
//           <p className="text-yellow-800">
//             Stay ahead of the AI curve by continuously updating your skills. Check out our recommended courses below!
//           </p>
//         </div>

//         <h2 className="text-3xl font-semibold mt-8 mb-4">The Rise of AI in Healthcare</h2>
//         <p className="text-lg text-gray-700 mb-4">
//           In the healthcare sector, AI is revolutionizing patient care, drug discovery, and medical imaging. Machine
//           learning algorithms can now predict diseases with remarkable accuracy, often outperforming human doctors in
//           certain diagnostic tasks.
//         </p>

//         <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl shadow-inner my-8">
//           <h3 className="text-2xl font-semibold mb-4">Must-Have AI Tools for Healthcare Professionals</h3>
//           <ul className="list-disc list-inside space-y-2">
//             <li>AI-powered Diagnostic Assistants</li>
//             <li>Predictive Analytics Platforms</li>
//             <li>Automated Medical Imaging Analysis</li>
//           </ul>
//           <Link href="https://www.amazon.com" target="_blank" rel="noopener noreferrer">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="mt-6 bg-white text-purple-600 px-6 py-3 rounded-full inline-flex items-center shadow-md hover:shadow-lg transition-shadow duration-300"
//             >
//               <FaAmazon className="mr-2" /> Shop AI Healthcare Tools on Amazon
//             </motion.div>
//           </Link>
//         </div>

//         {/* Google Ads Placeholder */}
//         <div className="bg-gray-200 p-4 text-center rounded-xl">
//           <p className="text-gray-600">Google Ads Placeholder</p>
//         </div>

//         <h2 className="text-3xl font-semibold mt-8 mb-4">AI in Finance: Smarter Investments, Safer Transactions</h2>
//         <p className="text-lg text-gray-700 mb-4">
//           The financial sector is leveraging AI to enhance fraud detection, automate trading, and provide personalized
//           financial advice. AI-driven algorithms can analyze vast amounts of data in real-time, identifying patterns and
//           insights that humans might miss.
//         </p>

//         <div className="bg-gradient-to-r from-blue-100 to-green-100 p-6 rounded-xl shadow-inner my-8">
//           <h3 className="text-2xl font-semibold mb-4">Top AI-Powered Financial Tools</h3>
//           <ul className="list-disc list-inside space-y-2">
//             <li>Robo-Advisors for Automated Investing</li>
//             <li>AI-Enhanced Fraud Detection Systems</li>
//             <li>Predictive Analytics for Market Trends</li>
//           </ul>
//           <Link href="https://www.amazon.com" target="_blank" rel="noopener noreferrer">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-full inline-flex items-center shadow-md hover:shadow-lg transition-shadow duration-300"
//             >
//               <FaAmazon className="mr-2" /> Explore AI Finance Tools on Amazon
//             </motion.div>
//           </Link>
//         </div>

//         <h2 className="text-3xl font-semibold mt-8 mb-4">The Future of AI: Challenges and Opportunities</h2>
//         <p className="text-lg text-gray-700 mb-4">
//           As AI continues to advance, we face both exciting opportunities and significant challenges. Ethical
//           considerations, job displacement, and the need for new regulations are just a few of the issues we must
//           address as we move into an AI-driven future.
//         </p>

//         <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl shadow-inner my-8">
//           <h3 className="text-2xl font-semibold mb-4">Stay Ahead with These AI Resources</h3>
//           <ul className="list-disc list-inside space-y-2">
//             <li>Comprehensive Guide to AI Ethics</li>
//             <li>AI and the Future of Work</li>
//             <li>Latest AI Research and Breakthroughs</li>
//           </ul>
//           <Link href="https://www.amazon.com" target="_blank" rel="noopener noreferrer">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="mt-6 bg-white text-yellow-600 px-6 py-3 rounded-full inline-flex items-center shadow-md hover:shadow-lg transition-shadow duration-300"
//             >
//               <FaAmazon className="mr-2" /> Discover AI Books and Courses on Amazon
//             </motion.div>
//           </Link>
//         </div>

//         <h2 className="text-3xl font-semibold mt-8 mb-4">Conclusion</h2>
//         <p className="text-lg text-gray-700 mb-4">
//           The AI revolution is here, and its impact will only grow in the coming years. By staying informed and adapting
//           to these changes, we can harness the power of AI to create a better, more efficient world. The future is AI,
//           and it's up to us to shape it responsibly.
//         </p>
//       </div>

//       <div className="mt-12 p-6 bg-gray-100 rounded-xl">
//         <h3 className="text-2xl font-semibold mb-4">Join the AI Revolution</h3>
//         <p className="text-lg text-gray-700 mb-4">
//           Stay updated with the latest in AI. Subscribe to our newsletter for cutting-edge insights, tutorials, and
//           exclusive offers on AI tools and resources.
//         </p>
//         <form className="flex flex-col sm:flex-row gap-4">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="flex-grow px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
//           />
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-300"
//           >
//             Subscribe
//           </motion.button>
//         </form>
//       </div>

//       {/* Related Products Section */}
//       <div className="mt-12">
//         <h2 className="text-3xl font-semibold mb-6">Related Products You Might Like</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[1, 2, 3].map((product) => (
//             <div
//               key={product}
//               className="border rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
//             >
//               <Image
//                 src={`/placeholder.svg?height=200&width=300`}
//                 alt={`Product ${product}`}
//                 width={300}
//                 height={200}
//                 className="rounded-lg mb-4"
//               />
//               <h3 className="text-xl font-semibold mb-2">AI Product {product}</h3>
//               <p className="text-gray-600 mb-4">
//                 Description of AI Product {product}. This amazing tool will revolutionize your workflow.
//               </p>
//               <Link href="https://www.amazon.com" target="_blank" rel="noopener noreferrer">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
//                 >
//                   Check on Amazon
//                 </motion.button>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Comment Section */}
//       <div ref={commentsRef} className="mt-12">
//         <h2 className="text-3xl font-semibold mb-6">Reader Comments</h2>
//         <Swiper
//           modules={[Navigation, Autoplay]}
//           spaceBetween={30}
//           slidesPerView={1}
//           navigation
//           autoplay={{ delay: 5000, disableOnInteraction: false }}
//           breakpoints={{
//             640: {
//               slidesPerView: 2,
//             },
//             768: {
//               slidesPerView: 3,
//             },
//           }}
//         >
//           {[1, 2, 3, 4, 5].map((comment) => (
//             <SwiperSlide key={comment}>
//               <div className="bg-white p-6 rounded-xl shadow-md">
//                 <div className="flex items-center mb-4">
//                   <Image
//                     src={`/placeholder.svg?height=40&width=40`}
//                     alt={`User ${comment}`}
//                     width={40}
//                     height={40}
//                     className="rounded-full mr-3"
//                   />
//                   <div>
//                     <h4 className="font-semibold">User {comment}</h4>
//                     <p className="text-gray-500 text-sm">2 days ago</p>
//                   </div>
//                 </div>
//                 <p className="text-gray-700">
//                   Great article! I learned so much about AI and its impact on various industries. Can't wait to see what
//                   the future holds.
//                 </p>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* Comment Form */}
//       <div className="mt-12">
//         <h3 className="text-2xl font-semibold mb-4">Leave a Comment</h3>
//         <form className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
//               Comment
//             </label>
//             <textarea
//               id="comment"
//               name="comment"
//               rows={4}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//             ></textarea>
//           </div>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-300"
//           >
//             Submit Comment
//           </motion.button>
//         </form>
//       </div>

//       {/* Google Ads Placeholder */}
//       <div className="mt-12 bg-gray-200 p-4 text-center rounded-xl">
//         <p className="text-gray-600">Google Ads Placeholder</p>
//       </div>
//     </article>
//   )
// }





// 3rd component 


// import Head from "next/head";
// import { useRouter } from "next/router";

// const BlogDetails = ({ blog }) => {
//   const router = useRouter();

//   if (router.isFallback) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       {/* Dynamic Metadata for SEO */}
//       <Head>
//         <title>{blog.title}</title>
//         <meta name="description" content={blog.description} />
//         <meta name="keywords" content={`${blog.title}, best products, reviews, ${blog.products.map((p) => p.name).join(", ")}`} />
//         <meta name="author" content="Your Name" />
//         <link rel="canonical" href={`https://yourwebsite.com/blog/${encodeURIComponent(blog.title)}`} />
//         <meta property="og:title" content={blog.title} />
//         <meta property="og:description" content={blog.description} />
//         <meta property="og:image" content={`https://yourwebsite.com/images/${blog.images[0]}`} />
//         <meta property="og:url" content={`https://yourwebsite.com/blog/${encodeURIComponent(blog.title)}`} />
//         <meta property="og:type" content="article" />
//         <meta property="og:site_name" content="Your Blog Name" />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={blog.title} />
//         <meta name="twitter:description" content={blog.description} />
//         <meta name="twitter:image" content={`https://yourwebsite.com/images/${blog.images[0]}`} />
//       </Head>

//       {/* Main Blog Content */}
//       <div className="max-w-4xl mx-auto px-6 py-10">
//         {/* Blog Title */}
//         <h1 className="text-4xl font-bold mb-6 text-center">{blog.title}</h1>
//         <p className="text-lg mb-6 text-gray-700">{blog.description}</p>

//         {/* Blog Images */}
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
//           {blog.images.map((image, index) => (
//             <img
//               key={index}
//               src={`/images/${image}`}
//               alt={`Blog image ${index + 1}`}
//               className="rounded-lg shadow-md w-full h-48 object-cover"
//             />
//           ))}
//         </div>

//         {/* Products Section */}
//         <div className="mb-10">
//           <h2 className="text-2xl font-semibold mb-4">Products</h2>
//           <div className="space-y-6">
//             {blog.products.map((product, index) => (
//               <article
//                 key={index}
//                 className="p-6 border rounded-lg shadow hover:shadow-lg transition duration-300"
//               >
//                 <h3 className="text-xl font-bold mb-2">{product.name}</h3>
//                 <p className="text-gray-700 mb-2">{product.price}</p>
//                 <ul className="mb-2 list-disc list-inside text-gray-600">
//                   {product.features.map((feature, featureIndex) => (
//                     <li key={featureIndex}>{feature}</li>
//                   ))}
//                 </ul>
//                 <p className="text-gray-500 italic mb-2">
//                   Pros: {product.pros.join(", ")}
//                 </p>
//                 <p className="text-gray-500 italic mb-4">
//                   Cons: {product.cons.join(", ")}
//                 </p>
//                 <p className="text-gray-700 mb-4">{product.reviewScript}</p>
//                 <a
//                   href={product.affiliateLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
//                 >
//                   Buy Now
//                 </a>
//               </article>
//             ))}
//           </div>
//         </div>

//         {/* Additional Sections */}
//         {blog.additionalSections.map((section, index) => (
//           <section key={index} className="mb-8">
//             <h2 className="text-2xl font-semibold mb-4">{section.sectionTitle}</h2>
//             {Array.isArray(section.content) ? (
//               <ul className="list-disc list-inside text-gray-700 space-y-2">
//                 {section.content.map((item, contentIndex) => (
//                   <li key={contentIndex}>
//                     <strong>{item.question}</strong>: {item.answer}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-700">{section.content}</p>
//             )}
//           </section>
//         ))}
//       </div>
//     </>
//   );
// };

// export default BlogDetails;

// export async function getStaticPaths() {
//   return {
//     paths: [], // No pre-rendered paths; fallback enabled
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params }) {
//   const blogs = [
//     /* Add your JSON data here */
//   ];

//   const blog = blogs.find((b) => b.title === params.title);

//   if (!blog) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { blog },
//   };
// }




// 4th component 


// import Head from "next/head";

// const BlogDetails = () => {
//   const blog = {
//     title: "Top 5 Gadgets of 2025 for Tech Enthusiasts",
//     description: "Discover the best gadgets of 2025 that are perfect for tech enthusiasts. Explore features, reviews, pros, and cons to make an informed choice.",
//     images: ["gadget1.jpg", "gadget2.jpg", "gadget3.jpg"],
//     products: [
//       {
//         name: "Smartwatch Pro X",
//         price: "$299",
//         features: ["Long battery life", "Advanced health tracking", "Customizable watch faces"],
//         pros: ["Durable", "Lightweight", "Accurate tracking"],
//         cons: ["Limited app options", "No cellular support"],
//         reviewScript: "The Smartwatch Pro X stands out with its sleek design and accurate health tracking, making it a great choice for fitness enthusiasts.",
//         affiliateLink: "https://example.com/smartwatch-pro-x",
//       },
//       {
//         name: "Noise-Canceling Headphones",
//         price: "$199",
//         features: ["Superior sound quality", "Active noise cancelation", "Comfortable fit"],
//         pros: ["Excellent noise cancelation", "High-quality audio"],
//         cons: ["Bulky design", "No waterproofing"],
//         reviewScript: "With active noise cancelation and superior sound, these headphones are a must-have for music lovers.",
//         affiliateLink: "https://example.com/noise-canceling-headphones",
//       },
//     ],
//     additionalSections: [
//       {
//         sectionTitle: "FAQ",
//         content: [
//           { question: "What is the best gadget of 2025?", answer: "Smartwatch Pro X is considered one of the top gadgets for its features and value." },
//           { question: "Are these gadgets suitable for daily use?", answer: "Yes, all gadgets mentioned are designed for everyday usability." },
//         ],
//       },
//     ],
//   };

//   return (
//     <>
//       {/* SEO Metadata */}
//       <Head>
//         <title>{blog.title}</title>
//         <meta name="description" content={blog.description} />
//         <meta name="keywords" content={`${blog.title}, tech gadgets 2025, best gadgets`} />
//         <link rel="canonical" href={`https://yourwebsite.com/blog/top-5-gadgets-of-2025`} />
//         <meta property="og:title" content={blog.title} />
//         <meta property="og:description" content={blog.description} />
//         <meta property="og:image" content={`https://yourwebsite.com/images/${blog.images[0]}`} />
//         <meta property="og:url" content={`https://yourwebsite.com/blog/top-5-gadgets-of-2025`} />
//         <meta property="og:type" content="article" />
//         <meta property="og:site_name" content="Tech Blog" />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={blog.title} />
//         <meta name="twitter:description" content={blog.description} />
//         <meta name="twitter:image" content={`https://yourwebsite.com/images/${blog.images[0]}`} />
//       </Head>

//       {/* Blog Content */}
//       <div className="max-w-4xl mx-auto px-6 py-10">
//         {/* Blog Title */}
//         <h1 className="text-4xl font-bold mb-6 text-center">{blog.title}</h1>
//         <p className="text-lg mb-6 text-gray-700">{blog.description}</p>

//         {/* Blog Images */}
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
//           {blog.images.map((image, index) => (
//             <img
//               key={index}
//               src={`/images/${image}`}
//               alt={`Gadget ${index + 1}`}
//               className="rounded-lg shadow-md w-full h-48 object-cover"
//             />
//           ))}
//         </div>

//         {/* Products Section */}
//         <div className="mb-10">
//           <h2 className="text-2xl font-semibold mb-4">Products</h2>
//           <div className="space-y-6">
//             {blog.products.map((product, index) => (
//               <article
//                 key={index}
//                 className="p-6 border rounded-lg shadow hover:shadow-lg transition duration-300"
//               >
//                 <h3 className="text-xl font-bold mb-2">{product.name}</h3>
//                 <p className="text-gray-700 mb-2">{product.price}</p>
//                 <ul className="mb-2 list-disc list-inside text-gray-600">
//                   {product.features.map((feature, featureIndex) => (
//                     <li key={featureIndex}>{feature}</li>
//                   ))}
//                 </ul>
//                 <p className="text-gray-500 italic mb-2">
//                   Pros: {product.pros.join(", ")}
//                 </p>
//                 <p className="text-gray-500 italic mb-4">
//                   Cons: {product.cons.join(", ")}
//                 </p>
//                 <p className="text-gray-700 mb-4">{product.reviewScript}</p>
//                 <a
//                   href={product.affiliateLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
//                 >
//                   Buy Now
//                 </a>
//               </article>
//             ))}
//           </div>
//         </div>

//         {/* Additional Sections */}
//         {blog.additionalSections.map((section, index) => (
//           <section key={index} className="mb-8">
//             <h2 className="text-2xl font-semibold mb-4">{section.sectionTitle}</h2>
//             {Array.isArray(section.content) ? (
//               <ul className="list-disc list-inside text-gray-700 space-y-2">
//                 {section.content.map((item, contentIndex) => (
//                   <li key={contentIndex}>
//                     <strong>{item.question}</strong>: {item.answer}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-700">{section.content}</p>
//             )}
//           </section>
//         ))}
//       </div>
//     </>
//   );
// };

// export default BlogDetails;


// "use client"

// import { useEffect, useRef } from "react"
// import Head from "next/head"
// import Image from "next/image"
// import { gsap } from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"

// gsap.registerPlugin(ScrollTrigger)

// const BlogDetails = () => {
//   const blog = {
//     title: "Top 5 Gadgets of 2025 for Tech Enthusiasts",
//     description:
//       "Discover the best gadgets of 2025 that are perfect for tech enthusiasts. Explore features, reviews, pros, and cons to make an informed choice.",
//     images: ["https://html.pixelfit.agency/pesco/assets/images/blog/blog-sm-1.png", "https://html.pixelfit.agency/pesco/assets/images/blog/blog-sm-2.png", "https://html.pixelfit.agency/pesco/assets/images/blog/blog-sm-3.png"],
//     products: [
//       {
//         name: "Smartwatch Pro X",
//         price: "$299",
//         features: ["Long battery life", "Advanced health tracking", "Customizable watch faces"],
//         pros: ["Durable", "Lightweight", "Accurate tracking"],
//         cons: ["Limited app options", "No cellular support"],
//         reviewScript:
//           "The Smartwatch Pro X stands out with its sleek design and accurate health tracking, making it a great choice for fitness enthusiasts.",
//         affiliateLink: "https://example.com/smartwatch-pro-x",
//       },
//       {
//         name: "Noise-Canceling Headphones",
//         price: "$199",
//         features: ["Superior sound quality", "Active noise cancelation", "Comfortable fit"],
//         pros: ["Excellent noise cancelation", "High-quality audio"],
//         cons: ["Bulky design", "No waterproofing"],
//         reviewScript:
//           "With active noise cancelation and superior sound, these headphones are a must-have for music lovers.",
//         affiliateLink: "https://example.com/noise-canceling-headphones",
//       },
//     ],
//     additionalSections: [
//       {
//         sectionTitle: "FAQ",
//         content: [
//           {
//             question: "What is the best gadget of 2025?",
//             answer: "Smartwatch Pro X is considered one of the top gadgets for its features and value.",
//           },
//           {
//             question: "Are these gadgets suitable for daily use?",
//             answer: "Yes, all gadgets mentioned are designed for everyday usability.",
//           },
//         ],
//       },
//     ],
//   }

//   const titleRef = useRef(null)
//   const imagesRef = useRef(null)
//   const productsRef = useRef(null)
//   const faqRef = useRef(null)

// //   useEffect(() => {
// //     // Title animation
// //     gsap.from(titleRef?.current, {
// //       y: -50,
// //       opacity: 0,
// //       duration: 1,
// //       ease: "power3.out",
// //     })

// //     // Images animation
// //     gsap.from(imagesRef?.current?.children, {
// //       opacity: 0,
// //       y: 50,
// //       stagger: 0.2,
// //       duration: 0.8,
// //       ease: "power3.out",
// //       scrollTrigger: {
// //         trigger: imagesRef?.current,
// //         start: "top 80%",
// //       },
// //     })

// //     // Products animation
// //     gsap.from(productsRef?.current?.children, {
// //       opacity: 0,
// //       y: 50,
// //       stagger: 0.3,
// //       duration: 0.8,
// //       ease: "power3.out",
// //       scrollTrigger: {
// //         trigger: productsRef?.current,
// //         start: "top 80%",
// //       },
// //     })

// //     // FAQ animation
// //     gsap.from(faqRef?.current?.children, {
// //       opacity: 0,
// //       y: 20,
// //       stagger: 0.2,
// //       duration: 0.6,
// //       ease: "power3.out",
// //       scrollTrigger: {
// //         trigger: faqRef?.current,
// //         start: "top 80%",
// //       },
// //     })
// //   }, [])

//   return (
//     <>
//       <Head>
//         <title>{blog.title}</title>
//         <meta name="description" content={blog.description} />
//         <meta name="keywords" content={`${blog.title}, tech gadgets 2025, best gadgets`} />
//         <meta property="og:title" content={blog.title} />
//         <meta property="og:description" content={blog.description} />
//         <meta property="og:image" content="/images/gadget1.jpg" />
//         <meta property="og:url" content="https://yourwebsite.com/blog/top-5-gadgets-of-2025" />
//         <meta name="twitter:card" content="summary_large_image" />
//       </Head>

//       <div className="min-h-screen ">
//         <div className="max-w-4xl mx-auto px-6 py-16">
//           <h1
//             // ref={titleRef}
//             className="text-5xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
//           >
//             {blog.title}
//           </h1>
//           <p className="text-xl mb-12 text-gray-700 text-center leading-relaxed">{blog.description}</p>

//           <div
//         //    ref={imagesRef}
//             className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
//             {blog.images.map((image, index) => (
//               <div
//                 key={index}
//                 className="relative h-64 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 will-change-transform"
//               >
//                 <Image
//                   src={image}
//                   alt={`Gadget ${index + 1}`}
//                   layout="fill"
//                   objectFit="cover"
//                   quality={90}
//                   className="rounded-xl"
//                 />
//               </div>
//             ))}
//           </div>

//           <div
//         //    ref={productsRef}
//             className="space-y-12 mb-16">
//             {blog.products.map((product, index) => (
//               <article
//                 key={index}
//                 className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
//               >
//                 <h3 className="text-2xl font-bold mb-4 text-gray-800">{product.name}</h3>
//                 <p className="text-3xl font-extrabold mb-6 text-blue-600">{product.price}</p>
//                 <div className="mb-6">
//                   <h4 className="text-lg font-semibold mb-2 text-gray-700">Features:</h4>
//                   <ul className="list-disc list-inside text-gray-600 space-y-1">
//                     {product.features.map((feature, featureIndex) => (
//                       <li key={featureIndex}>{feature}</li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="flex mb-6 space-x-8">
//                   <div>
//                     <h4 className="text-lg font-semibold mb-2 text-green-600">Pros:</h4>
//                     <ul className="list-disc list-inside text-gray-600 space-y-1">
//                       {product.pros.map((pro, proIndex) => (
//                         <li key={proIndex}>{pro}</li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-semibold mb-2 text-red-600">Cons:</h4>
//                     <ul className="list-disc list-inside text-gray-600 space-y-1">
//                       {product.cons.map((con, conIndex) => (
//                         <li key={conIndex}>{con}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//                 <p className="text-gray-700 mb-6 italic">{product.reviewScript}</p>
//                 <a
//                   href={product.affiliateLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-full hover:from-blue-700 hover:to-purple-700 transition duration-300 transform hover:scale-105"
//                 >
//                   Buy Now
//                 </a>
//               </article>
//             ))}
//           </div>

//           {blog.additionalSections.map((section, index) => (
//             <section key={index} className="mb-16">
//               <h2 className="text-3xl font-bold mb-8 text-gray-800">{section.sectionTitle}</h2>
//               <div
//             //    ref={faqRef}
//                 className="space-y-6">
//                 {section.content.map((item, contentIndex) => (
//                   <div key={contentIndex} className="bg-white p-6 rounded-xl shadow-md">
//                     <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.question}</h3>
//                     <p className="text-gray-700">{item.answer}</p>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

// export default BlogDetails


// // 5Thumbs
 import React from 'react'
 
 export default function BlogDetails() {
   return (
     <div>BlogDetails</div>
   )
 }
 
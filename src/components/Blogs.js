// /* eslint-disable @next/next/no-img-element */
// import React from "react";

// const Blogs = () => {
//   const blogs = [
//     {
//       id: 1,
//       image: "https://via.placeholder.com/300",
//       title: "Stay the Summer Style Game: Must-Have Trends You Can Shop Online",
//       date: "May 25, 2023",
//       description: "Discover the latest summer fashion trends that will elevate your style effortlessly.",
//     },
//     {
//       id: 2,
//       image: "https://via.placeholder.com/300",
//       title: "Insider Tips on Finding Affordable Fashion Gems Online",
//       date: "May 20, 2023",
//       description: "Learn how to uncover budget-friendly yet stylish finds with expert shopping tips.",
//     },
//     {
//       id: 3,
//       image: "https://via.placeholder.com/300",
//       title: "Eco-Friendly Fashion: E-commerce You Can Feel Good About",
//       date: "March 18, 2023",
//       description: "Support sustainable brands and embrace eco-conscious shopping.",
//     },
//     {
//       id: 4,
//       image: "https://via.placeholder.com/300",
//       title: "A Guide to Streamlining the Online Fashion Shopping Experience",
//       date: "Aug 25, 2023",
//       description: "Enhance your shopping journey with this ultimate guide to online fashion retail.",
//     },
//     {
//       id: 5,
//       image: "https://via.placeholder.com/300",
//       title: "From Clicks to Closets: Mastering the Art of Fashion E-commerce Marketing",
//       date: "July 10, 2023",
//       description: "Discover insights into effective marketing strategies for online fashion businesses.",
//     },
//   ];

//   return (
//     <section className="bg-[#FFF7F0] py-16">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-16">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <p className="text-pink-600 font-bold uppercase">Our Blog</p>
//           <h2 className="text-4xl font-bold text-gray-800">Explore Our Articles</h2>
//         </div>

//         {/* Blog Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogs.map((blog) => (
//             <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src={blog.image}
//                 alt={blog.title}
//                 className="w-full h-52 object-cover"
//               />
//               <div className="p-6">
//                 <h3 className="text-lg font-bold text-gray-800 hover:text-pink-600">
//                   {blog.title}
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-4">{blog.date}</p>
//                 <p className="text-gray-700">{blog.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Blogs;



/* eslint-disable @next/next/no-img-element */
import React from "react";

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      image: "https://html.pixelfit.agency/pesco/assets/images/blog/blog-big-1.png",
      title: "From Clicks to Closets: Mastering the Art of Fashion E-commerce Marketing ",
      description:
        "Explore the world of fashion e-commerce marketing and learn effective strategies to convert clicks into purchases. Explore the world of fashion e-commerce marketing and learn effective strategies to convert clicks into purchases. Explore the world of fashion e-commerce marketing and learn effective strategies to convert clicks into purchases. Explore the world of fashion e-commerce marketing and learn effective strategies to convert clicks into purchases.",
    },
    {
      id: 2,
      image: "https://html.pixelfit.agency/pesco/assets/images/blog/blog-sm-1.png",
      title: "Stay the Summer Style Game: Must-Have Trends You Can Shop Online",
      date: "May 25, 2023",
    },
    {
      id: 3,
      image: "https://html.pixelfit.agency/pesco/assets/images/blog/blog-sm-2.png",
      title: "Insider Tips on Finding Affordable Fashion Gems Online",
      date: "May 20, 2023",
    },
    {
      id: 4,
      image: "https://html.pixelfit.agency/pesco/assets/images/blog/blog-sm-3.png",
      title: "Eco-Friendly Fashion: E-commerce You Can Feel Good About",
      date: "March 18, 2023",
    },
    {
      id: 5,
      image: "https://html.pixelfit.agency/pesco/assets/images/blog/blog-sm-4.png",
      title: "A Guide to Streamlining the Online Fashion Shopping Experience",
      date: "Aug 25, 2023",
    },
  ];

  return (
    <section className="bg-[#FFF7F0] mb-20  p-4  ">
      <div className="container mx-auto ">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-pink-600 font-bold uppercase font-serif">Our Blog</p>
          <h2 className="text-4xl font-bold text-gray-700 font-serif">Explore Our Articles</h2>
        </div>

        {/* Blog Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Large Blog Card (50%) */}
          <div className="col-span-1 lg:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={blogs[0].image}
              alt={blogs[0].title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 hover:text-pink-600 mb-4">
                {blogs[0].title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{blogs[0].date}</p>
              <p className="text-gray-700">{blogs[0].description}</p>
            </div>
          </div>

          {/* Small Blog Cards (4 Cards in 50%) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {blogs.slice(1).map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-36 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 hover:text-pink-600 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-600">{blog.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;

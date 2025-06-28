/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.ibb.co.com',
      'html.pixelfit.agency',
      'res.cloudinary.com',
      'via.placeholder.com',
      'example.com',
      "cdn-oubd.s3.ap-southeast-1.amazonaws.com",
      "oneummahbd.shop",
      'i.ibb.co'
    ],
  },
  transpilePackages: ['swiper'],
};

export default nextConfig;

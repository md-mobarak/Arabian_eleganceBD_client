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
      'i.ibb.co'
    ],
  },
  transpilePackages: ['swiper'],
};

export default nextConfig;

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#FFF7F0] pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Left Section */}
          <div className="lg:w-3/12 w-full mb-8 lg:mb-0">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">pesco</h2>
            <p className="text-gray-600 mb-4">
              Pesco is an exciting international brand; we provide high-quality clothes.
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>Email: <a href="mailto:info@mydomain.com" className="text-pink-600 hover:underline">info@mydomain.com</a></li>
              <li>Phone: <a href="tel:+123456789" className="text-pink-600 hover:underline">+123 456 789</a></li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600">
                <FaFacebookF />
              </a>
              <a href="#" className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600">
                <FaTwitter />
              </a>
              <a href="#" className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600">
                <FaInstagram />
              </a>
              <a href="#" className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Customer Services Section */}
          <div className="lg:w-2/12 w-full mb-8 lg:mb-0">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Customer Services</h3>
            <ul className="text-gray-600 space-y-2">
              <li><a href="#" className="hover:underline">Collections & Delivery</a></li>
              <li><a href="#" className="hover:underline">Returns & Refunds</a></li>
              <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
              <li><a href="#" className="hover:underline">Delivery Return</a></li>
              <li><a href="#" className="hover:underline">Store Locations</a></li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="lg:w-2/12 w-full mb-8 lg:mb-0">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Link</h3>
            <ul className="text-gray-600 space-y-2">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Use</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
              <li><a href="#" className="hover:underline">Login / Register</a></li>
            </ul>
          </div>

          {/* Recent Posts Section */}
          <div className="lg:w-4/12 w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Post</h3>
            <div className="space-y-4">
              <div className="flex">
                <img
                  src="https://html.pixelfit.agency/pesco/assets/images/footer/recent-post-1.png"
                  alt="Post 1"
                  className="w-12 h-12 rounded-lg object-cover mr-4"
                />
                <div>
                  <h4 className="text-gray-800 font-medium">Tips on Finding Affordable Fashion Gems Online</h4>
                  <p className="text-sm text-gray-600">July 10, 2023</p>
                </div>
              </div>
              <div className="flex">
                <img
                  src="https://html.pixelfit.agency/pesco/assets/images/footer/recent-post-2.png"
                  alt="Post 2"
                  className="w-12 h-12 rounded-lg object-cover mr-4"
                />
                <div>
                  <h4 className="text-gray-800 font-medium">Mastering the Art of Fashion & eCommerce Marketing</h4>
                  <p className="text-sm text-gray-600">July 8, 2023</p>
                </div>
              </div>
              <div className="flex">
                <img
                  src="https://html.pixelfit.agency/pesco/assets/images/footer/recent-post-3.png"
                  alt="Post 3"
                  className="w-12 h-12 rounded-lg object-cover mr-4"
                />
                <div>
                  <h4 className="text-gray-800 font-medium">Must-Have Trends You Can Shop Online Now</h4>
                  <p className="text-sm text-gray-600">July 5, 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-8 pt-4 flex flex-col lg:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 text-center lg:text-left">
            © 2024. All rights reserved by <span className="text-pink-600 font-bold">Pixefit</span>.
          </p>
          <div className="flex flex-wrap mt-4 lg:mt-0 space-x-4 justify-center lg:justify-end">
            <img src="https://html.pixelfit.agency/pesco/assets/images/footer/recent-post-1.png" alt="Paypal" className="w-12 h-12 object-cover rounded-full" />
            <img src="https://html.pixelfit.agency/pesco/assets/images/footer/recent-post-2.png" alt="Visa" className="w-12 h-12 object-cover rounded-full" />
            <img src="https://html.pixelfit.agency/pesco/assets/images/footer/recent-post-3.png" alt="Mastercard" className="w-12 h-12 object-cover rounded-full" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

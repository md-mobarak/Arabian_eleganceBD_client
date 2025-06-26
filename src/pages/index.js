

import Navbar from "@/components/Navbar";
import Homes from "@/components/Homes";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

import { Analytics } from "@vercel/analytics/react"
export default function Home() {
  // Move useEffect inside the functional component
  // useEffect(() => {
  //   AOS.init({ duration: 1000 }); // Initialize AOS with your desired configuration
  // }, []);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, // Prevent re-animation
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div>
      <Navbar />
  <div className="">
    {/* <CartDrawer></CartDrawer> */}
  <Homes />
  </div>
      <Footer/>
    </div>
  );
}

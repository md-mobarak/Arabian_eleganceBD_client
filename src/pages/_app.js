// // import CartDrawer from "@/components/CartDrawer";
import "@/styles/globals.css";

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();
// import { Inter } from 'next/font/google'

// const inter = Inter({ 
//   subsets: ['latin'],
//   variable: '--font-inter',
// })


// function MyApp({ Component, pageProps }) {
//   return (
//     <QueryClientProvider client={queryClient} className={`${inter.variable} `}>
//       <Component {...pageProps} />
//     </QueryClientProvider>
//   );
// }

// export default MyApp;

// import { Inter } from 'next/font/google';

// const inter = Inter({ 
//   subsets: ['latin'],
//   variable: '--font-inter',
//   // Optional: Add fallback fonts
//   display: 'swap', 
//   adjustFontFallback: true,
// });

// function MyApp({ Component, pageProps }) {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <main className={`${inter.variable} font-sans`}>
//         <Component {...pageProps} />
//       </main>
//     </QueryClientProvider>
//   );
// }


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "react-hot-toast";
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${inter.variable} font-sans`}>
      <Toaster position="top-center" />
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
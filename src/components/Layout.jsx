// import { useState, useEffect } from 'react';
// import Navbar from './Navbar';
// import Footer from './Footer';
// import { useRouter } from 'next/router';

// export default function Layout({ children }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   // Optional: Page transition loading state
//   useEffect(() => {
//     const handleStart = () => setLoading(true);
//     const handleComplete = () => setLoading(false);

//     router.events.on('routeChangeStart', handleStart);
//     router.events.on('routeChangeComplete', handleComplete);
//     router.events.on('routeChangeError', handleComplete);

//     return () => {
//       router.events.off('routeChangeStart', handleStart);
//       router.events.off('routeChangeComplete', handleComplete);
//       router.events.off('routeChangeError', handleComplete);
//     };
//   }, [router]);

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       {/* Loading Overlay */}
//       {loading && (
//         <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
//           <div className="w-12 h-12 border-4 border-worknub-green border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       )}
      
//       {/* Navbar */}
//       <Navbar />
      
//       {/* Main Content */}
//       <main className="flex-grow pt-16">
//         {children}
//       </main>
      
//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }
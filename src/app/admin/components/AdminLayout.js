// "use client";

// import Sidebar from "./sidebar";
// import Header from "./header";
// import { useState, useEffect, useRef } from "react";
// import { usePathname } from "next/navigation";

// export default function AdminLayout({
//   children,
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();
//   const sidebarRef = useRef(null);
//   const toggleSidebar = () => {
//     setIsOpen((prev) => !prev);
//   };

//   // Close mobile sidebar when route changes
//   useEffect(() => {
//     setIsOpen(false);
//   }, [pathname]);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current?.contains(event.target )
//       ) {
//         setIsOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);
//   return (
//     <main className="relative flex">
//       {/* Desktop Sidebar */}
//       <div ref={sidebarRef} className="hidden md:block">
//         <Sidebar />
//       </div>

//       {/* Mobile Sidebar */}
//       <div
//         className={`fixed top-0 left-0 z-50 md:hidden h-full bg-white shadow-lg transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "-translate-x-[260px]"
//         }`}
//       >
//         <Sidebar />
//       </div>

//       {/* Page Content */}
//       <section className="flex-1 flex flex-col min-h-screen">
//         <Header toggleSidebar={toggleSidebar} />
//         <section className="flex-1 bg-[#eff3f4]">{children}</section>
//       </section>
//     </main>
//   );
// }

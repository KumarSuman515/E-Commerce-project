"use client";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingCart,
  Folder,
  Tag,
  Package,
  Users,
  Star,
  Layers
} from "lucide-react";

export default function Sidebar() {
  const menuList = [
    { name: "Dashboard", Link: "/admin/dashboard", Icon: LayoutDashboard },
    { name: "Products", Link: "/admin/products", Icon: ShoppingCart },
    { name: "Categories", Link: "/admin/orders", Icon: Folder },
    { name: "Brands", Link: "/admin/reports", Icon: Tag },
    { name: "Order", Link: "", Icon: Package },
    { name: "Customer", Link: "", Icon: Users },
    { name: "Review", Link: "", Icon: Star },
    { name: "Collection", Link: "", Icon: Layers },
  ];

  return (
      <section className="bg-white border-r px-1 items-center py-1 h-screen overflow-hidden md:w-[340px]">
      <Image
  src="/logo.png"
  alt="Logo"
  width={300}  
  height={50}   

/>

      <div className="flex flex-col items-start gap-2 mt-4 w-full">
        {menuList.map((item) => (
          <Link
            key={item.name}
            href={item.Link}
            className="text-[#663300] hover:text-[#4d2600] transition cursor-pointer px-2 py-1 rounded hover:bg-gray-100"
          >
            <item.Icon size={20} className="inline-block mr-2" />
            {item.name}
          </Link>
        ))}
      </div>
      
    </section>
  );
}

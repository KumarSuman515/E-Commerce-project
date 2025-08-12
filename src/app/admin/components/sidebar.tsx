"use client";
import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";
import {
  LayoutDashboard,
  ShoppingCart,
  Folder,
  Tag,
  Package,
  Users,
  Star,
  Layers,
  ShieldCheck
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../lib/firestore/firebase";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuList = [
    { name: "Dashboard", link: "/admin", Icon: LayoutDashboard },
    { name: "Products", link: "/admin/product", Icon: ShoppingCart },
    { name: "Categories", link: "/admin/categories", Icon: Folder },
    { name: "Brands", link: "/admin/Brands", Icon: Tag },
    { name: "Order", link: "/admin/Order", Icon: Package },
    { name: "Customer", link: "/admin/Customer", Icon: Users },
    { name: "Review", link: "/admin/Review", Icon: Star },
    { name: "Collection", link: "/admin/Collection", Icon: Layers },
    { name: "Admin", link: "/admin/admin", Icon: ShieldCheck },
  ];

  // Redirect to login if no user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await toast.promise(
        signOut(auth),
        {
          loading: "Logging out...",
          success: "Logged out successfully",
          error: (err) => err?.message || "Something went wrong",
        }
      );
      router.push("/login"); // Redirect after logout
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <section className="flex flex-col bg-white border-r px-5 h-screen overflow-hidden w-[260px]">
      {/* Logo */}
      <div className="px-1 py-1">
        <Image
          src="/logo.png"
          alt="Logo"
          width={330}
          height={50}
          className="mx-auto"
        />
      </div>

      {/* Menu List */}
      <ul className="flex-1 flex flex-col items-start gap-2 mt-6 ml-4 mr-4 overflow-y-auto">
        {menuList.map((item) => {
          const isSelected = pathname === item.link;
          return (
            <li key={item.name} className="w-full">
              <Link
                href={item.link}
                className={`flex items-center gap-2 px-2 py-1 rounded transition ease-soft-semibold 
                  ${isSelected
                    ? "bg-gray-200 text-[#4d2600]"
                    : "text-[#663300] hover:text-[#4d2600] hover:bg-gray-100"}`}
              >
                <item.Icon size={20} />
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-[#663300] text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-[#4d2600] transition-colors duration-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </section>
  );
}

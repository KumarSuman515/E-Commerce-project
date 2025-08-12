'use client';

import Link from 'next/link';
import Image from 'next/image';
import { auth } from '../../../lib/firestore/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FirebaseError } from 'firebase/app';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("Logout failed");
      }
    }
  };

  const menuList = [
    { name: 'Home', link: '/' },
    { name: 'Shop', link: '/shop' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          {menuList.map((item, index) => (
            <Link key={index} href={item.link}>
              <span className="text-[#663300] hover:text-[#4d2600] transition cursor-pointer">
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link href="/cart">
            <span className="text-xl cursor-pointer hover:text-[#663300]">🛒</span>
          </Link>
          <Link href="/login">
            <button className="bg-[#663300] text-white px-4 py-1 rounded hover:bg-[#4d2600] transition">
              Login
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition"
          >
            Logout
          </button>

          {/* Hamburger for Mobile */}
          <label htmlFor="menu-toggle" className="md:hidden cursor-pointer text-xl">
            ☰
          </label>
        </div>
      </div>

      {/* Hidden Checkbox Toggle */}
      <input type="checkbox" id="menu-toggle" className="hidden peer" />

      {/* Mobile Menu */}
      <div className="peer-checked:block hidden md:hidden bg-white px-4 pb-4 shadow-sm">
        {menuList.map((item, index) => (
          <Link key={index} href={item.link}>
            <div className="py-2 border-b text-[#663300] cursor-pointer">{item.name}</div>
          </Link>
        ))}
        <Link href="/login">
          <div className="py-2 text-[#663300] cursor-pointer">Login</div>
        </Link>
        <div
          onClick={handleLogout}
          className="py-2 text-red-600 cursor-pointer hover:text-red-700"
        >
          Logout
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
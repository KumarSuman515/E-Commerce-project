"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { auth } from "../../../../lib/firestore/firebase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../contexts/authContext";

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <main className="w-full min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Logo & Title */}
        <section className="flex flex-col items-center mb-6">
          <Image
            src="/logo.png"
            alt="logo"
            width={64}
            height={64}
            className="mb-4"
          />
          <h1 className="text-xl font-semibold" style={{ color: "#663300" }}>
            Login
          </h1>
        </section>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <input
              placeholder="Enter your Email"
              type="email"
              name="user-email"
              id="user-email"
              className="px-4 py-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
              required
            />
          </div>
          <div>
            <input
              placeholder="Enter your Password"
              type="password"
              name="user-password"
              id="user-password"
              className="px-4 py-2 rounded border w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white py-2 rounded transition"
            style={{ backgroundColor: "#663300" }}
          >
            Login
          </button>
        </form>

        {/* Links */}
        <div className="mt-4 text-sm text-center text-gray-600">
          <p>
            New?{" "}
            <Link href="/signup" className="text-blue-700 hover:underline">
              Create account
            </Link>
          </p>
          <p className="mt-1">
            <Link href="/forgot-password" className="text-blue-700 hover:underline">
              Forgot Password?
            </Link>
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login */}
        <SignInWithGoogle />
      </div>
    </main>
  );
}

function SignInWithGoogle() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });

      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      toast.success(`Welcome ${user.displayName || "User"}!`);
      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("Google sign-in failed");
      }
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full text-white py-2 rounded transition"
      style={{ background: "#663300" }}
    >
      Sign In With Google
    </button>
  );
}

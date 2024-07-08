"use client";
import { useState } from "react";
import Image from "next/image";
import TermsModal from "@/components/TermsModal";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleGoogleSignInClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAgree = () => {
    setIsModalOpen(false);
    // 실제 구글 로그인 처리
    window.location.href = "/api/auth/google-sign-in";
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form
        className="max-w-md w-full space-y-8 p-6 bg-white shadow rounded-md"
        onSubmit={handleGoogleSignInClick}
      >
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign In</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in with your Google account.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center"
            type="submit"
          >
            <Image
              src="/google.png"
              alt="Google Logo"
              width={20}
              height={20}
              className="mr-2"
            />
            Sign In With Google
          </button>
        </div>
      </form>
      <TermsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAgree={handleAgree}
      />
    </div>
  );
}

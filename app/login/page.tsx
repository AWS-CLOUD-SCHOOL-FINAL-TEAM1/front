"use client";
import { useState } from "react";
import Image from "next/image";
import TermsModal from "@/components/TermsModal";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleLoginClick = () => {
    // 직접 로그인 처리
    window.location.href = "/api/auth/google-sign-in";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-6 bg-white shadow rounded-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome to SPOID
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please log in or sign up with your Google account.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center"
            onClick={handleLoginClick}
          >
            <Image
              src="/google.png"
              alt="Google Logo"
              width={20}
              height={20}
              className="mr-2"
            />
            Log In With Google
          </button>
          <br></br>
          <hr className="w-full left-0 right-0 bottom-0  h-1 bg-gradient-to-r from-gray-200 to-gray-400"></hr>
          <div className="text-center text-gray-600 mt-4">
            <strong> SPOID를 처음 이용하시나요?</strong>
          </div>
          <form onSubmit={handleGoogleSignInClick}>
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
          </form>
        </div>
      </div>
      <TermsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAgree={handleAgree}
      />
    </div>
  );
}

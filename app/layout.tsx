import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          "bg-gradient-to-b from-black via-gray-400 via-gray-100 via-gray-400 to-black"
        )}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto max-w-8xl pt-16 px-4 overflow-hidden">
            <div className="bg-gradient-to-b from-black via-gray-400 via-gray-100 via-gray-400 to-black p-6 rounded-md shadow-md h-full m-0">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

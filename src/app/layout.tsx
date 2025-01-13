import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "@/components/Provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MEMENOTE AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Provider>
          <body className={inter.className}>
            {children}
            <Toaster position="bottom-right" />
          </body>
        </Provider>
      </html>
    </ClerkProvider>
  );
}

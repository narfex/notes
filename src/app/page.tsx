"use client";

import TypewriterTitle from "@/components/ui/TypewriterTitle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Copy } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function Home() {
  const contractAddress = "0x123...abc"; 

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress)
      .then(() => {
        toast.success("Contract address copied!");
      })
      .catch(() => {
        toast.error("Failed to copy address");
      });
  };

  return (
    <div className="bg-gradient-to-r min-h-screen grainy from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Image container */}
        <div className="relative w-[300px] h-[300px] mx-auto mb-8">
          <Image
            src="/mascot.png"
            alt="AI Meme Assistant"
            fill
            priority
            className="object-contain rounded-lg"
          />
        </div>

        <h1 className="font-semibold text-7xl text-center">
          AI <span className="text-green-600 font-bold">MEME</span>{" "}
          assistant.
        </h1>
        <div className="mt-4"></div>
        <h2 className="font-semibold text-3xl text-center text-slate-700">
          <TypewriterTitle />
        </h2>
        <div className="mt-8"></div>

        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button className="bg-green-600">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" strokeWidth={3} />
            </Button>
          </Link>
        </div>

        {/* Contract Address Section */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="relative flex items-center">
            <input
              readOnly
              value={contractAddress}
              className="w-full px-4 py-2 pr-12 bg-white/50 border-2 rounded-md text-center font-mono"
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-2 p-1 hover:bg-green-700 bg-green-600 rounded-md"
            >
              <Copy className="h-4 w-4 text-white" />
            </button>
          </div>
          <p className="text-sm text-center mt-2 text-slate-600">
            Smart Contract Address
          </p>
        </div>
      </div>
    </div>
  );
}
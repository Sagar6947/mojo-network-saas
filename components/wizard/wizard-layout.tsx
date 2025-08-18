"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WizardLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
}

export function WizardLayout({
  children,
  currentStep,
  totalSteps,
  title,
}: WizardLayoutProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 bg-login-banner bg-cover bg-contain bg-no-repeat">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b pt-3">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft size={18} />
              </Button>
            </Link> */}
            <Link href="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="MojoNetwork Logo"
                className="w-auto bottom-4 h-12 md:h-20"
              />
            </Link>
          </div>

          <div className="text-sm font-medium text-[#ca0013 ]">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="fixed top-16 left-0 right-0 z-40 h-1 bg-gray-100">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-purple-700"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 md:pt-[150px] pt-32 pb-16 w-full lg:w-[700px] ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {title}
          </h1>
          {children}
        </motion.div>
      </main>
    </div>
  );
}

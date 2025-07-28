"use client";

import React from "react";

const TermsConditionPage = () => {
  return (
    <>
      <section className="w-full h-[231px] bg-green-700 flex items-center justify-center pages-banner-other">
        <h1 className="text-4xl md:text-5xl text-white font-bold">
          {" "}
          Terms & Conditions
        </h1>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
            <p>
              By accessing or using Mojo India Network’s services, you agree to the
              following terms and conditions. If you do not agree, please
              refrain from using our platform.
            </p>

            <h3 className="text-lg font-semibold text-black">
              1. User Responsibility
            </h3>
            <p>
              You are responsible for the content you publish. Do not upload or
              share any material that is false, defamatory, offensive, or
              violates any laws.
            </p>

            <h3 className="text-lg font-semibold text-black">
              2. Content Ownership
            </h3>
            <p>
              You retain ownership of your original content. However, by posting
              on Mojo India Network, you grant us a non-exclusive, royalty-free
              license to use, display, and distribute your content on our
              platform and promotional channels.
            </p>

            <h3 className="text-lg font-semibold text-black">
              3. Respectful Usage
            </h3>
            <p>
              Any misuse of the platform—such as impersonation, hate speech, or
              spam—will result in account suspension or termination.
            </p>

            <h3 className="text-lg font-semibold text-black">
              4. Platform Changes
            </h3>
            <p>
              Mojo India Network reserves the right to modify, suspend, or discontinue
              services at any time without prior notice.
            </p>

            <h3 className="text-lg font-semibold text-black">
              5. Privacy Policy
            </h3>
            <p>
              Your data is protected as per our{" "}
              <a href="/privacy-policy" className="text-blue-600 underline">
                Privacy Policy
              </a>
              . We do not sell your personal information to third parties.
            </p>

            <h3 className="text-lg font-semibold text-black">
              6. Legal Compliance
            </h3>
            <p>
              Users must comply with all local and international laws when using
              Mojo India Network, including but not limited to copyright, defamation,
              and data protection laws.
            </p>

            <p className="mt-6">
              By using Mojo India Network, you agree to be bound by these terms. We
              encourage you to check this page regularly as terms may update
              without prior notice.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsConditionPage;

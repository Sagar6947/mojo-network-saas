"use client";

import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <>
    <section className="w-full h-[231px] bg-[#fef5f9] flex items-center justify-center pages-banner-other">
        <h1 className="text-4xl md:text-5xl text-black font-bold">
        Privacy Policy
        </h1>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
            <p>
              Mojo India Network values your privacy. This policy outlines how we
              collect, use, and protect your information when you use our
              platform.
            </p>

            <h3 className="text-lg font-semibold text-black">
              1. Information We Collect
            </h3>
            <p>
              We collect information you provide directly (like name, email, or
              content submissions) and data gathered automatically (like
              location, device type, and usage patterns).
            </p>

            <h3 className="text-lg font-semibold text-black">
              2. How We Use Your Data
            </h3>
            <p>
              We use your data to operate and improve Mojo India Network, personalize
              your experience, send notifications, and ensure platform security.
            </p>

            <h3 className="text-lg font-semibold text-black">
              3. Content and Public Visibility
            </h3>
            <p>
              Content you publish on the platform may be publicly visible.
              Please avoid sharing sensitive personal information in your posts.
            </p>

            <h3 className="text-lg font-semibold text-black">
              4. Sharing with Third Parties
            </h3>
            <p>
              We do not sell your personal data. We may share information with
              trusted service providers only to deliver or improve our services,
              under strict confidentiality agreements.
            </p>

            <h3 className="text-lg font-semibold text-black">
              5. Data Protection
            </h3>
            <p>
              We implement industry-standard security measures to protect your
              information from unauthorized access, loss, or misuse.
            </p>

            <h3 className="text-lg font-semibold text-black">
              6. Cookies and Analytics
            </h3>
            <p>
              We use cookies and analytics tools to understand usage trends,
              improve performance, and offer relevant content.
            </p>

            <h3 className="text-lg font-semibold text-black">7. Your Rights</h3>
            <p>
              You may request access, correction, or deletion of your personal
              data by contacting us at{" "}
              <a
                href="mailto:support@mojonetwork.in"
                className="text-blue-600 underline"
              >
                support@mojonetwork.in
              </a>
              .
            </p>

            <h3 className="text-lg font-semibold text-black">
              8. Changes to This Policy
            </h3>
            <p>
              We may update this policy from time to time. Any changes will be
              posted on this page with the updated date.
            </p>

            <p className="mt-6">
              By using Mojo India Network, you agree to this privacy policy. If you
              have questions, please contact us anytime.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;

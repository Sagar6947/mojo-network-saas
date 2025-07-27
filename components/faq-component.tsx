
"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Mojo Network?",
    answer:
      "Mojo Network is a mobile journalism platform that enables reporters to create and manage their own hyperlocal news channels directly from their smartphones.",
  },
  {
    question: "How does the content engine support hyperlocal news?",
    answer:
      "The content engine provides daily, ready-to-publish updates including national, state, cricket, weather, and hyperlocal news—helping reporters maintain a steady stream of relevant content.",
  },
  {
    question:
      "Can I earn money through my hyperlocal news channel on Mojo Network?",
    answer:
      "Yes! Mojo Network offers easy-to-use tools to monetize your mobile journalism efforts with local advertisements, sponsored stories, and Google Ads",
  },
  {
    question:
      "Do I need expensive equipment to practice mobile journalism on Mojo Network?",
    answer:
      "No special or expensive equipment is needed. Reporters can run their full news channel and publish hyperlocal news using just a smartphone.",
  },
  {
    question:
      "How does AI technology help with mobile journalism on Mojo Network?",
    answer:
      "AI tools turn your voice notes and videos into publish-ready news articles, automatically create daily bulletins, and share your hyperlocal news content on social media—saving you time and effort.",
  },
  {
    question:
      "Is Mojo Network available in regional languages for hyperlocal audiences?",
    answer:
      "Yes, Mojo supports Hindi, Bundeli, Bagheli, and other regional languages, helping reporters connect deeply with their hyperlocal audience.",
  },
  {
    question: "What Is The Revenue Stream For Web Publishers?",
    answer:
      "Ad placements, sponsored posts, affiliate marketing, subscription models, and syndication services are common revenue sources.",
  },
  {
    question:
      "How Can I Find The Best News Channel Development Company In India?",
    answer:
      "Look for a company with proven experience, full-featured offerings, client support, and a strong portfolio in digital news publishing.",
  },
  {
    question: "Which Is The Top News Channel Development Company In India?",
    answer:
      "MoJo Network is among the top choices, known for AI-powered content engines, mobile-first design, and seamless publishing tools.",
  },
  {
    question: "Why Should I Work With Your Company?",
    answer:
      "We offer full support, AI tools, scalable infrastructure, compliance assistance, and affordable plans tailored for Indian publishers.",
  },
  {
    question: "What's Your Payment Process?",
    answer:
      "We support yearly and custom payment plans via bank transfer, UPI, or credit card. Invoicing and GST billing available for businesses.",
  },
  {
    question:
      "How Can I Schedule A Consultation With The Experts On The News Channel?",
    answer:
      "Simply use the 'Contact Us' form on our website or call our support number to schedule a free consultation.",
  },
];

const leftFaqs = faqs.slice(0, Math.ceil(faqs.length / 2));
const rightFaqs = faqs.slice(Math.ceil(faqs.length / 2));
const Faq = () => {
  return (
    <>
      <section className="w-full h-[231px] bg-[#fef5f9] flex items-center justify-center pages-banner-other">
        <h1 className="text-4xl md:text-5xl text-black font-bold">
          FAQ's
        </h1>
      </section>

      <section id="faq" className="py-16 bg-white">
        <div className="container max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-black leading-tight">
              Have questions before reaching out?
              <br />
              <span className="text-red-600">Frequently Asked Questions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <Accordion type="multiple" className="w-full space-y-4">
              {leftFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-left-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-sm mt-1">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Accordion type="multiple" className="w-full space-y-4">
              {rightFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-right-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-sm mt-1">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;

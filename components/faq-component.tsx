
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Faq as FaqType } from "@/lib/api";

interface FaqComponentProps {
  faqs: FaqType[];
}

const FaqComponent = ({ faqs }: FaqComponentProps) => {
  const leftFaqs = faqs.slice(0, Math.ceil(faqs.length / 2));
  const rightFaqs = faqs.slice(Math.ceil(faqs.length / 2));
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
                  <AccordionContent className="text-black text-sm mt-1">
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
                  <AccordionContent className="text-black text-sm mt-1">
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

export default FaqComponent;

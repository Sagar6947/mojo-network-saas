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
  pageHeading?: boolean;
}

const FaqComponent = ({ faqs, pageHeading = true }: FaqComponentProps) => {
  return (
    <>
      {/* Banner */}
      {pageHeading && (
        <section className="w-full h-[231px] bg-[#fef5f9] flex items-center justify-center pages-banner-other">
          <h1 className="text-4xl md:text-5xl text-black font-bold">
            FAQ&apos;s
          </h1>
        </section>
      )}

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white">
        <div className="container max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-black leading-tight">
              Have questions before reaching out?
              <br />
              <span className="text-red-600">
                Frequently Asked Questions
              </span>
            </h2>
          </div>

          {/* FAQ Grid */}
          <Accordion
            type="multiple"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-base flex gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span>{faq.question}</span>
                </AccordionTrigger>

                <AccordionContent className="text-black text-sm mt-1">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default FaqComponent;

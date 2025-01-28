import React from "react";
import FaqList from "./faqList";

const Faq = () => {
  return (
    <div>
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">FAQs</h2>
            <p className="text-xl text-gray-600">
              Find answers to your most pressing questions about our services
              and how we can help.
            </p>
            <FaqList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;

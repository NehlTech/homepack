"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItemProps {
  item: {
    question: string;
    content: string;
  };
}

const FaqItem: React.FC<FaqItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="p-3 lg:p-5 rounded-[12px] border border-solid border-primaryColor mb-5 cursor-pointer">
      <div
        className="flex items-center justify-between gap-5"
        onClick={toggleAccordion}
      >
        <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
          {item.question}
        </h4>
        <div
          className={`w-7 h-7 lg:w-8 lg:h-8 border border-solid rounded flex items-center justify-center ${
            isOpen
              ? "bg-primaryColor text-white border-none"
              : "border-[#141F21]"
          }`}
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </div>
      {isOpen && (
        <div className="mt-4">
          <p className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
            {item.content}
          </p>
        </div>
      )}
    </div>
  );
};

export default FaqItem;

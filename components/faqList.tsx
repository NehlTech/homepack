import React from "react";
import FaqItem from "./faqItem";
import { FAQ, faqData } from "@/utils/faqData";

const FaqList: React.FC = () => {
  return (
    <ul>
      {faqData.map((item: FAQ, index: number) => (
        <FaqItem item={item} key={index} />
      ))}
    </ul>
  );
};

export default FaqList;

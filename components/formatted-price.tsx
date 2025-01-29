"use client";

import React from "react";

interface FormattedPriceProps {
  amount: number | string;
}

const FormattedPrice: React.FC<FormattedPriceProps> = ({ amount }) => {
  const formattedAmount = new Number(amount).toLocaleString("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 2,
  });

  return <span>{formattedAmount}</span>;
};

export default FormattedPrice;

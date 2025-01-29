"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import FormattedPrice from "./formatted-price";

interface PriceTagProps {
  regularPrice?: number;
  discountedPrice?: number;
  className?: string;
}

const PriceTag: React.FC<PriceTagProps> = ({
  regularPrice,
  discountedPrice,
  className = "",
}) => {
  return (
    <div className={twMerge("flex items-center gap-2", className)}>
      {regularPrice && (
        <p className="line-through text-gray-500 font-medium">
          <FormattedPrice amount={regularPrice} />
        </p>
      )}
      {discountedPrice && (
        <p className="font-bold text-primaryColor">
          <FormattedPrice amount={discountedPrice} />
        </p>
      )}
    </div>
  );
};

export default PriceTag;

"use client";

import { useEffect, useState } from "react";
import { Eye, LucideArrowLeftRight, Star, StarOff } from "lucide-react";

interface Product {
  _id: string;
  name: string;
}

interface ProductCardSideNavProps {
  product: Product;
}

const ProductCardSideNav: React.FC<ProductCardSideNavProps> = ({ product }) => {
  const [existingProduct, setExistingProduct] = useState<boolean>(false);

  return (
    <div className="absolute right-1 top-1 flex flex-col gap-1 transition translate-x-12 group-hover:translate-x-0 duration-300">
      <button className="w-11 h-11 inline-flex items-center justify-center rounded-full text-black text-lg hover:text-white hover:bg-black duration-200">
        {existingProduct ? (
          <Star className="w-5 h-5" />
        ) : (
          <StarOff className="w-5 h-5" />
        )}
      </button>
      <button className="w-11 h-11 inline-flex items-center justify-center rounded-full text-black text-lg hover:text-white hover:bg-black duration-200">
        <LucideArrowLeftRight />
      </button>
      <button className="w-11 h-11 inline-flex items-center justify-center rounded-full text-black text-lg hover:text-white hover:bg-black duration-200">
        <Eye className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProductCardSideNav;

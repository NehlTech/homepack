import React from "react";
import Link from "next/link";
import Pagination from "@/components/product-pagination";

const Product: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-10 px-4 lg:px-3">
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-bold">Top Selling Products</h2>
          <Link
            href="/product"
            className="font-medium relative group overflow-hidden"
          >
            View All Products
            <span className="absolute bottom-0 left-0 w-full block h-[1px] bg-gray-600 -translate-x-[100%] group-hover:translate-x-0 duration-300" />
          </Link>
        </div>
      </div>

      <Pagination />
    </div>
  );
};

export default Product;

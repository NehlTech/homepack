"use client";
import ReactPaginate from "react-paginate";
import ProductCard from "./product-card";
import { useEffect, useState } from "react";

// Define Product type
interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[]; // Array of image URLs
  regularPrice: number;
  discountedPrice: number;
}

// Define Props for Items Component
interface ItemsProps {
  currentItems: Product[];
}

// Items Component
const Items: React.FC<ItemsProps> = ({ currentItems }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {currentItems.map((item) => (
        <ProductCard key={item._id} item={item} />
      ))}
    </div>
  );
};

// Pagination Component
const Pagination: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [itemStart, setItemStart] = useState<number>(1);

  const itemsPerPage = 15;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/product.json");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle page click
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
    setItemStart(newOffset + 1);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold py-10"
          activeClassName="bg-black text-white"
        />
        <p>
          Products from {itemStart} to {Math.min(endOffset, products.length)} of{" "}
          {products.length}
        </p>
      </div>
    </>
  );
};

export default Pagination;

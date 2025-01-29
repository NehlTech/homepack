"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Minus, Plus } from "lucide-react";

import toast from "react-hot-toast";
import PriceTag from "./price-tag";
import { store } from "@/utils/store";

interface Product {
  _id: string;
  name: string;
  regularPrice: number;
  discountedPrice: number;
  quantity?: number;
}

interface AddToCartBtnProps {
  className?: string;
  title?: string;
  product: Product;
  showPrice?: boolean;
}

const AddToCartBtn: React.FC<AddToCartBtnProps> = ({
  className,
  title = "Add to cart",
  product,
  showPrice = true,
}) => {
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);
  const { addToCart, cartProduct, decreaseQuantity } = store();

  useEffect(() => {
    const availableItem = cartProduct.find(
      (item: Product) => item._id === product?._id
    );
    setExistingProduct(availableItem || null);
  }, [product, cartProduct]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product.name.substring(0, 10)} added successfully!`);
    } else {
      toast.error("Product is not available!");
    }
  };

  const handleDeleteProduct = () => {
    if (existingProduct) {
      if (existingProduct.quantity && existingProduct.quantity > 1) {
        decreaseQuantity(existingProduct._id);
        toast.success(
          `${product.name.substring(0, 10)} decreased successfully`
        );
      } else {
        toast.error("You cannot decrease quantity below 1");
      }
    }
  };

  const newClassName = twMerge(
    "bg-[#f7f7f7] uppercase text-xs py-3 text-center rounded-full font-semibold hover:bg-primaryColor hover:text-white hover:scale-105 duration-200 cursor-pointer",
    className
  );

  const getRegularPrice = () => {
    return existingProduct
      ? product.regularPrice * (existingProduct.quantity || 1)
      : product?.regularPrice;
  };

  const getDiscountedPrice = () => {
    return existingProduct
      ? product.discountedPrice * (existingProduct.quantity || 1)
      : product?.discountedPrice;
  };

  return (
    <>
      {showPrice && (
        <div>
          <PriceTag
            regularPrice={getRegularPrice()}
            discountedPrice={getDiscountedPrice()}
          />
        </div>
      )}
      {existingProduct ? (
        <div className="flex self-center items-center justify-center gap-2">
          <button
            onClick={handleDeleteProduct}
            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-primaryColor rounded-full text-sm hover:bg-white duration-200 cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>
          <p className="text-base font-semibold w-10 text-center">
            {existingProduct.quantity}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-primaryColor rounded-full text-sm hover:bg-white duration-200 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button onClick={handleAddToCart} className={newClassName}>
          {title}
        </button>
      )}
    </>
  );
};

export default AddToCartBtn;

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import ProductCardSideNav from "./productCard-Sideview";
import AddToCartBtn from "./add-to-cartBtn";
import FormattedPrice from "./formatted-price";

// Define Product Type
interface Product {
  _id: string;
  name: string;
  overView?: string;
  images: string[];
  regularPrice: number;
  discountedPrice: number;
}

// Define Props for ProductCard Component
interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  if (!item) return null;

  // Calculate Discount Percentage
  const percentage =
    item.regularPrice && item.discountedPrice
      ? ((item.regularPrice - item.discountedPrice) / item.regularPrice) * 100
      : 0;

  // Handle Product Click
  const handleProduct = () => {
    router.push(`/product/${item._id}`);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-1 overflow-hidden hover:border-black duration-200 cursor-pointer">
      <div className="w-full h-60 relative p-2 group">
        <span
          onClick={open}
          className="bg-white border border-primary text-primary absolute left-0 right-0 w-16 text-xs text-center py-1 rounded-md font-semibold inline-block z-10"
        >
          Save {percentage.toFixed(0)}%
        </span>
        <Image
          onClick={handleProduct}
          src={item.images[0] || "https://via.placeholder.com/150"}
          alt={item.name || "Product Image"}
          width={300}
          height={300}
          className="w-full h-full rounded-md object-cover group-hover:scale-110 duration-300"
        />
        <ProductCardSideNav product={item} />
      </div>
      <div className="flex flex-col gap-2 px-2 pb-2">
        <h3 className="text-xs uppercase font-semibold text-gray-500">
          {item.overView || "Overview not available"}
        </h3>
        <h2 className="text-lg font-bold line-clamp-2">
          {item.name || "Name not available"}
        </h2>
        <div className="text-base text-gray-500 flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-gray-400" />
          ))}
        </div>
        <AddToCartBtn product={item} />
      </div>

      {/* Discount Dialog */}
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform scale-95"
                enterTo="opacity-100 transform scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform scale-100"
                leaveTo="opacity-0 transform scale-95"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-black backdrop-blur-2xl z-50 p-6">
                  <DialogTitle
                    as="h3"
                    className="text-base font-medium text-white"
                  >
                    Hurry up!
                  </DialogTitle>
                  <p className="mt-2 text-sm text-white/50">
                    You are going to save{" "}
                    <span className="text-primary">
                      <FormattedPrice
                        amount={item.regularPrice - item.discountedPrice}
                      />
                    </span>{" "}
                    from this product.
                  </p>
                  <p className="text-sm text-white/50">{item.name}</p>
                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 hover:bg-gray-600 focus:outline-none"
                      onClick={close}
                    >
                      Got it, thanks!
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ProductCard;

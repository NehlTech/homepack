"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  base: string;
  image: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/categories.json");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data: Category[] = await response.json();

        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-24">
      <div className="mb-10">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-bold">Popular Categories</h2>
          <Link
            href="/category/tvAndAudio"
            className="font-medium relative group flex items-center gap-1"
          >
            View All Categories{" "}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 duration-200" />
          </Link>
        </div>
        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-200 mt-3" />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-7">
        {categories.map((item) => (
          <Link
            href={`/category/${item.base}`}
            key={item._id}
            className="w-full h-auto relative group overflow-hidden"
          >
            {/* Category Image */}
            <img
              src={item.image}
              alt={item.name || "Category Image"}
              className="w-full h-auto rounded-md group-hover:scale-110 duration-300"
            />
            {/* Category Name */}
            <div className="absolute bottom-0.5 w-full text-center">
              <p className="text-sm md:text-base font-bold">{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;

import React, { ReactNode } from "react";
import Link from "next/link";
import { cn } from "../../lib/utils";

interface ArticleGridProps {
  className?: string;
  children: ReactNode;
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

interface ArticleGridItemProps {
  className?: string;
  title: string;
  description: string;
  header: ReactNode;
  icon: ReactNode;
  backgroundColor?: string;
}

export const ArticleGridItem: React.FC<ArticleGridItemProps> = ({
  className,
  title,
  description,
  header,
  icon,
  backgroundColor,
}) => {
  return (
    <div
      className={cn(
        "relative row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className,
        backgroundColor
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <Link
          href="/service"
          className="absolute bottom-4 right-4 w-[34px] h-[34px] rounded-full border border-solid border-[#181A1E] mt-[30px] 
          mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
        >
          {icon}
        </Link>
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 mr-8">
          {description}
        </div>
      </div>
    </div>
  );
};

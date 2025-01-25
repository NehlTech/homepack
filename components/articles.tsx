import React from "react";
import Image from "next/image";

import { ArrowRight } from "lucide-react";
import { ArticleGrid, ArticleGridItem } from "./ui/articles-grid";

// Define the interface for an article item
interface ArticleItem {
  title: string;
  description: string;
  header: React.ReactNode;
  backgroundColor: string;
  className: string;
  icon: React.ReactNode;
}

const Articles: React.FC = () => {
  const items: ArticleItem[] = [
    {
      title:
        "The Benefits of Homecare: How In-Home Medical Services Enhance Recovery.",
      description:
        "Explore how personalized homecare can improve patient outcomes, comfort, and overall well-being during recovery.",
      header: (
        <div className="w-full h-48 rounded-xl overflow-hidden relative group">
          <Image
            src="https://images.pexels.com/photos/8770714/pexels-photo-8770714.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="The Dawn of Innovation"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black opacity-40 transition-opacity duration-300 group-hover:opacity-0"></div>
        </div>
      ),
      backgroundColor: "bg-slate-100",
      className: "md:col-span-2",
      icon: <ArrowRight className="group-hover:text-white w-6 h-5" />,
    },
    {
      title: "Essential First Aid Skills Everyone Should Know",
      description: "",
      header: (
        <h2 className="items-center justify-self-center mt-20">
          An informative guide on basic first aid techniques that can make a
          critical difference in emergency situations.
        </h2>
      ),
      backgroundColor: "bg-purple-200",
      className: "md:col-span-1",
      icon: <ArrowRight className="group-hover:text-white w-6 h-5" />,
    },
    {
      title: "Managing Chronic Conditions at Home: Tips and Resources",
      description: "",
      header: (
        <h2 className="items-center justify-self-center mt-20">
          Discover strategies and resources for effectively managing chronic
          health conditions from the comfort of your home.
        </h2>
      ),
      backgroundColor: "bg-cyan-100",
      className: "md:col-span-1",
      icon: <ArrowRight className="group-hover:text-white w-6 h-5" />,
    },
    {
      title: "Telemedicine: Access Quality Healthcare Anytime, Anywhere",
      description: "",
      header: (
        <h2 className="items-center justify-self-center mt-20">
          Learn about the convenience and effectiveness of virtual
          consultations, and how telemedicine is transforming patient care.
        </h2>
      ),
      backgroundColor: "bg-amber-100",
      className: "md:col-span-2",
      icon: <ArrowRight className="group-hover:text-white w-6 h-5" />,
    },
  ];

  return (
    <>
      <div className=" mx-auto">
        <h2 className="heading text-center mb-5">
          Top <span className="text-primaryColor ">Articles</span>
        </h2>
      </div>
      <ArticleGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
        {items.map((item, index) => (
          <ArticleGridItem
            key={index}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
            icon={item.icon}
            backgroundColor={item.backgroundColor}
          />
        ))}
      </ArticleGrid>
    </>
  );
};

const Skeleton: React.FC = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

export default Articles;

import React from "react";
import Link from "next/link";
import { LucideArrowRight } from "lucide-react";

interface Service {
  name: string;
  desc: string;
  bgColor: string;
  textColor: string;
  backgroundImage: string;
  hoverVideo: string;
}

interface ServiceCardProps {
  item: Service;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ item, index }) => {
  const { name, desc, bgColor, textColor, backgroundImage, hoverVideo } = item;

  return (
    <div className="py-[30px] px-2 lg:px-5">
      <div
        className="group w-full px-8 md:w-[350px]   cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent transition-all duration-700"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-0 transition-opacity duration-3000"></div>

        <video
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          src={hoverVideo}
          autoPlay
          loop
          muted
        ></video>

        {/* Text Content */}
        <div className="text relative z-10">
          <h2 className="text-[26px] leading-9 text-white font-[700] relative">
            {name}
          </h2>
          <p className="text-[16px] leading-7 font-[400] text-gray-50 mt-4 relative">
            {desc}
          </p>
          <div className="flex items-center justify-between mt-[30px] text-white">
            <Link
              href="/service"
              className="w-[44px] h-[44px] rounded-full border border-solid border-white flex items-center justify-center group hover:bg-primaryColor hover:border-none"
            >
              <LucideArrowRight className="group-hover:text-white w-6 h-5" />
            </Link>
            <span
              className="w-[44px] h-[44px] flex items-center justify-center text-[18px] leading-[30px] font-[600]"
              style={{
                background: bgColor,
                color: textColor,
                borderRadius: "6px 0 0 6px",
              }}
            >
              {index + 1}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import Link from "next/link";

import { StaticImageData } from "next/image";

// Banner data
export const BannerData = {
  title: "Book Your Appointment",
  description: "Your health, your wealth—take the first step today!",
  image: "/bannerDoc.png",
  bgColor: "#DAA520",
};

// Props type
interface BannerProps {
  data: {
    bgColor: string;
    image: string;
    title: string;
    description: string;
  };
}

const MainBanner: React.FC<BannerProps> = ({ data }) => {
  return (
    <div className="min-h-[400px] flex justify-center items-center py-5 md:py-2">
      <div className="mx-auto px-2 sm:px-12">
        <div
          style={{ backgroundColor: data.bgColor }}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-white rounded-3xl"
        >
          {/* First Column */}
          <div>
            <img
              src={data.image}
              alt="Doctor"
              className="hidden scale-125 md:block md:w-[200px] md:h-[280px] lg:w-[250px] lg:h-[250px] absolute -top-[90px] object-cover lg:ml-10"
            />
          </div>

          {/* Second Column */}
          <div className="p-2 md:p-6 sm:p-8">
            <p className="uppercase text-base md:text-center md:text-xl lg:text-4xl font-bold tracking-wide leading-5">
              {data.title}
            </p>
            <h1 className="text-sm">{data.description}</h1>
          </div>

          {/* Third Column */}
          <div className="flex flex-col mb-2 mx-4 lg:flex-row justify-center gap-3 md:gap-5">
            <button
              style={{ color: data.bgColor }}
              className="bg-white py-2 md:py-2 md:px-4 rounded-full"
            >
              Book Now
            </button>
            <button
              style={{ color: data.bgColor }}
              className="bg-white py-2 md:py-2 md:px-4 rounded-full"
            >
              <Link href="/home">Learn More</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;

// components/ServiceSteps.tsx
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Service {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Step 1",
    subtitle: "Choose Your Desired Services",
    description: "Select from our range of services tailored to your needs.",
    image: "/step1.png",
    link: "/choose-services",
  },
  {
    id: 2,
    title: "Step 2",
    subtitle: "Schedule Your Appointment",
    description: "Pick a date and time that works for you.",
    image: "/step2.png",
    link: "/choose-services",
  },
  {
    id: 3,
    title: "Step 3",
    subtitle: "Confirm Your Booking",
    description: "Review your details and confirm your appointment.",
    image: "/step3.png",
    link: "/choose-services",
  },
];

export const ServiceSteps: React.FC = () => {
  return (
    <div className="mt-14 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:w-11/12 mx-auto gap-12">
      {services.map((service) => (
        <div
          key={service.id}
          className="px-4 py-8 text-center md:w-[300px] mx-auto md:h-80 rounded-md shadow cursor-pointer hover:translate-y-5 hover:border-b-4
           hover:border-primaryColor transition-all duration-300 flex items-center justify-center h-full"
        >
          <div>
            <div className="bg-primaryColor/30 mb-4 h-14 w-14 mx-auto rounded-tl-3xl rounded-br-3xl">
              <Image
                src={service.image}
                alt={service.title}
                width={200}
                height={200}
                className="-ml-5"
              />
            </div>
            <h1 className="text-2xl font-bold text-headingColor mb-2 px-2">
              {service.title}
            </h1>
            <h2 className="text-[20px] text-headingColor font-[700] leading-9">
              {service.subtitle}
            </h2>
            <p className="text-center leading-7 text-textColor">
              {service.description}
            </p>
            <Link href={service.link} passHref>
              <div
                className="w-[44px] h-[44px] rounded-full border border-solid border-primaryColor mt-[30px] 
          mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none cursor-pointer"
              >
                <ArrowRight className="group-hover:text-white w-6 h-5" />
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

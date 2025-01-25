import React from "react";
import { ServiceCard } from "./cards/service-card";

interface Service {
  name: string;
  desc: string;
  bgColor: string;
  textColor: string;
  backgroundImage: string;
  hoverVideo: string;
}

interface ServiceGridProps {
  services: Service[];
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({ services }) => {
  return (
    <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px]  px-16">
      {services.slice(0, 3).map((item, index) => (
        <ServiceCard item={item} index={index} key={index} />
      ))}
    </div>
  );
};

import React from "react";
import { ServiceCard } from "./cards/service-card";
import { services } from "@/utils/data";
import { ServiceGrid } from "./serviceGrid";

const Services = () => {
  return (
    <div className="md:px-14 px-4 py-16 max-w-screen-2xl mx-auto">
      <div className="text-center my-8">
        <h2 className="text-4xl font-semibold mb-2">
          Our medical <span className="text-primaryColor">services</span>
        </h2>
        <p className="text__para text-center">
          World-class care for everyone. Our health Systems offers unmatched,
          expert health service.
        </p>
      </div>
      <ServiceGrid services={services} />
    </div>
  );
};

export default Services;

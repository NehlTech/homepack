import React from "react";
import { ServiceSteps } from "./how-it-work-steps";

const HowItWork = () => {
  return (
    <div>
      <div className="mt-20 md:w-1/2 mx-auto text-center">
        <h2 className="heading text-center">
          How it <span className="text-primaryColor">works</span>
        </h2>
        <p className="text__para text-center">
          Seamless Solutions for Modern Healthcare care.
        </p>
      </div>
      <div>
        <ServiceSteps />
      </div>
    </div>
  );
};

export default HowItWork;

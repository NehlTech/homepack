import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const VirtualTreatment = () => {
  return (
    <div>
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-24">
        <div className="md:w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div>
            <Image
              src="/virtualimg.png"
              alt="virtual"
              width="350"
              height="350"
            />
          </div>
          <div className="md:w-3/5 mx-auto">
            <h2 className="text-4xl text-headingColor font-semibold mb-4 md:w-4/5">
              Get virtual treatment anytime.
            </h2>
            <ul className="md:w-3/4 text-sm text-textColor mb-8">
              <li className="text__para">
                1. Schedule the appointment directly.
              </li>
              <li className="text__para">
                2. Search for your physician and contact thier office.
              </li>
              <li className="text__para">
                3. View our physicians who are accepting new patients, use the
                online scheduling tool to select an appointment time.
              </li>
            </ul>
            <Link href="">
              <button className="btn gap-5 w-56 hover:bg-white border border-primaryColor hover:text-primaryColor">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTreatment;

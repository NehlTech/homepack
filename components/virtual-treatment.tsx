import Image from "next/image";
import React from "react";

const VirtualTreatment = () => {
  return (
    <div>
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-8">
        <div>
          <div>
            <Image
              src="/virtualimg.png"
              alt="virtual"
              width="350"
              height="350"
            />
          </div>
          <div className="md:w-3/5 mx-auto">
            <h2 className="heading">Get virtual treatment anytime.</h2>
            <ul className="pl-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTreatment;

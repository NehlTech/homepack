import Image from "next/image";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 h-full flex items-center justify-center">
        {children}
      </div>
      <div className="hidden md:flex w-1/2 h-full relative">
        <Image
          src="https://cdni.iconscout.com/illustration/premium/thumb/telemedicine-support-illustration-download-in-svg-png-gif-file-formats--online-health-healthcare-digital-checkup-medical-care-pack-illustrations-5122535.png"
          width={1000}
          height={1000}
          alt="Doctor"
          className="w-full h-full object-cover bg-[#DAA520]"
        />
        <div className="absolute top-0 left-0  w-full h-full bg-black bg-opacity-20 z-10 flex flex-col items-center justify-center">
          <h3 className="text-5xl 2xl:text-5xl font-bold text-black">HPMS</h3>
          <p className="text-pink-600 text-3xl 2xl:text-lg">You're welcome</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

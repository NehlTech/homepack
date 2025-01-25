"use client";
import React from "react";
// import image1 from "/../public/image1.png";

const Home = () => {
  const handleBookAppointment = () => {
    // navigate("/patients/dashboard");
  };

  const handleExploreServices = () => {
    // navigate("/services");
  };
  return (
    <div className="bg-[#F5F7FA] header">
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen">
        <div className="flex  gap-[90px] items-center justify-between">
          <div className="flex flex-col ">
            <div className="lg:w-[570px] hero__content">
              <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px] md:flex-col">
                Quality Healthcare
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-violet-600 mr-2">
                  Delivered
                </span>
                to
                <span className="inline-block">Your Doorstep</span>
              </h1>

              <ul>
                <li className="flex gap-3 text__para">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="fill-current h-5 shrink-0 mt-0.5"
                  >
                    <path d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM363.3 203.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 297.4l-52.7-52.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l64 64c6.2 6.2 16.4 6.2 22.6 0l128-128z"></path>
                  </svg>
                  <span className=""> Personalized homecare services</span>
                </li>
                <li className="flex gap-3 text__para">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="fill-current h-5 shrink-0 mt-0.5"
                  >
                    <path d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM363.3 203.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 297.4l-52.7-52.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l64 64c6.2 6.2 16.4 6.2 22.6 0l128-128z"></path>
                  </svg>
                  <span>Virtual Consultations</span>
                </li>
                <li className="flex gap-3 text__para">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="fill-current h-5 shrink-0 mt-0.5"
                  >
                    <path d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM363.3 203.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 297.4l-52.7-52.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l64 64c6.2 6.2 16.4 6.2 22.6 0l128-128z"></path>
                  </svg>
                  <span>First Aid Training</span>
                </li>
              </ul>
              <p className="flex flex-col mt-1 text__para ">
                All accessible from the comfort of your home
              </p>

              <div className="md:flex gap-5 items-center justify-items-center">
                <button
                  className="btn gap-5 w-56 hover:bg-white border border-primaryColor hover:text-primaryColor"
                  onClick={handleBookAppointment}
                >
                  Book Appointment
                </button>
                <button
                  className="btn w-56 hover:bg-white border border-primaryColor hover:text-primaryColor"
                  onClick={handleExploreServices}
                >
                  Explore Services
                </button>
              </div>
            </div>
          </div>
          {/* ================ hero content left-side ends =============== */}

          {/* ================ hero content right-side start =============== */}
          <div className="hidden md:block   justify-end">
            <img className="md:w-full " src="/image1.png" alt="heroimage" />
          </div>
          {/* ================ hero content right-side ends =============== */}
        </div>
      </div>
    </div>
  );
};

export default Home;

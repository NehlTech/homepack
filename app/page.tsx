import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

import { Footer } from "@/components/footer";

import { PublicNavbar } from "@/components/public-navbar";

import { getRole } from "@/utils/roles";
import { checkAndAddNewUser } from "./actions/general-actions";
import Home from "@/components/home";
import Services from "@/components/services";
import HowItWork from "@/components/how-it-works";
import VirtualTreatment from "@/components/virtual-treatment";
import Articles from "@/components/articles";

import MainBanner, { BannerData } from "@/components/main-banner";
import Faq from "@/components/faq";
import Categories from "@/components/categories";

const HomePage = async () => {
  const { userId } = await auth();
  const userRole = await getRole();

  if (userId && userRole) {
    // after(() => {

    // });
    checkAndAddNewUser();

    redirect(`/${userRole}`);
  }

  return (
    <>
      <PublicNavbar />
      <div className="min-h-screen bg-background">
        <Home />
        <Services />
        <HowItWork />
        <VirtualTreatment />
        <Articles />
        <MainBanner data={BannerData} />
        <Categories />
        <Faq />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;

import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Banner, Banner1 } from "@/components/banner";
import { Footer } from "@/components/footer";
import {
  CTA,
  Features,
  StatsSection,
  UserSection,
} from "@/components/home-sections";
import { PublicNavbar } from "@/components/public-navbar";
import { Button } from "@/components/ui/button";
import { getRole } from "@/utils/roles";
import { checkAndAddNewUser } from "./actions/general-actions";

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
        <div className="flex flex-col items-center justify-center h-[40vh] mb-20 lg:mb-0 lg:h-[80vh] px-4">
          <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-center">
                Welcome to <br />
                <span className="text-yellow-600 text-5xl md:text-6xl">
                  Homepack Medical Services
                </span>
              </h1>
            </div>

            <div className="text-center max-w-xl flex flex-col items-center justify-center">
              <p className="mb-8">
                Manage your telemedicine operations, records, and more with our
                powerful medical booking system.
              </p>

              <div className="flex gap-4">
                {userId ? (
                  <Button asChild>
                    <Link href={"/patient"}>View Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Link href="/sign-up">
                      <Button className="md:text-base font-light">
                        New Patient
                      </Button>
                    </Link>
                    <Link href="/sign-in">
                      <Button
                        variant="outline"
                        className="md:text-base underline hover:text-blue-600"
                      >
                        Login to account
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <Banner />

          <UserSection />

          <Features />

          <Banner1 />

          <StatsSection />

          <CTA />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;

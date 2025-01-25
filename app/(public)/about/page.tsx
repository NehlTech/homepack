import { Card, CardContent } from "@/components/ui/card";
import { Award, Building2, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">
            About HomePack Medical Service
          </h1>
          <p className="text-xl text-gray-600">
            Leading the future of telemedicine healthcare management
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <Card className="p-6">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To improve the world’s health through compassionate care and
                innovations.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-gray-600">
                To be the global leader in telemedicine healthcare management
                solutions, setting the standard for efficiency, security, and
                patient care excellence.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <Users className="w-12 h-12 text-[#DAA520] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
            <p className="text-gray-600">
              Led by healthcare and technology experts with decades of
              experience
            </p>
          </div>
          <div className="text-center">
            <Award className="w-12 h-12 text-[#DAA520] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Industry Recognition</h3>
            <p className="text-gray-600">
              Multiple awards for innovation in healthcare technology
            </p>
          </div>
          <div className="text-center">
            <Building2 className="w-12 h-12 text-[#DAA520] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Global Presence</h3>
            <p className="text-gray-600">
              Serving healthcare providers across the nation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

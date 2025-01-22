import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">Get in touch with our team</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <Card className="p-6">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div>
                  <Input placeholder="Your Name" />
                </div>
                <div>
                  <Input type="email" placeholder="Your Email" />
                </div>
                <div>
                  <Textarea placeholder="Your Message" className="h-32" />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-[#DAA520] mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Email</h3>
                <p className="text-gray-600">support@kindahms.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-[#DAA520] mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Phone</h3>
                <p className="text-gray-600">+233 (0)549411141</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-[#DAA520] mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Address</h3>
                <p className="text-gray-600">
                  C502/14, Kojo Ashong
                  <br />
                  Street,
                  <br />
                  Dzorwulu-Accra
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import Link from "next/link";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="px-6 py-12 text-gray-300">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-headingColor font-bold mb-4">
            HomePack Medical Service (HPMS)
          </h3>
          <p className="text-sm text-textColor">
            Your solution to Telemedicine healthcare
          </p>
        </div>

        <div>
          <h4 className="text-headingColor font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="text-textColor hover:text-white transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-textColor hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/features"
                className="text-textColor hover:text-white transition-colors"
              >
                Features
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-headingColor font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/support"
                className="text-textColor hover:text-white transition-colors"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                href="/security"
                className="text-textColor hover:text-white transition-colors"
              >
                Security
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-headingColor font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/privacy"
                className="text-textColor hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-textColor hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-primaryColor text-center text-sm">
        <p className="text-textColor">
          &copy; {year} HomePack Medical Service Management System. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

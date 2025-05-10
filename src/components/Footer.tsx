
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-4 text-center relative z-10">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-center space-x-1 text-primary-600">
          <span className="text-sm font-medium text-purple-600">Age Calculator App</span>
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          <span className="text-sm font-medium text-purple-600">Made by Sanya</span>
        </div>
        <p className="text-xs mt-2 text-gray-500">© {new Date().getFullYear()} | Calculate your exact age in years, months, and days</p>
      </div>
    </footer>
  );
};

export default Footer;

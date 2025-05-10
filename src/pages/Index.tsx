
import { useEffect } from "react";
import AgeCalculator from "@/components/AgeCalculator";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "Age Calculator";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col items-center justify-center">
      <main className="w-full max-w-md px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-6">
          Age Calculator
        </h1>
        <AgeCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

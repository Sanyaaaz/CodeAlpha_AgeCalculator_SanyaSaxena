
import { useEffect } from "react";
import AgeCalculator from "@/components/AgeCalculator";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  useEffect(() => {
    document.title = "Age Calculator";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <AnimatedBackground />
      <main className="w-full max-w-md px-4 py-8 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-6 drop-shadow-md">
          Age Calculator
        </h1>
        <AgeCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

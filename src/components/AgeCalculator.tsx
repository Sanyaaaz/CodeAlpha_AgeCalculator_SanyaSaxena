
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Calculator } from "lucide-react";

interface AgeResult {
  years: number;
  months: number;
  days: number;
}

const AgeCalculator = () => {
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [result, setResult] = useState<AgeResult | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateInputs = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    // Validate day
    const dayNum = parseInt(day);
    if (!day.trim()) {
      newErrors.day = "Day is required";
    } else if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
      newErrors.day = "Day must be between 1 and 31";
    }
    
    // Validate month
    const monthNum = parseInt(month);
    if (!month.trim()) {
      newErrors.month = "Month is required";
    } else if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      newErrors.month = "Month must be between 1 and 12";
    }
    
    // Validate year
    const yearNum = parseInt(year);
    const currentYear = new Date().getFullYear();
    if (!year.trim()) {
      newErrors.year = "Year is required";
    } else if (isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear) {
      newErrors.year = `Year must be between 1900 and ${currentYear}`;
    }
    
    // Check valid date combinations (e.g., Feb 30)
    if (Object.keys(newErrors).length === 0) {
      const inputDate = new Date(yearNum, monthNum - 1, dayNum);
      if (
        inputDate.getFullYear() !== yearNum ||
        inputDate.getMonth() !== monthNum - 1 ||
        inputDate.getDate() !== dayNum
      ) {
        newErrors.day = "Invalid date combination";
      }
      
      // Check if date is in the future
      if (inputDate > new Date()) {
        newErrors.year = "Date cannot be in the future";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateAge = () => {
    if (!validateInputs()) {
      return;
    }

    const birthDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust for negative days
    if (days < 0) {
      months--;
      // Get days in the previous month
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += previousMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({ years, months, days });
    toast.success("Age calculated successfully!");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      calculateAge();
    }
  };

  return (
    <Card className="shadow-lg border-blue-200">
      <CardHeader className="bg-blue-600 text-white text-center py-4 rounded-t-lg">
        <div className="flex items-center justify-center gap-2">
          <Calculator className="h-6 w-6" />
          <h2 className="text-xl font-semibold">Calculate Your Age</h2>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="day" className="text-blue-800">
              Day
            </Label>
            <Input
              id="day"
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className={`mt-1 ${errors.day ? "border-red-500" : "border-gray-300"}`}
              onKeyDown={handleKeyDown}
            />
            {errors.day && (
              <p className="text-red-500 text-xs mt-1">{errors.day}</p>
            )}
          </div>
          <div>
            <Label htmlFor="month" className="text-blue-800">
              Month
            </Label>
            <Input
              id="month"
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className={`mt-1 ${errors.month ? "border-red-500" : "border-gray-300"}`}
              onKeyDown={handleKeyDown}
            />
            {errors.month && (
              <p className="text-red-500 text-xs mt-1">{errors.month}</p>
            )}
          </div>
          <div>
            <Label htmlFor="year" className="text-blue-800">
              Year
            </Label>
            <Input
              id="year"
              placeholder="YYYY"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className={`mt-1 ${errors.year ? "border-red-500" : "border-gray-300"}`}
              onKeyDown={handleKeyDown}
            />
            {errors.year && (
              <p className="text-red-500 text-xs mt-1">{errors.year}</p>
            )}
          </div>
        </div>

        <Button 
          onClick={calculateAge} 
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Calculate Age
        </Button>

        {result && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Your Age is:</h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-3 rounded shadow">
                <span className="block text-2xl font-bold text-blue-600">{result.years}</span>
                <span className="text-sm text-gray-600">Years</span>
              </div>
              <div className="bg-white p-3 rounded shadow">
                <span className="block text-2xl font-bold text-blue-600">{result.months}</span>
                <span className="text-sm text-gray-600">Months</span>
              </div>
              <div className="bg-white p-3 rounded shadow">
                <span className="block text-2xl font-bold text-blue-600">{result.days}</span>
                <span className="text-sm text-gray-600">Days</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AgeCalculator;

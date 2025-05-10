
const Footer = () => {
  return (
    <footer className="w-full py-4 text-center text-sm text-gray-600">
      <p>© {new Date().getFullYear()} Age Calculator App</p>
      <p className="text-xs mt-1">Calculate your exact age in years, months, and days</p>
    </footer>
  );
};

export default Footer;

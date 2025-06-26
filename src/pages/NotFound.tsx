
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dominant">
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold mb-4 text-secondary">404</h1>
        <p className="text-xl text-accent mb-4">Oops! Page not found</p>
        <a href="/" className="text-secondary hover:text-accent underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

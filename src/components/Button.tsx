import React from 'react';

// Import Tailwind CSS directly
import 'tailwindcss/tailwind.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md bg-blue-500 px-4 py-2 text-white font-medium shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
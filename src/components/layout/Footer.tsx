import React from 'react';

// Footer de la aplicación
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-pink-200 dark:border-gray-700 py-4 px-4 transition-colors">
      <div className="container mx-auto text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Made with 💖 for couples • LoveSpace © 2025
        </p>
      </div>
    </footer>
  );
};

export default Footer;
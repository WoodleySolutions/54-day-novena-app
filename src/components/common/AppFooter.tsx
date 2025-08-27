import React from 'react';

export const AppFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 text-center py-6 border-t border-gray-200 bg-white/50">
      <div className="space-y-2">
        <p className="text-gray-600 text-sm">
          Developed by{' '}
          <span className="font-semibold text-gray-800">Woodley Solutions</span>
        </p>
        <p className="text-gray-500 text-xs">
          © {currentYear} Woodley Solutions. All rights reserved.
        </p>
        <p className="text-gray-400 text-xs italic">
          Traditional prayers are in the public domain
        </p>
      </div>
    </footer>
  );
};
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-border mt-20">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-text-secondary">&copy; {new Date().getFullYear()} Festic. All rights reserved.</p>
          <div className="text-2xl font-bold text-text-primary">
            Festic<span className="text-primary">.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
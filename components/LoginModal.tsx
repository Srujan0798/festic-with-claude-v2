import React, { useState } from 'react';
import { Role } from '../types';
import type { User } from '../types';
import { MOCK_USERS } from '../constants';
import { UniversityIcon, VendorIcon, StudentIcon } from './IconComponents';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const roleIcons: Record<Role, React.ReactNode> = {
    [Role.Host]: <UniversityIcon className="w-6 h-6 mr-2" />,
    [Role.Vendor]: <VendorIcon className="w-6 h-6 mr-2" />,
    [Role.Student]: <StudentIcon className="w-6 h-6 mr-2" />,
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [activeRole, setActiveRole] = useState<Role>(Role.Student);

  if (!isOpen) return null;

  const handleLogin = () => {
    const user = MOCK_USERS.find(u => u.role === activeRole);
    if (user) {
      onLogin(user);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale">
        <div className="p-8">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-text-primary mb-2">Sign In As</h2>
            <button onClick={onClose} className="text-text-secondary hover:text-text-primary">&times;</button>
          </div>
          <p className="text-text-secondary mb-6">Select your role to continue to your dashboard.</p>
          
          <div className="flex space-x-2 bg-background p-1 rounded-lg mb-6">
            {(Object.values(Role) as Role[]).map(role => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeRole === role
                    ? 'bg-primary text-white shadow'
                    : 'text-text-secondary hover:bg-background'
                }`}
              >
                {roleIcons[role]}
                {role}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary">Email address</label>
              <input type="email" id="email" defaultValue={MOCK_USERS.find(u => u.role === activeRole)?.email} className="mt-1 block w-full bg-background border-border rounded-md shadow-sm py-2 px-3 text-text-primary focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-secondary">Password</label>
              <input type="password" id="password" defaultValue="••••••••" className="mt-1 block w-full bg-background border-border rounded-md shadow-sm py-2 px-3 text-text-primary focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
          </div>
          
          <div className="mt-8">
            <button
              onClick={handleLogin}
              className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-primary"
            >
              Sign In as {activeRole}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale { animation: fadeInScale 0.3s forwards; }
      `}</style>
    </div>
  );
};

export default LoginModal;
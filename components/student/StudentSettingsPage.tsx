import React from 'react';
import type { User } from '../../types';
import MobileHeader from '../MobileHeader';
import { LogoutIcon } from '../IconComponents';

interface StudentSettingsPageProps {
  user: User;
  onBack: () => void;
  onLogout: () => void;
}

const StudentSettingsPage: React.FC<StudentSettingsPageProps> = ({ user, onBack, onLogout }) => {
  return (
    <div className="h-full w-full flex flex-col bg-background animate-fade-in">
        <MobileHeader user={user} title="Settings" showBackButton onBack={onBack} />
        <main className="flex-grow overflow-y-auto p-4">
            <div className="text-center pt-20">
                <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
                <p className="text-text-secondary mt-2">App settings and preferences will be available here.</p>
                 <button
                    onClick={onLogout}
                    className="mt-12 inline-flex items-center justify-center px-6 py-3 bg-danger text-white font-bold rounded-lg hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-danger"
                >
                    <LogoutIcon className="w-5 h-5 mr-2" />
                    Logout
                </button>
            </div>
        </main>
        <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            .animate-fade-in { animation: fadeIn 0.3s ease-in-out; }
        `}</style>
    </div>
  );
};

export default StudentSettingsPage;
import React from 'react';
import { UniversityIcon, UsersIcon, ImageIcon, BriefcaseIcon, ChevronLeftIcon, TruckIcon, ShieldIcon, HomeIcon, WrenchIcon, LogoutIcon } from '../IconComponents';

interface DashboardSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: string) => void;
  onLogout: () => void;
}

const roles = [
    { name: 'University', description: 'Overall event management', icon: UniversityIcon },
    { name: 'Team Principle', description: 'Oversee your assigned team', icon: UsersIcon },
    { name: 'Media Team', description: 'Upload photos and videos', icon: ImageIcon },
    { name: 'Vendor Management', description: 'Handle vendor applications', icon: BriefcaseIcon },
    { name: 'Logistics Team', description: 'Manage setup and inventory', icon: TruckIcon },
    { name: 'Security Team', description: 'Handle safety and incidents', icon: ShieldIcon },
    { name: 'Hospitality Team', description: 'Guest and catering management', icon: HomeIcon },
    { name: 'Technical Team', description: 'Equipment and sound', icon: WrenchIcon },
];

const DashboardSwitcherModal: React.FC<DashboardSwitcherModalProps> = ({ isOpen, onClose, onSelectRole, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-2xl transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale">
        <div className="p-8">
            <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-text-primary mb-2">Switch Dashboard</h2>
                <button onClick={onClose} className="text-text-secondary hover:text-text-primary">&times;</button>
            </div>
            <p className="text-text-secondary mb-6">Select a role to view its dashboard.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                {roles.map((role) => (
                    <div
                    key={role.name}
                    onClick={() => onSelectRole(role.name)}
                    className="p-4 bg-background rounded-lg border border-border text-center transition-all duration-200 cursor-pointer hover:shadow-md hover:border-primary hover:-translate-y-1"
                    >
                        <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center bg-primary/10">
                            <role.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-sm font-bold text-text-primary mt-3">{role.name}</h3>
                    </div>
                ))}
            </div>
             <div className="mt-8">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center p-3 text-left text-danger font-semibold hover:bg-danger/5 rounded-md transition-colors"
                >
                    <LogoutIcon className="w-5 h-5 mr-2" />
                    <span>Logout</span>
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

export default DashboardSwitcherModal;

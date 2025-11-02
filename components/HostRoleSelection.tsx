import React from 'react';
import { UniversityIcon, UsersIcon, ImageIcon, BriefcaseIcon, ChevronLeftIcon, TruckIcon, ShieldIcon, HomeIcon, WrenchIcon } from './IconComponents';

interface HostRoleSelectionProps {
  onSelectRole: (role: string) => void;
  onBack: () => void;
}

const roles = [
    { name: 'University', description: 'Manage all events, teams, and vendors for the entire university.', icon: UniversityIcon, enabled: true },
    { name: 'Team Principle', description: 'Oversee your assigned team and manage members for a specific event.', icon: UsersIcon, enabled: true },
    { name: 'Media Team', description: 'Upload photos and videos', icon: ImageIcon, enabled: true },
    { name: 'Vendor Management', description: 'Handle vendor applications', icon: BriefcaseIcon, enabled: true },
    { name: 'Logistics Team', description: 'Manage setup and inventory', icon: TruckIcon, enabled: true },
    { name: 'Security Team', description: 'Handle safety and incidents', icon: ShieldIcon, enabled: true },
    { name: 'Hospitality Team', description: 'Guest and catering management', icon: HomeIcon, enabled: true },
    { name: 'Technical Team', description: 'Equipment and sound', icon: WrenchIcon, enabled: true },
];

const HostRoleSelection: React.FC<HostRoleSelectionProps> = ({ onSelectRole, onBack }) => {
  return (
    <div className="h-full overflow-y-auto text-center p-8 pt-24 bg-background animate-fade-in relative">
      <div className="w-full max-w-4xl mx-auto">
          <button
              onClick={onBack}
              className="absolute top-8 left-8 flex items-center text-primary font-semibold hover:underline"
          >
              <ChevronLeftIcon className="w-5 h-5 mr-1" />
              Back
          </button>
        <h1 className="text-4xl font-bold text-text-primary">Select Your Dashboard</h1>
        <p className="mt-4 text-lg text-text-secondary">Choose your role to access the appropriate management panel.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {roles.map((role) => (
            <div
              key={role.name}
              onClick={() => role.enabled && onSelectRole(role.name)}
              className={`p-8 bg-surface rounded-xl border border-border transition-all duration-300 transform hover:-translate-y-2 ${
                role.enabled 
                  ? 'cursor-pointer hover:shadow-xl hover:shadow-primary/20 hover:border-primary' 
                  : 'opacity-60 cursor-not-allowed'
              }`}
            >
                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${role.enabled ? 'bg-primary/10' : 'bg-gray-200'}`}>
                    <role.icon className={`w-8 h-8 ${role.enabled ? 'text-primary' : 'text-gray-500'}`} />
                </div>
              <h2 className="text-xl font-bold text-text-primary mt-6">{role.name}</h2>
              <p className="text-sm text-text-secondary mt-2 min-h-[56px]">{role.description}</p>
              {!role.enabled && (
                  <span className="mt-4 inline-block px-3 py-1 text-xs font-semibold text-accent-dark bg-accent/20 rounded-full">Coming Soon</span>
              )}
            </div>
          ))}
        </div>
      </div>
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
      `}</style>
    </div>
  );
};

export default HostRoleSelection;
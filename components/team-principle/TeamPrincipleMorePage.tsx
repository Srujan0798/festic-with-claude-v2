import React from 'react';
import type { AllTeamPrincipleViews } from './TeamPrincipleDashboard';
import { 
    UsersIcon, 
    ImageIcon,
    BriefcaseIcon,
    FileTextIcon,
    MegaphoneIcon,
    AlertTriangleIcon,
    ChevronLeftIcon,
    SwitchIcon,
    LogoutIcon
} from '../IconComponents';

interface TeamPrincipleMorePageProps {
  onNavigate: (view: AllTeamPrincipleViews) => void;
  onLogout: () => void;
  onSwitchDashboard: () => void;
}

const navItems = [
    { id: 'media', label: 'Media', icon: ImageIcon },
    { id: 'vendor', label: 'Vendors', icon: BriefcaseIcon },
    { id: 'volunteer', label: 'Volunteers', icon: UsersIcon },
    { id: 'registrations', label: 'Registrations', icon: FileTextIcon },
    { id: 'announcements', label: 'Announcements', icon: MegaphoneIcon },
    { id: 'incident-report', label: 'Incident Report', icon: AlertTriangleIcon },
];

const TeamPrincipleMorePage: React.FC<TeamPrincipleMorePageProps> = ({ onNavigate, onLogout, onSwitchDashboard }) => {
  return (
    <div className="p-4 animate-fade-in">
        <header className="mb-8 hidden md:block">
            <h1 className="text-3xl font-bold text-text-primary">More Options</h1>
            <p className="text-text-secondary mt-1">Access all management tools for your event.</p>
        </header>

        <div className="space-y-3">
            <button 
                onClick={onSwitchDashboard}
                className="w-full flex items-center p-4 text-left bg-surface rounded-lg border border-border hover:bg-background"
            >
                <SwitchIcon className="w-6 h-6 mr-4 text-primary" />
                <span className="text-lg font-semibold text-text-primary">Switch Dashboard</span>
            </button>
            {navItems.map(item => (
                <button 
                    key={item.id}
                    onClick={() => onNavigate(item.id as AllTeamPrincipleViews)}
                    className="w-full flex items-center p-4 text-left bg-surface rounded-lg border border-border hover:bg-background"
                >
                    <item.icon className="w-6 h-6 mr-4 text-primary" />
                    <span className="text-lg font-semibold text-text-primary">{item.label}</span>
                </button>
            ))}
        </div>
        
        <div className="mt-8">
             <button
                onClick={onLogout}
                className="w-full flex items-center p-4 text-left bg-surface rounded-lg border border-border text-danger hover:bg-danger/5"
            >
                <LogoutIcon className="w-6 h-6 mr-4" />
                <span className="text-lg font-semibold">Logout</span>
            </button>
        </div>

        <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
        `}</style>
    </div>
  );
};

export default TeamPrincipleMorePage;
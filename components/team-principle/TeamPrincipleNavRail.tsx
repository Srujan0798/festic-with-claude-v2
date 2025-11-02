import React from 'react';
import type { User, Event } from '../../types';
import type { AllTeamPrincipleViews } from './TeamPrincipleDashboard';
import { 
    UsersIcon, 
    ImageIcon,
    CalendarDaysIcon,
    BriefcaseIcon,
    FileTextIcon,
    MegaphoneIcon,
    BellIcon,
    MailIcon,
    AlertTriangleIcon,
    TruckIcon,
    ShieldIcon,
    HomeIcon,
    WrenchIcon,
    SwitchIcon
} from '../IconComponents';

interface TeamPrincipleNavRailProps {
  user: User;
  onLogout: () => void;
  activeView: AllTeamPrincipleViews;
  setActiveView: (view: AllTeamPrincipleViews) => void;
  event: Event;
  className?: string;
  onSwitchDashboard: () => void;
}

const navItems: { id: AllTeamPrincipleViews, label: string, icon: React.FC<{className?: string}> }[] = [
    { id: 'events', label: 'Events', icon: CalendarDaysIcon },
    { id: 'team', label: 'My Team', icon: UsersIcon },
    { id: 'media', label: 'Media Monitor', icon: ImageIcon },
    { id: 'vendor', label: 'Vendor Monitor', icon: BriefcaseIcon },
    { id: 'logistics', label: 'Logistics Monitor', icon: TruckIcon },
    { id: 'security', label: 'Security Monitor', icon: ShieldIcon },
    { id: 'hospitality', label: 'Hospitality Monitor', icon: HomeIcon },
    { id: 'technical', label: 'Technical Monitor', icon: WrenchIcon },
    { id: 'volunteer', label: 'Volunteers', icon: UsersIcon },
    { id: 'registrations', label: 'Registrations', icon: FileTextIcon },
    { id: 'announcements', label: 'Announcements', icon: MegaphoneIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'messages', label: 'Messages', icon: MailIcon },
    { id: 'incident-report', label: 'Incident Report', icon: AlertTriangleIcon },
];

const TeamPrincipleNavRail: React.FC<TeamPrincipleNavRailProps> = ({ user, onLogout, activeView, setActiveView, event, className, onSwitchDashboard }) => {
  return (
    <nav className={`w-64 h-full bg-surface border-r border-border flex-col flex-shrink-0 ${className}`}>
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-text-primary">{event.name}</h1>
        <p className="text-sm text-text-secondary mt-1">Team Principle Panel</p>
      </div>

      <div className="px-4 py-6 flex-grow overflow-y-auto">
        <button 
            onClick={onSwitchDashboard}
            className="w-full mb-4 flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-md text-text-secondary bg-background hover:bg-border"
        >
            <SwitchIcon className="w-5 h-5 mr-2" />
            Switch Dashboard
        </button>
        <ul className="space-y-2">
            {navItems.map(item => (
                <li key={item.id}>
                    <button 
                        onClick={() => setActiveView(item.id)}
                        className={`w-full flex items-center px-4 py-2.5 text-sm font-semibold rounded-md transition-colors duration-200 ${
                            activeView === item.id
                            ? 'bg-primary/10 text-primary' 
                            : 'text-text-secondary hover:bg-background'
                        }`}
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        <span>{item.label}</span>
                    </button>
                </li>
            ))}
        </ul>
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center">
            <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover bg-background p-1" />
            <div className="ml-3 flex-grow min-w-0">
                <p className="text-sm font-semibold text-text-primary truncate">{user.name}</p>
                <p className="text-xs text-text-secondary truncate">{user.email}</p>
            </div>
             <button
                onClick={onLogout}
                className="ml-2 text-text-secondary hover:text-danger flex-shrink-0"
                aria-label="Logout"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </button>
        </div>
      </div>
    </nav>
  );
};

export default TeamPrincipleNavRail;
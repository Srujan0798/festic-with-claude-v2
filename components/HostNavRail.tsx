import React from 'react';
import type { User } from '../types';
import { HomeIcon, SearchIcon, ImageIcon, BellIcon, MailIcon, PlusSquareIcon, SwitchIcon } from './IconComponents';

interface HostNavRailProps {
  user: User;
  onLogout: () => void;
  activeView: string;
  setActiveView: (view: any) => void;
  onSwitchDashboard: () => void;
}

const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'search', label: 'Search', icon: SearchIcon },
    { id: 'media', label: 'Media', icon: ImageIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'messages', label: 'Messages', icon: MailIcon },
];

const HostNavRail: React.FC<HostNavRailProps> = ({ user, onLogout, activeView, setActiveView, onSwitchDashboard }) => {
  return (
    <nav className="w-64 h-full bg-surface border-r border-border flex flex-col flex-shrink-0">
      <div className="p-6">
        <a href="#" className="text-3xl font-bold text-text-primary">
          Festic<span className="text-primary">.</span>
        </a>
        <p className="text-sm text-text-secondary mt-1">University Panel</p>
      </div>

      <div className="px-4 flex-grow">
        <button className="w-full mb-4 flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-primary rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-primary transition-all">
            <PlusSquareIcon className="w-5 h-5 mr-2" />
            Create Event
        </button>

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
                            (activeView === item.id || (activeView === 'manage-event' && item.id === 'home'))
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

export default HostNavRail;
import React from 'react';
import type { TeamMember } from '../../types';
import { MOCK_EVENTS } from '../../constants';
import { BellIcon, MailIcon, SwitchIcon, LogoutIcon } from '../IconComponents';

interface TeamDashboardLayoutProps {
    user: TeamMember;
    onLogout: () => void;
    onSwitchDashboard: () => void;
    title: string;
    navIcon: React.FC<{className?: string}>;
    primaryAction?: {
        label: string;
        icon: React.FC<{className?: string}>;
        onClick: () => void;
    };
    children: React.ReactNode;
}

const TeamDashboardLayout: React.FC<TeamDashboardLayoutProps> = ({ user, onLogout, onSwitchDashboard, title, navIcon: NavIcon, primaryAction, children }) => {
    const event = MOCK_EVENTS.find(e => e.id === user.assignedEventId);

    return (
        <div className="flex h-screen w-screen bg-background">
            <nav className="w-20 lg:w-64 h-full bg-surface border-r border-border flex flex-col flex-shrink-0">
                <div className="p-4 lg:p-6 border-b border-border">
                    <a href="#" className="text-2xl lg:text-3xl font-bold text-text-primary">
                        {title.charAt(0)}<span className="hidden lg:inline">{title.slice(1)}</span><span className="text-primary">.</span>
                    </a>
                </div>
                <div className="px-2 lg:px-4 py-6 flex-grow">
                    {primaryAction && (
                         <button onClick={primaryAction.onClick} className="w-full mb-4 flex items-center justify-center px-3 py-3 text-sm font-medium text-white bg-primary rounded-lg hover:opacity-90">
                            <primaryAction.icon className="w-5 h-5 lg:mr-2" />
                            <span className="hidden lg:inline">{primaryAction.label}</span>
                        </button>
                    )}
                     <button onClick={onSwitchDashboard} className="w-full mb-4 flex items-center justify-center px-3 py-2.5 text-sm font-semibold rounded-md text-text-secondary bg-background hover:bg-border">
                        <SwitchIcon className="w-5 h-5 lg:mr-2" />
                        <span className="hidden lg:inline">Switch</span>
                    </button>
                    <ul className="space-y-2">
                        <li><button className="w-full flex items-center justify-center lg:justify-start px-3 py-2.5 text-sm font-semibold rounded-md bg-primary/10 text-primary"><NavIcon className="w-5 h-5 lg:mr-3" /><span className="hidden lg:inline">Dashboard</span></button></li>
                        <li><button className="w-full flex items-center justify-center lg:justify-start px-3 py-2.5 text-sm font-semibold rounded-md text-text-secondary hover:bg-background"><BellIcon className="w-5 h-5 lg:mr-3" /><span className="hidden lg:inline">Alerts</span></button></li>
                        <li><button className="w-full flex items-center justify-center lg:justify-start px-3 py-2.5 text-sm font-semibold rounded-md text-text-secondary hover:bg-background"><MailIcon className="w-5 h-5 lg:mr-3" /><span className="hidden lg:inline">Chat</span></button></li>
                    </ul>
                </div>
                <div className="p-2 lg:p-4 border-t border-border">
                    <div className="flex items-center justify-center lg:justify-start">
                        <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                        <div className="hidden lg:block ml-3 flex-grow min-w-0">
                            <p className="text-sm font-semibold text-text-primary truncate">{user.name}</p>
                            <p className="text-xs text-text-secondary truncate">{user.teamType}</p>
                        </div>
                        <button onClick={onLogout} className="hidden lg:block ml-2 text-text-secondary hover:text-danger flex-shrink-0"><LogoutIcon className="w-5 h-5" /></button>
                    </div>
                </div>
            </nav>
            <main className="flex-1 h-screen overflow-y-auto p-4 md:p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary">{title} Dashboard</h1>
                        <p className="text-text-secondary mt-1">Event: {event?.name || 'N/A'}</p>
                    </div>
                </header>
                {children}
            </main>
        </div>
    );
};

export default TeamDashboardLayout;

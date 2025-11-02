import React from 'react';
import type { TeamPrincipleView } from './TeamPrincipleDashboard';
import { 
    UsersIcon, 
    CalendarDaysIcon,
    BellIcon,
    MailIcon,
    MenuIcon
} from '../IconComponents';

interface TeamPrincipleBottomNavProps {
  activeView: TeamPrincipleView;
  setActiveView: (view: TeamPrincipleView) => void;
  className?: string;
}

const navItems = [
    { id: 'events', icon: CalendarDaysIcon, label: 'Events' },
    { id: 'team', icon: UsersIcon, label: 'Team' },
    { id: 'notifications', icon: BellIcon, label: 'Alerts' },
    { id: 'messages', icon: MailIcon, label: 'Chat' },
    { id: 'more', icon: MenuIcon, label: 'More' },
];

const TeamPrincipleBottomNav: React.FC<TeamPrincipleBottomNavProps> = ({ activeView, setActiveView, className }) => {
    return (
        <nav className={`fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-border flex justify-around items-center z-50 ${className}`}>
            {navItems.map(item => {
                const isActive = activeView === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => setActiveView(item.id as TeamPrincipleView)}
                        className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${isActive ? 'text-primary' : 'text-text-secondary'}`}
                        aria-label={item.label}
                    >
                        <item.icon className="w-6 h-6" />
                        <span className="text-[10px] font-medium mt-1">{item.label}</span>
                    </button>
                );
            })}
        </nav>
    );
};

export default TeamPrincipleBottomNav;
import React from 'react';
import { HomeIcon, SearchIcon, UsersIcon, BellIcon, MailIcon } from './IconComponents';

type Tab = 'home' | 'search' | 'community' | 'notifications' | 'messages';

interface BottomNavBarProps {
    activeTab: Tab;
    onTabClick: (tab: Tab) => void;
}

const navItems = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'search', icon: SearchIcon, label: 'Search' },
    { id: 'community', icon: UsersIcon, label: 'Community' },
    { id: 'notifications', icon: BellIcon, label: 'Notifications' },
    { id: 'messages', icon: MailIcon, label: 'Messages' },
];

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabClick }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-border flex justify-around items-center z-50">
            {navItems.map(item => {
                const isActive = activeTab === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => onTabClick(item.id as Tab)}
                        className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${isActive ? 'text-primary' : 'text-text-secondary'}`}
                        aria-label={item.label}
                    >
                        <item.icon className="w-6 h-6" />
                    </button>
                );
            })}
        </nav>
    );
};

export default BottomNavBar;

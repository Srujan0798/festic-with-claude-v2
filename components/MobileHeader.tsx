import React from 'react';
import type { User } from '../types';
import { UserCircleIcon, SettingsIcon, ChevronLeftIcon } from './IconComponents';

interface MobileHeaderProps {
  user: User;
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ user, title, showBackButton, onBack, onProfileClick, onSettingsClick }) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between p-4 h-16 bg-surface/80 backdrop-blur-sm border-b border-border">
      <div className="w-10 h-10 flex-shrink-0">
        {showBackButton ? (
          <button onClick={onBack} className="w-full h-full flex items-center justify-center rounded-full hover:bg-background">
            <ChevronLeftIcon className="w-6 h-6 text-text-primary" />
          </button>
        ) : (
            <button onClick={onProfileClick} className="p-1 rounded-full hover:bg-background">
                <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
            </button>
        )}
      </div>
      <h1 className="text-xl font-bold text-text-primary absolute left-1/2 -translate-x-1/2 whitespace-nowrap">{title}</h1>
      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-end">
         <button onClick={onSettingsClick} className="p-1 rounded-full hover:bg-background">
            <SettingsIcon className="w-6 h-6 text-text-primary" />
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;
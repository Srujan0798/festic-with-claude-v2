import React from 'react';
import { MOCK_NOTIFICATIONS } from '../constants';
import MobileHeader from './MobileHeader';
import type { User } from '../types';
import { BellIcon, UniversityIcon } from './IconComponents';

interface NotificationsScreenProps {
    user: User;
    onProfileClick?: () => void;
    onSettingsClick?: () => void;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ user, onProfileClick, onSettingsClick }) => {
    return (
        <div className="flex flex-col h-full">
            <MobileHeader user={user} title="Notifications" onProfileClick={onProfileClick} onSettingsClick={onSettingsClick} />
            <div className="flex-grow overflow-y-auto">
                {MOCK_NOTIFICATIONS.map(notif => (
                    <div key={notif.id} className="flex p-4 border-b border-border">
                        <div className="mr-4 mt-1">
                            {notif.user ? <UniversityIcon className="w-6 h-6 text-primary" /> : <BellIcon className="w-6 h-6 text-secondary" />}
                        </div>
                        <div>
                            <p className="text-text-primary">
                                {notif.user && <span className="font-bold">{notif.user}</span>} {notif.text}
                            </p>
                            <p className="text-sm text-text-secondary mt-1">{notif.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationsScreen;
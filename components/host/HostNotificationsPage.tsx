import React from 'react';
import { MOCK_NOTIFICATIONS } from '../../constants';
import { BellIcon, UniversityIcon } from '../IconComponents';

const HostNotificationsPage: React.FC = () => {
    return (
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary">Notifications</h1>
                <p className="text-text-secondary mt-1">Recent activity across all your events.</p>
            </header>
            <div className="bg-surface rounded-lg border border-border overflow-hidden max-w-4xl mx-auto">
                <ul className="divide-y divide-border">
                    {MOCK_NOTIFICATIONS.map(notif => (
                        <li key={notif.id} className="flex items-start p-6 hover:bg-background/50 transition-colors duration-200">
                            <div className="mr-4 mt-1 flex-shrink-0 h-10 w-10 flex items-center justify-center bg-primary/10 rounded-full">
                                {notif.user ? <UniversityIcon className="w-5 h-5 text-primary" /> : <BellIcon className="w-5 h-5 text-secondary" />}
                            </div>
                            <div className="flex-grow">
                                <p className="text-text-primary">
                                    {notif.user && <span className="font-bold">{notif.user}</span>} {notif.text}
                                </p>
                                <p className="text-sm text-text-secondary mt-1">{notif.time}</p>
                            </div>
                        </li>
                    ))}
                    {MOCK_NOTIFICATIONS.length === 0 && (
                        <li className="p-10 text-center text-text-secondary">
                            You have no new notifications.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default HostNotificationsPage;
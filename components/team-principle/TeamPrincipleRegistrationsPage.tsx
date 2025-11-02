import React from 'react';
import type { Event } from '../../types';
import { UsersIcon, LocationIcon } from '../IconComponents';

interface TeamPrincipleRegistrationsPageProps {
  event: Event;
}

const stats = [
    { name: 'Total Registrations', value: '4,582', icon: UsersIcon },
    { name: 'Local Attendees', value: '3,105', icon: LocationIcon },
    { name: 'Out-of-Station', value: '1,477', icon: LocationIcon },
];

const recentRegistrations = [
    { name: 'Ravi Kumar', event: 'RoboWars', time: '2m ago' },
    { name: 'Priya Sharma', event: 'AI & ML Workshop', time: '5m ago' },
    { name: 'Anjali Singh', event: 'Step-Up Dance Show', time: '10m ago' },
    { name: 'Vikram Rathore', event: 'Drone Racing', time: '12m ago' },
    { name: 'Sunita Menon', event: 'Theatrix Drama Night', time: '15m ago' },
];

const TeamPrincipleRegistrationsPage: React.FC<TeamPrincipleRegistrationsPageProps> = ({ event }) => {
    return (
        <div className="p-8 animate-fade-in">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary">Registrations & Logistics</h1>
                <p className="text-text-secondary mt-1">Key metrics for {event.name}.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map(stat => (
                    <div key={stat.name} className="bg-surface p-6 rounded-lg border border-border">
                        <div className="flex items-center">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <stat.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-text-secondary">{stat.name}</p>
                                <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-surface rounded-lg border border-border">
                <h3 className="text-xl font-bold text-text-primary p-6 border-b border-border">Recent Registrations</h3>
                <ul className="divide-y divide-border">
                    {recentRegistrations.map((reg, index) => (
                        <li key={index} className="flex justify-between items-center p-4 hover:bg-background/50">
                            <div>
                                <p className="font-semibold text-text-primary">{reg.name}</p>
                                <p className="text-sm text-text-secondary">Registered for {reg.event}</p>
                            </div>
                            <p className="text-sm text-text-secondary">{reg.time}</p>
                        </li>
                    ))}
                </ul>
            </div>


            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
            `}</style>
        </div>
    );
};

export default TeamPrincipleRegistrationsPage;

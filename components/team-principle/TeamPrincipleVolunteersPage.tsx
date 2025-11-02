import React, { useState } from 'react';
import type { Event } from '../../types';
import { MOCK_USERS } from '../../constants';

interface TeamPrincipleVolunteersPageProps {
  event: Event;
}

const volunteers = [
  { ...MOCK_USERS[2], assignedTo: 'RoboWars' },
  { ...MOCK_USERS[3], assignedTo: 'Step-Up Dance Show' },
  { id: 'v-1', name: 'Frank Miller', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', assignedTo: 'RoboWars' },
  { id: 'v-2', name: 'Grace Lee', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100', assignedTo: 'Theatrix Drama Night' },
  { id: 'v-3', name: 'Heidi Klum', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100', assignedTo: 'Step-Up Dance Show' },
];

const subEvents = [
  { name: 'RoboWars', volunteers: ['Charlie Davis', 'Frank Miller'] },
  { name: 'Step-Up Dance Show', volunteers: ['Diana Prince', 'Heidi Klum'] },
  { name: 'Theatrix Drama Night', volunteers: ['Grace Lee'] },
];

type VolunteerTab = 'person' | 'event';

const TeamPrincipleVolunteersPage: React.FC<TeamPrincipleVolunteersPageProps> = ({ event }) => {
    const [activeTab, setActiveTab] = useState<VolunteerTab>('person');
    
    const renderPersonWise = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteers.map(v => (
                <div key={v.id} className="bg-surface p-4 rounded-lg border border-border flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img src={v.avatarUrl} alt={v.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                            <p className="font-semibold text-text-primary">{v.name}</p>
                            <p className="text-sm text-text-secondary">Assigned: {v.assignedTo}</p>
                        </div>
                    </div>
                    <button className="text-xs font-semibold text-primary hover:underline">Details</button>
                </div>
            ))}
        </div>
    );

    const renderEventWise = () => (
        <div className="space-y-6">
            {subEvents.map(se => (
                <div key={se.name} className="bg-surface p-6 rounded-lg border border-border">
                    <h3 className="text-lg font-bold text-text-primary mb-3">{se.name}</h3>
                    <div className="flex flex-wrap gap-4">
                        {volunteers.filter(v => v.assignedTo === se.name).map(v => (
                            <div key={v.id} className="flex items-center space-x-2 bg-background p-2 rounded-md">
                                <img src={v.avatarUrl} alt={v.name} className="w-6 h-6 rounded-full object-cover" />
                                <p className="text-sm font-semibold text-text-primary">{v.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
    
    const renderContent = () => {
        switch (activeTab) {
            case 'person': return renderPersonWise();
            case 'event': return renderEventWise();
            default: return null;
        }
    };
    
    const tabs: { id: VolunteerTab, label: string }[] = [
        { id: 'person', label: 'Person-wise' },
        { id: 'event', label: 'Event-wise' },
    ];

    return (
        <div className="p-8 animate-fade-in">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary">Volunteer Coordination</h1>
                <p className="text-text-secondary mt-1">Manage volunteers for {event.name}.</p>
            </header>

            <div className="border-b border-border mb-6">
                <div className="flex space-x-8">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-3 px-1 font-semibold transition-colors duration-200 ${activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary/80'}`}>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div>{renderContent()}</div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
            `}</style>
        </div>
    );
};

export default TeamPrincipleVolunteersPage;

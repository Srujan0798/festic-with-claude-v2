import React, { useState } from 'react';
import type { Event } from '../../types';

interface TeamPrincipleAnnouncementsPageProps {
  event: Event;
}

type AnnounceTab = 'audience' | 'team';
type TeamTarget = 'all' | 'volunteers';

const TeamPrincipleAnnouncementsPage: React.FC<TeamPrincipleAnnouncementsPageProps> = ({ event }) => {
    const [activeTab, setActiveTab] = useState<AnnounceTab>('audience');
    const [teamTarget, setTeamTarget] = useState<TeamTarget>('all');
    
    const renderAudience = () => (
         <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="text-xl font-bold text-text-primary mb-2">Broadcast to Audience</h3>
            <p className="text-text-secondary mb-4">This message will be sent as a notification to all attendees and followers of the event.</p>
            <textarea
                rows={6}
                placeholder="e.g., The gates for the Pronite will open at 6:30 PM. Please have your passes ready."
                className="w-full bg-background border border-border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="mt-4 px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:opacity-90">Send Announcement</button>
        </div>
    );

    const renderTeam = () => (
        <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="text-xl font-bold text-text-primary mb-2">Message Your Team</h3>
            <p className="text-text-secondary mb-4">Send an internal announcement to your event staff.</p>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-text-secondary mb-2">Select Target</label>
                <div className="flex space-x-2 bg-background p-1 rounded-lg">
                    <button onClick={() => setTeamTarget('all')} className={`w-full py-2 text-sm font-medium rounded-md ${teamTarget === 'all' ? 'bg-primary text-white shadow' : 'text-text-secondary'}`}>All Team Members</button>
                    <button onClick={() => setTeamTarget('volunteers')} className={`w-full py-2 text-sm font-medium rounded-md ${teamTarget === 'volunteers' ? 'bg-primary text-white shadow' : 'text-text-secondary'}`}>Volunteers Only</button>
                </div>
            </div>

            <textarea
                rows={6}
                placeholder="e.g., All volunteers for the Dance Show, please report to the green room at 5:00 PM for a briefing."
                className="w-full bg-background border border-border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="mt-4 px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:opacity-90">Send to {teamTarget === 'all' ? 'All Team' : 'Volunteers'}</button>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'audience': return renderAudience();
            case 'team': return renderTeam();
            default: return null;
        }
    };
    
    const tabs: { id: AnnounceTab, label: string }[] = [
        { id: 'audience', label: 'To Audience' },
        { id: 'team', label: 'To Team' },
    ];

    return (
        <div className="p-8 animate-fade-in">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary">Announcements</h1>
                <p className="text-text-secondary mt-1">Broadcast important updates for {event.name}.</p>
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

            <div className="max-w-4xl mx-auto">{renderContent()}</div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
            `}</style>
        </div>
    );
};

export default TeamPrincipleAnnouncementsPage;

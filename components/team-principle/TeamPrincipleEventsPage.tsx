import React from 'react';
import type { Event } from '../../types';
import { MOCK_SUB_EVENTS } from '../../constants';
import { CalendarDaysIcon, UsersIcon } from '../IconComponents';

interface TeamPrincipleEventsPageProps {
  event: Event;
  onEventClick: (event: Event) => void;
}

const getTypePill = (tags: string[]) => {
    const type = tags.find(t => ['Competition', 'Workshop', 'Performance'].includes(t)) || 'Event';
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
    switch (type) {
        case 'Competition': return <span className={`${baseClasses} bg-primary/10 text-primary`}>{type}</span>;
        case 'Workshop': return <span className={`${baseClasses} bg-accent/20 text-accent-dark`}>{type}</span>;
        case 'Performance': return <span className={`${baseClasses} bg-secondary/10 text-secondary`}>{type}</span>;
        default: return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{type}</span>;
    }
}

const TeamPrincipleEventsPage: React.FC<TeamPrincipleEventsPageProps> = ({ event, onEventClick }) => {
    return (
        <div className="p-4 md:p-8 animate-fade-in">
             <header className="mb-8 hidden md:block">
                <h1 className="text-3xl font-bold text-text-primary">Events under {event.name}</h1>
                <p className="text-text-secondary mt-1">Manage all sub-events, competitions, and workshops.</p>
            </header>
            
            <div className="space-y-6">
                {MOCK_SUB_EVENTS.map(sub => (
                    <div 
                        key={sub.id} 
                        onClick={() => onEventClick(sub)}
                        className="bg-surface p-5 rounded-lg border border-border transition-all hover:shadow-md hover:border-primary/50 cursor-pointer"
                    >
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                            <div>
                                <div className="flex items-center gap-4">
                                    <h2 className="text-xl font-bold text-text-primary">{sub.name}</h2>
                                    {getTypePill(sub.tags)}
                                </div>
                                <p className="text-sm text-text-secondary mt-1">{sub.university}</p>
                            </div>
                            <div className="mt-4 sm:mt-0 flex flex-col sm:items-end space-y-2 sm:space-y-0">
                                <div className="flex items-center text-sm font-semibold text-text-primary">
                                    <CalendarDaysIcon className="w-4 h-4 mr-2 text-primary" />
                                    <span>{sub.date}</span>
                                </div>
                                <div className="flex items-center text-sm font-semibold text-text-primary">
                                    <UsersIcon className="w-4 h-4 mr-2 text-primary" />
                                    <span>{sub.expectedFootfall.toLocaleString()}+ Attendees</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
            `}</style>
        </div>
    );
};

export default TeamPrincipleEventsPage;

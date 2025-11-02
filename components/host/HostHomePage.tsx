import React, { useState } from 'react';
import EventCard from '../EventCard';
import CreateEventModal from './CreateEventModal';
import { PlusSquareIcon, CalendarDaysIcon, BriefcaseIcon, UsersIcon } from '../IconComponents';
import type { Event, User } from '../../types';

interface HostHomePageProps {
    user: User;
    events: Event[];
    onSelectEvent: (event: Event) => void;
}

const StatCard: React.FC<{ title: string, value: string | number, icon: React.ElementType }> = ({ title, value, icon: Icon }) => (
    <div className="bg-surface p-6 rounded-lg border border-border">
        <div className="flex items-center">
            <div className="p-3 bg-primary/10 rounded-full">
                <Icon className="w-6 h-6 text-primary" />
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-text-secondary">{title}</p>
                <p className="text-2xl font-bold text-text-primary">{value}</p>
            </div>
        </div>
    </div>
);

const HostHomePage: React.FC<HostHomePageProps> = ({ user, events, onSelectEvent }) => {
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const handleCreateEvent = (newEvent: Omit<Event, 'id' | 'hostId'>) => {
        console.log("Creating new event:", newEvent);
        // Here you would typically call an API to create the event
        // and then update the state. For now, we'll just close the modal.
        setCreateModalOpen(false);
    }

    return (
        <div className="p-8 animate-fade-in">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary">Events Dashboard</h1>
                    <p className="text-text-secondary mt-1">Manage all your university's fests from here.</p>
                </div>
                <button 
                    onClick={() => setCreateModalOpen(true)}
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary transition-all"
                >
                    <PlusSquareIcon className="w-5 h-5 mr-2" />
                    Create New Event
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Events" value={events.length} icon={CalendarDaysIcon} />
                <StatCard title="Active Events" value={events.filter(e => new Date(e.date.split(',')[1]) > new Date()).length} icon={CalendarDaysIcon} />
                <StatCard title="Total Vendors" value="78" icon={BriefcaseIcon} />
                <StatCard title="Team Members" value="125" icon={UsersIcon} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {events.map(event => (
                    <EventCard 
                        key={event.id}
                        event={event}
                        onClick={() => onSelectEvent(event)}
                        actionButton={
                            <div className="flex justify-between items-center">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${event.visibility === 'public' ? 'bg-success/10 text-success-dark' : 'bg-accent/20 text-accent-dark'}`}>
                                    {event.visibility}
                                </span>
                                <button className="text-sm font-semibold text-primary hover:underline">Manage Event</button>
                            </div>
                        }
                    />
                ))}
                {events.length === 0 && (
                     <div className="text-center py-20 border-2 border-dashed border-border rounded-lg col-span-full">
                        <h2 className="text-xl font-semibold text-text-primary">No events yet!</h2>
                        <p className="text-text-secondary mt-2 mb-6">Get started by creating your first university fest.</p>
                        <button 
                            onClick={() => setCreateModalOpen(true)}
                            className="flex items-center mx-auto px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:opacity-90"
                        >
                            <PlusSquareIcon className="w-5 h-5 mr-2" />
                            Create Event
                        </button>
                    </div>
                )}
            </div>
            
            <CreateEventModal 
                isOpen={isCreateModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onCreate={handleCreateEvent}
            />
             <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
            `}</style>
        </div>
    );
};

export default HostHomePage;
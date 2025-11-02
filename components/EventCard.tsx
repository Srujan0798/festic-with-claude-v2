import React from 'react';
import type { Event } from '../types';
import { LocationIcon, UsersIcon } from './IconComponents';

interface EventCardProps {
    event: Event;
    actionButton?: React.ReactNode;
    onClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, actionButton, onClick }) => {
    return (
        <div 
            onClick={onClick}
            className={`bg-surface rounded-xl overflow-hidden shadow-md border border-border transition-all duration-300 group ${onClick ? 'cursor-pointer hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50 transform hover:-translate-y-1' : ''}`}
        >
            <div className="overflow-hidden">
                 <img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" src={event.imageUrl} alt={event.name} />
            </div>
            <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-text-primary">{event.name}</h3>
                </div>
                <div className="flex items-center text-sm text-text-secondary mb-4 space-x-4">
                    <div className="flex items-center">
                        <LocationIcon className="w-4 h-4 mr-1.5 text-primary" />
                        <span>{event.university}</span>
                    </div>
                     <div className="flex items-center">
                        <UsersIcon className="w-4 h-4 mr-1.5 text-primary" />
                        <span>{event.expectedFootfall.toLocaleString()}+</span>
                    </div>
                </div>
                <p className="text-text-secondary text-sm mb-4 min-h-[40px]">{event.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">{tag}</span>
                    ))}
                </div>
                {actionButton && <div className="mt-4">{actionButton}</div>}
            </div>
            <div className="px-5 py-3 bg-background/50 text-right">
                <p className="text-sm font-semibold text-text-primary">{event.date}</p>
            </div>
        </div>
    );
}

export default EventCard;
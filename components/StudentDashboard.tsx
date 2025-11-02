import React, { useState, useMemo, TouchEvent } from 'react';
import EventCard from './EventCard';
import MobileHeader from './MobileHeader';
import { MOCK_EVENTS } from '../constants';
import type { Event, User } from '../types';

interface SearchScreenProps {
    user: User;
    onEventClick: (event: Event) => void;
    onProfileClick?: () => void;
    onSettingsClick?: () => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ user, onEventClick, onProfileClick, onSettingsClick }) => {
    const tabs = useMemo(() => ['For You', 'Trending', 'Nearby', 'Marquee'], []);
    const [activeTab, setActiveTab] = useState(tabs[0]);
    
    // Touch state for swipe gesture
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchMoveX, setTouchMoveX] = useState<number | null>(null);

    // Memoize event data for each tab to prevent reshuffling on render
    const marqueeEvents = useMemo(() => 
        [...MOCK_EVENTS]
            .sort((a, b) => b.expectedFootfall - a.expectedFootfall)
            .slice(0, 25), 
        []
    );

    const eventsForYou = useMemo(() => [...MOCK_EVENTS].sort(() => Math.random() - 0.5), []);
    const eventsTrending = useMemo(() => [...MOCK_EVENTS].sort((a, b) => b.expectedFootfall - a.expectedFootfall), []);
    const eventsNearby = useMemo(() => [...MOCK_EVENTS].slice(5, 15).sort(() => Math.random() - 0.5), []);

    const getEventsForTab = (tab: string) => {
        switch (tab) {
            case 'Trending':
                return eventsTrending;
            case 'Nearby':
                return eventsNearby;
            case 'For You':
                return eventsForYou;
            default:
                return [];
        }
    };
    
    const activeIndex = useMemo(() => tabs.indexOf(activeTab), [activeTab, tabs]);

    const handleTouchStart = (e: TouchEvent) => {
        setTouchStartX(e.targetTouches[0].clientX);
        setTouchMoveX(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (touchStartX === null) return;
        setTouchMoveX(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStartX === null || touchMoveX === null) return;

        const diff = touchStartX - touchMoveX;
        const threshold = 50; // Min swipe distance in pixels

        if (Math.abs(diff) > threshold) {
            const newIndex = diff > 0 ? activeIndex + 1 : activeIndex - 1;
            if (newIndex >= 0 && newIndex < tabs.length) {
                setActiveTab(tabs[newIndex]);
            }
        }

        setTouchStartX(null);
        setTouchMoveX(null);
    };
    
    return (
        <div className="flex flex-col h-full">
            <MobileHeader user={user} title="Search" onProfileClick={onProfileClick} onSettingsClick={onSettingsClick} />
            
            <div className="p-4 border-b border-border bg-surface">
                <input
                    type="text"
                    placeholder="Search for events..."
                    className="w-full bg-background border-border rounded-full py-2 px-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
            
            <div className="border-b border-border flex bg-surface">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3 text-center font-semibold transition-colors duration-200 text-sm ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-text-secondary'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div 
                className="flex-grow overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div 
                    className="flex h-full transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {tabs.map(tab => (
                        <div key={tab} className="w-full flex-shrink-0 h-full overflow-y-auto p-4">
                            {tab === 'Marquee' ? (
                                <div className="space-y-3">
                                    <h2 className="text-xl font-bold text-text-primary mb-2">Top 25 Fests in the Nation</h2>
                                    {marqueeEvents.map((event, index) => (
                                        <div 
                                            key={event.id} 
                                            onClick={() => onEventClick(event)} 
                                            className="flex items-center p-3 bg-surface rounded-lg cursor-pointer hover:bg-border/60 shadow-sm border border-border"
                                        >
                                            <div className="text-xl font-bold text-primary w-8 text-center flex-shrink-0">{index + 1}</div>
                                            <img src={event.imageUrl} className="w-16 h-16 rounded-md object-cover mx-4" alt={event.name}/>
                                            <div className="flex-grow min-w-0">
                                                <p className="font-bold text-text-primary truncate">{event.name}</p>
                                                <p className="text-sm text-text-secondary truncate">{event.university}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-6">
                                    {getEventsForTab(tab).map(event => (
                                        <EventCard 
                                            key={event.id} 
                                            event={event}
                                            onClick={() => onEventClick(event)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchScreen;
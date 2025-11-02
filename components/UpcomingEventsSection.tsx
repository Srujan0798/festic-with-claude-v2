import React, { useState, useMemo, TouchEvent } from 'react';
import { MOCK_POSTS_FOR_YOU, MOCK_POSTS_FOLLOWING } from '../constants';
import PostCard from './FeaturesSection'; // Repurposed FeaturesSection as PostCard
import MobileHeader from './MobileHeader';
import type { Event, User } from '../types';

interface HomeScreenProps {
    user: User;
    onEventClick: (event: Event) => void;
    onProfileClick?: () => void;
    onSettingsClick?: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ user, onEventClick, onProfileClick, onSettingsClick }) => {
    const tabs = useMemo(() => ['For You', 'Following'], []);
    const [activeTab, setActiveTab] = useState(tabs[0]);

    // Touch state for swipe gesture
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchMoveX, setTouchMoveX] = useState<number | null>(null);

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
            <MobileHeader user={user} title="Festic" onProfileClick={onProfileClick} onSettingsClick={onSettingsClick} />
            <div className="flex border-b border-border bg-surface">
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
                    <div className="w-full flex-shrink-0 h-full overflow-y-auto">
                        {MOCK_POSTS_FOR_YOU.map(post => (
                            <PostCard key={post.id} post={post} onEventClick={() => onEventClick(post.event)} />
                        ))}
                    </div>
                    <div className="w-full flex-shrink-0 h-full overflow-y-auto">
                        {MOCK_POSTS_FOLLOWING.map(post => (
                            <PostCard key={post.id} post={post} onEventClick={() => onEventClick(post.event)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
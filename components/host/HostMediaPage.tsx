import React, { useState, useMemo } from 'react';
import { MOCK_POSTS } from '../../constants';
import type { Event } from '../../types';
import { GridIcon, ClapperboardIcon, ListIcon, UsersIcon } from '../IconComponents';
import PostCard from '../FeaturesSection'; // Re-using the student-side post card

interface HostMediaPageProps {
    hostEvents: Event[];
}

type MediaTab = 'grid' | 'reels' | 'scroll';

const HostMediaPage: React.FC<HostMediaPageProps> = ({ hostEvents }) => {
    const [activeTab, setActiveTab] = useState<MediaTab>('grid');

    const hostEventIds = useMemo(() => new Set(hostEvents.map(e => e.id)), [hostEvents]);

    const mediaPosts = useMemo(() =>
        MOCK_POSTS.filter(post => hostEventIds.has(post.event.id))
    , [hostEventIds]);

    const renderGrid = () => (
        <div className="grid grid-cols-3 gap-1">
            {mediaPosts.map(post => (
                <div key={post.id} className="relative aspect-square group cursor-pointer">
                    <img src={post.imageUrl} alt={post.caption} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <span className="mr-1">❤️</span> {post.likes}
                            </div>
                            <div className="flex items-center">
                                <span className="mr-1">💬</span> {post.comments}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderReels = () => (
        <div className="text-center py-20 border-2 border-dashed border-border rounded-lg">
            <ClapperboardIcon className="w-12 h-12 mx-auto text-text-secondary" />
            <h2 className="text-xl font-semibold text-text-primary mt-4">Reels Under Construction</h2>
            <p className="text-text-secondary mt-2">A dedicated space for your event's video content is coming soon!</p>
        </div>
    );

    const renderScroll = () => (
        <div className="max-w-2xl mx-auto py-4">
            {mediaPosts.map(post => (
                <div key={post.id} className="mb-4 rounded-lg overflow-hidden border border-border">
                    {/* The PostCard from student view expects onEventClick, but we don't need it here for the host view */}
                    <PostCard post={post} onEventClick={() => {}} />
                </div>
            ))}
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'grid': return renderGrid();
            case 'reels': return renderReels();
            case 'scroll': return renderScroll();
            default: return null;
        }
    };
    
    const tabs: {id: MediaTab, label: string, icon: React.FC<{className?: string}>}[] = [
        { id: 'grid', label: 'Grid', icon: GridIcon },
        { id: 'reels', label: 'Reels', icon: ClapperboardIcon },
        { id: 'scroll', label: 'Scroll', icon: ListIcon },
    ];

    return (
        <div className="p-8">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary">Media Hub</h1>
                    <p className="text-text-secondary mt-1">A unified gallery of all media from your events.</p>
                </div>
            </header>
            
            <div className="border-b border-border flex justify-center mb-4">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center px-6 py-3 font-semibold transition-colors duration-200 text-sm -mb-px ${
                            activeTab === tab.id
                            ? 'text-primary border-b-2 border-primary'
                            : 'text-text-secondary hover:text-text-primary'
                        }`}
                    >
                        <tab.icon className="w-5 h-5 mr-2" />
                        {tab.label.toUpperCase()}
                    </button>
                ))}
            </div>

            <div>
                {renderContent()}
            </div>
        </div>
    );
};

export default HostMediaPage;
import React, { useState } from 'react';
import type { TeamMember } from '../../types';
import { MOCK_POSTS } from '../../constants';
import { PlusSquareIcon, ImageIcon, BellIcon, MailIcon, SettingsIcon, LogoutIcon } from '../IconComponents';
import MediaUploadModal from './MediaUploadModal';
import TeamDashboardLayout from './TeamDashboardLayout';

const MediaTeamDashboard: React.FC<{ user: TeamMember, onLogout: () => void, onSwitchDashboard: () => void }> = ({ user, onLogout, onSwitchDashboard }) => {
    const mediaPosts = MOCK_POSTS.slice(0, 10);
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('all');

    const filteredPosts = () => {
        switch (activeTab) {
            case 'pending': return mediaPosts.slice(0, 2);
            case 'published': return mediaPosts.slice(2);
            case 'all':
            default: return mediaPosts;
        }
    }
    
    const tabs = [
        { id: 'all', label: 'All Posts' },
        { id: 'pending', label: 'Pending Approval' },
        { id: 'published', label: 'Published' },
    ];


  return (
    <>
    <TeamDashboardLayout
        user={user}
        onLogout={onLogout}
        onSwitchDashboard={onSwitchDashboard}
        title="Media"
        navIcon={ImageIcon}
        primaryAction={{
            label: 'Upload',
            icon: PlusSquareIcon,
            onClick: () => setUploadModalOpen(true)
        }}
    >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-surface p-4 rounded-lg border border-border"><p className="text-sm text-text-secondary">Total Posts</p><p className="text-2xl font-bold text-text-primary">145</p></div>
            <div className="bg-surface p-4 rounded-lg border border-border"><p className="text-sm text-text-secondary">Total Likes</p><p className="text-2xl font-bold text-text-primary">12.3k</p></div>
            <div className="bg-surface p-4 rounded-lg border border-border"><p className="text-sm text-text-secondary">Engagement</p><p className="text-2xl font-bold text-text-primary">5.8%</p></div>
        </div>
        
        <div className="border-b border-border mb-6">
            <div className="flex space-x-8">
                {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-3 px-1 font-semibold transition-colors duration-200 ${activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary/80'}`}>
                        {tab.label} ({tab.id === 'all' ? mediaPosts.length : tab.id === 'pending' ? 2 : 8})
                    </button>
                ))}
            </div>
        </div>

        <div className="bg-surface p-6 rounded-lg border border-border">
            <h2 className="text-xl font-bold text-text-primary mb-4">Recent Posts</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPosts().map(post => (
                    <div key={post.id} className="relative aspect-square group cursor-pointer overflow-hidden rounded-md">
                        <img src={post.imageUrl} alt={post.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-2 flex flex-col justify-end">
                            <p className="text-white text-xs font-semibold truncate">{post.caption}</p>
                            <p className="text-white/80 text-xs">❤️ {post.likes}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </TeamDashboardLayout>
    <MediaUploadModal isOpen={isUploadModalOpen} onClose={() => setUploadModalOpen(false)} />
    </>
  );
};

export default MediaTeamDashboard;
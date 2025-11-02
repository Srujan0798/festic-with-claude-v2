import React from 'react';

// Using a simplified Post type for props
interface Post {
    id: string;
    user: { name: string; avatarUrl: string };
    event: { name: string; imageUrl: string };
    imageUrl: string;
    caption: string;
    likes: number;
    comments: number;
    time: string;
}

interface PostCardProps {
    post: Post;
    onEventClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onEventClick }) => {
    return (
        <div className="bg-surface border-b border-border">
            <div className="p-4">
                <div className="flex items-center mb-3">
                    <img src={post.user.avatarUrl} alt={post.user.name} className="w-10 h-10 rounded-full mr-3 object-cover" />
                    <div>
                        <p className="font-bold text-text-primary">{post.user.name}</p>
                        <p className="text-sm text-text-secondary">{post.time}</p>
                    </div>
                </div>
                <p className="text-text-primary mb-3">{post.caption}</p>
                <div 
                    onClick={onEventClick}
                    className="p-3 bg-background rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-border/60"
                >
                    <img src={post.event.imageUrl} alt={post.event.name} className="w-16 h-16 bg-primary/20 rounded-md flex-shrink-0 object-cover" />
                    <div>
                        <p className="font-semibold text-primary">Event</p>
                        <p className="font-bold text-text-primary">{post.event.name}</p>
                    </div>
                </div>
            </div>
            <img src={post.imageUrl} alt="Post image" className="w-full object-cover" />
            <div className="p-4 flex justify-around items-center text-text-secondary">
                <button className="flex items-center space-x-2">
                    <span>❤️</span>
                    <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2">
                    <span>💬</span>
                    <span>{post.comments}</span>
                </button>
                <button>
                    <span>🔗</span>
                </button>
            </div>
        </div>
    );
};

export default PostCard;
import React, { useState } from 'react';
import type { Event } from '../../types';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (event: Omit<Event, 'id' | 'hostId'>) => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [university, setUniversity] = useState('');
    const [description, setDescription] = useState('');
    const [expectedFootfall, setExpectedFootfall] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [tags, setTags] = useState('');
    const [communityTag, setCommunityTag] = useState('tech');
    const [visibility, setVisibility] = useState<'public' | 'private'>('public');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newEvent = {
            name,
            date,
            university,
            description,
            expectedFootfall,
            imageUrl,
            tags: tags.split(',').map(tag => tag.trim()),
            communityTag,
            visibility,
        };
        onCreate(newEvent);
    }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-2xl transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-text-primary mb-2">Create a New Fest</h2>
            <button type="button" onClick={onClose} className="text-text-secondary hover:text-text-primary">&times;</button>
          </div>
          <p className="text-text-secondary mb-6">Fill in the details below to publish your event on Festic.</p>
          
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <input type="text" placeholder="Event Name" value={name} onChange={e => setName(e.target.value)} className="input-field" required />
            <input type="text" placeholder="Event Date (e.g., October 26-28, 2024)" value={date} onChange={e => setDate(e.target.value)} className="input-field" required />
            <input type="text" placeholder="University Name" value={university} onChange={e => setUniversity(e.target.value)} className="input-field" required />
            <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="input-field min-h-[100px]" required />
            <input type="number" placeholder="Expected Footfall" value={expectedFootfall || ''} onChange={e => setExpectedFootfall(parseInt(e.target.value, 10))} className="input-field" required />
            <input type="text" placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="input-field" required />
            <input type="text" placeholder="Tags (comma-separated, e.g., Music, Arts, Food)" value={tags} onChange={e => setTags(e.target.value)} className="input-field" />
             <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Visibility</label>
                <div className="flex space-x-2 bg-background p-1 rounded-lg">
                    <button type="button" onClick={() => setVisibility('public')} className={`w-full py-2 text-sm font-medium rounded-md ${visibility === 'public' ? 'bg-primary text-white shadow' : 'text-text-secondary'}`}>Public</button>
                    <button type="button" onClick={() => setVisibility('private')} className={`w-full py-2 text-sm font-medium rounded-md ${visibility === 'private' ? 'bg-primary text-white shadow' : 'text-text-secondary'}`}>Private</button>
                </div>
                <p className="text-xs text-text-secondary mt-1">{visibility === 'public' ? 'Visible to all Festic users.' : 'Visible only to your university community.'}</p>
             </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-secondary bg-background rounded-md hover:bg-border">Cancel</button>
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:opacity-90">Create Event</button>
          </div>
        </form>
      </div>
      <style>{`
        .input-field {
            display: block;
            width: 100%;
            background-color: #F8F7FF;
            border: 1px solid #EAE6FF;
            border-radius: 0.375rem;
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            padding: 0.5rem 0.75rem;
            color: #2D2D2D;
        }
        .input-field:focus {
            outline: none;
            box-shadow: 0 0 0 2px #A076F9;
            border-color: #A076F9;
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale { animation: fadeInScale 0.3s forwards; }
      `}</style>
    </div>
  );
};

export default CreateEventModal;

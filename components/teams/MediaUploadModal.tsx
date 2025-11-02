import React, { useState } from 'react';
import { MOCK_EVENTS } from '../../constants';

interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MediaUploadModal: React.FC<MediaUploadModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        onClose();
    }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-lg transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-text-primary mb-2">Upload Media</h2>
            <button type="button" onClick={onClose} className="text-text-secondary hover:text-text-primary">&times;</button>
          </div>
          <p className="text-text-secondary mb-6">Add a new photo or video to your event's gallery.</p>
          
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="border-2 border-dashed border-border rounded-lg p-10 text-center cursor-pointer hover:bg-background">
                <p className="font-semibold text-primary">Click to browse or drag & drop files</p>
                <p className="text-sm text-text-secondary mt-1">PNG, JPG, GIF, MP4 up to 50MB</p>
            </div>
            
            <select className="input-field" defaultValue="event-4">
                <option disabled>Select Event</option>
                {MOCK_EVENTS.filter(e => e.hostId === 'user-1').map(event => (
                    <option key={event.id} value={event.id}>{event.name}</option>
                ))}
            </select>
            
            <textarea placeholder="Write a caption..." rows={4} className="input-field" />
            <input type="text" placeholder="Tags (comma-separated)" className="input-field" />
          </div>
          
          <div className="mt-8 flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-secondary bg-background rounded-md hover:bg-border">Cancel</button>
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:opacity-90">Upload & Submit for Approval</button>
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

export default MediaUploadModal;

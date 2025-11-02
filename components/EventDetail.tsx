import React from 'react';
import type { Event, Vendor } from '../types';
import { MOCK_VENDORS, MOCK_APPLICATIONS } from '../constants';
import { ApplicationStatus } from '../types';
import VendorCard from './VendorCard';
import { ChevronLeftIcon, LocationIcon, UsersIcon } from './IconComponents';

interface EventDetailProps {
  event: Event;
  onBack: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, onBack }) => {
  const approvedVendors = MOCK_APPLICATIONS
    .filter(app => app.eventId === event.id && app.status === ApplicationStatus.Approved)
    .map(app => MOCK_VENDORS.find(v => v.id === app.vendorId))
    .filter((v): v is Vendor => v !== undefined);

  return (
    <div className="animate-fade-in">
        <div 
            className="h-64 md:h-96 bg-cover bg-center relative" 
            style={{ backgroundImage: `url(${event.imageUrl})` }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex flex-col justify-end pb-10 text-white">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{event.name}</h1>
                <p className="text-xl md:text-2xl mt-2 text-white/90">{event.date}</p>
            </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <button
                onClick={onBack}
                className="flex items-center text-primary font-semibold mb-8 hover:underline"
            >
                <ChevronLeftIcon className="w-5 h-5 mr-1" />
                Back to all events
            </button>

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                <div className="lg:col-span-2">
                    <div className="bg-surface p-6 rounded-lg border border-border mb-8">
                        <div className="flex flex-wrap items-center text-lg text-text-secondary mb-4 gap-x-6 gap-y-2">
                            <div className="flex items-center">
                                <LocationIcon className="w-5 h-5 mr-2 text-primary" />
                                <span className="font-semibold">{event.university}</span>
                            </div>
                            <div className="flex items-center">
                                <UsersIcon className="w-5 h-5 mr-2 text-primary" />
                                <span className="font-semibold">{event.expectedFootfall.toLocaleString()}+ Expected Footfall</span>
                            </div>
                        </div>
                        <p className="text-text-secondary leading-relaxed">{event.description}</p>
                    </div>

                     <div>
                        <h3 className="text-2xl font-bold text-text-primary mb-4">Highlights & Attractions</h3>
                         <div className="flex flex-wrap gap-2 mb-4">
                            {event.tags.map(tag => (
                                <span key={tag} className="px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-full">{tag}</span>
                            ))}
                        </div>
                        <p className="text-text-secondary">More details about special performances, workshops, and competitions will be updated here soon. Stay tuned!</p>
                     </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-surface p-6 rounded-lg border border-border sticky top-24">
                        <h3 className="text-2xl font-bold text-text-primary mb-4">Featuring</h3>
                        {approvedVendors.length > 0 ? (
                            <div className="space-y-4">
                                {approvedVendors.map(vendor => (
                                    <VendorCard key={vendor.id} vendor={vendor} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-text-secondary">Vendor list will be announced soon!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
      `}</style>
    </div>
  );
};

export default EventDetail;

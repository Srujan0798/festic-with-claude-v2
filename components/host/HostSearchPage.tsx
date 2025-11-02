import React from 'react';
import { SearchIcon } from '../IconComponents';

const HostSearchPage: React.FC = () => {
    return (
        <div className="p-8 flex flex-col items-center">
            <div className="w-full max-w-2xl mt-10">
                <h1 className="text-3xl font-bold text-text-primary text-center">Search Festic</h1>
                <p className="text-text-secondary mt-2 text-center">Find events, vendors, posts, and team members.</p>
                <div className="relative mt-8">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <input 
                        type="text"
                        placeholder="Start typing to search..."
                        className="w-full bg-surface border-2 border-border rounded-full py-3 pl-12 pr-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                </div>
            </div>
        </div>
    );
};

export default HostSearchPage;
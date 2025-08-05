"use client";

import { PlayerJourney, JourneyEvent } from './PlayerJourney';

interface JourneyDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  events: JourneyEvent[];
}

export function JourneyDrawer({ isOpen, onOpenChange, events }: JourneyDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl border-l border-gray-200 z-50 lg:top-0">
      <div className="relative w-full h-full flex flex-col">
        <button 
          className="absolute top-3 right-3 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={() => onOpenChange(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="flex-1 overflow-y-auto">
          <PlayerJourney 
            events={events} 
            isDrawerOpen={isOpen}
            onDrawerToggle={onOpenChange}
            compact={false}
          />
        </div>
      </div>
    </div>
  );
} 
"use client";

import { useState } from "react";

export interface JourneyEvent {
  id: string;
  type: 'match' | 'coaching' | 'tournament' | 'achievement' | 'training';
  title: string;
  description: string;
  date: string;
  result?: string;
  opponent?: string;
  score?: string;
  icon: string;
  color: string;
  // New fields for enhanced styling
  player1?: {
    name: string;
    avatar?: string;
    scores?: string[];
  };
  player2?: {
    name: string;
    avatar?: string;
    scores?: string[];
  };
  tournament?: string;
  utrRating?: string;
}

interface PlayerJourneyProps {
  events: JourneyEvent[];
  isDrawerOpen?: boolean;
  onDrawerToggle?: (open: boolean) => void;
  compact?: boolean;
}

export function PlayerJourney({ events, isDrawerOpen = false, onDrawerToggle, compact = false }: PlayerJourneyProps) {
  const recentEvents = events.slice(0, 3); // Show only 3 most recent events in compact view

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'match':
        return '🎾';
      case 'coaching':
        return '👨‍🏫';
      case 'tournament':
        return '🏆';
      case 'achievement':
        return '⭐';
      case 'training':
        return '💪';
      default:
        return '📅';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const getHeaderColor = (type: string) => {
    switch (type) {
      case 'match':
        return 'bg-red-500';
      case 'achievement':
        return 'bg-blue-500';
      case 'tournament':
        return 'bg-purple-500';
      case 'coaching':
        return 'bg-green-500';
      case 'training':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (compact) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent journey</h3>
          <button 
            onClick={() => onDrawerToggle?.(!isDrawerOpen)}
            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
          >
            View full journey
          </button>
        </div>
        
        {/* Horizontal Timeline Path */}
        <div className="relative">
          {/* Horizontal Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
          
          <div className="flex items-center justify-between relative z-10">
            {recentEvents.map((event, index) => (
              <div key={event.id} className="flex flex-col items-center space-y-3">
                {/* Event Node */}
                <div className={`w-4 h-4 rounded-full ${
                  event.type === 'achievement' ? 'bg-blue-500' : 'bg-gray-900'
                } relative`}>
                  {/* Connection Line */}
                  {index < recentEvents.length - 1 && (
                    <div className="absolute top-1/2 left-full w-8 h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
                  )}
                </div>
                
                {/* Event Content */}
                <div className="flex flex-col items-center space-y-2">
                  {event.type === 'match' && event.player1 && event.player2 ? (
                    <>
                      {/* Player Avatars */}
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-red-500 flex items-center justify-center text-xs font-semibold">
                          {event.player1.avatar || event.player1.name.charAt(0)}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-green-500 flex items-center justify-center text-xs font-semibold">
                          {event.player2.avatar || event.player2.name.charAt(0)}
                        </div>
                      </div>
                      
                      {/* Result Badge */}
                      <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                        event.result === 'W' ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {event.result === 'W' ? 'Win' : 'Loss'}
                      </div>
                    </>
                  ) : event.type === 'achievement' ? (
                    <>
                      {/* Achievement Icon */}
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-sm">{event.icon}</span>
                      </div>
                      
                      {/* Achievement Badge */}
                      <div className="px-3 py-1 rounded-full text-xs font-medium text-white bg-blue-500">
                        Achievement
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Other Event Icon */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        event.type === 'coaching' ? 'bg-green-100' : 'bg-orange-100'
                      }`}>
                        <span className={`text-sm ${
                          event.type === 'coaching' ? 'text-green-600' : 'text-orange-600'
                        }`}>{event.icon}</span>
                      </div>
                      
                      {/* Event Type Badge */}
                      <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                        event.type === 'coaching' ? 'bg-green-500' : 'bg-orange-500'
                      }`}>
                        {event.type === 'coaching' ? 'Coaching' : 'Training'}
                      </div>
                    </>
                  )}
                  
                  {/* Event Title */}
                  <div className="text-center max-w-20">
                    <p className="text-xs font-medium text-gray-900 truncate">
                      {event.type === 'match' ? `vs ${event.opponent?.split(' ').pop() || 'Opponent'}` : event.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-gray-900">Journey</h3>
      </div>
      
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={event.id} className="relative">
              {/* Timeline Node */}
              <div className={`absolute left-4 top-4 w-4 h-4 rounded-full ${
                event.type === 'achievement' ? 'bg-blue-500' : 'bg-gray-900'
              }`}></div>
              
              {/* Connection Line */}
              {index < events.length - 1 && (
                <div className="absolute left-6 top-8 w-0.5 h-16 bg-gray-200"></div>
              )}
              
              {/* Event Card */}
              <div className="ml-12">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Card Header */}
                  <div className={`px-4 py-3 ${getHeaderColor(event.type)}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-white text-lg">{event.icon}</span>
                        <span className="text-white font-semibold">{event.title}</span>
                      </div>
                      {event.utrRating && (
                        <span className="text-white text-sm">UTR: {event.utrRating}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-4">
                    {event.type === 'match' && event.player1 && event.player2 ? (
                      <div className="space-y-3">
                        {/* Player Stats */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-red-500 flex items-center justify-center text-xs font-semibold">
                                {event.player1.avatar || event.player1.name.charAt(0)}
                              </div>
                              <span className="text-sm font-medium">{event.player1.name}</span>
                            </div>
                            <div className="flex space-x-2">
                              {event.player1.scores?.map((score, i) => (
                                <span key={i} className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs font-semibold">
                                  {score}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-green-500 flex items-center justify-center text-xs font-semibold">
                                {event.player2.avatar || event.player2.name.charAt(0)}
                              </div>
                              <span className="text-sm font-medium">{event.player2.name}</span>
                              {event.result === 'W' && (
                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              {event.player2.scores?.map((score, i) => (
                                <span key={i} className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs font-semibold">
                                  {score}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Tournament Info */}
                        {event.tournament && (
                          <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                            {event.tournament}
                          </div>
                        )}
                      </div>
                    ) : event.type === 'achievement' ? (
                      <div className="text-sm text-gray-700">
                        {event.description}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-700">
                        {event.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
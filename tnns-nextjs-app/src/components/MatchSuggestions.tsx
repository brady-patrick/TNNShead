"use client";

import { useState } from "react";

interface MatchSuggestion {
  id: string;
  playerName: string;
  utrRating: string;
  ustaRating: string;
  location: string;
  availability: string;
  matchScore: number; // 0-100 compatibility score
  avatar?: string;
  lastActive: string;
  mutualConnections?: number;
}

interface MatchSuggestionsProps {
  suggestions: MatchSuggestion[];
}

export function MatchSuggestions({ suggestions }: MatchSuggestionsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSuggestion = () => {
    setCurrentIndex((prev) => (prev + 1) % suggestions.length);
  };

  const prevSuggestion = () => {
    setCurrentIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
  };

  const currentSuggestion = suggestions[currentIndex];

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMatchScoreText = (score: number) => {
    if (score >= 80) return 'Excellent match';
    if (score >= 60) return 'Good match';
    return 'Fair match';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Match suggestions</h3>
        <span className="text-sm text-gray-500">AI Powered</span>
      </div>
      
      {/* Swipeable Card */}
      <div className="relative">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          {/* Match Score */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className={`text-sm font-medium ${getMatchScoreColor(currentSuggestion.matchScore)}`}>
                {getMatchScoreText(currentSuggestion.matchScore)}
              </span>
            </div>
            <span className="text-xs text-gray-500">{currentIndex + 1} of {suggestions.length}</span>
          </div>
          
          {/* Player Info */}
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xl font-semibold">
              {currentSuggestion.avatar || currentSuggestion.playerName.charAt(0)}
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-1">{currentSuggestion.playerName}</h4>
            <p className="text-sm text-gray-600">UTR {currentSuggestion.utrRating} • USTA {currentSuggestion.ustaRating}</p>
          </div>
          
          {/* Match Details */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Location</span>
              <span className="font-medium text-gray-900">{currentSuggestion.location}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Available</span>
              <span className="font-medium text-gray-900">{currentSuggestion.availability}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Last Active</span>
              <span className="font-medium text-gray-900">{currentSuggestion.lastActive}</span>
            </div>
            {currentSuggestion.mutualConnections && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Mutual Connections</span>
                <span className="font-medium text-gray-900">{currentSuggestion.mutualConnections}</span>
              </div>
            )}
          </div>
          
          {/* Match Compatibility */}
          <div className="bg-white rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">Match compatibility</span>
              <span className="text-sm font-bold text-indigo-600">{currentSuggestion.matchScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${currentSuggestion.matchScore}%` }}
              ></div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
              Skip
            </button>
            <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Challenge
            </button>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevSuggestion}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextSuggestion}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-200">
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
              View all suggestions
            </button>
      </div>
    </div>
  );
} 
"use client";

import React from 'react';
import { PlayerProfile } from "../utils/playerData";

interface CompareStatsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  players: PlayerProfile[];
}

const Divider = () => (
    <svg className="h-[2.5px] w-full">
        <line
            x1="1.2"
            y1="1.2"
            x2="100%"
            y2="1.2"
            className="stroke-border-primary"
            stroke="black"
            strokeWidth="2.4"
            strokeDasharray="0,6"
            strokeLinecap="round"
        />
    </svg>
);

export function CompareStatsDrawer({ isOpen, onClose, players }: CompareStatsDrawerProps) {
  if (players.length !== 2) return null;

  const [player1, player2] = players;

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden" 
        onClick={() => onClose()}
      />
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl border-l border-gray-200 z-50" style={{zIndex: 9999, right: '0px'}}>
        <div className="relative w-full h-full flex flex-col">
          <button 
            className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 rounded-lg flex items-center justify-center transition-colors" 
            onClick={() => onClose()}
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="px-2 pt-2">
            <div className="h-32 w-full rounded-xl object-cover md:h-36 relative overflow-hidden">
              <div className="h-full w-full bg-gradient-to-t from-[#FBC5EC] to-[#A5C0EE]"></div>
            </div>
          </div>

          <div className="relative -mt-12 flex flex-col gap-4 px-4 md:px-6">
            <div className="flex justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                <span className="text-gray-600 text-lg">
                  {player1.avatar}
                </span>
              </div>
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                <span className="text-gray-600 text-lg">
                  {player2.avatar}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4">
              <div className="max-w-50 min-w-0 flex-1 text-center w-full">
                <div className="flex items-center justify-center gap-1.5">
                  <p className="truncate text-lg font-semibold text-gray-900">
                    Compare Players
                  </p>
                </div>
                <div className="flex flex-col gap-1 text-md text-balance text-tertiary">
                  <div className="flex items-center justify-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Side-by-side comparison</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-4 p-4 md:p-6">
              <Divider />

              {/* Comparison Header */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Stats Comparison</h3>
                <p className="text-sm text-gray-600">{player1.firstName} vs {player2.firstName}</p>
              </div>

              <Divider />

              {/* UTR Rating Comparison */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">UTR Rating</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">{player1.firstName}</p>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <p className="text-sm font-medium text-gray-600">UTR Singles</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{player1.utrRating}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">{player2.firstName}</p>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <p className="text-sm font-medium text-gray-600">UTR Singles</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{player2.utrRating}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* USTA Rating Comparison */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">USTA Rating</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">{player1.firstName}</p>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <p className="text-sm font-medium text-gray-600">USTA Singles</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{player1.ustaRating}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">{player2.firstName}</p>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <p className="text-sm font-medium text-gray-600">USTA Singles</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{player2.ustaRating}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* NSL Level Comparison */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">NSL Level</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">{player1.firstName}</p>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <p className="text-sm font-medium text-gray-600">NSL Level</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{player1.nslLevel}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">{player2.firstName}</p>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <p className="text-sm font-medium text-gray-600">NSL Level</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{player2.nslLevel}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Divider />

              {/* Basic Information */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Basic Information</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Age</p>
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                        <p className="text-lg font-bold text-gray-900">{calculateAge(player1.dateOfBirth)}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Age</p>
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                        <p className="text-lg font-bold text-gray-900">{calculateAge(player2.dateOfBirth)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Level</p>
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                        <p className="text-lg font-bold text-gray-900">{player1.level}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Level</p>
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                        <p className="text-lg font-bold text-gray-900">{player2.level}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Location</p>
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                        <p className="text-sm font-medium text-gray-900">{player1.location}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Location</p>
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                        <p className="text-sm font-medium text-gray-900">{player2.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Divider />

              {/* Match Prediction */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="text-md font-medium text-gray-900 mb-2">Match Prediction</h4>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">{player1.firstName}</p>
                    <p className="text-2xl font-bold text-blue-600">65%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">vs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">{player2.firstName}</p>
                    <p className="text-2xl font-bold text-gray-600">35%</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2 text-center">
                  Based on current ratings and recent performance
                </p>
              </div>

              <Divider />

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
                  Challenge to Match
                </button>
                <button className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
                  View History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 
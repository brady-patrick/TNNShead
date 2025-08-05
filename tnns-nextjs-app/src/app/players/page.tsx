"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { getAllPlayers, getPlayerData } from "../../utils/playerData";
import { CompareStatsDrawer } from "../../components/CompareStatsDrawer";
import { ComparisonDrawer } from "../../components/ComparisonDrawer";
import { SearchLg } from "@untitledui/icons";

// Column configuration
interface ColumnConfig {
  id: string;
  label: string;
  sortable: boolean;
  sortField?: SortField;
}

const defaultColumns: ColumnConfig[] = [
  { id: 'select', label: '', sortable: false },
  { id: 'player', label: 'Player', sortable: true, sortField: 'firstName' },
  { id: 'ustaRating', label: 'USTA Rating', sortable: true, sortField: 'ustaRating' },
  { id: 'utrRating', label: 'UTR Rating', sortable: true, sortField: 'utrRating' },
  { id: 'location', label: 'Location', sortable: true, sortField: 'location' },
  { id: 'age', label: 'Age', sortable: true, sortField: 'age' },
  { id: 'actions', label: 'Actions', sortable: false }
];

type SortField = 'firstName' | 'lastName' | 'ustaRating' | 'utrRating' | 'location' | 'age' | 'level' | 'status' | 'lastActive';
type SortDirection = 'asc' | 'desc';

export default function PlayersPage() {
  const allPlayers = getAllPlayers();
  
  // State for sorting and filtering
  const [sortField, setSortField] = useState<SortField>('firstName');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPlayers, setSelectedPlayers] = useState<Set<string>>(new Set());
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);
  const [comparisonPlayerId, setComparisonPlayerId] = useState<string | null>(null);
  const [columns, setColumns] = useState<ColumnConfig[]>(defaultColumns);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);

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

  // Filter and sort players
  const filteredAndSortedPlayers = useMemo(() => {
    let filtered = allPlayers.filter(player => {
      const matchesSearch = 
        player.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.ustaRating.includes(searchTerm);
      
      const matchesLevel = levelFilter === 'all' || player.level === levelFilter;
      const matchesStatus = statusFilter === 'all' || player.status === statusFilter;
      
      return matchesSearch && matchesLevel && matchesStatus;
    });

    // Sort players
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'firstName':
        case 'lastName':
        case 'location':
        case 'level':
        case 'status':
        case 'lastActive':
          aValue = a[sortField];
          bValue = b[sortField];
          break;
        case 'ustaRating':
          aValue = parseFloat(a.ustaRating);
          bValue = parseFloat(b.ustaRating);
          break;
        case 'utrRating':
          aValue = parseFloat(a.utrRating);
          bValue = parseFloat(b.utrRating);
          break;
        case 'age':
          aValue = calculateAge(a.dateOfBirth);
          bValue = calculateAge(b.dateOfBirth);
          break;
        default:
          aValue = a[sortField];
          bValue = b[sortField];
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [allPlayers, sortField, sortDirection, searchTerm, levelFilter, statusFilter]);

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort indicator component
  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return (
      <span className="ml-1">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  // Handle player selection
  const handlePlayerSelect = (playerId: string) => {
    const newSelected = new Set(selectedPlayers);
    if (newSelected.has(playerId)) {
      newSelected.delete(playerId);
    } else {
      newSelected.add(playerId);
    }
    setSelectedPlayers(newSelected);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedPlayers.size === filteredAndSortedPlayers.length) {
      setSelectedPlayers(new Set());
    } else {
      setSelectedPlayers(new Set(filteredAndSortedPlayers.map(player => player.id)));
    }
  };

  // Handle compare selected players
  const handleCompareSelected = () => {
    if (selectedPlayers.size >= 2) {
      setIsCompareDrawerOpen(true);
    }
  };

  // Get selected player data
  const selectedPlayerData = useMemo(() => {
    return filteredAndSortedPlayers.filter(player => selectedPlayers.has(player.id));
  }, [filteredAndSortedPlayers, selectedPlayers]);

  // Handle opening comparison drawer for a single player
  const handleComparePlayer = (playerId: string) => {
    setComparisonPlayerId(playerId);
    setIsCompareDrawerOpen(true);
  };

  // Drag and drop handlers for column reordering
  const handleDragStart = (e: React.DragEvent, columnId: string) => {
    setDraggedColumn(columnId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (!draggedColumn || draggedColumn === targetColumnId) {
      setDraggedColumn(null);
      return;
    }

    const newColumns = [...columns];
    const draggedIndex = newColumns.findIndex(col => col.id === draggedColumn);
    const targetIndex = newColumns.findIndex(col => col.id === targetColumnId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [draggedCol] = newColumns.splice(draggedIndex, 1);
      newColumns.splice(targetIndex, 0, draggedCol);
      setColumns(newColumns);
    }

    setDraggedColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
  };

  return (
    <div className="py-8 px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Players</h1>
        <p className="mt-2 text-gray-600">Manage player profiles and statistics</p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">Player Directory</h2>
            {selectedPlayers.size > 0 && (
              <div className="flex gap-3">
                {selectedPlayers.size >= 2 && (
                  <button 
                    onClick={handleCompareSelected}
                    disabled={selectedPlayers.size > 2}
                    className={`px-4 py-2 rounded-md flex items-center gap-2 font-semibold text-sm transition-colors ${
                      selectedPlayers.size > 2 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    <span>Compare Selected ({selectedPlayers.size})</span>
                  </button>
                )}
                <button 
                  onClick={() => setSelectedPlayers(new Set())}
                  className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="mb-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchLg className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="search"
                    placeholder="Search players..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Level Filter */}
              <div>
                <label htmlFor="level-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Level
                </label>
                <div className="relative">
                  <select
                    id="level-filter"
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                  >
                    <option value="all">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className="relative">
                  <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="flex items-end">
                <p className="text-sm text-gray-600">
                  {filteredAndSortedPlayers.length} of {allPlayers.length} players
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.id}
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                      } ${
                        draggedColumn === column.id ? 'opacity-50' : ''
                      }`}
                      draggable={column.id !== 'select' && column.id !== 'actions'}
                      onDragStart={(e) => column.id !== 'select' && column.id !== 'actions' ? handleDragStart(e, column.id) : undefined}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, column.id)}
                      onDragEnd={handleDragEnd}
                      onClick={column.sortable && column.sortField ? () => handleSort(column.sortField!) : undefined}
                    >
                      <div className="flex items-center">
                        {column.id === 'select' ? (
                          <input
                            type="checkbox"
                            checked={selectedPlayers.size === filteredAndSortedPlayers.length && filteredAndSortedPlayers.length > 0}
                            onChange={handleSelectAll}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        ) : (
                          <>
                            <span className="flex-1">{column.label}</span>
                            {column.sortable && column.sortField && (
                              <SortIndicator field={column.sortField} />
                            )}
                            {column.id !== 'select' && column.id !== 'actions' && (
                              <svg 
                                className="ml-2 h-4 w-4 text-gray-400 cursor-move" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                              </svg>
                            )}
                          </>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedPlayers.map((player) => (
                  <tr 
                    key={player.id} 
                    className={`${selectedPlayers.has(player.id) ? 'bg-indigo-50' : ''} hover:bg-gray-50 cursor-pointer transition-colors`}
                    onClick={(e) => {
                      // Don't navigate if clicking on checkbox or action buttons
                      if ((e.target as HTMLElement).closest('input[type="checkbox"]') || 
                          (e.target as HTMLElement).closest('a') || 
                          (e.target as HTMLElement).closest('button')) {
                        return;
                      }
                      window.location.href = `/players/${player.id}`;
                    }}
                  >
                    {columns.map((column) => (
                      <td key={column.id} className="px-6 py-4 whitespace-nowrap">
                        {column.id === 'select' && (
                          <input
                            type="checkbox"
                            checked={selectedPlayers.has(player.id)}
                            onChange={() => handlePlayerSelect(player.id)}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            onClick={(e) => e.stopPropagation()}
                          />
                        )}
                        {column.id === 'player' && (
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <span className="text-indigo-600 font-medium">{player.avatar}</span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{player.firstName} {player.lastName}</div>
                              <div className="text-sm text-gray-500">{player.email}</div>
                            </div>
                          </div>
                        )}
                        {column.id === 'ustaRating' && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                            {player.ustaRating}
                          </span>
                        )}
                        {column.id === 'utrRating' && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {player.utrRating}
                          </span>
                        )}
                        {column.id === 'location' && (
                          <span className="text-sm text-gray-900">{player.location}</span>
                        )}
                        {column.id === 'age' && (
                          <span className="text-sm text-gray-900">{calculateAge(player.dateOfBirth)}</span>
                        )}
                        {column.id === 'actions' && (
                          <div className="text-sm font-medium">
                            <Link 
                              href={`/players/${player.id}`} 
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View Profile
                            </Link>
                            <button 
                              className="text-blue-600 hover:text-blue-900"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleComparePlayer(player.id);
                              }}
                            >
                              Compare
                            </button>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAndSortedPlayers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No players found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Compare Stats Drawer */}
      <CompareStatsDrawer
        isOpen={isCompareDrawerOpen}
        onClose={() => setIsCompareDrawerOpen(false)}
        players={selectedPlayerData}
      />

      {/* Comparison Drawer for single player comparison */}
      {comparisonPlayerId && (
        <ComparisonDrawer
          isOpen={isCompareDrawerOpen}
          onOpenChange={setIsCompareDrawerOpen}
          playerProfile={getPlayerData(comparisonPlayerId)?.profile!}
          playerStats={getPlayerData(comparisonPlayerId)?.stats!}
        />
      )}
    </div>
  );
} 
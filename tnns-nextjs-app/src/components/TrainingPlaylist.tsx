"use client";

interface TrainingItem {
  id: string;
  title: string;
  type: 'drill' | 'video' | 'workout';
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  description: string;
  thumbnail?: string;
}

interface TrainingPlaylistProps {
  items: TrainingItem[];
}

export function TrainingPlaylist({ items }: TrainingPlaylistProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'drill':
        return '🎯';
      case 'video':
        return '📹';
      case 'workout':
        return '💪';
      default:
        return '📋';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Training playlist</h3>
        <span className="text-sm text-gray-500">AI Recommended</span>
      </div>
      
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-lg">
              {item.thumbnail || getTypeIcon(item.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-gray-900 truncate">{item.title}</h4>
                <span className="text-xs text-gray-500">{item.duration}</span>
              </div>
              
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs text-gray-600">{item.category}</span>
                <span className={`inline-block text-xs px-2 py-1 rounded-full ${getDifficultyColor(item.difficulty)}`}>
                  {item.difficulty}
                </span>
              </div>
              
              <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
            </div>
            
            <button className="text-indigo-600 hover:text-indigo-700 p-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
          View full playlist
        </button>
      </div>
    </div>
  );
} 
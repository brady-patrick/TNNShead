"use client";

interface NextEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'tournament' | 'match' | 'practice';
  opponent?: string;
  tournament?: string;
  preparationTips: string[];
}

interface NextEventPreparationProps {
  event: NextEvent;
}

export function NextEventPreparation({ event }: NextEventPreparationProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'short', 
      day: 'numeric'
    });
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'tournament':
        return '🏆';
      case 'match':
        return '🎾';
      case 'practice':
        return '🏃‍♂️';
      default:
        return '📅';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'tournament':
        return 'bg-purple-500';
      case 'match':
        return 'bg-blue-500';
      case 'practice':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Next event</h3>
        <div className={`w-8 h-8 rounded-full ${getEventColor(event.type)} flex items-center justify-center text-white text-sm`}>
          {getEventIcon(event.type)}
        </div>
      </div>
      
      {/* Event Details */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
        <h4 className="text-base font-semibold text-gray-900 mb-2">{event.title}</h4>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-700">{formatDate(event.date)} at {event.time}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-gray-700">{event.location}</span>
          </div>
          
          {event.opponent && (
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-gray-700">vs {event.opponent}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Preparation Tips */}
      <div>
        <h5 className="text-sm font-medium text-gray-900 mb-3">Preparation tips</h5>
        <div className="space-y-2">
          {event.preparationTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
          View event details
        </button>
      </div>
    </div>
  );
} 
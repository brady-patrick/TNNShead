export default function CoachingPage() {
  const sessions = [
    {
      id: 1,
      title: 'Forehand Technique',
      player: 'John Doe',
      court: 'Court 3',
      duration: '1 hour',
      date: 'Tomorrow',
      time: '2:00 PM'
    },
    {
      id: 2,
      title: 'Serve Practice',
      player: 'Jane Smith',
      court: 'Court 1',
      duration: '45 min',
      date: 'Friday',
      time: '10:00 AM'
    },
    {
      id: 3,
      title: 'Match Strategy',
      player: 'Mike Johnson',
      court: 'Court 2',
      duration: '1.5 hours',
      date: 'Saturday',
      time: '3:30 PM'
    }
  ];

  const progressData = [
    { player: 'John Doe', skill: 'Forehand improved', progress: '+15%' },
    { player: 'Jane Smith', skill: 'Serve accuracy', progress: '+8%' },
    { player: 'Mike Johnson', skill: 'Backhand consistency', progress: '+12%' }
  ];

  return (
    <div className="py-8 px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Coaching</h1>
        <p className="mt-2 text-gray-600">Track coaching sessions and player progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Upcoming Sessions</h2>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                  Schedule Session
                </button>
              </div>

              <div className="space-y-4">
                {sessions.map((session) => (
                  <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{session.title}</h3>
                        <p className="text-sm text-gray-500">with {session.player}</p>
                        <p className="text-xs text-gray-400 mt-1">{session.court} • {session.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{session.date}</p>
                        <p className="text-sm text-gray-500">{session.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">This Week</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Sessions</span>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Hours</span>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">12.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Players</span>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">6</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Progress</h3>
              <div className="space-y-3">
                {progressData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.player}</p>
                      <p className="text-xs text-gray-500">{item.skill}</p>
                    </div>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">{item.progress}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
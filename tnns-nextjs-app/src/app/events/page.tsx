export default function EventsPage() {
  const events = [
    {
      id: 1,
      type: 'Tournament',
      status: 'Registration Open',
      title: 'Spring Championship',
      description: 'Annual spring tennis championship for all skill levels',
      date: 'March 15-17, 2024',
      location: 'Main Courts',
      participants: '32 participants',
      color: 'green'
    },
    {
      id: 2,
      type: 'Clinic',
      status: 'Limited Spots',
      title: 'Advanced Serve Clinic',
      description: 'Intensive serve technique workshop for advanced players',
      date: 'March 8, 2024',
      location: 'Court 1',
      participants: '8 participants',
      color: 'blue'
    },
    {
      id: 3,
      type: 'Social',
      status: 'Open to All',
      title: 'Friday Night Mixer',
      description: 'Casual doubles play and social networking',
      date: 'Every Friday',
      location: 'All Courts',
      participants: 'Unlimited',
      color: 'yellow'
    }
  ];

  const eventTypes = [
    { name: 'Tournaments', count: 4 },
    { name: 'Clinics', count: 6 },
    { name: 'Social Events', count: 2 }
  ];

  const quickActions = [
    { label: '📊 View Reports', action: 'reports' },
    { label: '📧 Send Notifications', action: 'notifications' },
    { label: '📅 Manage Calendar', action: 'calendar' }
  ];

  return (
    <div className="py-8 px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Events</h1>
        <p className="mt-2 text-gray-600">Organize and manage tennis events and tournaments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Events */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Upcoming Events</h2>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                  Create Event
                </button>
              </div>

              <div className="space-y-6">
                {events.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mr-3 ${
                            event.color === 'green' ? 'bg-green-100 text-green-800' :
                            event.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {event.type}
                          </span>
                          <span className="text-sm text-gray-500">{event.status}</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>📅 {event.date}</span>
                          <span>📍 {event.location}</span>
                          <span>👥 {event.participants}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <button className="text-purple-600 hover:text-purple-900 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Event Stats */}
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">This Month</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Events</span>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Participants</span>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Revenue</span>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">$2,450</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Event Types</h3>
              <div className="space-y-3">
                {eventTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">{type.name}</span>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{type.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <button 
                    key={index}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
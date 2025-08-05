import { JourneyEvent } from "../components/PlayerJourney";

export interface PlayerProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  location: string;
  bio: string;
  avatarImage?: string;
  headerImage?: string;
  utrRating: string;
  ustaRating: string;
  nslLevel: string;
  level: string;
  status: string;
  lastActive: string;
  avatar: string;
}

export interface PlayerStats {
  utrRating: string;
  ustaRating: string;
  nslLevel: string;
  utrChange: string;
  ustaChange: string;
  nslChange: string;
}

export interface MatchSuggestion {
  id: string;
  playerName: string;
  utrRating: string;
  ustaRating: string;
  location: string;
  availability: string;
  matchScore: number;
  lastActive: string;
  mutualConnections?: number;
}

// Player-specific data
export const playerData: Record<string, {
  profile: PlayerProfile;
  stats: PlayerStats;
  journeyEvents: JourneyEvent[];
  matchSuggestions: MatchSuggestion[];
  achievements: string[];
}> = {
  "1": {
    profile: {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      dateOfBirth: "1995-06-15",
      location: "Los Angeles, CA",
      bio: "Advanced tennis player with 8 years of experience. USTA Level 4.5 Champion 2023.",
      avatarImage: undefined,
      headerImage: undefined,
      utrRating: "7.2",
      ustaRating: "4.5",
      nslLevel: "A",
      level: "Advanced",
      status: "Active",
      lastActive: "2 days ago",
      avatar: "JD"
    },
    stats: {
      utrRating: "7.2",
      ustaRating: "4.5",
      nslLevel: "A",
      utrChange: "+0.2",
      ustaChange: "0.0",
      nslChange: "↑"
    },
    journeyEvents: [
      {
        id: '1',
        type: 'match',
        title: 'Match vs. Samuel Ortiz',
        description: 'Competitive match against local club player',
        date: '2024-01-15',
        result: 'W',
        opponent: 'Samuel Ortiz',
        score: '6-4, 7-5',
        icon: '🎾',
        color: 'bg-blue-100 text-blue-600',
        player1: {
          name: 'John Doe',
          scores: ['6', '7']
        },
        player2: {
          name: 'Samuel Ortiz',
          scores: ['4', '5']
        },
        tournament: 'USTA Level 6 Open - Lakewood Junior Open',
        utrRating: '7.2'
      },
      {
        id: '2',
        type: 'match',
        title: 'Match vs. Alex Rodriguez',
        description: 'League match with strong opponent',
        date: '2024-01-12',
        result: 'L',
        opponent: 'Alex Rodriguez',
        score: '4-6, 6-7',
        icon: '🎾',
        color: 'bg-blue-100 text-blue-600',
        player1: {
          name: 'John Doe',
          scores: ['4', '6']
        },
        player2: {
          name: 'Alex Rodriguez',
          scores: ['6', '7']
        },
        tournament: 'USTA Level 6 Open - Lakewood Junior Open',
        utrRating: '7.2'
      },
      {
        id: '3',
        type: 'achievement',
        title: 'Won State Junior Open!',
        description: 'Achieved 1st place in the USTA California State Junior Open (Men\'s Open).',
        date: '2024-01-08',
        icon: '🏆',
        color: 'bg-yellow-100 text-yellow-600',
        utrRating: '7.2'
      },
      {
        id: '4',
        type: 'match',
        title: 'Match vs. David Kim',
        description: 'Tournament semifinal match',
        date: '2024-01-05',
        result: 'W',
        opponent: 'David Kim',
        score: '6-3, 6-2',
        icon: '🎾',
        color: 'bg-blue-100 text-blue-600',
        player1: {
          name: 'John Doe',
          scores: ['6', '6']
        },
        player2: {
          name: 'David Kim',
          scores: ['3', '2']
        },
        tournament: 'USTA California State Junior Open',
        utrRating: '7.2'
      },
      {
        id: '5',
        type: 'coaching',
        title: 'Serve Technique Session',
        description: 'Worked on improving serve placement and power',
        date: '2024-01-03',
        icon: '👨‍🏫',
        color: 'bg-green-100 text-green-600'
      },
      {
        id: '6',
        type: 'training',
        title: 'Cardio & Footwork',
        description: 'Intensive footwork and endurance training',
        date: '2024-01-01',
        icon: '💪',
        color: 'bg-red-100 text-red-600'
      }
    ],
    matchSuggestions: [
      {
        id: '1',
        playerName: 'Avery Chen',
        utrRating: '7.4',
        ustaRating: '4.5',
        location: 'Downtown Tennis Club',
        availability: 'Weekends',
        matchScore: 92,
        lastActive: '2 hours ago',
        mutualConnections: 3
      },
      {
        id: '2',
        playerName: 'Marcus Rodriguez',
        utrRating: '7.1',
        ustaRating: '4.0',
        location: 'Westside Courts',
        availability: 'Evenings',
        matchScore: 87,
        lastActive: '1 day ago',
        mutualConnections: 1
      },
      {
        id: '3',
        playerName: 'Emma Thompson',
        utrRating: '7.6',
        ustaRating: '4.5',
        location: 'Central Park Tennis',
        availability: 'Mornings',
        matchScore: 78,
        lastActive: '3 hours ago'
      }
    ],
    achievements: [
      "USTA Level 4.5 Champion 2023",
      "Regional Tournament Winner 2022",
      "College Tennis Team Captain"
    ]
  },
  "2": {
    profile: {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
      dateOfBirth: "1992-03-22",
      location: "San Francisco, CA",
      bio: "Intermediate player passionate about improving technique and strategy. Regular participant in local tournaments.",
      avatarImage: undefined,
      headerImage: undefined,
      utrRating: "5.8",
      ustaRating: "3.5",
      nslLevel: "B",
      level: "Intermediate",
      status: "Active",
      lastActive: "1 week ago",
      avatar: "JS"
    },
    stats: {
      utrRating: "5.8",
      ustaRating: "3.5",
      nslLevel: "B",
      utrChange: "+0.1",
      ustaChange: "0.0",
      nslChange: "0"
    },
    journeyEvents: [
      {
        id: '1',
        type: 'match',
        title: 'Match vs. Sarah Wilson',
        description: 'Friendly club match',
        date: '2024-01-14',
        result: 'W',
        opponent: 'Sarah Wilson',
        score: '6-3, 6-4',
        icon: '🎾',
        color: 'bg-blue-100 text-blue-600',
        player1: {
          name: 'Jane Smith',
          scores: ['6', '6']
        },
        player2: {
          name: 'Sarah Wilson',
          scores: ['3', '4']
        },
        tournament: 'Local Club Tournament',
        utrRating: '5.8'
      },
      {
        id: '2',
        type: 'coaching',
        title: 'Backhand Improvement',
        description: 'Focused session on backhand technique and consistency',
        date: '2024-01-10',
        icon: '👨‍🏫',
        color: 'bg-green-100 text-green-600'
      },
      {
        id: '3',
        type: 'training',
        title: 'Endurance Training',
        description: 'Cardio and stamina building session',
        date: '2024-01-08',
        icon: '💪',
        color: 'bg-red-100 text-red-600'
      },
      {
        id: '4',
        type: 'achievement',
        title: 'First Tournament Win!',
        description: 'Won the local club championship for the first time.',
        date: '2024-01-05',
        icon: '🏆',
        color: 'bg-yellow-100 text-yellow-600',
        utrRating: '5.8'
      }
    ],
    matchSuggestions: [
      {
        id: '1',
        playerName: 'Lisa Chen',
        utrRating: '6.1',
        ustaRating: '3.5',
        location: 'Golden Gate Tennis Club',
        availability: 'Weekends',
        matchScore: 89,
        lastActive: '1 day ago',
        mutualConnections: 2
      },
      {
        id: '2',
        playerName: 'Michael Brown',
        utrRating: '5.9',
        ustaRating: '3.0',
        location: 'Marina Tennis Courts',
        availability: 'Evenings',
        matchScore: 85,
        lastActive: '3 days ago',
        mutualConnections: 1
      }
    ],
    achievements: [
      "Local Club Championship Winner 2024",
      "Most Improved Player Award 2023",
      "Community Tennis Volunteer"
    ]
  },
  "3": {
    profile: {
      id: "3",
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike.johnson@example.com",
      phone: "+1 (555) 456-7890",
      dateOfBirth: "1988-11-08",
      location: "San Diego, CA",
      bio: "Beginner player learning the fundamentals. Enjoys the social aspect of tennis and improving fitness.",
      avatarImage: undefined,
      headerImage: undefined,
      utrRating: "3.2",
      ustaRating: "2.5",
      nslLevel: "C",
      level: "Beginner",
      status: "Inactive",
      lastActive: "3 weeks ago",
      avatar: "MJ"
    },
    stats: {
      utrRating: "3.2",
      ustaRating: "2.5",
      nslLevel: "C",
      utrChange: "-0.1",
      ustaChange: "0.0",
      nslChange: "0"
    },
    journeyEvents: [
      {
        id: '1',
        type: 'training',
        title: 'Basic Stroke Practice',
        description: 'Learning proper forehand and backhand technique',
        date: '2024-01-12',
        icon: '💪',
        color: 'bg-red-100 text-red-600'
      },
      {
        id: '2',
        type: 'coaching',
        title: 'First Lesson',
        description: 'Introduction to tennis fundamentals and court positioning',
        date: '2024-01-08',
        icon: '👨‍🏫',
        color: 'bg-green-100 text-green-600'
      },
      {
        id: '3',
        type: 'match',
        title: 'First Friendly Match',
        description: 'Played first casual match with a friend',
        date: '2024-01-05',
        result: 'L',
        opponent: 'Friend',
        score: '2-6, 1-6',
        icon: '🎾',
        color: 'bg-blue-100 text-blue-600',
        player1: {
          name: 'Mike Johnson',
          scores: ['2', '1']
        },
        player2: {
          name: 'Friend',
          scores: ['6', '6']
        },
        tournament: 'Friendly Match',
        utrRating: '3.2'
      }
    ],
    matchSuggestions: [
      {
        id: '1',
        playerName: 'David Wilson',
        utrRating: '3.5',
        ustaRating: '2.5',
        location: 'Balboa Tennis Club',
        availability: 'Weekends',
        matchScore: 91,
        lastActive: '1 week ago',
        mutualConnections: 1
      },
      {
        id: '2',
        playerName: 'Anna Garcia',
        utrRating: '3.1',
        ustaRating: '2.0',
        location: 'Point Loma Courts',
        availability: 'Mornings',
        matchScore: 88,
        lastActive: '2 weeks ago'
      }
    ],
    achievements: [
      "Completed Beginner Tennis Course",
      "First Tennis Lesson Completed",
      "Joined Local Tennis Club"
    ]
  }
};

export function getPlayerData(playerId: string) {
  return playerData[playerId] || null;
}

export function getAllPlayers(): PlayerProfile[] {
  return Object.values(playerData).map(data => data.profile);
} 
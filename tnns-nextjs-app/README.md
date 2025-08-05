# TNNS - Tennis Management System

A comprehensive Next.js application for managing tennis players, coaching sessions, and events.

## Features

- **Player Management**: Track player profiles, skill levels, and statistics
- **Coaching Sessions**: Schedule and manage coaching sessions with progress tracking
- **Event Management**: Organize tournaments, clinics, and social events
- **Settings**: User profile management and application preferences
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Geist Sans and Geist Mono
- **Development**: ESLint, PostCSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tnns-nextjs-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout with navigation
│   ├── players/           # Players management
│   │   └── page.tsx
│   ├── coaching/          # Coaching sessions
│   │   └── page.tsx
│   ├── events/            # Event management
│   │   └── page.tsx
│   └── settings/          # User settings
│       └── page.tsx
├── components/            # Reusable components
│   └── Navigation.tsx     # Main navigation component
└── globals.css           # Global styles
```

## Pages

### Home (`/`)
- Landing page with overview of the system
- Quick access to main features
- Feature cards for Players, Coaching, and Events

### Players (`/players`)
- Player directory with search and filtering
- Player profiles with skill levels and status
- Add, edit, and delete player functionality

### Coaching (`/coaching`)
- Upcoming coaching sessions
- Session scheduling and management
- Progress tracking and statistics
- Weekly overview and recent progress

### Events (`/events`)
- Event calendar and management
- Tournament, clinic, and social event organization
- Registration and participant tracking
- Event statistics and reporting

### Settings (`/settings`)
- User profile management
- Notification preferences
- Privacy and security settings
- Account status and subscription management

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by:
- Modifying the color scheme in `tailwind.config.js`
- Updating component styles in individual files
- Adding custom CSS in `globals.css`

### Navigation
The navigation component (`src/components/Navigation.tsx`) can be customized to:
- Add new menu items
- Change the styling and layout
- Modify the mobile menu behavior

## Deployment

The application can be deployed to various platforms:

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

### Other Platforms
- Netlify
- Railway
- AWS Amplify
- Any platform that supports Next.js

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.

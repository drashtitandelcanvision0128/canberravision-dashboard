# PPE Detection Dashboard

## Overview
The PPE (Personal Protective Equipment) Detection Dashboard is a comprehensive monitoring system that tracks safety compliance in real-time across different zones. This dashboard provides insights into worker safety, violation tracking, and zone-wise compliance statistics.

## Features

### Main Dashboard (`/ppe`)
- **Key Metrics**: Total Workers, Compliant Workers, Violations, and Compliance Rate
- **Zone Compliance Status**: Real-time compliance monitoring for different zones
- **Recent Violations**: List of latest safety violations with severity levels
- **Live Camera Feeds**: Real-time video monitoring from multiple cameras

### Reports (`/ppe/reports`)
- **Compliance Reports**: Generate and analyze PPE compliance trends
- **Violation Analysis**: Detailed breakdown of violation types
- **Zone Performance**: Compliance statistics by monitoring zones
- **Export Functionality**: Download reports in PDF and Excel formats

### Violations (`/ppe/violations`)
- **Violation Tracking**: Complete list of all PPE violations
- **Filtering System**: Filter by severity, zone, or search by worker name
- **Violation Details**: Comprehensive information about each violation
- **Status Management**: Track resolved and unresolved violations

### Settings (`/ppe/settings`)
- **Detection Parameters**: Configure sensitivity and confidence thresholds
- **PPE Requirements**: Define required safety equipment for different zones
- **Camera Configuration**: Manage camera settings and video retention
- **Notification Preferences**: Set up email, SMS, and push notifications
- **Zone Management**: Enable/disable monitoring zones

## Technical Implementation

### File Structure
```
src/app/ppe/
├── page.tsx           # Main dashboard
├── reports/
│   └── page.tsx       # Reports page
├── violations/
│   └── page.tsx       # Violations tracking page
└── settings/
    └── page.tsx       # Settings configuration page
```

### Key Components
- **AppShell**: Provides consistent layout with navigation
- **Dark Mode Support**: Full dark/light theme compatibility
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Simulated live data updates

### Data Models
- **Workers**: Total count and compliance status
- **Zones**: Monitoring areas with compliance rates
- **Violations**: Safety incidents with severity levels
- **Cameras**: Live feed monitoring system

## UI Features

### Dark Mode Support
- Automatic dark mode detection
- Manual toggle in sidebar
- Persistent user preference
- Optimized color schemes for both themes

### Interactive Elements
- Hover states on all clickable elements
- Smooth transitions and animations
- Loading states and empty states
- Responsive grid layouts

### Accessibility
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- High contrast ratios

## Navigation Structure

The PPE module integrates with the main application navigation:
- **Dashboard**: Main overview page
- **Reports**: Analytics and reporting
- **Violations**: Detailed violation tracking
- **Settings**: System configuration

## Usage Instructions

1. **Access the Dashboard**: Navigate to `/ppe` in the application
2. **Monitor Compliance**: View real-time compliance metrics across zones
3. **Track Violations**: Review recent violations and take appropriate action
4. **Generate Reports**: Create compliance reports for management
5. **Configure Settings**: Adjust detection parameters and notifications

## Development Notes

### Dependencies
- Next.js 16.1.6 with Turbopack
- React with TypeScript
- Tailwind CSS for styling
- Lucide React for icons

### State Management
- React hooks for local state
- Context API for dark mode
- Component-level state for interactive features

### Styling Approach
- Tailwind CSS utility classes
- Dark mode variants using `dark:` prefix
- Custom CSS variables for theming
- Responsive design with mobile-first approach

## Future Enhancements

### Planned Features
- Real-time WebSocket integration
- Advanced analytics with charts
- Mobile app companion
- AI-powered violation prediction
- Integration with HR systems

### Technical Improvements
- Performance optimization
- Enhanced error handling
- Unit test coverage
- E2E testing setup
- CI/CD pipeline integration

## Support

For technical support or feature requests, please refer to the project documentation or contact the development team.

---

**Note**: This dashboard is part of the Canberra Monitoring System - an enterprise-grade AI-powered monitoring and surveillance platform.

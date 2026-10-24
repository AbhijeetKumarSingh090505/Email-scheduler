# Outbox — Email Scheduler

A clean, modern email scheduling and management dashboard built with React and Vite.

## Features

- **Authentication Screen**: Clean sign-in interface supporting both Google Sign-In and standard email credentials.
- **Core Dashboard**:
  - **Scheduled View**: Monitor queued emails with precise dispatch timestamps.
  - **Sent View**: View historical sent emails and delivery statuses.
  - **Search & Filters**: Quickly filter email threads by recipient, subject, or message content.
  - **Starring**: Toggle stars to flag critical communications.
- **Email Detail View**:
  - Full email body rendering with custom highlight cards.
  - Recipient and sender details with status timestamps.
  - Document attachment list with download actions.
  - Quick action controls (star, delete, organize).
- **Compose & Scheduling**:
  - Multi-recipient tag management with batch list upload.
  - Delivery pacing controls: configurable delays between emails and hourly limits.
  - Rich text formatting toolbar (styling, alignment, lists, quotes).
  - File attachment management.
  - **Send Later Modal**: Schedule dispatch for predefined slots (e.g., Tomorrow, 10:00 AM) or custom dates and times.

## Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS (modular component-scoped stylesheets)

## Project Structure

```
email-scheduler/
├── index.html              # HTML entry point
├── package.json            # Dependencies and npm scripts
├── vite.config.js          # Vite configuration
├── public/                 # Static public assets
└── src/
    ├── main.jsx            # Application mount point
    ├── App.jsx             # Main router and global state
    ├── pages/
    │   ├── Login.jsx       # Login & authentication view
    │   ├── Dashboard.jsx   # Main email list dashboard
    │   ├── EmailDetail.jsx # Detailed email view
    │   └── ComposeEmail.jsx# Compose editor & scheduler
    └── styles/
        ├── global.css      # Design system variables & resets
        ├── login.css       # Login screen styling
        ├── dashboard.css   # Dashboard layout and table styles
        ├── email-detail.css# Email viewer styles
        └── compose.css     # Compose panel & modal styles
```

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v16 or newer recommended).

### Installation

1. Navigate to the project directory:
   ```bash
   cd email-scheduler
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the Vite development server:
```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).

### Building for Production

To create an optimized production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

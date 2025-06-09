# Document Query Tool Frontend

A React-based frontend for the Document Query Tool, built with Vite, TypeScript, and TailwindCSS.

## Features

- Modern, responsive UI with dark theme
- Drag-and-drop file upload
- Support for Markdown and JSON files
- Real-time upload status
- Error handling and validation

## Prerequisites

- Node.js 16+ and npm
- Backend API running (see backend README)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file:

   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your backend API URL:

   ```
   VITE_API_URL=http://localhost:8000/api/v1
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React Context providers
├── hooks/         # Custom React hooks
├── services/      # API service functions
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Technologies

- Vite
- React
- TypeScript
- TailwindCSS
- Axios
- React Dropzone

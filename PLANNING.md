# Project Architecture & Guidelines

## Project Overview

A full-stack application for document querying and analysis, built on Azure infrastructure.

## Architecture

### Frontend (Vite + React + TypeScript)

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React Context providers
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── services/      # API service functions
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── public/            # Static assets
└── index.html         # Entry point
```

### Backend (FastAPI)

```
backend/
├── app/
│   ├── api/           # API routes
│   ├── core/          # Core functionality
│   ├── models/        # Data models
│   ├── services/      # Business logic
│   └── utils/         # Utility functions
├── tests/             # Test files
└── main.py           # Application entry point
```

## Technology Stack

### Frontend

- Vite + React + TypeScript
- TailwindCSS for styling
- React Context API for state management
- Axios for API calls

### Backend

- FastAPI
- Azure Blob Storage SDK
- Azure OpenAI SDK
- Pydantic for data validation

## Design Guidelines

### UI/UX

- GitHub-style dark theme
- Responsive design
- Monospace fonts for code
- Smooth transitions
- Clear error states and loading indicators

### Code Style

- TypeScript strict mode
- ESLint + Prettier
- Component-based architecture
- Custom hooks for reusable logic
- Context API for state management

## Security Guidelines

- No secrets in code
- Environment variables for configuration
- Input validation
- Secure file uploads
- CORS configuration

## Deployment

- Azure Static Web Apps for frontend
- Azure App Service for backend
- Azure Blob Storage for file storage
- Azure Key Vault for secrets

## Development Workflow

1. Feature branches
2. Pull request reviews
3. Automated testing
4. Deployment to staging
5. Production deployment

## File Structure Rules

- Maximum file length: 500 lines
- Feature-based organization
- Clear separation of concerns
- Consistent naming conventions

## Testing Strategy

- Unit tests for utilities
- Integration tests for API
- E2E tests for critical flows
- Test coverage requirements

## Documentation Requirements

- README updates for new features
- API documentation
- Deployment instructions
- Environment variable documentation

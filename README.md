# Document Query Tool

A full-stack application for querying and analyzing business and technical documents using Azure OpenAI services.

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2F${GITHUB_REPOSITORY}%2Fmain%2Fazure%2Fmain.bicep)

## Features

- Upload and analyze Executive Overview documents (Markdown)
- Upload and analyze Technical Specifications (JSON)
- Natural language querying powered by Azure OpenAI
- Mermaid diagram rendering
- Secure file storage in Azure Blob Storage
- Dark-themed, responsive UI

## Prerequisites

- Azure subscription
- Azure OpenAI service with:
  - Chat completion deployment
  - Embedding deployment
- Azure Storage account

## Quick Start

1. Click the "Deploy to Azure" button above
2. Fill in the required parameters:
   - Azure OpenAI endpoint
   - Azure OpenAI API key
   - Chat completion deployment name
   - Embedding deployment name
   - Storage account name
   - Storage account key
3. Wait for deployment to complete
4. Access the application via the provided URL

## Manual Setup

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

### Backend Development

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Environment Variables

### Frontend

```env
VITE_API_URL=http://localhost:8000
```

### Backend

```env
AZURE_STORAGE_ACCOUNT=your_storage_account
AZURE_STORAGE_KEY=your_storage_key
STORAGE_CONTAINER=uploads
AZURE_OPENAI_ENDPOINT=your_openai_endpoint
AZURE_OPENAI_API_KEY=your_openai_key
AZURE_OPENAI_CHAT_DEPLOYMENT=your_chat_deployment
AZURE_OPENAI_EMBEDDING_DEPLOYMENT=your_embedding_deployment
```

## Architecture

- Frontend: Vite + React + TypeScript
- Backend: FastAPI
- Storage: Azure Blob Storage
- AI: Azure OpenAI
- Deployment: Azure Static Web Apps + App Service

## Security

- All secrets are stored in Azure Key Vault
- Files are stored securely in Azure Blob Storage
- CORS is configured for secure cross-origin requests
- Input validation on all endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details

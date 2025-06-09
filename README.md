# Document Query Tool

A full-stack application for querying and analyzing business and technical documents using Azure OpenAI services.

## Getting Started

Choose your path:

- **Option A: Deploy directly to Azure** (recommended for production)
- **Option B: Set up locally for development** (see Manual Setup below)

## Features

- Upload and analyze Executive Overview documents (Markdown)
- Upload and analyze Technical Specifications (JSON)
- Natural language querying powered by Azure OpenAI
- Mermaid diagram rendering
- Secure file storage in Azure Blob Storage
- Dark-themed, responsive UI

## Prerequisites

- Azure subscription (see Detailed Setup Guide below for creation steps)
- Azure OpenAI service (see Detailed Setup Guide)
- Azure Storage account (see Detailed Setup Guide)
- Required Azure permissions:
  - Owner or Contributor role on the subscription/resource group
  - Storage Blob Data Contributor role for the storage account
  - Azure OpenAI User role for the OpenAI service

## Detailed Setup Guide

### 1. Azure OpenAI Setup

1. Go to [Azure Portal](https://portal.azure.com)
2. Search for "Azure OpenAI"
3. Click "Create"
4. On the Basics tab:
   - Select your subscription and resource group
   - Choose a unique name
   - Choose a supported region
   - Select Pricing Tier: Standard S0
5. Click "Next"
6. On the Network tab, leave the default settings
7. Click "Next"
8. On the Tags tab, you can add tags if desired
9. Click "Next"
10. On the Review tab, review your settings
11. Click "Create"
12. After creation, note your resource name and endpoint.

### 2. Azure Storage Setup

1. Go to [Azure Portal](https://portal.azure.com)
2. Search for "Storage accounts"
3. Click "Create"
4. Choose a unique name (3-24 characters, lowercase letters and numbers only)
5. Select your subscription and resource group
6. Choose a region
7. Configure the following settings:
   - Performance: Standard
   - Redundancy: Locally-redundant storage (LRS)
   - Primary service: Blob Storage
   - Access tier: Hot
   - Minimum TLS version: Version 1.2
8. Click "Review + create"
9. After the storage account is created:
   1. Go to your storage account in Azure Portal
   2. Click "Data storage" in the left menu
   3. Click "Containers"
   4. Click "+ Container"
   5. Name it "uploads"
   6. Set the access level to "Private"
   7. Click "Create"
10. After creation, note your storage account name and access key.

### 3. Resource Requirements

- Minimum recommended resources:
  - Azure OpenAI: Standard tier
  - Storage: Standard LRS, 100GB minimum
  - App Service: B1 tier or higher
  - Static Web App: Free tier or higher

### 4. Network Requirements

- Outbound internet access for:
  - Azure OpenAI API
  - Azure Storage
  - GitHub (for deployment)
- Inbound access:
  - HTTP/HTTPS (80/443) for web application
  - API endpoints (8000 by default)

## Deployment

### Option 1: Deploy from this repository

Click the button below to deploy directly from this repository:

<a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fcb-kozel%2Fcb-query-azure%2Fmain%2Fazure%2Fmain.json" target="_blank">
<img src="https://aka.ms/deploytoazurebutton" alt="Deploy to Azure"/>
</a>

### Option 2: Deploy from your fork

If you want to deploy from your own fork:

1. Fork this repository
2. Update the deployment URL in your fork's README.md:
   ```html
   <a
     href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2F{YOUR_USERNAME}%2Fcb-query-azure%2Fmain%2Fazure%2Fmain.json"
     target="_blank"
   >
     <img src="https://aka.ms/deploytoazurebutton" alt="Deploy to Azure" />
   </a>
   ```
   Replace `{YOUR_USERNAME}` with your GitHub username
3. Use the deployment button in your fork's README

## Deployment Parameters

When filling out the Custom Deployment form, you'll need:

- **Subscription**: Your Azure subscription
- **Resource Group**: Your resource group
- **Region**: The region for deployment
- **OpenAI Name**: Name of your existing Azure OpenAI resource (see Detailed Setup Guide)
- **Storage Account Name**: Name of your existing Azure Storage account (see Detailed Setup Guide)
- **Static Web App Name**: Unique name for your Static Web App
- **App Service Plan Name**: Name for your App Service Plan
- **App Service Name**: Unique name for your App Service
- **(Optional) Container Name**: Defaults to "uploads" (see Detailed Setup Guide)

_Reference the Detailed Setup Guide above for how to create or find these values._

## Quick Start

1. Complete the steps in the Detailed Setup Guide
2. Click the "Deploy to Azure" button above
3. Fill in the required parameters in the Custom Deployment form
4. Wait for deployment to complete
5. Access the application via the provided URL

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

### Frontend Setup

1. Copy the example environment file:
   ```bash
   cd frontend
   cp .env.example .env
   ```
2. Update the values in `.env`:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

### Backend Setup

1. Copy the example environment file:
   ```bash
   cd backend
   cp .env.example .env
   ```
2. Update the values in `.env`:

   ```env
   # Azure Storage Configuration
   AZURE_STORAGE_ACCOUNT=your_storage_account
   AZURE_STORAGE_KEY=your_storage_key
   STORAGE_CONTAINER=uploads

   # Azure OpenAI Configuration
   AZURE_OPENAI_ENDPOINT=your_openai_endpoint
   AZURE_OPENAI_API_KEY=your_openai_key
   AZURE_OPENAI_CHAT_DEPLOYMENT=your_chat_deployment
   AZURE_OPENAI_EMBEDDING_DEPLOYMENT=your_embedding_deployment

   # Server Configuration
   PORT=8000
   HOST=0.0.0.0
   ```

> **Note**: Never commit `.env` files to version control. They contain sensitive information and should be kept local to your development environment.

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

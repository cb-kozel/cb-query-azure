# Document Query Tool

A full-stack application for querying and analyzing business and technical documents using Azure OpenAI services.

## Features

- Upload and analyze Executive Overview documents (Markdown)
- Upload and analyze Technical Specifications (JSON)
- Natural language querying powered by Azure OpenAI
- Mermaid diagram rendering
- Secure file storage in Azure Blob Storage
- Dark-themed, responsive UI

## Prerequisites

- Azure subscription
  - If you don't have one, [create a free Azure account](https://azure.microsoft.com/free/)
  - Ensure your subscription has access to Azure OpenAI services
- Azure OpenAI service with:
  - Chat completion deployment
  - Embedding deployment
  - [Request access to Azure OpenAI](https://aka.ms/oai/access) if you haven't already
- Azure Storage account
  - [Create a storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create)
  - Enable blob storage
  - Create a container named 'uploads'
- Required Azure permissions:
  - Owner or Contributor role on the subscription/resource group
  - Storage Blob Data Contributor role for the storage account
  - Azure OpenAI User role for the OpenAI service

## Detailed Setup Guide

### 1. Azure OpenAI Setup

1. Create an Azure OpenAI resource:

   - Go to [Azure Portal](https://portal.azure.com)
   - Search for "Azure OpenAI"
   - Click "Create"
   - Select your subscription and resource group
   - Choose a region where Azure OpenAI is available
   - Create deployments for:
     - Chat completion (e.g., gpt-35-turbo)
     - Embedding (e.g., text-embedding-ada-002)

2. Get your Azure OpenAI credentials:
   - Note down the endpoint URL
   - Generate an API key from the "Keys and Endpoint" section
   - Record the deployment names you created

### 2. Azure Storage Setup

1. Create a storage account:

   - Go to [Azure Portal](https://portal.azure.com)
   - Search for "Storage accounts"
   - Click "Create"
   - Select your subscription and resource group
   - Choose a region
   - Select "Standard" performance
   - Choose "LRS" redundancy
   - Enable blob storage

2. Create a container:

   - Go to your storage account
   - Navigate to "Containers"
   - Click "Create container"
   - Name it "uploads"
   - Set access level to "Private"

3. Get your storage credentials:
   - Go to "Access keys"
   - Copy the storage account name
   - Copy one of the access keys

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

### Deployment Parameters

When deploying, you'll need to provide the following parameters:

#### Required Parameters

1. **Subscription**

   - Select your Azure subscription from the dropdown
   - If you don't see your subscription, ensure you have the correct permissions

2. **Resource Group**

   - Select an existing resource group or create a new one
   - To create a new one:
     1. Go to [Azure Portal](https://portal.azure.com)
     2. Click "Resource groups"
     3. Click "Create"
     4. Choose a name and region
     5. Click "Review + create"

3. **Region**

   - Select the Azure region where you want to deploy
   - Choose a region that supports all required services:
     - Azure OpenAI
     - Azure Storage
     - App Service
     - Static Web Apps

4. **OpenAI Name**

   - This is the name of your Azure OpenAI resource
   - If you haven't created it yet:
     1. Go to [Azure Portal](https://portal.azure.com)
     2. Search for "Azure OpenAI"
     3. Click "Create"
     4. Choose a unique name
     5. Select your subscription and resource group
     6. Choose a supported region
     7. Click "Review + create"

5. **Storage Account Name**

   - This is the name of your Azure Storage account
   - If you haven't created it yet:
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

6. **Static Web App Name**

   - Choose a unique name for your Static Web App
   - This will be part of your application's URL: `{name}.azurestaticapps.net`
   - Must be 2-60 characters long
   - Can contain letters, numbers, and hyphens

7. **App Service Plan Name**

   - Choose a name for your App Service Plan
   - This defines the compute resources for your application
   - Must be 1-40 characters long
   - Can contain letters, numbers, and hyphens

8. **App Service Name**
   - Choose a unique name for your App Service
   - This will be part of your API's URL: `{name}.azurewebsites.net`
   - Must be 2-60 characters long
   - Can contain letters, numbers, and hyphens

#### Optional Parameters

1. **Container Name**
   - Default: "uploads"
   - This is the name of the blob container in your storage account
   - If you haven't created it yet:
     1. Go to your storage account in Azure Portal
     2. Click "Containers"
     3. Click "Create container"
     4. Enter "uploads" as the name
     5. Set access level to "Private"
     6. Click "Create"

#### Important Notes

- All names must be globally unique within Azure
- Resource names cannot contain spaces or special characters
- Some services have specific naming requirements (e.g., storage accounts must be lowercase)
- It's recommended to use a consistent naming convention across all resources
- Make sure to note down all names and credentials for future reference

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

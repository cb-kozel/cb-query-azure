@description('The name of the Azure OpenAI resource')
param openAiName string

@description('The name of the storage account')
param storageAccountName string

@description('The name of the container for file uploads')
param containerName string = 'uploads'

@description('The name of the Azure Static Web App')
param staticWebAppName string

@description('The name of the App Service Plan')
param appServicePlanName string

@description('The name of the App Service')
param appServiceName string

@description('The location for all resources')
param location string = resourceGroup().location

@description('The SKU of the App Service Plan')
param appServicePlanSku string = 'B1'

@description('The SKU of the Storage Account')
param storageAccountSku string = 'Standard_LRS'

@description('The SKU of the Azure OpenAI service')
param openAiSku string = 'S0'

// Storage Account
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: storageAccountSku
  }
  kind: 'StorageV2'
  properties: {
    supportsHttpsTrafficOnly: true
  }
}

// Storage Container
resource container 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  name: '${storageAccount.name}/default/${containerName}'
  dependsOn: [
    storageAccount
  ]
}

// Azure OpenAI
resource openAi 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name: openAiName
  location: location
  sku: {
    name: openAiSku
  }
  kind: 'OpenAI'
}

// App Service Plan
resource appServicePlan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: appServicePlanName
  location: location
  sku: {
    name: appServicePlanSku
  }
}

// App Service
resource appService 'Microsoft.Web/sites@2023-01-01' = {
  name: appServiceName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      appSettings: [
        {
          name: 'AZURE_STORAGE_ACCOUNT'
          value: storageAccount.name
        }
        {
          name: 'STORAGE_CONTAINER'
          value: containerName
        }
        {
          name: 'AZURE_OPENAI_ENDPOINT'
          value: 'https://${openAi.name}.openai.azure.com/'
        }
      ]
    }
  }
  identity: {
    type: 'SystemAssigned'
  }
}

// Static Web App
resource staticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: staticWebAppName
  location: location
  sku: {
    name: 'Free'
  }
}

// Outputs
output storageAccountName string = storageAccount.name
output containerName string = container.name
output openAiEndpoint string = 'https://${openAi.name}.openai.azure.com/'
output appServiceUrl string = 'https://${appService.properties.defaultHostName}'
output staticWebAppUrl string = 'https://${staticWebApp.properties.defaultHostname}'

from azure.storage.blob import BlobServiceClient, BlobClient
from app.core.config import settings
import uuid
from datetime import datetime
from typing import Optional
import logging

logger = logging.getLogger(__name__)


class StorageService:
    def __init__(self):
        self.connection_string = f"DefaultEndpointsProtocol=https;AccountName={settings.AZURE_STORAGE_ACCOUNT};AccountKey={settings.AZURE_STORAGE_KEY};EndpointSuffix=core.windows.net"
        self.container_name = settings.STORAGE_CONTAINER
        self.blob_service_client = BlobServiceClient.from_connection_string(
            self.connection_string
        )

        # Ensure container exists
        try:
            self.container_client = self.blob_service_client.get_container_client(
                self.container_name
            )
            self.container_client.get_container_properties()
        except Exception as e:
            logger.info(f"Container {self.container_name} does not exist. Creating...")
            self.container_client = self.blob_service_client.create_container(
                self.container_name
            )

    async def upload_file(
        self, file_content: bytes, filename: str, content_type: str
    ) -> dict:
        """Upload a file to Azure Blob Storage."""
        try:
            # Generate a unique blob name
            blob_name = f"{uuid.uuid4()}-{filename}"
            blob_client = self.container_client.get_blob_client(blob_name)

            # Upload the file
            blob_client.upload_blob(
                file_content, overwrite=True, content_type=content_type
            )

            # Get the URL
            url = blob_client.url

            return {
                "id": str(uuid.uuid4()),
                "filename": filename,
                "url": url,
                "created_at": datetime.utcnow().isoformat(),
            }

        except Exception as e:
            logger.error(f"Error uploading file: {str(e)}")
            raise

    async def delete_file(self, blob_name: str) -> bool:
        """Delete a file from Azure Blob Storage."""
        try:
            blob_client = self.container_client.get_blob_client(blob_name)
            blob_client.delete_blob()
            return True
        except Exception as e:
            logger.error(f"Error deleting file: {str(e)}")
            return False

    async def get_file_url(self, blob_name: str) -> Optional[str]:
        """Get the URL for a file in Azure Blob Storage."""
        try:
            blob_client = self.container_client.get_blob_client(blob_name)
            return blob_client.url
        except Exception as e:
            logger.error(f"Error getting file URL: {str(e)}")
            return None


storage_service = StorageService()

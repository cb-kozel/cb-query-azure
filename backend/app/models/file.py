from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum


class DocumentType(str, Enum):
    EXECUTIVE_OVERVIEW = "executive_overview"
    TECHNICAL_SPEC = "technical_spec"


class FileUpload(BaseModel):
    filename: str
    content_type: str
    size: int
    document_type: DocumentType

    class Config:
        json_schema_extra = {
            "example": {
                "filename": "executive-overview.md",
                "content_type": "text/markdown",
                "size": 1024,
                "document_type": "executive_overview",
            }
        }


class FileResponse(BaseModel):
    id: str
    filename: str
    document_type: DocumentType
    url: str
    created_at: str

    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "filename": "executive-overview.md",
                "document_type": "executive_overview",
                "url": "https://storage.blob.core.windows.net/uploads/executive-overview.md",
                "created_at": "2024-03-09T12:00:00Z",
            }
        }

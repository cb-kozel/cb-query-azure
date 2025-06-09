from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.storage import storage_service
from app.models.file import FileUpload, FileResponse, DocumentType
import magic
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

ALLOWED_MIME_TYPES = {
    "text/markdown": DocumentType.EXECUTIVE_OVERVIEW,
    "application/json": DocumentType.TECHNICAL_SPEC,
}


@router.post("/upload", response_model=FileResponse)
async def upload_file(file: UploadFile = File(...)):
    """
    Upload a document file (Markdown or JSON).
    """
    try:
        # Read file content
        content = await file.read()

        # Detect MIME type
        mime = magic.Magic(mime=True)
        content_type = mime.from_buffer(content)

        # Validate file type
        if content_type not in ALLOWED_MIME_TYPES:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid file type. Allowed types: {', '.join(ALLOWED_MIME_TYPES.keys())}",
            )

        # Upload to Azure Blob Storage
        result = await storage_service.upload_file(
            file_content=content, filename=file.filename, content_type=content_type
        )

        # Add document type to response
        result["document_type"] = ALLOWED_MIME_TYPES[content_type]

        return result

    except Exception as e:
        logger.error(f"Error uploading file: {str(e)}")
        raise HTTPException(status_code=500, detail="Error uploading file")

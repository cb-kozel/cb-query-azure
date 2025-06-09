from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Azure Storage
    AZURE_STORAGE_ACCOUNT: str
    AZURE_STORAGE_KEY: str
    STORAGE_CONTAINER: str = "uploads"

    # Azure OpenAI
    AZURE_OPENAI_ENDPOINT: str
    AZURE_OPENAI_API_KEY: str
    AZURE_OPENAI_CHAT_DEPLOYMENT: str
    AZURE_OPENAI_EMBEDDING_DEPLOYMENT: str

    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Document Query Tool"

    # CORS Settings
    BACKEND_CORS_ORIGINS: list[str] = ["*"]

    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()

import React, { useState, useCallback } from "react";
import { FileContext } from "./FileContext";
import { uploadFile } from "../services/api";
import type { FileUploadResponse } from "../services/api";

export const FileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [files, setFiles] = useState<FileUploadResponse[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadNewFile = useCallback(async (file: File) => {
    setIsUploading(true);
    setUploadError(null);

    try {
      const response = await uploadFile(file);
      setFiles((prev) => [...prev, response]);
    } catch (error) {
      setUploadError("Failed to upload file. Please try again.");
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return (
    <FileContext.Provider
      value={{
        files,
        isUploading,
        uploadError,
        uploadNewFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

import { createContext } from "react";
import type { FileUploadResponse } from "../services/api";

export interface FileContextType {
  files: FileUploadResponse[];
  isUploading: boolean;
  uploadError: string | null;
  uploadNewFile: (file: File) => Promise<void>;
}

export const FileContext = createContext<FileContextType | null>(null);

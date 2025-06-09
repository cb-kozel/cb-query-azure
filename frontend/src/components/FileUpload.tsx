import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon, DocumentIcon } from "@heroicons/react/24/outline";

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  isUploading: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  isUploading,
}) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null);
      const file = acceptedFiles[0];

      if (!file) return;

      try {
        await onUpload(file);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error uploading file. Please try again.",
        );
      }
    },
    [onUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/markdown": [".md"],
      "application/json": [".json"],
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-2xl p-8
          flex flex-col items-center justify-center
          cursor-pointer transition-colors
          ${
            isDragActive
              ? "border-accent bg-accent/10"
              : "border-text-secondary/20"
          }
          ${
            isUploading
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-accent"
          }
        `}
      >
        <input
          {...getInputProps()}
          disabled={isUploading}
          aria-label={
            isDragActive ? "Drop the file here" : "Drag & drop a file here"
          }
        />

        {isUploading ? (
          <div className="flex flex-col items-center">
            <DocumentIcon className="w-12 h-12 text-text-secondary mb-4" />
            <p className="text-text-secondary">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <ArrowUpTrayIcon className="w-12 h-12 text-text-secondary mb-4" />
            <p className="text-text-primary text-lg mb-2">
              {isDragActive ? "Drop the file here" : "Drag & drop a file here"}
            </p>
            <p className="text-text-secondary text-sm">
              or click to select a file
            </p>
            <p className="text-text-secondary text-xs mt-2">
              Supported formats: .md, .json
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
};

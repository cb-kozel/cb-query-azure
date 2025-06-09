import { FileUpload } from "./components/FileUpload";
import { FileProvider } from "./contexts/FileProvider";
import { useFileContext } from "./hooks/useFileContext";

const FileUploadSection = () => {
  const { isUploading, uploadNewFile, uploadError } = useFileContext();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-text-primary mb-8">
          Document Query Tool
        </h1>

        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Upload Document
          </h2>
          <FileUpload onUpload={uploadNewFile} isUploading={isUploading} />
          {uploadError && (
            <p className="text-red-500 text-sm mt-4 text-center">
              {uploadError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <FileProvider>
      <FileUploadSection />
    </FileProvider>
  );
}

export default App;

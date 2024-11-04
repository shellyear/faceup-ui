import { ChangeEvent, useState } from "react";

export function useFileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (selectedFiles.length > 20) {
        setFileError("You can only upload up to 20 files at once.");
      } else {
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        setFileError(null);
      }
    }
  };

  return {
    files,
    fileError,
    handleFileChange,
  };
}

type FileUploadProps = {
  className?: string;
  fileError: string | null;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const FileUpload = ({ className, handleFileChange }: FileUploadProps) => {
  return (
    <div className={className}>
      <input
        type="file"
        name="files"
        multiple
        onChange={handleFileChange}
        className="file-input file-input-bordered file-input-info w-full max-w-md"
      />
    </div>
  );
};

export default FileUpload;

"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X, FileIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

interface FileUploaderProps {
  endpoint: "fileUploader";
  value: string[];
  onChange: (urls: string[]) => void;
  disabled?: boolean;
}

export default function FileUploader({
  endpoint,
  value,
  onChange,
  disabled,
}: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleRemove = (urlToRemove: string) => {
    onChange(value.filter((url) => url !== urlToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {value.map((url, index) => (
          <div
            key={index}
            className="relative flex items-center p-3 border rounded-lg bg-slate-50"
          >
            <div className="flex-1 min-w-0 flex items-center gap-2">
              <FileIcon className="h-8 w-8 text-emerald-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <Link
                  href={url}
                  target="_blank"
                  className="text-sm font-medium text-emerald-600 hover:underline truncate block"
                >
                  Attachment {index + 1}
                </Link>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(url)}
              className="ml-2 p-1 text-slate-400 hover:text-red-500 transition-colors"
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {!disabled && (
        <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
          <UploadDropzone
            endpoint={endpoint}
            onUploadBegin={() => setIsUploading(true)}
            onClientUploadComplete={(res) => {
              const newUrls = res?.map((file) => file.url) || [];
              onChange([...value, ...newUrls]);
              setIsUploading(false);
              toast.success("Files uploaded successfully");
            }}
            onUploadError={(error: Error) => {
              setIsUploading(false);
              toast.error(`Error uploading files: ${error.message}`);
            }}
            appearance={{
              button: "bg-emerald-600 text-white hover:bg-emerald-700",
              container: "w-full",
              label: "text-emerald-600 hover:text-emerald-700",
            }}
          />
          {isUploading && (
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Uploading files...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

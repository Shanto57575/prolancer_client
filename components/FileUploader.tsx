"use client";

import { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";

interface FileUploaderProps {
  onUpload: (url: string) => void;
}

export default function FileUploader({ onUpload }: FileUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <UploadButton
        endpoint="fileUploader"
        onClientUploadComplete={(res) => {
          const file = res?.[0];

          const url = file?.serverData?.fileUrl;
          const mime = file?.type;
          console.log("mime==>", mime);
          console.log("url==>", url);

          if (url) {
            setPreviewUrl(url);
            setFileType(mime);
            onUpload(url);
          }
        }}
        onUploadError={(err) => {
          console.error(err);
          alert("Upload failed: " + err.message);
        }}
      />

      {previewUrl && (
        <div className="mt-3">
          <p className="font-medium text-sm mb-1">Preview:</p>

          {fileType?.startsWith("image/") ? (
            <Image
              src={previewUrl}
              alt="Preview"
              width={128}
              height={128}
              className="h-32 w-32 rounded-md border object-cover"
            />
          ) : (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View File
            </a>
          )}
        </div>
      )}
    </div>
  );
}

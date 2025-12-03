"use client";

import { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  currentImage?: string;
  onUploadComplete: (url: string) => void;
  label?: string;
}

export default function ImageUpload({
  currentImage,
  onUploadComplete,
  label = "Profile Picture",
}: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImage || null
  );
  const [isUploading, setIsUploading] = useState(false);

  const handleRemove = () => {
    setPreviewUrl(null);
    onUploadComplete("");
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-slate-700">{label}</label>

      {previewUrl ? (
        <div className="relative inline-block">
          <Image
            src={previewUrl}
            alt="Profile preview"
            width={128}
            height={128}
            className="h-32 w-32 rounded-full object-cover border-4 border-slate-200"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <div className="h-32 w-32 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center">
            <Upload className="w-8 h-8 text-slate-400" />
          </div>
          <div>
            <UploadButton
              endpoint="fileUploader"
              onClientUploadComplete={(res) => {
                const file = res?.[0];
                const url = file?.serverData?.fileUrl;
                if (url) {
                  setPreviewUrl(url);
                  onUploadComplete(url);
                }
                setIsUploading(false);
              }}
              onUploadError={(err) => {
                console.error(err);
                alert("Upload failed: " + err.message);
                setIsUploading(false);
              }}
              onUploadBegin={() => setIsUploading(true)}
              appearance={{
                button:
                  "ut-ready:bg-blue-500 ut-uploading:cursor-not-allowed bg-blue-500 ut-uploading:bg-blue-400",
                allowedContent: "text-xs text-slate-500",
              }}
            />
            {isUploading && (
              <p className="text-sm text-slate-500 mt-2">Uploading...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";
import { FileText, X, ExternalLink } from "lucide-react";

interface ResumeUploadProps {
  currentResume?: string;
  onUploadComplete: (url: string) => void;
}

export default function ResumeUpload({
  currentResume,
  onUploadComplete,
}: ResumeUploadProps) {
  const [resumeUrl, setResumeUrl] = useState<string | null>(
    currentResume || null
  );
  const [isUploading, setIsUploading] = useState(false);

  const handleRemove = () => {
    setResumeUrl(null);
    onUploadComplete("");
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-slate-700">Resume (PDF)</label>

      {resumeUrl ? (
        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <FileText className="w-8 h-8 text-emerald-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900">
              Resume uploaded
            </p>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 mt-1"
            >
              View Resume <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div>
          <UploadButton
            endpoint="fileUploader"
            onClientUploadComplete={(res) => {
              const file = res?.[0];
              const url = file?.serverData?.fileUrl;
              if (url) {
                setResumeUrl(url);
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
                "ut-ready:bg-emerald-600 ut-uploading:cursor-not-allowed bg-emerald-600 ut-uploading:bg-emerald-400",
              allowedContent: "text-xs text-slate-500",
            }}
          />
          {isUploading && (
            <p className="text-sm text-slate-500 mt-2">Uploading...</p>
          )}
        </div>
      )}
    </div>
  );
}

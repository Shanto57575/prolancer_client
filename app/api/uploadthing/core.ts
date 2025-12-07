import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  fileUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 5 },
    pdf: { maxFileSize: "16MB", maxFileCount: 3 },
    text: { maxFileSize: "8MB", maxFileCount: 3 },
    blob: { maxFileSize: "32MB", maxFileCount: 5 }, // Allows generic files
  }).onUploadComplete(async ({ file }) => {
    // This runs AFTER upload finishes
    console.log("Uploaded file:", file.ufsUrl);

    return { fileUrl: file.ufsUrl }; // sent back to client
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

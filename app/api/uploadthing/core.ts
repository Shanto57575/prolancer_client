import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  fileUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 5 },
    pdf: { maxFileSize: "16MB", maxFileCount: 3 },
    // add more if needed: video, audio, any
  }).onUploadComplete(async ({ file }) => {
    // This runs AFTER upload finishes
    console.log("Uploaded file:", file.ufsUrl);

    return { fileUrl: file.ufsUrl }; // sent back to client
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

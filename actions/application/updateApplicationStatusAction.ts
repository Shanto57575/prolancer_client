"use server";

import { revalidateTag } from "next/cache";
import getAuthHeaders from "../sharedFunction/getAuthHeaders";

export const updateApplicationStatusAction = async (
  applicationId: string,
  status: "accepted" | "rejected"
) => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.API_BASE_URL}/applications/${applicationId}/status`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    }
  );

  const data = await res.json();
  if (data?.success) {
    revalidateTag("job-applications", "default");
    revalidateTag("my-posted-jobs", "default");
  }

  return data;
};

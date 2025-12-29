"use server";

import getAuthHeaders from "../sharedFunction/getAuthHeaders";
import { revalidateTag } from "next/cache";

export const toggleJobStatusAction = async (
  jobId: string,
  status: "OPEN" | "CLOSED"
) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${process.env.API_BASE_URL}/jobs/${jobId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ status }),
  });

  const data = await res.json();
  if (data?.success) {
    revalidateTag("jobs", "max");
    revalidateTag("my-jobs", "max");
    revalidateTag(`job-${jobId}`, "max");
  }

  return data;
};

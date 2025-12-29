"use server";

import { revalidateTag } from "next/cache";
import getAuthHeaders from "../sharedFunction/getAuthHeaders";

export const createApplicationAction = async (jobId: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${process.env.API_BASE_URL}/applications`, {
    method: "POST",
    headers,
    body: JSON.stringify({ jobId }),
  });

  const data = await res.json();
  if (data?.success) {
    revalidateTag(`job-${jobId}`, "max");
    revalidateTag("jobs", "max");
    revalidateTag("my-applications", "max");
  }

  return data;
};

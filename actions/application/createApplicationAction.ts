"use server";

import { revalidateTag } from "next/cache";
import getAuthHeaders from "../sharedFunction/getAuthHeaders";

export const createApplicationAction = async (jobId: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/applications`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ jobId }),
    }
  );

  const data = await res.json();
  if (data?.success) {
    revalidateTag("job-details", "default");
    revalidateTag("my-applications", "default");
  }

  return data;
};

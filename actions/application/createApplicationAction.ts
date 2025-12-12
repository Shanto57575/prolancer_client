"use server";

import { revalidatePath, revalidateTag } from "next/cache";
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
    revalidateTag("job-details", "default");
    revalidateTag("my-applications", "default");
    revalidatePath("/dashboard");
  }

  return data;
};

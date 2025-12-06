"use server";

import { revalidateTag } from "next/cache";
import getAuthHeaders from "../sharedFunction/getAuthHeaders";

export const createApplicationAction = async (jobId: string) => {
  console.log("jobId from createApplicationAction", jobId);
  const headers = await getAuthHeaders();
  console.log("headers from createApplicationAction", headers);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/applications`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ jobId }),
    }
  );
  console.log("RES from createApplicationAction", res);

  const data = await res.json();
  console.log("data from createApplicationAction", data);
  if (data?.success) {
    revalidateTag("job-details", "default");
    revalidateTag("my-applications", "default");
  }

  return data;
};

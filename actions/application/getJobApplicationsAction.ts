"use server";

import getAuthHeaders from "../sharedFunction/getAuthHeaders";

export const getJobApplicationsAction = async (
  jobId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams: any
) => {
  const headers = await getAuthHeaders();
  const queryString = new URLSearchParams(searchParams).toString();

  const res = await fetch(
    `${process.env.API_BASE_URL}/applications/job/${jobId}?${queryString}`,
    {
      method: "GET",
      headers,
      next: {
        tags: [`job-applications-${jobId}`],
      },
    }
  );

  const data = await res.json();
  return data;
};

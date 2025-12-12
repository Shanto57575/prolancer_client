"use server";

import getAuthHeaders from "../sharedFunction/getAuthHeaders";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMyApplicationsAction = async (searchParams: any) => {
  const headers = await getAuthHeaders();
  const queryString = new URLSearchParams(searchParams).toString();

  const res = await fetch(
    `${process.env.API_BASE_URL}/applications/my-applications?${queryString}`,
    {
      method: "GET",
      headers,
      next: {
        tags: ["my-applications"],
      },
    }
  );

  const data = await res.json();
  return data;
};

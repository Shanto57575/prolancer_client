"use server";

export const getPublicFreelancers = async (
  page: number = 1,
  limit: number = 20,
  searchTerm: string = "",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: any = {}
) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(searchTerm && { search: searchTerm }),
    ...(filters.skill && { skill: filters.skill }),
    ...(filters.location && { location: filters.location }),
    ...(filters.minRate && { minRate: filters.minRate.toString() }),
    ...(filters.maxRate && { maxRate: filters.maxRate.toString() }),
    ...(filters.sortBy && { sortBy: filters.sortBy }),
    ...(filters.sortOrder && { sortOrder: filters.sortOrder }),
  });

  const response = await fetch(
    `${process.env.API_BASE_URL}/freelancer/public?${queryParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["freelancers"] },
    }
  );

  const data = await response.json();

  return {
    ok: response.ok,
    data: data?.data || [],
    meta: data?.meta,
    message: data.message,
  };
};

export const getFreelancerById = async (id: string) => {
  const response = await fetch(`${process.env.API_BASE_URL}/freelancer/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: [`freelancer-${id}`] },
  });
  const data = await response.json();
  return {
    ok: response.ok,
    data: data.data,
    message: data.message,
  };
};

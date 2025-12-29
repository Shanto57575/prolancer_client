"use server";

import { revalidateTag } from "next/cache";
import getAuthHeaders from "../sharedFunction/getAuthHeaders";

const API_BASE = process.env.API_BASE_URL;

export async function createJobAction(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const serviceCategory = formData.get("serviceCategory") as string;
    const jobType = formData.get("jobType") as string;
    const budget = formData.get("budget")
      ? Number(formData.get("budget"))
      : undefined;
    const timeline = formData.get("timeline") as string;
    const requiredSkills = (formData.get("requiredSkills") as string)
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const experienceLevel = formData.get("experienceLevel") as string;
    const projectDuration = formData.get("projectDuration") as string;
    const numFreelancers = formData.get("numFreelancers")
      ? Number(formData.get("numFreelancers"))
      : 1;
    const deadline = formData.get("deadline") as string;
    const attachments = formData.getAll("attachments") as string[];

    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/jobs`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        title,
        description,
        serviceCategory,
        jobType,
        budget,
        timeline,
        requiredSkills,
        experienceLevel,
        projectDuration,
        numFreelancers,
        deadline,
        attachments,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create job");

    revalidateTag("jobs", "max");
    return { ok: true, message: "Job created successfully", data: data.data };
  } catch (error: Error | unknown) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

export async function updateJobAction(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const serviceCategory = formData.get("serviceCategory") as string;
    const jobType = formData.get("jobType") as string;
    const budget = formData.get("budget")
      ? Number(formData.get("budget"))
      : undefined;
    const timeline = formData.get("timeline") as string;
    const requiredSkills = (formData.get("requiredSkills") as string)
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const experienceLevel = formData.get("experienceLevel") as string;
    const projectDuration = formData.get("projectDuration") as string;
    const numFreelancers = formData.get("numFreelancers")
      ? Number(formData.get("numFreelancers"))
      : 1;
    const deadline = formData.get("deadline") as string;
    const attachments = formData.getAll("attachments") as string[];

    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/jobs/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        title,
        description,
        serviceCategory,
        jobType,
        budget,
        timeline,
        requiredSkills,
        experienceLevel,
        projectDuration,
        numFreelancers,
        deadline,
        attachments,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update job");

    revalidateTag("jobs", "max");
    revalidateTag(`job-${id}`, "max");
    return { ok: true, message: "Job updated successfully" };
  } catch (error: Error | unknown) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

export async function deleteJobAction(id: string) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/jobs/${id}`, {
      method: "DELETE",
      headers,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete job");

    revalidateTag("jobs", "max");
    revalidateTag(`job-${id}`, "max");
    return { ok: true, message: "Job deleted successfully" };
  } catch (error: Error | unknown) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

export async function getMyJobsAction(
  page = 1,
  limit = 10,
  search = "",
  filters = {}
) {
  try {
    const headers = await getAuthHeaders();
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search,
      ...filters,
    });

    const res = await fetch(`${API_BASE}/jobs/my-jobs?${query.toString()}`, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch jobs");

    return { ok: true, data: data.data, meta: data.meta };
  } catch (error: Error | unknown) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

export async function getAllJobsPublicAction(
  page = 1,
  limit = 10,
  search = "",
  filters = {}
) {
  try {
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search,
      ...filters,
    });

    const res = await fetch(`${API_BASE}/jobs?${query.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["jobs"],
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch jobs");

    return { ok: true, data: data.data, meta: data.meta };
  } catch (error: Error | unknown) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

export async function getAllJobsAction(
  page = 1,
  limit = 10,
  search = "",
  filters = {}
) {
  // reusing the public action logic to potentially remove the cookie dependency if this wasn't strictly private
  return getAllJobsPublicAction(page, limit, search, filters);
}

export async function getJobByIdPublicAction(id: string) {
  try {
    const res = await fetch(`${API_BASE}/jobs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["job", id],
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch job");

    return { ok: true, data: data.data };
  } catch (error: Error | unknown) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

export async function getJobByIdAction(id: string) {
  return getJobByIdPublicAction(id);
}

"use server";

import { revalidatePath } from "next/cache";
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

    revalidatePath("/dashboard/client/my-posted-jobs");
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

    revalidatePath("/dashboard/client/my-posted-jobs");
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

    revalidatePath("/dashboard/client/my-posted-jobs");
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

/**
 * Public action to get all jobs.
 * Does NOT use cookies() to allow for Static Site Generation (SSG) / ISR.
 * Revalidates every 60 seconds.
 */
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
      next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
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

/**
 * Legacy action that might have used auth, redirected to public for now
 * but kept for backward compatibility if we decide to re-add strict auth checks later.
 * Ideally, we migrate to use getAllJobsPublicAction for the public lists.
 */
export async function getAllJobsAction(
  page = 1,
  limit = 10,
  search = "",
  filters = {}
) {
  // reusing the public action logic to potentially remove the cookie dependency if this wasn't strictly private
  return getAllJobsPublicAction(page, limit, search, filters);
}

/**
 * Public action to get single job.
 * Does NOT use cookies() to allow for SSG/ISR.
 * Revalidates every 1 hour (3600s).
 */
export async function getJobByIdPublicAction(id: string) {
  try {
    const res = await fetch(`${API_BASE}/jobs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // ISR: Revalidate every hour
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

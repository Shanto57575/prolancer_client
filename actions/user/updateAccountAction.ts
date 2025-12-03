"use server";

import { cookies } from "next/headers";

export async function updateAccountAction(formData: FormData) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!API_BASE) {
    return { ok: false, message: "API URL not configured" };
  }

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { ok: false, message: "Not authenticated" };
    }

    // Extract data from FormData
    const role = String(formData.get("role") ?? "");
    const name = String(formData.get("name") ?? "").trim();
    const profilePicture = String(formData.get("profilePicture") ?? "").trim();

    // Update user base fields
    const userPayload: Record<string, string> = {};
    if (name) userPayload.name = name;
    if (profilePicture) userPayload.profilePicture = profilePicture;

    let userUpdateSuccess = false;
    if (Object.keys(userPayload).length > 0) {
      const userRes = await fetch(`${API_BASE.replace(/\/$/, "")}/user/me`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userPayload),
      });

      const userData = await userRes.json().catch(() => ({}));
      if (!userRes.ok) {
        return {
          ok: false,
          message: userData?.message ?? "Failed to update profile",
        };
      }
      userUpdateSuccess = true;
    }

    // Update role-specific fields
    let roleUpdateSuccess = false;
    if (role === "FREELANCER") {
      const freelancerPayload: Record<string, unknown> = {};

      const bio = String(formData.get("bio") ?? "").trim();
      const skills = String(formData.get("skills") ?? "").trim();
      const portfolio = String(formData.get("portfolio") ?? "").trim();
      const resume = String(formData.get("resume") ?? "").trim();
      const otherWebsiteLink = String(
        formData.get("otherWebsiteLink") ?? ""
      ).trim();
      const linkedinLink = String(formData.get("linkedinLink") ?? "").trim();
      const hourlyRate = String(formData.get("hourlyRate") ?? "").trim();
      const experience = String(formData.get("experience") ?? "").trim();
      const location = String(formData.get("location") ?? "").trim();
      const designation = String(formData.get("designation") ?? "").trim();

      if (bio) freelancerPayload.bio = bio;
      if (skills)
        freelancerPayload.skills = skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      if (portfolio) freelancerPayload.portfolio = portfolio;
      if (resume) freelancerPayload.resume = resume;
      if (otherWebsiteLink)
        freelancerPayload.otherWebsiteLink = otherWebsiteLink;
      if (linkedinLink) freelancerPayload.linkedinLink = linkedinLink;
      if (hourlyRate) freelancerPayload.hourlyRate = parseFloat(hourlyRate);
      if (experience) freelancerPayload.experience = parseInt(experience);
      if (location) freelancerPayload.location = location;
      if (designation) freelancerPayload.designation = designation;

      if (Object.keys(freelancerPayload).length > 0) {
        const freelancerRes = await fetch(
          `${API_BASE.replace(/\/$/, "")}/freelancer/me`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(freelancerPayload),
          }
        );

        const freelancerData = await freelancerRes.json().catch(() => ({}));
        if (!freelancerRes.ok) {
          return {
            ok: false,
            message:
              freelancerData?.message ?? "Failed to update freelancer profile",
          };
        }
        roleUpdateSuccess = true;
      }
    } else if (role === "CLIENT") {
      const clientPayload: Record<string, unknown> = {};

      const company = String(formData.get("company") ?? "").trim();
      const website = String(formData.get("website") ?? "").trim();
      const bio = String(formData.get("bio") ?? "").trim();
      const location = String(formData.get("location") ?? "").trim();
      const designation = String(formData.get("designation") ?? "").trim();
      const experience = String(formData.get("experience") ?? "").trim();

      if (company) clientPayload.company = company;
      if (website) clientPayload.website = website;
      if (bio) clientPayload.bio = bio;
      if (location) clientPayload.location = location;
      if (designation) clientPayload.designation = designation;
      if (experience) clientPayload.experience = parseInt(experience);

      if (Object.keys(clientPayload).length > 0) {
        const clientRes = await fetch(
          `${API_BASE.replace(/\/$/, "")}/client/me`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(clientPayload),
          }
        );

        const clientData = await clientRes.json().catch(() => ({}));
        if (!clientRes.ok) {
          return {
            ok: false,
            message: clientData?.message ?? "Failed to update client profile",
          };
        }
        roleUpdateSuccess = true;
      }
    }

    if (userUpdateSuccess || roleUpdateSuccess) {
      return { ok: true, message: "Profile updated successfully" };
    }

    return { ok: false, message: "No changes to update" };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Unexpected error",
    };
  }
}

"use client";

import { useState, useEffect, FormEvent } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "./ImageUpload";
import ResumeUpload from "./ResumeUpload";
import { getProfileAction } from "@/actions/user/getProfileAction";
import { updateAccountAction } from "@/actions/user/updateAccountAction";
import {
  User,
  Mail,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Link as LinkIcon,
  Linkedin,
  Globe,
  FileText,
  Building2,
} from "lucide-react";
import { userField } from "@/utils/userField";

export default function ManageAccountForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [userRole, setUserRole] = useState<string>("");

  const [formData, setFormData] = useState(userField);

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsFetching(true);
    try {
      const result = await getProfileAction();
      if (result.ok && result.data) {
        const { roleData, ...userData } = result.data;

        setUserRole(userData.role);
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          profilePicture: userData.profilePicture || "",
          // Client fields
          company: roleData?.company || "",
          website: roleData?.website || "",
          // Common fields
          bio: roleData?.bio || "",
          location: roleData?.location || "",
          designation: roleData?.designation || "",
          experience: roleData?.experience?.toString() || "",
          // Freelancer fields
          skills: roleData?.skills?.join(", ") || "",
          portfolio: roleData?.portfolio || "",
          resume: roleData?.resume || "",
          otherWebsiteLink: roleData?.otherWebsiteLink || "",
          linkedinLink: roleData?.linkedinLink || "",
          hourlyRate: roleData?.hourlyRate?.toString() || "",
        });
      } else {
        toast.error(result.message || "Failed to fetch profile");
      }
    } catch (err) {
      toast.error("Failed to load profile");
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (userRole === "FREELANCER") {
      if (formData.hourlyRate && isNaN(parseFloat(formData.hourlyRate))) {
        newErrors.hourlyRate = "Must be a valid number";
      }
    }

    if (formData.experience && isNaN(parseInt(formData.experience))) {
      newErrors.experience = "Must be a valid number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    console.log(userRole);
    setIsLoading(true);
    try {
      const fd = new FormData();
      fd.append("role", userRole);
      fd.append("name", formData.name);
      if (formData.profilePicture)
        fd.append("profilePicture", formData.profilePicture);

      // Add role-specific fields
      if (userRole === "CLIENT") {
        if (formData.company) fd.append("company", formData.company);
        if (formData.website) fd.append("website", formData.website);
        if (formData.bio) fd.append("bio", formData.bio);
        if (formData.location) fd.append("location", formData.location);
        if (formData.designation)
          fd.append("designation", formData.designation);
        if (formData.experience) fd.append("experience", formData.experience);
      } else if (userRole === "FREELANCER") {
        if (formData.bio) fd.append("bio", formData.bio);
        if (formData.skills) fd.append("skills", formData.skills);
        if (formData.portfolio) fd.append("portfolio", formData.portfolio);
        if (formData.resume) fd.append("resume", formData.resume);
        if (formData.otherWebsiteLink)
          fd.append("otherWebsiteLink", formData.otherWebsiteLink);
        if (formData.linkedinLink)
          fd.append("linkedinLink", formData.linkedinLink);
        if (formData.hourlyRate) fd.append("hourlyRate", formData.hourlyRate);
        if (formData.experience) fd.append("experience", formData.experience);
        if (formData.location) fd.append("location", formData.location);
        if (formData.designation)
          fd.append("designation", formData.designation);
      }

      const result = await updateAccountAction(fd);
      console.log(result);

      if (!result.ok) {
        toast.error(result.message || "Update failed");
        return;
      }

      toast.success(result.message || "Profile updated successfully");
      await fetchProfile(); // Refresh data
    } catch (err) {
      toast.error("Update failed", {
        description: err instanceof Error ? err.message : "Unexpected error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <ImageUpload
        currentImage={formData.profilePicture}
        onUploadComplete={(url) =>
          setFormData({ ...formData, profilePicture: url })
        }
      />
      <h1 className="text-sm w-20 font-semibold p-1 rounded-full text-center text-emerald-100 bg-emerald-800">
        {userRole}
      </h1>
      {/* Common Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Full Name *</FieldLabel>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              disabled={isLoading}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="h-12 pl-11"
            />
          </div>
          {errors.name && <FieldError>{errors.name}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email Address</FieldLabel>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
            <Input
              id="email"
              name="email"
              type="email"
              disabled
              value={formData.email}
              className="h-12 pl-11 bg-slate-50 cursor-not-allowed"
            />
          </div>
        </Field>
      </div>

      {/* Client-Specific Fields */}
      {userRole === "CLIENT" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field>
              <FieldLabel htmlFor="company">Company</FieldLabel>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Your company name"
                  disabled={isLoading}
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="h-12 pl-11"
                />
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="website">Website</FieldLabel>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="https://example.com"
                  disabled={isLoading}
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  className="h-12 pl-11"
                />
              </div>
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="bio">Bio</FieldLabel>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Tell us about yourself and your company..."
              disabled={isLoading}
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={4}
              className="resize-none"
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="City, Country"
                  disabled={isLoading}
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="h-12 pl-11"
                />
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="designation">Designation</FieldLabel>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="designation"
                  name="designation"
                  type="text"
                  placeholder="Your job title"
                  disabled={isLoading}
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                  className="h-12 pl-11"
                />
              </div>
            </Field>

            <Field data-invalid={!!errors.experience}>
              <FieldLabel htmlFor="experience">Experience (years)</FieldLabel>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="experience"
                  name="experience"
                  type="number"
                  placeholder="0"
                  disabled={isLoading}
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  className="h-12 pl-11"
                />
              </div>
              {errors.experience && (
                <FieldError>{errors.experience}</FieldError>
              )}
            </Field>
          </div>
        </>
      )}

      {/* Freelancer-Specific Fields */}
      {userRole === "FREELANCER" && (
        <>
          <Field>
            <FieldLabel htmlFor="bio">Bio</FieldLabel>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Tell clients about your skills and experience..."
              disabled={isLoading}
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={4}
              className="resize-none"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="skills">Skills</FieldLabel>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="skills"
                name="skills"
                type="text"
                placeholder="React, Node.js, TypeScript (comma-separated)"
                disabled={isLoading}
                value={formData.skills}
                onChange={(e) =>
                  setFormData({ ...formData, skills: e.target.value })
                }
                className="h-12 pl-11"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Separate skills with commas
            </p>
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field>
              <FieldLabel htmlFor="portfolio">Portfolio URL</FieldLabel>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="portfolio"
                  name="portfolio"
                  type="url"
                  placeholder="https://portfolio.com"
                  disabled={isLoading}
                  value={formData.portfolio}
                  onChange={(e) =>
                    setFormData({ ...formData, portfolio: e.target.value })
                  }
                  className="h-12 pl-11"
                />
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="otherWebsiteLink">Other Website</FieldLabel>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="otherWebsiteLink"
                  name="otherWebsiteLink"
                  type="url"
                  placeholder="https://website.com"
                  disabled={isLoading}
                  value={formData.otherWebsiteLink}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      otherWebsiteLink: e.target.value,
                    })
                  }
                  className="h-12 pl-11"
                />
              </div>
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="linkedinLink">LinkedIn Profile</FieldLabel>
            <div className="relative">
              <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="linkedinLink"
                name="linkedinLink"
                type="url"
                placeholder="https://linkedin.com/in/username"
                disabled={isLoading}
                value={formData.linkedinLink}
                onChange={(e) =>
                  setFormData({ ...formData, linkedinLink: e.target.value })
                }
                className="h-12 pl-11"
              />
            </div>
          </Field>

          <ResumeUpload
            currentResume={formData.resume}
            onUploadComplete={(url) =>
              setFormData({ ...formData, resume: url })
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Field data-invalid={!!errors.hourlyRate}>
              <FieldLabel htmlFor="hourlyRate">Hourly Rate ($)</FieldLabel>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  placeholder="50"
                  disabled={isLoading}
                  value={formData.hourlyRate}
                  onChange={(e) =>
                    setFormData({ ...formData, hourlyRate: e.target.value })
                  }
                  className="h-12 pl-11"
                />
              </div>
              {errors.hourlyRate && (
                <FieldError>{errors.hourlyRate}</FieldError>
              )}
            </Field>

            <Field data-invalid={!!errors.experience}>
              <FieldLabel htmlFor="experience">Experience (years)</FieldLabel>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="experience"
                  name="experience"
                  type="number"
                  placeholder="0"
                  disabled={isLoading}
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  className="h-12 pl-11"
                />
              </div>
              {errors.experience && (
                <FieldError>{errors.experience}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="City, Country"
                  disabled={isLoading}
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="h-12 pl-11"
                />
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="designation">Designation</FieldLabel>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="designation"
                  name="designation"
                  type="text"
                  placeholder="Your title"
                  disabled={isLoading}
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                  className="h-12 pl-11"
                />
              </div>
            </Field>
          </div>
        </>
      )}

      {/* Submit Button */}
      <div className="flex justify-end pt-6 border-t">
        <Button
          type="submit"
          disabled={isLoading}
          className="px-8 h-12 text-base font-semibold"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Updating...
            </span>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
}

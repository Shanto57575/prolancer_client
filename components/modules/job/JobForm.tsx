"use client";

import { useState } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { createJobAction, updateJobAction } from "@/actions/job/job";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  CalendarIcon,
} from "lucide-react";
import { IService } from "@/app/types/service";
import FileUploader from "@/components/FileUploader";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface JobFormProps {
  services: IService[];
  initialData?: {
    _id: string;
    title: string;
    description: string;
    serviceCategory: string | { _id: string; name: string };
    jobType: string;
    budget?: number;
    timeline?: string;
    requiredSkills: string[];
    experienceLevel?: string;
    projectDuration?: string;
    numFreelancers?: number;
    attachments?: string[];
    deadline?: string;
  };
  isEditing?: boolean;
}

const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-2 border-b p-2 mb-2 flex-wrap">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-muted" : ""}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-muted" : ""}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "bg-muted" : ""}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-muted" : ""}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-muted" : ""}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default function JobForm({
  services,
  initialData,
  isEditing = false,
}: JobFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attachments, setAttachments] = useState<string[]>(
    initialData?.attachments || []
  );
  const [date, setDate] = useState(
    initialData?.deadline ? new Date(initialData.deadline) : undefined
  );

  const defaultServiceCategory =
    typeof initialData?.serviceCategory === "object"
      ? initialData?.serviceCategory._id
      : initialData?.serviceCategory;

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: initialData?.description || "",
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none focus:outline-none min-h-[150px] px-3 py-2",
      },
    },
    immediatelyRender: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const description = editor?.getHTML() || "";

    // Manual validation
    const newErrors: Record<string, string> = {};
    if (!formData.get("title")) newErrors.title = "Title is required";
    if (!description || description === "<p></p>")
      newErrors.description = "Description is required";
    if (!formData.get("serviceCategory"))
      newErrors.serviceCategory = "Service Category is required";
    if (!formData.get("experienceLevel"))
      newErrors.experienceLevel = "Experience Level is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    formData.set("description", description);

    // Append attachments
    attachments.forEach((url) => {
      formData.append("attachments", url);
    });

    try {
      let res;
      if (isEditing && initialData?._id) {
        res = await updateJobAction(initialData._id, formData);
      } else {
        res = await createJobAction(formData);
      }

      if (res.ok) {
        toast.success(res.message);
        router.push("/dashboard/client/my-posted-jobs");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl mx-auto p-6 bg-card rounded-lg border shadow-sm"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          {isEditing ? "Edit Job" : "Post a New Job"}
        </h2>
        <p className="text-muted-foreground">
          Fill in the details below to post your job requirement.
        </p>
      </div>

      <Field>
        <FieldLabel>Job Title</FieldLabel>
        <FieldContent>
          <Input
            name="title"
            defaultValue={initialData?.title}
            placeholder="e.g. Full Stack Developer needed for E-commerce site"
          />
          {errors.title && <FieldError>{errors.title}</FieldError>}
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Job Description</FieldLabel>
        <FieldContent>
          <div className="border rounded-md">
            <MenuBar editor={editor!} />
            <EditorContent editor={editor} />
          </div>
          {errors.description && <FieldError>{errors.description}</FieldError>}
          <FieldDescription>
            Detailed description of the job, responsibilities, and requirements.
          </FieldDescription>
        </FieldContent>
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field>
          <FieldLabel>Service Category</FieldLabel>
          <FieldContent>
            <select
              name="serviceCategory"
              defaultValue={defaultServiceCategory}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select Category</option>
              {services?.length > 0 ? (
                services.map((service: IService) => (
                  <option key={service._id} value={service._id}>
                    {service.name}
                  </option>
                ))
              ) : (
                <option disabled>No services found</option>
              )}
            </select>
            {errors.serviceCategory && (
              <FieldError>{errors.serviceCategory}</FieldError>
            )}
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Job Type</FieldLabel>
          <FieldContent>
            <select
              name="jobType"
              defaultValue={initialData?.jobType || "fixed"}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="fixed">Fixed Price</option>
              <option value="hourly">Hourly Rate</option>
            </select>
          </FieldContent>
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Field>
          <FieldLabel>Experience Level</FieldLabel>
          <FieldContent>
            <select
              name="experienceLevel"
              defaultValue={initialData?.experienceLevel || "beginner"}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
            {errors.experienceLevel && (
              <FieldError>{errors.experienceLevel}</FieldError>
            )}
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Project Duration</FieldLabel>
          <FieldContent>
            <Input
              name="projectDuration"
              defaultValue={initialData?.projectDuration || ""}
              placeholder="e.g. 1-3 months"
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Vacancies</FieldLabel>
          <FieldContent>
            <Input
              type="number"
              name="numFreelancers"
              defaultValue={initialData?.numFreelancers || 1}
              min="1"
            />
          </FieldContent>
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Field>
          <FieldLabel>Budget ($)</FieldLabel>
          <FieldContent>
            <Input
              type="number"
              name="budget"
              defaultValue={initialData?.budget}
              placeholder="e.g. 500"
              min="0"
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Timeline / Expected Delivery</FieldLabel>
          <FieldContent>
            <Input
              name="timeline"
              defaultValue={initialData?.timeline || ""}
              placeholder="e.g. 2 weeks"
            />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Deadline</FieldLabel>
          <FieldContent>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  autoFocus
                />
              </PopoverContent>
            </Popover>
            <input
              type="hidden"
              name="deadline"
              value={date ? date.toISOString() : ""}
            />
          </FieldContent>
        </Field>
      </div>

      <Field>
        <FieldLabel>Required Skills</FieldLabel>
        <FieldContent>
          <Input
            name="requiredSkills"
            defaultValue={initialData?.requiredSkills?.join(", ")}
            placeholder="e.g. React, Node.js, TypeScript (comma separated)"
          />
          <FieldDescription>
            Separate multiple skills with commas.
          </FieldDescription>
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Attachments</FieldLabel>
        <FieldContent>
          <FileUploader
            endpoint="fileUploader"
            value={attachments}
            onChange={setAttachments}
          />
          <FieldDescription>
            Upload relevant documents (PDF, Images, etc.)
          </FieldDescription>
        </FieldContent>
      </Field>

      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEditing ? "Update Job" : "Post Job"}
        </Button>
      </div>
    </form>
  );
}

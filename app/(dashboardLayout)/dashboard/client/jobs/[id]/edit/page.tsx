import JobForm from "@/components/modules/job/JobForm";
import { getJobByIdAction } from "@/actions/job/job";

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: job } = await getJobByIdAction(id);

  return (
    <div className="container mx-auto py-8">
      <JobForm initialData={job} isEditing={true} />
    </div>
  );
}

import { getJobByIdAction } from "@/actions/job/job";
import { getAllServices } from "@/actions/service/service";
import JobForm from "@/components/modules/job/JobForm";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EditJobPage({ params }: Props) {
  const { slug } = await params;

  const [jobRes, servicesRes] = await Promise.all([
    getJobByIdAction(slug),
    getAllServices({ limit: 100 }),
  ]);

  if (!jobRes.ok) {
    return <div>Job not found</div>;
  }

  const job = jobRes.data;
  const services = servicesRes.ok ? servicesRes.data : [];

  return (
    <div className="w-full mx-auto py-8 max-w-4xl">
      <JobForm services={services} initialData={job} isEditing={true} />
    </div>
  );
}

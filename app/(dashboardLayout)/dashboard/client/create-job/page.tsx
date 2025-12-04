import { getAllServices } from "@/actions/service/service";
import JobForm from "@/components/modules/job/JobForm";

export default async function CreateJobPage() {
  const services = await getAllServices({ limit: 100 });

  return (
    <div className="container mx-auto py-8">
      <JobForm services={services.data} />
    </div>
  );
}

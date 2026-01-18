import { VerifyEmailClient } from "@/components/VerifyEmailClient";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ name?:string, email?: string }>;
}) {
  const { name, email } = await searchParams;

  return (
    <div className="grid place-content-center min-h-screen">
      <VerifyEmailClient name={name} email={email} />
    </div>
  );
}

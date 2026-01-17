import { VerifyEmailClient } from "@/components/VerifyEmailClient";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <div className="grid place-content-center min-h-screen">
      <VerifyEmailClient email={email} />
    </div>
  );
}

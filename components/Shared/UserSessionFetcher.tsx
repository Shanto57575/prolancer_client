/* eslint-disable @typescript-eslint/no-explicit-any */
import SessionUpdater from "./SessionUpdater";

export default async function UserSessionFetcher({
  userPromise,
}: {
  userPromise: Promise<any>;
}) {
  const profileRes = await userPromise;
  const user = profileRes?.ok ? profileRes.data : null;

  return <SessionUpdater user={user} />;
}

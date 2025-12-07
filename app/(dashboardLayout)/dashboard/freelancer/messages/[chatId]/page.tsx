import { getProfileAction } from "@/actions/user/getProfileAction";
import ChatWindow from "@/components/modules/chat/ChatWindow";

export default async function FreelancerChatDetailPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;
  const profile = await getProfileAction();
  const userId = profile.ok ? profile.data._id : "";

  return <ChatWindow chatId={chatId} currentUserId={userId} />;
}

import ChatMainLayout from "@/components/modules/chat/ChatMainLayout";
import { getMyChats } from "@/actions/chat/chat";
import { getProfileAction } from "@/actions/user/getProfileAction";

export default async function FreelancerChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chatsRes, profileRes] = await Promise.all([
    getMyChats(),
    getProfileAction(),
  ]);

  const chats = chatsRes.success ? chatsRes.data : [];
  const user = profileRes.ok ? profileRes.data : null;

  return (
    <ChatMainLayout role="freelancer" chats={chats} userId={user?._id}>
      {children}
    </ChatMainLayout>
  );
}

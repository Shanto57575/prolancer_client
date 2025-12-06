import ChatMainLayout from "@/components/modules/chat/ChatMainLayout";

export default function FreelancerChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChatMainLayout role="freelancer">{children}</ChatMainLayout>;
}

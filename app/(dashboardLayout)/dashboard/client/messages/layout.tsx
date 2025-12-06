import ChatMainLayout from "@/components/modules/chat/ChatMainLayout";

export default function ClientChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChatMainLayout role="client">{children}</ChatMainLayout>;
}

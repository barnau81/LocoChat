"use client";

import { CenteredHeader, ChatList } from "@/Components";
const Chat: React.FC = () => {
  return (
    <div>
      <CenteredHeader headerText="Available Chats" />
      <ChatList />
    </div>
  );
};

export default Chat;

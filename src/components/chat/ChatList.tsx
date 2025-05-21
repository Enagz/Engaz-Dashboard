"use client";

import { getRelativeTime } from "@/lib/utils";
import { useLocale } from "next-intl";

export interface ChatUser {
  chatId: string;
  userId: string;
  userName: string;
  clientemail: string;
  isRead: boolean;
  lastmessage?: string;
  lastmessagetime?: string;
}

interface ChatListProps {
  chats: ChatUser[];
  selectedChat?: ChatUser;
  onSelectChat: (chat: ChatUser) => void;
}

export default function ChatList({
  chats,
  selectedChat,
  onSelectChat,
}: ChatListProps) {
  const locale = useLocale();

  return (
    <div className="h-full bg-global-bg flex flex-col rounded-[20px]">
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.chatId}
            className={`p-4 border-b cursor-pointer transition-colors ${
              selectedChat?.chatId === chat.chatId
                ? "bg-primary-color"
                : "hover:bg-gray-50"
            }`}
            onClick={() => onSelectChat(chat)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-primary-color overflow-hidden" />
                </div>
                <div>
                  <h3
                    className={`font-medium ${
                      selectedChat?.chatId === chat.chatId
                        ? "text-global-bg"
                        : "text-gray-700"
                    }`}
                  >
                    {chat.userName}
                  </h3>
                  <p
                    className={`text-sm max-w-32 truncate ${
                      selectedChat?.chatId === chat.chatId
                        ? "text-global-bg"
                        : "text-text-normal"
                    }`}
                  >
                    {chat.clientemail}
                  </p>
                </div>
              </div>

              <div
                className={`min-w-fit text-xs ${
                  selectedChat?.chatId === chat.chatId
                    ? "text-global-bg"
                    : "text-text-normal"
                }`}
              >
                {chat.lastmessagetime
                  ? getRelativeTime(chat.lastmessagetime, locale)
                  : ""}
              </div>
            </div>

            {chat.lastmessage && (
              <div
                className={`mt-2 text-sm ${
                  selectedChat?.chatId === chat.chatId
                    ? "text-global-bg"
                    : "text-gray-600"
                } line-clamp-3`}
              >
                {chat.lastmessage}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

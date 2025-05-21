"use client";

import { useEffect, useState } from "react";
import ChatList, { ChatUser } from "@/components/chat/ChatList";
import Chat, { ChatMessage } from "@/components/chat/Chat";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { enjazService } from "@/services/enjazService";
import socket from "@/lib/socket";
import { useTranslations } from "next-intl";

export default function ChatInterface() {
  const [chatList, setChatList] = useState<ChatUser[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatUser | null>(null);
  const [activeTab, setActiveTab] = useState<"orders" | "support">("orders");

  const t = useTranslations("chat");

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response =
          activeTab === "orders"
            ? await enjazService.getOrderChats()
            : await enjazService.getSupportChats();
        setChatList(response.data);
        if (response.data.length > 0) {
          setSelectedChat(response.data[0]);
        } else {
          setSelectedChat(null);
          setMessages([]);
        }
      } catch (error) {
        console.error("Failed to load chats:", error);
      }
    };
    fetchChats();
  }, [activeTab]);

  useEffect(() => {
    if (!selectedChat) return;

    const fetchMessages = async () => {
      try {
        const response =
          activeTab === "orders"
            ? await enjazService.getOrderChatMessages(selectedChat.chatId)
            : await enjazService.getSupportChatMessages(selectedChat.chatId);
        setMessages(response.data);

        await enjazService.readChat(selectedChat.chatId);
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };

    fetchMessages();
  }, [selectedChat]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || !selectedChat) return;

    const newMessage: ChatMessage = {
      message,
      sender: "employee",
      time: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);

    const payload = {
      message,
      chatId: selectedChat.chatId,
    };

    const event =
      activeTab === "orders"
        ? "OrderEmployeeMessage"
        : "SupportEmployeeMessage";

    socket.emit(event, payload);
  };

  useEffect(() => {
    const handleIncomingSupportMessage = (data: {
      message: string;
      chatId: string;
    }) => {
      const newMsg: ChatMessage = {
        message: data.message,
        sender: "client",
        time: new Date().toISOString(),
      };

      if (selectedChat?.chatId === data.chatId) {
        setMessages((prev) => [...prev, newMsg]);
      } else {
        setChatList((prevChats) => {
          const existingChat = prevChats.find(
            (chat) => chat.chatId === data.chatId
          );

          const updatedChat: ChatUser = existingChat
            ? {
                ...existingChat,
                isRead: false,
                lastmessage: data.message,
                lastmessagetime: new Date().toISOString(),
              }
            : {
                chatId: data.chatId,
                userId: "",
                userName: t("newClient"),
                clientemail: "",
                isRead: false,
                lastmessage: data.message,
                lastmessagetime: new Date().toISOString(),
              };

          const filtered = prevChats.filter((c) => c.chatId !== data.chatId);
          return [updatedChat, ...filtered];
        });
      }
    };

    socket.on("NewClientSupportMessage", handleIncomingSupportMessage);
    return () => {
      socket.off("NewClientSupportMessage", handleIncomingSupportMessage);
    };
  }, [selectedChat]);

  useEffect(() => {
    const handleIncomingOrderMessage = (data: {
      message: string;
      chatId: string;
    }) => {
      const newMsg: ChatMessage = {
        message: data.message,
        sender: "client",
        time: new Date().toISOString(),
      };

      if (selectedChat?.chatId === data.chatId) {
        setMessages((prev) => [...prev, newMsg]);
      } else {
        setChatList((prevChats) => {
          const existingChat = prevChats.find(
            (chat) => chat.chatId === data.chatId
          );

          const updatedChat: ChatUser = existingChat
            ? {
                ...existingChat,
                isRead: false,
                lastmessage: data.message,
                lastmessagetime: new Date().toISOString(),
              }
            : {
                chatId: data.chatId,
                userId: "",
                userName: t("newClient"),
                clientemail: "",
                isRead: false,
                lastmessage: data.message,
                lastmessagetime: new Date().toISOString(),
              };

          const filtered = prevChats.filter((c) => c.chatId !== data.chatId);
          return [updatedChat, ...filtered];
        });
      }
    };

    socket.on("NewClientOrderMessage", handleIncomingOrderMessage);
    return () => {
      socket.off("NewClientOrderMessage", handleIncomingOrderMessage);
    };
  }, [selectedChat]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="container mx-auto p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-x-6">
          <h1 className="text-2xl font-bold mb-4">{t("allChats")}</h1>
          <div className="p-3 border-b">
            <Tabs
              defaultValue={activeTab}
              className="w-fit"
              onValueChange={(value) =>
                setActiveTab(value as "orders" | "support")
              }
            >
              <TabsList className="px-2 grid w-full grid-cols-2">
                <TabsTrigger value="orders" className="text-sm">
                  {t("orderChats")}
                </TabsTrigger>
                <TabsTrigger value="support" className="text-sm">
                  {t("supportChats")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm flex-1 flex flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-1/3 border-l">
            <ChatList
              chats={chatList}
              selectedChat={selectedChat || undefined}
              onSelectChat={setSelectedChat}
            />
          </div>

          <div className="w-full md:w-2/3">
            {selectedChat && (
              <Chat
                messages={messages}
                user={selectedChat}
                onSendMessage={handleSendMessage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

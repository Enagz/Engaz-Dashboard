"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Paperclip, Smile } from "lucide-react";
import { format } from "date-fns";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { ChatUser } from "./ChatList";
import { useLocale, useTranslations } from "next-intl";

export interface ChatMessage {
  message: string;
  sender: "employee" | "client";
  time: string;
}

interface ChatProps {
  messages: ChatMessage[];
  user: ChatUser;
  onSendMessage: (message: string) => void;
}

export default function Chat({ messages, user, onSendMessage }: ChatProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = useTranslations("chat");
  const locale = useLocale();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(newMessage);
    setNewMessage("");
  };

  const addEmoji = (emoji: any) => {
    setNewMessage((prev) => prev + emoji.native);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="bg-primary-color text-white p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white overflow-hidden" />
          <div>
            <h3 className="font-medium">{user.userName}</h3>
            <p className="text-sm">{user.clientemail}</p>
          </div>
        </div>
        {/* <button className="text-xs">الإتصال</button> */}
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-primary-color">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "employee" ? "justify-start" : "justify-end"
              }`}
            >
              {msg.sender === "client" && (
                <div className="flex items-end gap-2.5">
                  <div className="flex flex-col items-end gap-y-3">
                    <div className="max-w-xs md:max-w-md bg-global-bg text-gray-700 rounded-lg p-3 shadow-sm">
                      <p className="font-medium text-sm">{msg.message}</p>
                    </div>
                    <span className="text-xs text-gray-400 ">
                      {format(new Date(msg.time), "h:mm a")}
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="size-11 rounded-full bg-blue-400 flex items-center justify-center text-white overflow-hidden" />
                  </div>
                </div>
              )}

              {msg.sender === "employee" && (
                <div className="flex items-end gap-2.5">
                  <div className="flex items-center mt-1">
                    <div className="size-11 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden ">
                      <span className="text-xs">إنجاز</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <div className="max-w-xs md:max-w-md bg-global-bg text-gray-700 rounded-lg p-3">
                      <p className="font-medium text-sm">{msg.message}</p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {format(new Date(msg.time), "h:mm a")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat input */}
      <div className="p-3 bg-global-bg rounded-2xl">
        <form onSubmit={handleSubmit} className="flex gap-4 items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t("typeMessage")}
            className="flex-1 mx-2 text-left rtl:text-right"
          />
          {/* <button type="button" className="text-gray-500">
            <Paperclip size={18} />
          </button> */}

          <div className="relative">
            {showEmojiPicker && (
              <div className="absolute bottom-12 right-0 z-[99999]">
                <Picker
                  data={data}
                  onEmojiSelect={(emoji: any) => addEmoji(emoji)}
                  locale={locale}
                />
              </div>
            )}
            <button
              type="button"
              className="text-gray-500 relative cursor-pointer"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <Smile size={18} />
            </button>
          </div>

          <button
            type="submit"
            className="bg-primary-color text-white hover:bg-primary-color/90 cursor-pointer p-2 rounded-sm"
          >
            {t("send")}
          </button>
        </form>
      </div>
    </div>
  );
}

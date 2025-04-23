import React from 'react';

export interface LeftSidebarProps {
  notifications?: Notification[];
  conversations?: Conversation[];
  topCustomers?: TopCustomer[];
  onConversationClick?: (conversationId: number) => void;
  isLoading?: boolean;
}

export interface Notification {
  id: number;
  title: string;
  details: string;
  date: string;
  read: boolean;
  icon?: React.ReactNode;
}

export interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  unread: boolean;
  avatar?: string;
  time?: string;
}

export interface TopCustomer {
  id: number;
  name: string;
  orderCount: number;
  avatar?: string;
}
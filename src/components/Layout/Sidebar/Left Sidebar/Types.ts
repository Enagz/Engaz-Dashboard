// types.ts
export interface Notification {
    id: number;
    title: string;
    message: string;
    date: string;
    read: boolean;
  }
  
  export interface Conversation {
    id: number;
    customerName: string;
    lastMessage: string;
    unreadCount: number;
    avatar?: string;
  }
  
  export interface TopCustomer {
    id: number;
    name: string;
    orderCount: number;
    totalSpent: number;
  }
import React, { useEffect, useState } from 'react';
import RightSidebar from './Sidebar/RightSidebar';
import LeftSidebar from './Sidebar/Left Sidebar/LeftSidebar';
import { Notification, Conversation, TopCustomer } from '../Layout/Sidebar/Left Sidebar/Types';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const [notifsRes, convsRes, customersRes] = await Promise.all([
          fetch('/api/notifications'),
          fetch('/api/conversations'),
          fetch('/api/top-customers')
        ]);

        // Check if response is JSON
        const checkJson = async (res: Response) => {
          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            const text = await res.text();
            throw new Error(`Expected JSON, got: ${text.substring(0, 100)}...`);
          }
          return res.json();
        };

        if (!notifsRes.ok) throw new Error(`Notifications failed: ${notifsRes.status}`);
        if (!convsRes.ok) throw new Error(`Conversations failed: ${convsRes.status}`);
        if (!customersRes.ok) throw new Error(`Customers failed: ${customersRes.status}`);

        const [notifs, convs, customers] = await Promise.all([
          checkJson(notifsRes),
          checkJson(convsRes),
          checkJson(customersRes)
        ]);

        setNotifications(notifs);
        setConversations(conversations);
        setTopCustomers(customers);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-indicator">
        <div className="spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <h3>Error loading dashboard</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <LeftSidebar 
        notifications={notifications}
        conversations={conversations}
        topCustomers={topCustomers}
        unreadCount={unreadCount}
      />
      
      <div className={`main-content ${isSidebarOpen ? '' : 'full-width'}`}>
        <main className="main-area">{children}</main>
      </div>

      <RightSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {null}
      </RightSidebar>  
    </div>
  );
};

export default DashboardLayout;
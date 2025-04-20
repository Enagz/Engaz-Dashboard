import React from 'react';
import { Bell, MessageCircle, Users, ChevronDown } from 'lucide-react';
import { Notification, Conversation, TopCustomer } from './Types';

interface LeftSidebarProps {
  notifications: Notification[];
  conversations: Conversation[];
  topCustomers: TopCustomer[];
  unreadCount: number;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  notifications,
  conversations,
  topCustomers,
  unreadCount
}) => {
  const [expandedSections, setExpandedSections] = React.useState({
    notifications: true,
    conversations: true,
    customers: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <aside className="left-sidebar" aria-label="Dashboard sidebar">
      {/* Notifications Section */}
      <div className="sidebar-section">
        <div 
          className="section-header" 
          onClick={() => toggleSection('notifications')}
          role="button"
          aria-expanded={expandedSections.notifications}
          aria-controls="notifications-section"
        >
          <div className="section-title">
            <Bell size={20} aria-hidden="true" />
            <h3>
              Notifications
              {unreadCount > 0 && (
                <span className="badge" aria-label={`${unreadCount} unread notifications`}>
                  {unreadCount}
                </span>
              )}
            </h3>
          </div>
          <ChevronDown 
            size={16} 
            className={`toggle-icon ${expandedSections.notifications ? 'open' : ''}`}
            aria-hidden="true"
          />
        </div>
        
        {expandedSections.notifications && (
          <div id="notifications-section" className="section-content">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  aria-current={!notification.read ? 'true' : undefined}
                >
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                  <small>{notification.date}</small>
                </div>
              ))
            ) : (
              <p className="empty-message">No notifications</p>
            )}
          </div>
        )}
      </div>

      {/* Conversations Section */}
      <div className="sidebar-section">
        <div 
          className="section-header"
          onClick={() => toggleSection('conversations')}
          role="button"
          aria-expanded={expandedSections.conversations}
          aria-controls="conversations-section"
        >
          <div className="section-title">
            <MessageCircle size={20} aria-hidden="true" />
            <h3>Conversations</h3>
          </div>
          <ChevronDown 
            size={16} 
            className={`toggle-icon ${expandedSections.conversations ? 'open' : ''}`}
            aria-hidden="true"
          />
        </div>
        
        {expandedSections.conversations && (
          <div id="conversations-section" className="section-content">
            {conversations.length > 0 ? (
              conversations.map(conversation => (
                <div key={conversation.id} className="conversation-item">
                  <div className="customer-info">
                    <div className="avatar" aria-hidden="true">
                      {conversation.customerName.charAt(0)}
                    </div>
                    <div className="details">
                      <div className="customer-name">{conversation.customerName}</div>
                      <p className="last-message">{conversation.lastMessage}</p>
                    </div>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <span className="unread-count" aria-label={`${conversation.unreadCount} unread messages`}>
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="empty-message">No conversations</p>
            )}
          </div>
        )}
      </div>

      {/* Customers Section */}
      <div className="sidebar-section">
        <div 
          className="section-header"
          onClick={() => toggleSection('customers')}
          role="button"
          aria-expanded={expandedSections.customers}
          aria-controls="customers-section"
        >
          <div className="section-title">
            <Users size={20} aria-hidden="true" />
            <h3>Top Customers</h3>
          </div>
          <ChevronDown 
            size={16} 
            className={`toggle-icon ${expandedSections.customers ? 'open' : ''}`}
            aria-hidden="true"
          />
        </div>
        
        {expandedSections.customers && (
          <div id="customers-section" className="section-content">
            {topCustomers.length > 0 ? (
              topCustomers.map(customer => (
                <div key={customer.id} className="customer-item">
                  <div className="customer-info">
                    <div className="avatar" aria-hidden="true">
                      {customer.name.charAt(0)}
                    </div>
                    <div className="details">
                      <div className="customer-name">{customer.name}</div>
                      <small>{customer.totalSpent} SAR</small>
                    </div>
                  </div>
                  <div className="orders-count">{customer.orderCount} orders</div>
                </div>
              ))
            ) : (
              <p className="empty-message">No customer data</p>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default LeftSidebar;
import React, {useState} from 'react';
import { LeftSidebarProps } from './Types';
import { CheckCircle, Bell, Clock, User } from 'lucide-react';

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  notifications = [
    { id: 1, type: 'طلب', details: 'تمت مراجعة الطلب #67890 وهو الآن جاهز للتسليم', date: 'الآن', read: true, icon: <CheckCircle size={20} color="#5cb85c" /> },
    { id: 2, type: 'طلب', details: 'تم استلام طلب #12345 من العميل أحمد العتيبي', date: 'منذ 5 دقائق', read: false, icon: <Bell size={20} color="#007bff" /> },
    { id: 3, type: 'دعم', details: 'العميل محمد الزهراني يستفسر عن خدمة الترجمة', date: 'منذ 10 دقائق', read: false, icon: <Clock size={20} color="#ffc107" /> },
  ],
  conversations = [
    { id: 1, name: 'فيصل العتيبي', lastMessage: 'مرحباً، متى يكون ملف الترجمة جاهزاً؟', unread: false, avatar: 'https://i.pravatar.cc/30?img=1', time: 'الآن' },
    { id: 2, name: 'سالم الدوسري', lastMessage: 'هل بدأتم في الترجمة؟', unread: false, avatar: 'https://i.pravatar.cc/30?img=2', time: 'منذ 15 دقيقة' },
    { id: 3, name: 'عبدالله الشهري', lastMessage: 'تم الدفع، متى الاستلام؟', unread: true, avatar: 'https://i.pravatar.cc/30?img=3', time: 'منذ 30 دقيقة' },
    { id: 4, name: 'نواف الزهراني', lastMessage: 'كم باقي على الانتهاء؟', unread: false, avatar: 'https://i.pravatar.cc/30?img=4', time: 'منذ ساعة' },
    { id: 5, name: 'محمد السبيعي', lastMessage: 'أحتاج تعديل بسيط في الملف', unread: false, avatar: 'https://i.pravatar.cc/30?img=5', time: 'منذ ساعة' },
  ],
  topCustomers = [
    { id: 1, name: 'تركي القحطاني', orderCount: 7, avatar: 'https://i.pravatar.cc/30?img=7' },
    { id: 2, name: 'بدر المطيري', orderCount: 5, avatar: 'https://i.pravatar.cc/30?img=8' },
    { id: 3, name: 'عبدالعزيز الخالدي', orderCount: 8, avatar: 'https://i.pravatar.cc/30?img=9' },
    { id: 4, name: 'ماجد الحربي', orderCount: 4, avatar: 'https://i.pravatar.cc/30?img=10' },
  ],
  onConversationClick = (conversationId) => {
    console.log(`تم النقر على المحادثة برقم: ${conversationId}`);
  },
  isLoading = false
}) => {
  const [activeTab, setActiveTab] = useState("support");

  if (isLoading) {
    return <div className="loading-state">جاري تحميل البيانات...</div>;
  }

  return (
    <aside className="left-sidebar-fixed">
      {/* Notification Section*/}
      <div className="sidebar-section notifications-section">
        <div className="section-header">
          <button className="view-all-button">مشاهدة الكل <span className="arrow">❯</span></button>
          <h2>الإشعارات</h2>
        </div>
        <ul className="notifications-list">
          {notifications.map((notification) => (
            <li key={notification.id} className="notification-item">
              <div className="notification-icon">{notification.icon}</div>
              <div className="notification-content">
                {/* Backend Data */}
                <h3 className="notification-title">{notification.details}</h3>
                <span className="notification-date">{notification.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <hr className="divider" />
      {/* Conversation Section */}
      <div className="sidebar-section conversations-section">
        <div className="section-header">
          <h2 className="conversations-title">المحادثات</h2>
        </div>  
          <div className="conversations-tabs">
            <button
              className={`tab ${activeTab === "support" ? "active" : ""}`}
              onClick={() => setActiveTab("support")}
            >
              محادثات الدعم
            </button>
            <button
              className={`tab ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              محادثات الطلبات
            </button>
          </div>
        <div className="conversations-header-secondary">
          <button className="view-all-button">مشاهدة الكل <span className="arrow">❯</span></button>
          <h4 className="sub-section-subtitle">آخر المحادثات</h4>
        </div>

        <ul className="conversation-list">
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              onClick={() => onConversationClick(conversation.id)}
              className={`conversation-item ${conversation.unread ? 'unread' : ''}`}
            >
              <div className="conversation-avatar">
                {conversation.avatar ? <img src={conversation.avatar} alt={conversation.name} className="avatar-image" /> : <User size={24} color="#fff" />}
              </div>
              <div className="conversation-content">
                <div className="conversation-name">{conversation.name}</div>
                <p className="conversation-last-message">{conversation.lastMessage}</p>
              </div>
              <span className="conversation-time">{conversation.time}</span>
              {conversation.unread && <span className="unread-indicator"></span>}
            </li>
          ))}
        </ul>
      </div>
      <hr className="divider" />

      {/* قسم أبرز العملاء */}
      <div className="sidebar-section top-customers-section">
        <div className="section-header">
          <h2>أبرز العملاء</h2>
        </div>
        <ul className="top-customers-list">
          {topCustomers.map((customer) => (
            <li key={customer.id} className="top-customer-item">
              <div className="customer-info">
                <div className="customer-avatar">
                  {customer.avatar ? <img src={customer.avatar} alt={customer.name} className="avatar-image" /> : <User size={24} color="#fff" />}
                </div>
                <div className="customer-details">
                  <div className="customer-name">{customer.name}</div>
                  <span className="customer-orders">{customer.orderCount} طلبات</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default LeftSidebar;
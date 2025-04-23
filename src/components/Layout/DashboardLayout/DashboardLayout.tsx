import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import RightSidebar from '../Sidebar/RightSidebar/RightSidebar'; 
import LeftSidebar from '../Sidebar/Left Sidebar/LeftSidebar'; 
import Header from '../Header/Header'; 

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-layout flex">
      {/* <LeftSidebar /> */}

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="main-content">
          {children || <Outlet />}
        </div>
      </div>

      {/* <RightSidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      >
        {null}
      </RightSidebar> */}
    </div>
  );
};

export default DashboardLayout;











// // src/layouts/DashboardLayout/DashboardLayout.tsx
// import React, { useState, useEffect } from 'react';
// import RightSidebar from './Sidebar/RightSidebar';
// import LeftSidebar from './Sidebar/Left Sidebar/LeftSidebar';
// import { Notification, Conversation, TopCustomer } from './Sidebar/Left Sidebar/Types';
// import { CheckCircle, Info, Clock } from 'lucide-react'; // استيراد الأيقونات

// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }

// const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [conversations, setConversations] = useState<Conversation[]>([]);
//   const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // محاكاة جلب البيانات من API
//         const mockNotifications: Notification[] = [
//           {
//             id: 1,
//             type: 'طلب',
//             status: 'مكتمل',
//             details: 'تحت مراجعة الطلب 67900 وهو الآن في الفرنسي',
//             date: 'منذ دقيقة',
//             read: true,
//             icon: <CheckCircle size={20} color="#5cb85c" />,
//           },
//           {
//             id: 2,
//             type: 'طلب',
//             status: 'جديد',
//             details: 'تم استخراج طلب 12349 من العميل أحمد الغيس',
//             date: 'منذ 5 دقائق',
//             read: false,
//             icon: <Info size={20} color="#f0ad4e" />,
//           },
//           {
//             id: 3,
//             type: 'دعم',
//             status: 'رسالة جديدة',
//             details: 'العميل محمد الرمضان استفسر عدة للتوجيه',
//             date: 'منذ 10 دقائق',
//             read: false,
//             icon: <Clock size={20} color="#0275d8" />,
//           },
//         ];

//         const mockConversations: Conversation[] = [
//           { id: 1, name: 'فيصل العتيبي', lastMessage: 'المشكلة من نوع الطفل', unread: false, avatar: 'https://i.pravatar.cc/30?img=1', time: 'الآن' },
//           { id: 2, name: 'سالم الدوسري', lastMessage: 'تم الخصم لكن الدفع فشل', unread: false, avatar: 'https://i.pravatar.cc/30?img=2', time: 'منذ 15 دقيقة' },
//           { id: 3, name: 'عبدالله الشهري', lastMessage: 'تم الدفع، متى الاستلام؟', unread: true, avatar: 'https://i.pravatar.cc/30?img=3', time: 'منذ 30 دقيقة' },
//           { id: 4, name: 'نواف الزهراني', lastMessage: 'كم باقي على الانتهاء؟', unread: false, avatar: 'https://i.pravatar.cc/30?img=4', time: 'منذ ساعة' },
//           { id: 5, name: 'محمد السبيعي', lastMessage: 'أحتاج تعديل بسيط في الملف', unread: false, avatar: 'https://i.pravatar.cc/30?img=5', time: 'منذ ساعة' },
//         ];

//         const mockTopCustomers: TopCustomer[] = [
//           { id: 1, name: 'تركي القحطاني', orderCount: 7 },
//           { id: 2, name: 'خالد العبدالله', orderCount: 5 },
//           { id: 3, name: 'سارة محمد', orderCount: 3 },
//         ];

//         setNotifications(mockNotifications);
//         setConversations(mockConversations);
//         setTopCustomers(mockTopCustomers);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const markAsRead = (index: number) => {
//     const updatedConversations = [...conversations];
//     updatedConversations[index].unread = false;
//     setConversations(updatedConversations);
//   };

//   return (
//     <div className="dashboard-layout flex h-screen bg-gray-100">
//       {/* Left Sidebar */}
//       <LeftSidebar
//         notifications={notifications}
//         conversations={conversations}
//         topCustomers={topCustomers}
//         onConversationClick={markAsRead}
//         isLoading={isLoading}
//       />

//       {/* Main Content */}
//       <div className={`flex-1 flex flex-col overflow-hidden ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
//         {/* Header يمكن إضافته هنا لاحقًا */}

//         {/* Main Area */}
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
//           {children}
//         </main>
//       </div>

//       {/* Right Sidebar */}
//       <RightSidebar
//         isOpen={isSidebarOpen}
//         onClose={toggleSidebar}
//       >
//         {null}
//       </RightSidebar>
//     </div>
//   );
// };

// export default DashboardLayout;
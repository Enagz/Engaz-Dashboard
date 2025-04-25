import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, User, ShoppingCart, Coins, Settings } from "lucide-react";
import logo from "../../../../assets/logo/logolight.svg";

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/", icon: <Home size={27} />, text: "الرئيسية" },
    { path: "/customers", icon: <Users size={27} />, text: "العملاء" },
    { path: "/employees", icon: <User size={27} />, text: "الموظفين" },
    { path: "/orders", icon: <ShoppingCart size={27} />, text: "الطلبات" },
    { path: "/costs", icon: <Coins size={27} />, text: "التكاليف" },
    { path: "/privacy", icon: <Settings size={27} />, text: "الخصوصية" },
  ];

  return (
    <>
      <aside className={`rightSidebar ${isOpen ? "open" : "closed"}`}>
        <button
          className="toggle-sidebar md:!hidden"
          onClick={onClose}
          aria-label="Toggle sidebar"
        >
          {isOpen ? "✕" : "☰"}
        </button>

        <div className="sidebar-header">
          <img src={logo} alt="Enjaz" className="logo" />
        </div>

        <nav className="pro-menu">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.path}
                className={`pro-menu-item ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                <Link to={item.path} className="menu-link">
                  <span className="pro-icon-wrapper">{item.icon}</span>
                  <span className="pro-item-content">{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* <main className="main-content">{children}</main> */}
      </aside>

      {!isOpen && (
        <button
          className="toggle-sidebar outside"
          onClick={onClose}
          aria-label="Open sidebar"
        >
          ☰
        </button>
      )}
    </>
  );
};

export default RightSidebar;

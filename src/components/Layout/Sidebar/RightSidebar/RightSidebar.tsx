import { Home, Users, User, ShoppingCart, Coins, Settings } from "lucide-react";
import logo from "@/assets/logo/logolight.svg";
import { Link } from "react-router";
import { useLocation } from "react-router";

const RightSidebar = () => {
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
    <aside className="bg-primary-color h-full w-full">
      <div className="flex flex-col py-8">
        <div className="flex justify-center">
          <img src={logo} alt="Enjaz" className="logo" />
        </div>

        <nav className="mt-24">
          <ul className="px-3.5 md:pl-3.5 md:pr-0 rtl:md:pr-3.5 rtl:md:pl-0 font-medium text-xl text-white">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li
                  key={item.path}
                  className={`relative hover:bg-white md:hover:bg-transparent hover:text-primary-color md:hover:text-white hover:bg-gradient-to-r rtl:hover:bg-gradient-to-l md:from-white md:to-[75%] md:to-transparent hover:rounded-full md:hover:rounded-l-full md:hover:rounded-r-none rtl:md:hover:rounded-r-full rtl:md:hover:rounded-l-none ${
                    isActive
                      ? "md:hover:bg-white md:hover:text-primary-color bg-white text-primary-color rounded-full md:rounded-l-full text-[1.375rem] font-bold"
                      : ""
                  }`}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center rtl:justify-start rtl:flex-row gap-x-4 px-8 md:pl-8 md:pr-0 rtl:md:pr-8 rtl:md:pl-0 ${
                      isActive ? "py-5" : "py-2.5"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </Link>

                  {isActive && (
                    <>
                      <div className="hidden md:block absolute right-0 rtl:left-0 rtl:right-auto w-1/5 -inset-y-10 bg-white" />
                      <div className="hidden md:block absolute bottom-full right-0 w-1/5 rtl:left-0 rtl:right-auto -inset-y-10 bg-primary-color rounded-br-full rtl:rounded-bl-full rtl:rounded-br-none" />
                      <div className="hidden md:block absolute top-full right-0 w-1/5 rtl:left-0 rtl:right-auto -inset-y-10 bg-primary-color rounded-tr-full rtl:rounded-tl-full rtl:rounded-tr-none" />
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default RightSidebar;

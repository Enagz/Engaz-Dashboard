"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import socket from "@/lib/socket";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const MainSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("sidebar");

  const menuItems = [
    {
      path: "/",
      icon: (
        <svg
          width={28}
          height={28}
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.037 19.143a.875.875 0 0 0-1.075 1.38c1.09.848 2.505 1.352 4.038 1.352s2.948-.504 4.037-1.352a.875.875 0 0 0-1.075-1.38c-.776.604-1.811.982-2.962.982-1.15 0-2.186-.378-2.963-.983"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 1.458c-1.01 0-1.914.323-2.889.87-.945.53-2.028 1.313-3.39 2.298l-1.76 1.273c-1.092.79-1.965 1.42-2.623 2.005-.68.603-1.188 1.204-1.51 1.96-.324.758-.402 1.534-.359 2.43.042.864.202 1.907.402 3.207l.368 2.394c.284 1.848.51 3.319.842 4.465.344 1.186.827 2.127 1.692 2.846.861.716 1.887 1.035 3.14 1.187 1.22.148 2.757.148 4.7.148h2.774c1.942 0 3.48 0 4.7-.148 1.253-.152 2.278-.47 3.14-1.187.864-.72 1.348-1.66 1.692-2.846.332-1.146.558-2.617.842-4.465l.368-2.394c.2-1.3.36-2.343.402-3.207.043-.896-.035-1.672-.358-2.43-.323-.756-.831-1.357-1.511-1.96-.658-.584-1.53-1.215-2.623-2.005l-1.761-1.273c-1.362-.985-2.444-1.767-3.39-2.298-.974-.547-1.878-.87-2.888-.87M8.704 6.075c1.415-1.023 2.417-1.745 3.263-2.22.827-.464 1.43-.647 2.033-.647s1.206.183 2.032.646c.847.476 1.85 1.198 3.264 2.221l1.68 1.215c1.138.823 1.94 1.404 2.524 1.923.572.507.879.906 1.063 1.338.183.43.256.917.22 1.659-.037.762-.183 1.714-.391 3.073l-.351 2.285c-.296 1.923-.506 3.281-.803 4.305-.29.998-.633 1.573-1.13 1.987-.502.417-1.153.665-2.233.796-1.101.134-2.532.135-4.546.135H12.67c-2.014 0-3.445-.001-4.546-.135-1.08-.131-1.731-.379-2.233-.796-.497-.414-.84-.99-1.13-1.987-.297-1.024-.507-2.382-.803-4.305l-.35-2.286c-.21-1.357-.355-2.31-.392-3.072-.036-.742.036-1.23.22-1.66.184-.431.491-.83 1.062-1.337.585-.52 1.387-1.1 2.525-1.923z"
            fill="currentColor"
          />
        </svg>
      ),
      text: t("home"),
    },
    {
      path: "/customers",
      icon: (
        <svg
          width={30}
          height={30}
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.688 16.875a4.687 4.687 0 1 1-9.375 0 4.687 4.687 0 0 1 9.375 0M7.5 6.563a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5m15 0a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5"
            fill="#000"
            fillOpacity={0.04}
          />
          <path
            d="M28.688 17.625a.94.94 0 0 1-1.313-.187A6.05 6.05 0 0 0 22.5 15a.938.938 0 0 1 0-1.875 2.813 2.813 0 1 0-2.723-3.516.938.938 0 0 1-1.817-.468 4.686 4.686 0 0 1 9.203.704 4.69 4.69 0 0 1-1.499 3.926 7.96 7.96 0 0 1 3.215 2.54.935.935 0 0 1-.191 1.314m-6.314 7.219a.936.936 0 1 1-1.623.937 6.68 6.68 0 0 0-11.502 0 .936.936 0 0 1-1.742-.211.94.94 0 0 1 .12-.726 8.44 8.44 0 0 1 3.954-3.507 5.625 5.625 0 1 1 6.839 0 8.44 8.44 0 0 1 3.953 3.507M15 20.625a3.75 3.75 0 1 0 0-7.501 3.75 3.75 0 0 0 0 7.501m-6.562-6.562a.937.937 0 0 0-.938-.938 2.812 2.812 0 1 1 2.723-3.516.938.938 0 0 0 1.817-.468 4.689 4.689 0 1 0-7.704 4.63 7.96 7.96 0 0 0-3.21 2.54.938.938 0 1 0 1.5 1.127A6.05 6.05 0 0 1 7.5 15a.94.94 0 0 0 .938-.937"
            fill="currentColor"
          />
        </svg>
      ),
      text: t("customers"),
    },
    {
      path: "/employees",
      icon: (
        <svg
          width={28}
          height={28}
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.875 3.5H6.125a.875.875 0 0 0-.875.875v19.25a.875.875 0 0 0 .875.875h15.75a.875.875 0 0 0 .875-.875V4.375a.875.875 0 0 0-.875-.875M14 18.375a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7"
            fill="#000"
            fillOpacity={0.04}
          />
          <path
            d="M8.224 21.7a.875.875 0 0 0 1.226-.175 5.687 5.687 0 0 1 9.1 0 .874.874 0 1 0 1.4-1.05 7.4 7.4 0 0 0-2.997-2.372 4.375 4.375 0 1 0-5.9 0 7.4 7.4 0 0 0-3.003 2.372.875.875 0 0 0 .174 1.225M14 12.25a2.625 2.625 0 1 1 0 5.25 2.625 2.625 0 0 1 0-5.25m7.875-9.625H6.125a1.75 1.75 0 0 0-1.75 1.75v19.25a1.75 1.75 0 0 0 1.75 1.75h15.75a1.75 1.75 0 0 0 1.75-1.75V4.375a1.75 1.75 0 0 0-1.75-1.75m0 21H6.125V4.375h15.75zM9.625 7a.875.875 0 0 1 .875-.875h7a.875.875 0 1 1 0 1.75h-7A.875.875 0 0 1 9.625 7"
            fill="currentColor"
          />
        </svg>
      ),
      text: t("employees"),
    },
    {
      path: "/orders",
      icon: (
        <svg
          width={28}
          height={28}
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.167 10.208a.875.875 0 0 0 0 1.75H17.5a.875.875 0 1 0 0-1.75zm0 5.833a.875.875 0 0 0 0 1.75h3.5a.875.875 0 1 0 0-1.75z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.053 1.458h-.106c-2.142 0-3.822 0-5.154.144-1.36.148-2.462.454-3.403 1.137-.57.414-1.07.915-1.484 1.484-.683.941-.99 2.043-1.137 3.403-.144 1.332-.144 3.012-.144 5.154v2.44c0 2.142 0 3.821.144 5.154.148 1.36.454 2.461 1.137 3.402A6.7 6.7 0 0 0 5.39 25.26c.941.684 2.043.99 3.403 1.137 1.332.144 3.012.144 5.154.144h.106c2.142 0 3.822 0 5.154-.144 1.36-.147 2.462-.453 3.403-1.137a6.7 6.7 0 0 0 1.484-1.484c.683-.94.99-2.042 1.137-3.402.144-1.333.144-3.012.144-5.155V12.78c0-2.142 0-3.822-.144-5.154-.148-1.36-.454-2.462-1.137-3.403A6.7 6.7 0 0 0 22.61 2.74c-.941-.683-2.043-.99-3.403-1.137-1.332-.144-3.012-.144-5.154-.144M6.419 4.155c.593-.43 1.351-.682 2.562-.813 1.227-.133 2.812-.134 5.019-.134s3.792.001 5.019.134c1.21.131 1.97.382 2.562.813.421.306.791.676 1.097 1.097.43.593.682 1.351.813 2.562.133 1.227.134 2.812.134 5.019v2.333c0 2.207-.001 3.792-.134 5.02-.131 1.21-.382 1.969-.813 2.561a5 5 0 0 1-1.097 1.097c-.593.431-1.351.682-2.562.813-1.227.133-2.812.134-5.019.134s-3.792 0-5.019-.134c-1.21-.131-1.97-.382-2.562-.813a5 5 0 0 1-1.097-1.097c-.43-.592-.682-1.35-.813-2.562-.133-1.227-.134-2.812-.134-5.019v-2.333c0-2.207.001-3.792.134-5.019.131-1.21.382-1.97.813-2.562a5 5 0 0 1 1.097-1.097"
            fill="currentColor"
          />
        </svg>
      ),
      text: t("orders"),
    },
    {
      path: "/costs",
      icon: (
        <svg
          width={35}
          height={35}
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.708 8.75H7.292a2.917 2.917 0 0 0-2.917 2.917v11.666a2.917 2.917 0 0 0 2.917 2.917h20.416a2.917 2.917 0 0 0 2.917-2.917V11.667a2.917 2.917 0 0 0-2.917-2.917Z"
            stroke="currentColor"
            strokeWidth={2}
          />
          <path
            d="M8.75 13.125h2.917m11.666 8.75h2.917"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <path
            d="M17.5 20.416a2.917 2.917 0 1 0 0-5.833 2.917 2.917 0 0 0 0 5.833Z"
            stroke="currentColor"
            strokeWidth={2}
          />
        </svg>
      ),
      text: t("costs"),
    },
    {
      path: "/privacy",
      icon: (
        <svg
          width={28}
          height={28}
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.32 1.458h1.36c2.276 0 4.069 0 5.47.178 1.434.182 2.589.564 3.504 1.428.921.87 1.335 1.981 1.531 3.358.19 1.333.19 3.034.19 5.175v4.805c0 2.141 0 3.842-.19 5.175-.196 1.377-.61 2.488-1.531 3.359-.915.864-2.07 1.245-3.504 1.427-1.401.178-3.193.178-5.47.178h-1.847a.875.875 0 1 1 0-1.75h1.785c2.352 0 4.034-.001 5.311-.163 1.258-.16 1.99-.462 2.523-.965.525-.496.835-1.168 1-2.333.17-1.195.173-2.771.173-4.997v-4.667c0-2.226-.002-3.802-.172-4.997-.166-1.164-.476-1.837-1.001-2.333-.533-.503-1.266-.804-2.523-.964-1.277-.162-2.959-.164-5.311-.164h-1.236c-2.352 0-4.034.002-5.311.164-1.258.16-1.99.461-2.523.964-.525.496-.835 1.169-1 2.333-.17 1.195-.173 2.771-.173 4.997a.875.875 0 1 1-1.75 0v-.069c0-2.141 0-3.842.19-5.175.196-1.377.61-2.488 1.531-3.358.915-.864 2.07-1.246 3.504-1.428 1.401-.178 3.194-.178 5.47-.178"
            fill="currentColor"
            fillOpacity={0.941}
          />
          <path
            d="M18.667 7.291a.875.875 0 0 1 0 1.75H9.333a.875.875 0 1 1 0-1.75zM19.542 14a.875.875 0 0 0-.875-.875h-5.834a.875.875 0 1 0 0 1.75h5.834a.875.875 0 0 0 .875-.875"
            fill="currentColor"
            fillOpacity={0.941}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.833 14.291a4.37 4.37 0 0 1 4.375 4.37 4.36 4.36 0 0 1-1.611 3.387l.88 3.078.006.023c.227.881-.645 1.64-1.484 1.304l-2.166-.865-2.187.874a1.108 1.108 0 0 1-1.496-1.257l.004-.02.764-3.266a4.36 4.36 0 0 1-1.46-3.258c0-2.415 1.96-4.37 4.375-4.37m2.625 4.37a2.62 2.62 0 0 0-2.625-2.62 2.62 2.62 0 0 0-2.625 2.62 2.62 2.62 0 0 0 2.625 2.619 2.62 2.62 0 0 0 2.625-2.62m-1.025 5.682L7.01 22.87a4.4 4.4 0 0 1-2.507-.046L4.14 24.38l1.196-.477c.32-.128.676-.128.995 0z"
            fill="currentColor"
            fillOpacity={0.941}
          />
        </svg>
      ),
      text: t("privacy"),
    },
    {
      path: "/chat",
      icon: (
        <svg
          width={28}
          height={28}
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.149 20.407A8.53 8.53 0 0 0 18.392 8.14a8.53 8.53 0 1 0-15.54 7.017l-.82 2.78a1.531 1.531 0 0 0 1.905 1.906l2.785-.82a8.5 8.5 0 0 0 2.887.835 8.53 8.53 0 0 0 11.678 4.416l2.775.819a1.531 1.531 0 0 0 1.906-1.905zM6.78 17.664a.7.7 0 0 0-.185.026l-3.037.894a.219.219 0 0 1-.271-.271l.893-3.037a.66.66 0 0 0-.051-.496 7.219 7.219 0 1 1 2.962 2.962.66.66 0 0 0-.31-.078m17.031 2.861.894 3.038a.219.219 0 0 1-.272.271l-3.037-.893a.66.66 0 0 0-.495.05 7.22 7.22 0 0 1-9.844-3.105A8.522 8.522 0 0 0 18.823 9.53a7.22 7.22 0 0 1 5.04 10.5.66.66 0 0 0-.048.495z"
            fill="currentColor"
          />
        </svg>
      ),
      text: t("chat"),
    },
  ];

  const handleLogout = () => {
    router.push("/login");
    socket.disconnect();
    localStorage.removeItem("token");
  };

  return (
    <aside className="bg-primary-color h-full w-full rounded-r-4xl rtl:rounded-r-none rtl:rounded-l-4xl shadow-[10.35px_11.5px_72.43px_rgba(0,0,0,.10)]">
      <div className="h-full flex flex-col py-8 gap-y-4">
        <div className="flex justify-center">
          <img src="/assets/logo/logolight.svg" alt="Enjaz" className="logo" />
        </div>

        <nav className="mt-12 py-8 overflow-y-auto h-full">
          <ul className="px-3.5 md:pl-3.5 md:pr-0 rtl:md:pr-3.5 rtl:md:pl-0 font-medium text-xl text-white">
            {menuItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? pathname === item.path
                  : pathname.startsWith(item.path);
              return (
                <li
                  key={item.path}
                  className={`relative hover:bg-white md:hover:bg-transparent hover:text-primary-color md:hover:text-white hover:bg-gradient-to-r rtl:hover:bg-gradient-to-l md:from-white md:to-[75%] md:to-transparent hover:rounded-full md:hover:rounded-l-full md:hover:rounded-r-none rtl:md:hover:rounded-r-full rtl:md:hover:rounded-l-none ${
                    isActive
                      ? "md:hover:bg-white md:hover:!text-primary-color bg-white text-primary-color rounded-full md:rounded-l-full text-[1.375rem] font-bold"
                      : ""
                  }`}
                >
                  <Link
                    href={item.path}
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

        <button
          onClick={handleLogout}
          className="cursor-pointer mt-auto mb-8 flex items-center justify-center gap-4 text-error-color"
        >
          <LogOut className="rotate-180 rtl:rotate-0" />
          <span>{t("logout")}</span>
        </button>
      </div>
    </aside>
  );
};

export default MainSidebar;

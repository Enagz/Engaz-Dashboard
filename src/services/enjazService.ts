import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//     }
//     return Promise.reject(error);
//   }
// );

export const enjazService = {
  // Auth
  login: async (data: { email: string; password: string }) => {
    return api.post("/api/dashboard/login", data);
  },

  // Clients
  getClients: async (page: number) => {
    return api.get(`/api/dashboard/clients?page=${page}`);
  },
  getBestClients: async () => {
    return api.get(`/api/dashboard/clients/best`);
  },
  getClientsOverview: async () => {
    return api.get(`/api/dashboard/clients/overview`);
  },
  getClientInfo: async (id: string) => {
    return api.get(`/api/dashboard/clients/${id}`);
  },
  getClientOrders: async (id: string, page: number) => {
    return api.get(`/api/dashboard/clients/${id}/orders?page=${page}`);
  },
  deleteClient: async (id: string) => {
    return api.delete(`/api/dashboard/clients/${id}`);
  },
  addClient: async (data: any) => {
    return api.post(`/api/dashboard/clients`, data);
  },
  updateClient: async (id: string, data: any) => {
    return api.put(`/api/dashboard/clients/${id}`, data);
  },
  getClientStatistics: async (id: string) => {
    return api.get(`/api/dashboard/clients/${id}/statistcs`);
  },

  // Employees
  get_employees_by_department: async (
    department?: "translation" | "printing"
  ) => {
    try {
      const response = await api.get(`/api/dashboard/employees/allemployees`, {
        params: department ? { department } : {},
      });
      return response.data; // This should return { employees: [...] }
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  getEmployeeNumber: async () => {
    return api.get("/api/dashboard/employees/number");
  },
  addEmployee: async (data: {
    email: string;
    password: string;
    phone: string;
    name: string;
    department: string;
  }) => {
    return api.post("/api/dashboard/register", data);
  },
  getEmployeeDetails: async (id: string) => {
    return api.get(`/api/dashboard/employees/${id}`);
  },
  updateEmployee: async (
    id: string,
    data: {
      email: string;
      password: string;
      phone: string;
      name: string;
      department: string;
    }
  ) => {
    return api.put(`/api/dashboard/employees/edit/${id}`, data);
  },
  removeEmployee: async (id: string) => {
    return api.delete(`/api/dashboard/emplouee/delete/${id}`);
  },

  // Notifications
  getNotifications: async () => {
    return api.get(`/api/dashboard/employee/notification`);
  },
  readNotification: async (notificationId: string) => {
    return api.post(`/api/dashboard/employee/notification/${notificationId}`);
  },
  deleteAllNotificationa: async () => {
    return api.delete(`/api/dashboard/employee/notification`);
  },

  //Chat
  getSupportChats: async () => {
    return api.get(`/api/dashboard/chat/support`);
  },
  getSupportChatMessages: async (chatId: string) => {
    return api.get(`/api/dashboard/chat/support/${chatId}`);
  },
  getOrderChats: async () => {
    return api.get(`/api/dashboard/chat/order`);
  },
  getOrderChatMessages: async (chatId: string) => {
    return api.get(`/api/dashboard/chat/order/${chatId}`);
  },
  readChat: async (chatId: string) => {
    return api.post(`api/dashboard/chat/read/${chatId}`);
  },

  // over view home page anaylist
  getHomeOverview: async () => {
    return api.get("/api/dashboard/home/overview");
  },

  // orders
  getOrders: async (
    type: "translation" | "printing",
    status: "new" | "inprogress" | "finished" | "cancelled"
  ) => {
    // Map frontend status values to API expected values
    const statusMap = {
      new: "new",
      inprogress: "inprogress",
      finished: "finished",
      cancelled: "cancelled",
    };

    return api.get("/api/dashboard/orders/current", {
      params: {
        type,
        status: statusMap[status],
      },
    });
  },

  getOrderDetails: async (id: string) => {
    return api.get(`/api/dashboard/order/${id}`);
  },

  editOrder: async (id: string, data: any) => {
    return api.put(`/api/dashboard/order/update/${id}`, data);
  },

  deleteOrder: async (id: string) => {
    return api.delete(`/api/dashboard/home/order/${id}`);
  },

  // admin last orders
  getLastOrdersOverview: async (view = "overview") => {
    return api.get("/api/dashboard/home/lastorders", {
      params: { view },
    });
  },
  // Orders Overview admin
  getOrdersOverview: async () => {
    return api.get("/api/dashboard/orders/overview");
  },
  // Orders Overview emoloyee
  getOrdersOverviewEmp: async () => {
    return api.get("/api/dashboard/orders/statistics");
  },

  getOrdersRate: async () => {
    return api.get("/api/dashboard/orders/rate");
  },

  // Last Orders Overview
  getUrgentOrders: async (view = "overview") => {
    return api.get("/api/dashboard/home/urgent", {});
  },

  // Urgent Items
  getUrgentItems: async () => {
    return api.get("/api/dashboard/home/urgent");
  },

  //costs
  getCosts: async () => {
    return api.get("/api/dashboard/costs");
  },

  addLanguageCost: async (
    languge: string,
    arabiclanguge: string,
    cost: string
  ) => {
    return api.post("/api/dashboard/languge", { languge, arabiclanguge, cost });
  },
  editLanguageCost: async (
    id: string,
    languge: string,
    arabiclanguge: string,
    cost: string
  ) => {
    console.log(languge, arabiclanguge, cost);
    return api.put(`/api/dashboard/languge/${id}`, {
      languge,
      arabiclanguge,
      cost,
    });
  },

  addPrintingColorCost: async (
    color: string,
    arabiccolor: string,
    cost: string
  ) => {
    return api.post("/api/dashboard/color", { color, arabiccolor, cost });
  },
  editPrintingColorCost: async (
    id: string,
    color: string,
    arabiccolor: string,
    cost: string
  ) => {
    return api.put(`/api/dashboard/color/${id}`, {
      color,
      arabiccolor,
      cost,
    });
  },

  addPrintingCoverCost: async (
    cover: string,
    arabiccover: string,
    cost: string
  ) => {
    return api.post("/api/dashboard/cover", { cover, arabiccover, cost });
  },
  editPrintingCoverCost: async (
    id: string,
    cover: string,
    arabiccover: string,
    cost: string
  ) => {
    return api.put(`/api/dashboard/cover/${id}`, {
      cover,
      arabiccover,
      cost,
    });
  },

  // terms
  getConditions: async () => {
    return api.get("/api/dashboard/terms/conditions");
  },
  getPrivacy: async () => {
    return api.get("/api/dashboard/terms/privacy");
  },
  getUsage: async () => {
    return api.get("/api/dashboard/terms/usage");
  },

  editConditions: async (
    arabicConditions: string,
    englishConditions: string
  ) => {
    return api.put("/api/dashboard/terms/conditions", {
      arabicConditions,
      englishConditions,
    });
  },
  editPrivacy: async (arabicPrivacy: string, englishPrivacy: string) => {
    return api.put("/api/dashboard/terms/privacy", {
      arabicPrivacy,
      englishPrivacy,
    });
  },
  editUsage: async (arabicUsage: string, englishUsage: string) => {
    return api.put("/api/dashboard/terms/usage", { arabicUsage, englishUsage });
  },
};

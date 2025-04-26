import AllEmployees from "@/components/tables/AllEmployees";
import EmployeesAttendance from "@/components/tables/EmployeesAttendance";
import { useState } from "react";
import { Link } from "react-router";

const employeesData = [
  {
    title: "عدد الموظفين الكلي",
    number: 120,
    icon: (
      <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.625 2.5H4.375a.625.625 0 0 0-.625.625v13.75a.625.625 0 0 0 .625.625h11.25a.624.624 0 0 0 .625-.625V3.125a.625.625 0 0 0-.625-.625M10 13.125a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5"
          fill="#000"
          fillOpacity={0.04}
        />
        <path
          d="M5.874 15.5a.624.624 0 0 0 .876-.125 4.062 4.062 0 0 1 6.5 0 .623.623 0 0 0 .875.125.623.623 0 0 0 .125-.875 5.3 5.3 0 0 0-2.14-1.694 3.125 3.125 0 1 0-4.215 0 5.3 5.3 0 0 0-2.145 1.694.625.625 0 0 0 .124.875M10 8.75a1.875 1.875 0 1 1 0 3.75 1.875 1.875 0 0 1 0-3.75m5.625-6.875H4.375a1.25 1.25 0 0 0-1.25 1.25v13.75a1.25 1.25 0 0 0 1.25 1.25h11.25a1.25 1.25 0 0 0 1.25-1.25V3.125a1.25 1.25 0 0 0-1.25-1.25m0 15H4.375V3.125h11.25zM6.875 5a.625.625 0 0 1 .625-.625h5a.625.625 0 1 1 0 1.25h-5A.625.625 0 0 1 6.875 5"
          fill="#3E97D1"
        />
      </svg>
    ),
    color: "#EDEEFC",
  },
  {
    title: "الموظفون النشطون",
    number: 90,
    icon: (
      <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#a)">
          <path
            d="M0 10C0 4.478 4.478 0 10 0s10 4.478 10 10-4.477 10-10 10C4.48 19.993.007 15.52 0 10m2 0a8 8 0 1 0 8-8 8.01 8.01 0 0 0-8 8m3.333 0a4.667 4.667 0 1 1 9.334 0 4.667 4.667 0 0 1-9.334 0"
            fill="#0CA304"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h20v20H0z" />
          </clipPath>
        </defs>
      </svg>
    ),
    color: "#EDEEFC",
  },
  {
    title: "موظفو الطباعة",
    number: 50,
    icon: (
      <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.833 8.333a.833.833 0 1 0 0 1.667.833.833 0 0 0 0-1.667m10-3.333H15V2.5a.834.834 0 0 0-.834-.833H5.833A.833.833 0 0 0 5 2.5V5h-.833a2.5 2.5 0 0 0-2.5 2.5v5a2.5 2.5 0 0 0 2.5 2.5H5v2.5a.833.833 0 0 0 .833.833h8.334A.833.833 0 0 0 15 17.5V15h.833a2.5 2.5 0 0 0 2.5-2.5v-5a2.5 2.5 0 0 0-2.5-2.5M6.666 3.333h6.667V5H6.667zm6.667 13.334H6.667v-3.334h6.666zm3.333-4.167a.833.833 0 0 1-.833.833H15V12.5a.834.834 0 0 0-.834-.833H5.833A.833.833 0 0 0 5 12.5v.833h-.833a.833.833 0 0 1-.834-.833v-5a.833.833 0 0 1 .833-.833h11.667a.833.833 0 0 1 .833.833z"
          fill="#3E97D1"
        />
      </svg>
    ),
    color: "#EDEEFC",
  },
  {
    title: "موظفو الترجمة",
    number: 80,
    icon: (
      <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#a)" fill="#FECA00">
          <path d="M5.681 8.393 5.138 10H3.75l2.327-6.25h1.606L10 10H8.541l-.544-1.607zm2.043-.92-.849-2.528h-.061l-.849 2.528z" />
          <path d="M0 2.5A2.5 2.5 0 0 1 2.5 0h8.75a2.5 2.5 0 0 1 2.5 2.5v3.75h3.75a2.5 2.5 0 0 1 2.5 2.5v8.75a2.5 2.5 0 0 1-2.5 2.5H8.75a2.5 2.5 0 0 1-2.5-2.5v-3.75H2.5a2.5 2.5 0 0 1-2.5-2.5zm2.5-1.25A1.25 1.25 0 0 0 1.25 2.5v8.75A1.25 1.25 0 0 0 2.5 12.5h8.75a1.25 1.25 0 0 0 1.25-1.25V2.5a1.25 1.25 0 0 0-1.25-1.25zm8.923 12.494q.36.564.787 1.057c-.935.719-2.091 1.251-3.46 1.615.223.271.564.794.694 1.084 1.406-.449 2.6-1.055 3.607-1.867.972.83 2.174 1.456 3.663 1.84.166-.318.517-.842.786-1.113-1.406-.316-2.571-.867-3.525-1.605.851-.934 1.527-2.064 2.026-3.446H17.5V10h-3.75v1.309h.956c-.397 1.055-.925 1.932-1.59 2.662a8 8 0 0 1-.518-.615 2.5 2.5 0 0 1-1.176.388" />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h20v20H0z" />
          </clipPath>
        </defs>
      </svg>
    ),
    color: "#EDEEFC",
  },
];

const attendanceData = [
  {
    title: "عدد الحاضرين اليوم",
    number: 105,
    icon: (
      <svg
        width={21}
        height={20}
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m8 8.333 2.715 2.037a.833.833 0 0 0 1.127-.118l5.325-6.086"
          stroke="#0CA304"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <path
          d="M18 10a7.5 7.5 0 1 1-5.558-7.244"
          stroke="#0CA304"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    ),
    color: "#FCF4D3",
  },
  {
    title: "عدد الإجازات",
    number: 5,
    icon: (
      <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.333 16.667q-.687 0-1.177-.49A1.6 1.6 0 0 1 1.666 15V9.021a1.64 1.64 0 0 1 .48-1.167l3.333-3.333q.25-.25.563-.375t.625-.125.625.125.562.375l3.333 3.333q.23.23.354.532.125.302.125.635v5.98q0 .687-.489 1.177a1.6 1.6 0 0 1-1.177.489H7.917a.4.4 0 0 1-.292-.125.4.4 0 0 1-.125-.292v-2.916a.8.8 0 0 0-.24-.594.8.8 0 0 0-.593-.24.8.8 0 0 0-.594.24.8.8 0 0 0-.24.594v2.916a.4.4 0 0 1-.125.292.4.4 0 0 1-.292.125zm10-.834V7.647L10.437 4.75q-.396-.396-.187-.906.209-.512.77-.51.168 0 .334.073a.9.9 0 0 1 .27.176l2.897 2.896q.228.23.354.532t.125.635v8.188q0 .354-.24.594a.8.8 0 0 1-.594.239.8.8 0 0 1-.593-.24.8.8 0 0 1-.24-.593m3.333 0V6.272l-1.52-1.52q-.396-.397-.188-.908.21-.51.771-.51.166 0 .333.074a.9.9 0 0 1 .271.176l1.521 1.521q.229.23.354.532t.125.635v9.563q0 .354-.24.594a.8.8 0 0 1-.593.239.8.8 0 0 1-.593-.24.8.8 0 0 1-.24-.593m-10-5q.355 0 .595-.24T7.5 10a.8.8 0 0 0-.24-.593.8.8 0 0 0-.593-.24.8.8 0 0 0-.594.24.8.8 0 0 0-.24.593q0 .354.24.594a.8.8 0 0 0 .593.24"
          fill="#3E97D1"
        />
      </svg>
    ),
    color: "#F9E9E9",
  },
  {
    title: "عدد الغائبين",
    number: 5,
    icon: (
      <svg
        width={21}
        height={20}
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m13.592 13.092 1.908-1.917 1.908 1.917 1.183-1.184L16.676 10l1.916-1.908-1.183-1.184L15.5 8.825l-1.908-1.917-1.184 1.184L14.317 10l-1.909 1.908zM10.5 6.667a3.257 3.257 0 0 0-3.333-3.334 3.26 3.26 0 0 0-3.334 3.334A3.26 3.26 0 0 0 7.167 10 3.26 3.26 0 0 0 10.5 6.667m-5 0A1.59 1.59 0 0 1 7.167 5a1.59 1.59 0 0 1 1.666 1.667 1.59 1.59 0 0 1-1.666 1.666A1.59 1.59 0 0 1 5.5 6.667M3.833 15a2.5 2.5 0 0 1 2.5-2.5H8a2.5 2.5 0 0 1 2.5 2.5v.833h1.666V15A4.166 4.166 0 0 0 8 10.833H6.333A4.167 4.167 0 0 0 2.167 15v.833h1.666z"
          fill="#E31D1C"
        />
      </svg>
    ),
    color: "#EDEEFC",
  },
  {
    title: "عدد المتأخرين",
    number: 5,
    icon: (
      <svg
        width={21}
        height={20}
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.125 4V2.438l-5.625-.25-5.625.25V4c0 2.5 1.75 4.563 4.063 5.125a.47.47 0 0 1 .312.438v.75c0 .187-.125.374-.312.374-2.313.563-4.063 2.626-4.063 5.126V17.5l5.625.625 5.625-.625v-1.687c0-2.5-1.75-4.563-4.062-5.126-.188-.062-.313-.187-.313-.374v-.75c0-.188.125-.376.313-.376C14.375 8.564 16.125 6.5 16.125 4"
          fill="#83CBFF"
        />
        <path
          d="M4.875 2.5h11.25c.375 0 .625-.25.625-.625s-.25-.625-.625-.625H4.875c-.375 0-.625.25-.625.625s.25.625.625.625m0 16.25h11.25c.375 0 .625-.25.625-.625s-.25-.625-.625-.625H4.875c-.375 0-.625.25-.625.625s.25.625.625.625"
          fill="#9B9B9B"
        />
        <path
          d="M11.125 12.125V9.438c0-.438.313-.75.688-.876 1.062-.25 2-.874 2.687-1.687.438-.5.063-1.25-.562-1.25H7.062c-.625 0-1 .75-.562 1.25.688.813 1.625 1.375 2.688 1.688.437.124.687.437.687.874v2.438c0 .438-.187.625-.375.688-2.312.437-4 2.187-4 4.25v.687h10v-.687c0-2.063-1.687-3.813-4-4.25-.187 0-.375-.188-.375-.438"
          fill="#FFB02E"
        />
        <path
          d="M13.938 3.625a.56.56 0 0 1 .562-.562c.375.062.625.312.563.562-.063 1-.313 1.875-.813 2.625-.5.875-1.25 1.5-2.125 1.813-.312.124-.625 0-.75-.313-.125-.312 0-.625.313-.75 1.5-.562 2.124-2.187 2.25-3.375m0 12.563c0 .312.25.562.562.562.375 0 .625-.312.563-.562-.063-1-.313-1.875-.813-2.625-.5-.876-1.25-1.5-2.125-1.813-.312-.125-.625 0-.75.313-.125.312 0 .624.313.75 1.5.562 2.124 2.187 2.25 3.374"
          fill="#fff"
        />
      </svg>
    ),
    color: "#DBFFDE",
  },
];

const Employees = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <div className="flex justify-end">
        <Link
          to="#"
          className="inline-block font-semibold px-6 py-2.5 bg-primary-color text-white rounded-sm hover:bg-primary-color/90"
        >
          إضافة موظف
        </Link>
      </div>

      {/* section */}
      <div className="flex flex-col gap-y-6">
        <p className="font-semibold text-2xl">الملخص الإحصائي للموظفين</p>

        <div className="flex flex-row flex-wrap items-center gap-4 md:gap-8">
          {employeesData.map((employee) => (
            <Card key={employee.title} {...employee} numberTitle="موظف" />
          ))}
        </div>
      </div>

      {/* section */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-y-4 gap-x-8">
          <p className="font-semibold text-2xl">كل الموظفين</p>

          <EmployeesTabs />
        </div>

        <AllEmployees />
      </div>

      {/* section */}
      <div className="flex flex-col gap-y-6">
        <p className="font-semibold text-2xl">متابعة الحضور والانصراف</p>

        <div className="flex flex-row flex-wrap items-center gap-4 md:gap-8">
          {attendanceData.map((employee) => (
            <Card key={employee.title} {...employee} numberTitle="موظفين" />
          ))}
        </div>
      </div>

      {/* section */}
      <div className="flex flex-col gap-6">
        <p className="font-semibold text-2xl">جدول الحضور والانصراف</p>

        <EmployeesAttendance />
      </div>
    </div>
  );
};

export default Employees;

const Card = (data: (typeof employeesData)[0] & { numberTitle: string }) => {
  return (
    <div
      className="grow py-4 px-2.5 flex flex-col items-center justify-center gap-y-2 rounded-2xl"
      style={{ background: data.color }}
    >
      <div className="flex items-center gap-x-2">
        <span>{data.icon}</span>
        <span className="font-bold text-sm">{data.title}</span>
      </div>

      <p className="font-semibold text-sm text-primary-color flex gap-x-1">
        <span>{data.number}</span>
        <span>{data.numberTitle}</span>
      </p>
    </div>
  );
};

const EmployeesTabs = () => {
  const tabs = [
    { id: 1, title: "موظفو الترجمة" },
    { id: 2, title: "موظفو الطباعة" },
    { id: 3, title: "موظفو الدعم الفني" },
  ];

  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="flex bg-button-hover px-4 py-2 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`w-fit px-2.5 py-1 rounded-md font-medium transition-all ${
            activeTab === tab.id
              ? "bg-primary-color text-white"
              : "hover:bg-primary-color/50 text-black"
          }`}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

import DepartmentsProductivity from "@/components/tables/DepartmentsProductivity";
import EmployeesCosts from "@/components/tables/EmployeesCosts";
import ServicesCosts from "@/components/tables/ServicesCosts";

const costsData = [
  {
    title: "تكاليف الموارد",
    number: 3000,
    percent: "+4%",
    icon: (
      <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.9 12.09h.044a1.73 1.73 0 0 1 1.687 1.726c0 .8-.543 1.468-1.28 1.668v.7c0 .25-.2.45-.45.45s-.45-.2-.45-.45v-.7a1.73 1.73 0 0 1-1.282-1.668c0-.25.2-.45.45-.45s.45.2.45.45c0 .462.369.83.825.83a.835.835 0 0 0 .831-.83.835.835 0 0 0-.831-.832H9.85a1.73 1.73 0 0 1-1.68-1.724c0-.8.544-1.468 1.281-1.668v-.7c0-.25.2-.45.45-.45s.45.2.45.45v.7a1.73 1.73 0 0 1 1.281 1.668c0 .25-.2.45-.45.45s-.45-.2-.45-.45a.835.835 0 0 0-.83-.83.835.835 0 0 0-.832.83c0 .457.375.832.831.832"
          fill="#3E97D1"
        />
        <path
          d="m6.583 3.188 1.74 2.037-.187.21a8.03 8.03 0 0 0-6.261 7.83 6.096 6.096 0 0 0 6.094 6.095h3.856a6.095 6.095 0 0 0 6.094-6.094 8.016 8.016 0 0 0-6.255-7.83.7.7 0 0 0-.068-.385l1.48-1.696.096-.147a1.222 1.222 0 0 0-1.807-1.515l-.527-.625a1.263 1.263 0 0 0-1.88-.003l-.552.616a1.225 1.225 0 0 0-1.824 1.507m2.374.865-1.06-1.225a1.24 1.24 0 0 0 1.478-.312l.5-.649.555.657a1.23 1.23 0 0 0 1.438.321l-1.056 1.208zm-5.832 9.213A6.774 6.774 0 0 1 9.9 6.49a6.764 6.764 0 0 1 6.769 6.774 4.845 4.845 0 0 1-4.844 4.845H7.969a4.846 4.846 0 0 1-4.844-4.844"
          fill="#3E97D1"
        />
      </svg>
    ),
  },
  {
    title: "نسبة المقارنة",
    number: 7000,
    percent: "-3%",
    icon: (
      <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.834 3.333h-1.667V2.5a.833.833 0 1 0-1.667 0v.833h-5V2.5a.833.833 0 0 0-1.666 0v.833H4.167a2.5 2.5 0 0 0-2.5 2.5v10a2.5 2.5 0 0 0 2.5 2.5h11.667a2.5 2.5 0 0 0 2.5-2.5v-10a2.5 2.5 0 0 0-2.5-2.5m.833 12.5a.833.833 0 0 1-.833.834H4.167a.833.833 0 0 1-.833-.834V10h13.333zm0-7.5H3.334v-2.5A.833.833 0 0 1 4.167 5h1.667v.833a.833.833 0 1 0 1.666 0V5h5v.833a.833.833 0 1 0 1.667 0V5h1.667a.833.833 0 0 1 .833.833z"
          fill="#3E97D1"
        />
      </svg>
    ),
  },
  {
    title: "تكاليف سنوية",
    number: 120000,
    percent: "+15%",
    icon: (
      <svg
        width={22}
        height={22}
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.9 6.683a.916.916 0 0 0-1.3 0l-5.767 5.775-3.932-3.942a.917.917 0 0 0-1.302 0l-5.5 5.5a.917.917 0 0 0 0 1.302.92.92 0 0 0 1.302 0l4.85-4.859 3.932 3.942a.916.916 0 0 0 1.301 0l6.417-6.417a.915.915 0 0 0 0-1.301"
          fill="#3E97D1"
        />
      </svg>
    ),
  },
  {
    title: "تكاليف شهرية",
    number: 10000,
    percent: "+15%",
    icon: (
      <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.833 9.167 15 5m.833.833-1.666-1.666 2.083-1.25.833.833zM3.354 7.48a2.92 2.92 0 0 1-.658-3.116L3.88 5.548h1.667V3.88L4.363 2.696A2.917 2.917 0 0 1 8.137 6.47l5.391 5.392a2.917 2.917 0 0 1 3.775 3.775l-1.184-1.185h-1.666v1.666l1.185 1.185a2.917 2.917 0 0 1-3.775-3.773L6.469 8.138a2.92 2.92 0 0 1-3.115-.659"
          stroke="#3E97D1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m10.169 12.083-4.67 4.67a1.124 1.124 0 0 1-1.593 0l-.66-.66a1.125 1.125 0 0 1 0-1.592l4.67-4.67"
          stroke="#3E97D1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const Costs = () => {
  return (
    <div className="flex flex-col gap-y-8">
      {/* section */}
      <div className="flex flex-col gap-y-6">
        <p className="font-semibold text-2xl">إدارة التكاليف</p>

        <div className="flex flex-row flex-wrap items-center gap-4 md:gap-8">
          {costsData.map((item) => (
            <Card key={item.title} {...item} color="#EDEEFC" />
          ))}
        </div>
      </div>

      {/* section */}
      <div className="flex flex-col gap-y-6">
        <p className="font-semibold text-2xl">تحليل إنتاجية الأقسام</p>

        <DepartmentsProductivity />
      </div>

      {/* section */}
      <div className="flex flex-col gap-y-6">
        <p className="font-semibold text-2xl">تكاليف الموظفين</p>

        <EmployeesCosts />
      </div>

      {/* section */}
      <div className="flex flex-col gap-y-6">
        <p className="font-semibold text-2xl">تكاليف الخدمات</p>

        <ServicesCosts />
      </div>
    </div>
  );
};

export default Costs;

const Card = (data: (typeof costsData)[0] & { color: string }) => {
  return (
    <div
      className="grow py-4 px-2.5 flex flex-col items-center justify-center gap-y-2 rounded-2xl"
      style={{ background: data.color }}
    >
      <div className="flex items-center gap-x-2">
        <span>{data.icon}</span>
        <span className="font-bold text-sm">{data.title}</span>
      </div>

      <div className="flex items-center gap-2">
        <p className="font-semibold text-sm text-text-normal flex gap-x-1">
          <span>{data.number.toLocaleString()}</span>
          <span>ر.س</span>
        </p>

        <div className="text-xs text-primary-color flex gap-x-1">
          {parseInt(data.percent) > 0 ? (
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.455 5.608 14 4l-1.38 5.606-1.722-1.653-2.777 2.893a.5.5 0 0 1-.722 0L5.36 8.722l-3 3.124a.5.5 0 0 1-.72-.692L5 7.654a.5.5 0 0 1 .72 0l2.04 2.124 2.417-2.517z"
                fill="#3E97D1"
              />
            </svg>
          ) : (
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.545 10.392 2 12l1.38-5.606 1.722 1.653 2.777-2.893a.5.5 0 0 1 .722 0l2.039 2.124 3-3.124a.5.5 0 0 1 .72.692L11 8.346a.5.5 0 0 1-.72 0L8.24 6.222 5.823 8.739z"
                fill="#3E97D1"
              />
            </svg>
          )}

          <span>{data.percent}</span>
        </div>
      </div>
    </div>
  );
};

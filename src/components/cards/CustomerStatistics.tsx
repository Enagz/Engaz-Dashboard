import React from 'react';
import { Users, LineChart, Star, ChartSpline, CircleDot } from 'lucide-react';

interface StatisticItemProps {
  label: string | React.ReactNode;
  value: string | number | React.ReactNode; 
  unit?: string; 
  icon?: React.ReactNode;
}

const StatisticItem: React.FC<StatisticItemProps> = ({ label, value, unit, icon }) => (
  <div className="bg-[#EDEEFC] rounded-md p-4 min-w-0 flex-grow text-center">
    <div className="flex items-center justify-between">
      <div className="text-[#1D1D1D] font-bold text-[15px]">{label}</div>
      {icon && <div className="text-xl text-gray-600">{icon}</div>}
    </div>
    {value !== undefined && (
      <div className="text-lg font-bold text-[#3E97D1] text-[15px] mt-2">
        {value} {unit && <span className="text-lg font-bold text-[#3E97D1] text-[15px] mt-2">{unit}</span>}
      </div>
    )}
  </div>
);

interface CustomerStatisticsProps {
  totalCustomers: number;
  engagementRate: string;
  engagementProgress: number;
  customerSatisfaction: string;
  newCustomers: number; 
  activeCustomers: number; 
}

const CustomerStatistics: React.FC<CustomerStatisticsProps> = ({
  totalCustomers,
  engagementRate,
  engagementProgress,
  customerSatisfaction,
  newCustomers,
  activeCustomers,
}) => {
  
  return (
    <div className="flex gap-4 p-4 rtl">

      <StatisticItem
        label="إجمالي العملاء"
        value={totalCustomers}
        unit="عميل"
        icon={<Users className="text-xl text-[#3E97D1]" />}
      />

      <StatisticItem
        label="العملاء النشطون"
        value={activeCustomers}
        unit="عميل"
        icon={
          <div className="w-4 h-4 rounded-full border-2 border-[#0CA304] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#0CA304]" />
          </div>
        }
      />

      <StatisticItem
        label="العملاء الجدد"
        value={newCustomers}
        unit="عميل"
        icon={<ChartSpline className="text-xl text-[#3E97D1]" />}
      />

      <StatisticItem
        label="معدل رضا العملاء"
        value={customerSatisfaction}
        unit=": متوسط التقييم"
        icon={<Star className="text-xl fill-yellow-400 text-yellow-400" />}
      />

      <StatisticItem
        label={
          <div className="flex items-center gap-2 justify-between w-full">
            <span className="text-gray-500 font-semibold">{engagementRate}</span>
            <span className="text-sm text-[#1D1D1D] font-bold text-[15px]">نسبة تفاعل العملاء مع الطلبات</span>
          </div>
        }
        value={
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 rounded-full h-2 w-full mt-1 overflow-hidden">
              <div
                className="bg-gradient-to-l from-green-400 to-red-400 h-full rounded-full"
                style={{ width: `${engagementProgress}%` }}
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default CustomerStatistics;
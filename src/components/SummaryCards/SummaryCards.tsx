import React from 'react';
import { TrendingUp , TrendingDown } from 'lucide-react'; // استيراد أيقونات الأسهم


interface SummaryCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, change, isPositive }) => (
  

  <div className={`bg-[#EDEEFC] rounded-md p-5 text-center shadow-sm flex-1 flex flex-col items-start justify-center `}
    style={{ minHeight: '100px',  maxHeight: '100px', minWidth:'120px'}} 
  >
    <h1 className="text-[14px] font-bold text-[#1D1D1D] mb-2 rtl text-right">{title}</h1> 
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 rtl"> 
      <p className="text-[14px] font-bold text-[#676767] mb-0 rtl">{value}</p>
      {change && (
        <p className={`text-sm font-semibold flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'} mb-0`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {change}
        </p>
      )}
    </div>
  </div>
);

const SummaryCards: React.FC = () => {
  return (
    <div className="flex gap-4 p-4">
      <SummaryCard
        title="عدد الطلبات الكلية"
        value="250 طلبًا"
        change="11.01%++"
        isPositive={true}
      />
      <SummaryCard
        title="الطلبات المكتملة"
        value="180 طلبًا"
        change="9%++"
        isPositive={true}
      />
      <SummaryCard
        title="الطلبات قيد المعالجة"
        value="50 طلبًا"
        change="5%--"
        isPositive={false}
      />
      <SummaryCard
        title="الإيرادات"
        value="10000 ر.س"
        change="15%++"
        isPositive={true}
      />
    </div>
  );
};

export default SummaryCards;
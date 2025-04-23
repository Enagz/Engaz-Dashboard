import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, change, isPositive }) => (
  <div className={`bg-gray-100 rounded-md p-4 text-center shadow-sm flex-1`}>
    <h3 className="text-sm text-gray-600 mb-2">{title}</h3>
    <p className="text-xl font-bold text-gray-800 mb-1">{value}</p>
    {change && (
      <p className={`text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive && '+'}
        {change}
      </p>
    )}
  </div>
);

const SummaryCards: React.FC = () => {
  return (
    <div className="flex gap-4 p-4">
      <SummaryCard
        title="عدد الطلبات الكلية"
        value="250 طلبًا"
        change="+11.01%"
        isPositive={true}
      />
      <SummaryCard
        title="الطلبات المكتملة"
        value="180 طلبًا"
        change="+9%"
        isPositive={true}
      />
      <SummaryCard
        title="الطلبات قيد المعالجة"
        value="50 طلبًا"
        change="-5%"
        isPositive={false}
      />
      <SummaryCard
        title="الإيرادات"
        value="10000 ر.س"
        change="+15%"
        isPositive={true}
      />
    </div>
  );
};

export default SummaryCards;
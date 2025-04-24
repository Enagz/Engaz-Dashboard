import React from 'react';

interface BalanceItemData {
  label: string;
  amount: string;
  unit?: string; // الوحدة اختيارية الآن
}

const BalanceItem: React.FC<BalanceItemData> = ({ label, amount, unit = 'رس' }) => (
  <div className={`bg-[#EDEEFC] gap-3 rounded-md p-5 text-center shadow-sm flex-1 flex flex-col items-start justify-center `}
    style={{ minHeight: '100px',  maxHeight: '100px', minWidth:'120px' }}
  >
    <span className="balance-label text-sm text-gray-600">{label}</span>
    <div className="flex items-center rtl gap-2"> {/* حاوية للمبلغ والوحدة */}
      <span className="balance-amount text-base font-semibold text-gray-800">{amount}</span>
      <span className="balance-unit text-sm text-gray-600">{unit}</span>
    </div>
  </div>
);

interface BalanceOverviewProps {
  currentBalance: string;
  monthlyRevenue: string;
  totalWithdrawal: string;
  currency?: string; // عملة اختيارية للوحدة
}

const BalanceOverview: React.FC<BalanceOverviewProps> = ({
  currentBalance,
  monthlyRevenue,
  totalWithdrawal,
  currency,
}) => {
  const balanceData: BalanceItemData[] = [
    { label: "الرصيد الحالي:", amount: currentBalance, unit: currency },
    { label: "إجمالي الأرباح للشهر:", amount: monthlyRevenue, unit: currency },
    { label: "إجمالي المبالغ المسحوبة:", amount: totalWithdrawal, unit: currency },
  ];

  return (
    <div className="balance-overview flex items-center justify-around p-4 rounded-md  gap-4"> {/* إضافة فئة gap-4 */}
      {balanceData.map((item, index) => (
        <BalanceItem key={index} {...item} />
      ))}
    </div>
  );
};

export default BalanceOverview;
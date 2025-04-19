import BalanceHistory from "@/components/charts/BalanceHistory";
import OrderStatistics from "@/components/charts/OrderStatistics";
import CompletedOrders from "@/components/charts/CompletedOrders";
import CompletionRate from "@/components/charts/CompletionRate";
import CostStatistics from "@/components/charts/CostStatistics";
import CustomerStatistics from "@/components/charts/CustomerStatistics";

const Charts = () => {
  return (
    <div className="container mx-auto p-4 grid sm:grid-cols-2 gap-4 items-center">
      <div className="min-h-44 max-w-3xl">
        <BalanceHistory />
      </div>

      <div className="min-h-44 max-w-3xl">
        <OrderStatistics />
      </div>

      <div className="min-h-44 max-w-3xl">
        <CompletedOrders />
      </div>

      <div className="min-h-44 max-w-3xl">
        <CompletionRate />
      </div>

      <div className="min-h-44 max-w-3xl">
        <CostStatistics />
      </div>

      <div className="min-h-44 max-w-3xl">
        <CustomerStatistics />
      </div>
    </div>
  );
};

export default Charts;

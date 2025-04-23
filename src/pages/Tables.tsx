import BestCustomers from "@/components/tables/BestCustomers";
import CustomerDetails from "@/components/tables/CustomerDetails";
import LatestOrders from "@/components/tables/LatestOrders";
import NewOrdes from "@/components/tables/NewOrders";
import UrgentOrders from "@/components/tables/UrgentOrders";

const Tables = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="max-w-5xl">
        <LatestOrders />
      </div>
      <div className="max-w-5xl">
        <NewOrdes />
      </div>

      <div className="max-w-5xl">
        <UrgentOrders />
      </div>

      <div className="max-w-5xl">
        <CustomerDetails />
      </div>

      <div className="max-w-5xl">
        <BestCustomers />
      </div>
    </div>
  );
};

export default Tables;

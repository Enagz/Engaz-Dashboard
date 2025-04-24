import React from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import BalanceHistory from '../components/charts/BalanceHistory';
import SummaryCards from '../components/SummaryCards/SummaryCards';
import LatestOrders from '@/components/tables/LatestOrders';
import UrgentOrders from '@/components/tables/UrgentOrders';
import NewOrders from '@/components/tables/NewOrders';
import BalanceOverview from '../components/BalanceOverview/BalanceOverview';
import { ChevronLeft } from 'lucide-react';

const Home: React.FC = () => {
  const role = "manager";

  return (
    <div className="home-container ">
      <div className="home-content">
        <div className="overview-card">
          <div>
            <div className="card-title">نظرة عامة</div>
          </div>
          <div className="card-body">
            {role === "manager" ? (
              <div className="manager-dashboard">
                <div className="summary-cards-section">
                  <SummaryCards />
                </div>

                <div className="latest-orders-section">
                  <div className="latest-orders-card">
                      <div className="section-head">
                        <div className="section-title">آخر الطلبات الواردة</div>
                          <button className="view-all-button">
                            مشاهدة الكل <ChevronLeft size={16} className="inline-block mr-1" />
                          </button>
                        </div>
                    <div className="h-auto">
                      <LatestOrders /> {/* عرض جدول آخر الطلبات */}
                    </div>
                  </div>
                </div>

                <div className="balance-history-section">
                  <div className="balance-history-card">
                    <div>
                      
                    <div className="section-head">
                        <div className="section-title">آخر الطلبات الواردة</div>
                          <button className="view-all-button">
                            مشاهدة الكل <ChevronLeft size={16} className="inline-block mr-1" />
                          </button>
                        </div>
                    </div>
    

                    <div className="balance-history-section">
                      <div className="balance-history-card">
                        <BalanceOverview
                          currentBalance="15,200"
                          monthlyRevenue="7,500"
                          totalWithdrawal="3,000"
                        />
                        <div > 
                          <BalanceHistory />
                        </div>
                      </div>
                    </div>
                    {/* <div>
                        <BalanceOverview
                          currentBalance="15,200"
                          monthlyRevenue="7,500"
                          totalWithdrawal="3,000"
                        />
                    </div>    */}


                    </div>
                      {/* <div className="h-[300px]">
                      <BalanceHistory />
                    </div> */}
                </div>
              </div>
            ) : (
              <div className="manager-dashboard">

              <div className="summary-cards-section">
                  <SummaryCards />
                </div>

                <div className="latest-orders-section">
                  <div className="latest-orders-card">
                      <div className="section-head">
                        <div className="section-title">آخر الطلبات الواردة</div>
                          <button className="view-all-button">
                            مشاهدة الكل <ChevronLeft size={16} className="inline-block mr-1" />
                          </button>
                        </div>
                    <div className="h-auto">
                      <NewOrders /> {/* عرض جدول آخر الطلبات */}
                    </div>
                  </div>
                </div>

                <div className="latest-orders-section">
                  <div className="latest-orders-card">
                      <div className="section-head">
                        <div className="section-title">آخر الطلبات الواردة</div>
                          <button className="view-all-button">
                            مشاهدة الكل <ChevronLeft size={16} className="inline-block mr-1" />
                          </button>
                        </div>
                    <div className="h-auto">
                      <UrgentOrders /> {/* عرض جدول آخر الطلبات */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
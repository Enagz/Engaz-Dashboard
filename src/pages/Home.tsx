import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import BalanceHistory from '../components/charts/BalanceHistory';
import CompletedOrders from '../components/charts/CompletedOrders';
import CompletionRateChart from '../components/charts/CompletionRate';
import SummaryCards from '../components/SummaryCards/SummaryCards';
import './Home.css';

const Home: React.FC = () => {
  const role = "manager";

  return (
    <div className="home-container">
      <div className="home-content">
        <Card>
          <CardHeader>
            <CardTitle className="card-title">الصفحة الرئيسية</CardTitle>
          </CardHeader>
          <CardContent className="card-body">
            {role === "manager" ? (
              <div className="manager-dashboard">
                <SummaryCards />

                <Card>
                  <CardHeader>
                    <CardTitle className="card-title">تاريخ الرصيد</CardTitle>
                  </CardHeader>
                  <CardContent className="chart-container">
                    <BalanceHistory />
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="employee-dashboard">
                {/* عرض الموظف */}
                <Card>
                  <CardHeader>
                    <CardTitle className="card-title">معدل الإنجاز</CardTitle>
                  </CardHeader>
                  <CardContent className="chart-container">
                    <CompletionRateChart />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="card-title">الطلبات المكتملة</CardTitle>
                  </CardHeader>
                  <CardContent className="chart-container">
                    <CompletedOrders />
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
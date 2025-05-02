import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerStatistics from '../../components/cards/CustomerStatistics';
import CustomerDetails from '../../components/tables/CustomerDetails';
import BestCustomers from '../../components/tables/BestCustomers';

const Customers = () => {
  const navigate = useNavigate(); 

  const customerData = {
    totalCustomers: 1250,
    engagementRate: '85%',
    engagementProgress: 85,
    customerSatisfaction: '4.7/5',
    newCustomers: 85,
    activeCustomers: 320,
  };

  const handleAddCustomerClick = () => {
    navigate('/add-customer'); 
  };

  return (
    <div className="customers-container ">

      <div className="button-header"> 
        <button className="addCustomerButton" onClick={handleAddCustomerClick}>إضافة عميل</button>
        <h1 className="pageTitle">إحصائيات العملاء</h1>
      </div>

      <div className="statisticsContainer">
        <CustomerStatistics {...customerData} />
      </div>

      <div className="detailsContainer">
        <h2 className="sectionTitle">تفاصيل العملاء</h2>
        <CustomerDetails />
      </div>

      <div className="detailsContainer">
        <h2 className="sectionTitle">أفضل العملاء أداءً</h2>
        <BestCustomers />
      </div>
    </div>
  );
};

export default Customers;
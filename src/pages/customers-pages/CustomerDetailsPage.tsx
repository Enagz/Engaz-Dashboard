import React from 'react';
import { useParams } from 'react-router-dom';
import { User, Phone, Mail, Calendar, MapPin, Tag } from 'lucide-react';
import CustomerStatistics from '../../components/charts/CustomerStatistics';
import OrderHistory from '../../components/tables/OrderHistory';

const CustomerDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    const [customerData, setCustomerData] = React.useState({
        name: 'عبد الله محمد السالم',
        phone: '+966 55 123 4567',
        email: 'abdallah2@email.com',
        city: 'الرياض، السعودية',
        customerType: 'عميل متكرر',
        registrationDate: '15 فبراير 2024',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomerData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="customerDetailsPageContainer">
            <div className="customerInfoCard">
                <div className="cardHeader">
                    <h2 className="cardTitle">معلومات العميل الأساسية</h2>
                    <div className="actionButtons">
                        <button className="editButton">تعديل</button>
                        <button className="deleteButton">حذف</button>
                    </div>
                </div>

                <div className="infoGrid">
                    <div className="formItem">
                        <label className="infoLabel" htmlFor="phone">رقم الهاتف:</label>
                        <div className="wrapper">
                            <Phone className="formIcon" />
                      
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="رقم الهاتف"
                                value={customerData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="formItem">
                        <label className="infoLabel" htmlFor="city">المدينة:</label>
                        <div className="wrapper">
                            <MapPin className="formIcon" />
                            <input
                                type="text"
                                id="city"
                                name="city"
                                placeholder="المدينة"
                                value={customerData.city}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="formItem">
                        <label className="infoLabel" htmlFor="customerType">نوع العميل:</label>
                        <div className="wrapper">
                            <Tag className="formIcon" />
                            <input
                                type="text"
                                id="customerType"
                                name="customerType"
                                placeholder="نوع العميل"
                                value={customerData.customerType}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="formItem">
                        <label className="infoLabel" htmlFor="name">الإسم:</label>
                        <div className="wrapper">
                            <User className="formIcon" />
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="الإسم"
                                value={customerData.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="formItem">
                        <label className="infoLabel" htmlFor="email">البريد الإلكتروني:</label>
                        <div className="wrapper">
                            <Mail className="formIcon" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="البريد الإلكتروني"
                                value={customerData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="formItem">
                        <label className="infoLabel" htmlFor="registrationDate">تاريخ الانضمام:</label>
                        <div className="wrapper">
                            <Calendar className="formIcon" />
                            <input
                                type="text"
                                id="registrationDate"
                                name="registrationDate"
                                placeholder="تاريخ الانضمام"
                                value={customerData.registrationDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="ordersChartCard">
                <h2 className="cardTitle">إحصائيات العميل</h2>
                <div className="chartPlaceholder">
                    <CustomerStatistics />
                </div>
            </div>

            <div className="ordersLogCard">
                <h2 className="cardTitle">سجل الطلبات</h2>
                <div className="ordersTablePlaceholder">
                    <span>جدول سجل الطلبات</span>
                    <OrderHistory />
                </div>
            </div>
        </div>
    );
};

export default CustomerDetailsPage;
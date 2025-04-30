import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { arEG as arLocale } from 'date-fns/locale';
import { TextField } from '@mui/material';

import type { TextFieldProps } from '@mui/material/TextField';


const AddCustomer = () => {
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [registrationDate, setRegistrationDate] = useState<Date | null>(null);

    const handleSave = () => {
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const customerData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                city: formData.get('city'),
                registrationDate: registrationDate ? registrationDate.toISOString().split('T')[0] : ''
            };
            console.log('Customer data:', customerData);
        }
        navigate('/customers');
    };

    const handleCancel = () => {
        navigate('/customers');
    };

    return (
        <div className="addCustomerPageContainer">
            <div className="breadcrumb">
                <span className="breadcrumb-current">العملاء</span>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-link">إضافة عميل جديد</span>
            </div>

            <h1 className="pageTitle">إضافة عميل جديد</h1>

            <div className="addCustomerCard">
                <form ref={formRef}>
                    <div className="formGrid">
                        <div className="formItem">
                            <label className="infoLabel" htmlFor="name">الإسم:</label>
                            <div className="wrapper">
                                <User className="formIcon" />
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="الإسم"
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
                                />
                            </div>
                        </div>

                        <div className="formItem">
                            <label className="infoLabel" htmlFor="phone">رقم الهاتف:</label>
                            <div className="wrapper">
                                <Phone className="formIcon" />
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    placeholder="رقم الهاتف"
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
                                />
                            </div>
                        </div>

                        {/* Uncomment the following block if you want to include the registration date field */}        
                        <div className="formItem">
  <label className="infoLabel" htmlFor="registrationDate">تاريخ الانضمام:</label>
  <div className="wrapper">
    <Calendar className="formIcon" />
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={arLocale}>
      <DatePicker
        value={registrationDate}
        onChange={(newValue: Date | null) => setRegistrationDate(newValue)}
        slotProps={{
          textField: {
            variant: 'outlined',
            fullWidth: true,
            placeholder: 'تاريخ الانضمام',




            sx: {
                 '& .MuiPickersInputBase-root': {
                    direction: 'rtl', 

                    '& fieldset': { 
                        border: 'none',
                    },
                },
                '& .MuiPickersOutlinedInput-root': { // استهداف حاوية الأقسام (sectionsContainer)
                    direction: 'rtl',
                },
                '& .MuiPickersSectionList-root': {
                    direction: 'rtl',
                },
                '& fieldset': { // إلغاء أي حدود محتملة حول المكون نفسه
                    border: 'none',
                },
              '& .MuiOutlinedInput-root': {
                height: '48px',
                border: 'none',
                padding: 0,
                '& input': {
                  border: 'none',  
                  padding: '0 16px',
                },
                '& fieldset': {
                  border: 'none',
                },
              },
            },
          } as TextFieldProps
        }}
      />
    </LocalizationProvider>
  </div>
</div>

                        {/* <div className="formItem">
                            <label className="infoLabel" htmlFor="registrationDate">تاريخ الانضمام:</label>
                            <div className="wrapper">
                                <Calendar className="formIcon" />
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                    adapterLocale={arLocale}
                                >
                                    <DatePicker
                                        className="datePicker"
                                        value={registrationDate}
                                        onChange={(newValue: Date | null) => setRegistrationDate(newValue)}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                name: "registrationDate",
                                                placeholder: "تاريخ الانضمام",
                                                className: "datePickerInput",
                                            } as TextFieldProps
                                        }}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div> */}
                    </div>

                    <div className="formActions">
                        <button type="button" className="cancelButton" onClick={handleCancel}>إلغاء</button>
                        <button type="button" className="saveButton" onClick={handleSave}>حفظ</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCustomer;

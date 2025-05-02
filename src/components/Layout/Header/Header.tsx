import React, { useState } from 'react';
import { Search, Settings } from 'lucide-react';
import UserAvatarPlaceholder from '../../../assets/userImage/user.jpg';
import ReactCountryFlag from "react-country-flag";
import { countries, TCountryCode } from "countries-list";

// تعريف نوع للدولة
interface CountryInfo {
  code: TCountryCode;
  name: string;
  native: string;
}

const Header = () => {
  const userName = "أحمد";
  const userAvatar = UserAvatarPlaceholder;
  const [selectedCountry, setSelectedCountry] = useState<TCountryCode>('SA'); // SA = السعودية
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // تحويل كائن الدول إلى مصفوفة مع تصحيح النوع
  const countryList: CountryInfo[] = Object.entries(countries).map(([code, country]) => ({
    code: code as TCountryCode,
    name: country.name,
    native: country.native
  }));

  const commonCountries: TCountryCode[] = ['SA', 'EG', 'AE', 'US', 'GB'];
  
  const sortedCountries: CountryInfo[] = [
    ...commonCountries.map(code => ({
      code,
      name: countries[code].name,
      native: countries[code].native
    })),
    ...countryList.filter(c => !commonCountries.includes(c.code))
  ];

  return (
    <header className="bg-[#f8f8f8] py-4 px-6 sticky top-0 z-[100] px-15" dir="rtl">
      <div className="header-container flex items-center justify-between ">
        
        {/* معلومات المستخدم */}
        <div className='user-info flex items-center gap-4'>
          <div className='user-avatar w-12 h-12 rounded-full overflow-hidden'>
            <img 
              src={userAvatar} 
              alt={userName} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className='greeting-section'>
            <h1 className='text-lg font-semibold text-gray-800'>مرحباً بك، {userName}</h1>
            <p className='text-sm text-gray-500'>استعد لتحقيق المزيد اليوم</p>
          </div>
        </div>

        {/* شريط البحث */}
        <div className='search-bar flex-1 max-w-xl mx-8'>
          <div className='relative'>
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="إبحث هنا..."
              className="w-full py-2 pr-10 pl-4 border border-[#E0E0E0] rounded-full text-sm bg-white transition-all focus:outline-none focus:border-[#4D90FE] focus:bg-white focus:ring-2 focus:ring-[#4D90FE] focus:ring-opacity-20 text-right placeholder-[#999999]"
            />
          </div>
        </div>

        {/* الإعدادات والدول */}
        <div className='flex items-center gap-4'>
          
          <button className='settings-btn p-2 rounded-full bg-[#3E97D11A] hover:bg-gray-100 transition-colors'>
            <Settings size={20} className="text-gray-600" />
          </button>
          
          {/* اختيار الدولة */}
          <div className="relative">
            <button 
              className="language-btn flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
            >
              <ReactCountryFlag
                countryCode={selectedCountry}
                svg
                style={{
                  width: '20px',
                  height: '20px',
                }}
                title={selectedCountry}
              />
            </button>
            
            {showCountryDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1 max-h-60 overflow-auto">
                  {sortedCountries.map((country) => (
                    <button
                      key={country.code}
                      className={`flex items-center gap-3 w-full px-4 py-2 text-right text-sm ${
                        selectedCountry === country.code 
                          ? 'bg-gray-100 text-primary-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setSelectedCountry(country.code);
                        setShowCountryDropdown(false);
                      }}
                    >
                      <ReactCountryFlag
                        countryCode={country.code}
                        svg
                        style={{
                          width: '16px',
                          height: '16px',
                        }}
                      />
                      <span>{country.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


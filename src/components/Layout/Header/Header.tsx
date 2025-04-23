import React from 'react';
import { Search, Settings, Globe } from 'lucide-react';
import UserAvatarPlaceholder from '../../../assets//userImage/user.jpg';


const userName = "أحمد";
  const userAvatar = UserAvatarPlaceholder;

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">

      <div className='user-info'>
          <div className='user-avatar'>
            <img src={UserAvatarPlaceholder} alt={userName} className="rounded-full" />
          </div>
          <div className='greeting-section'>
            <div className='greeting-text'>
              <h1>مرحباً بك، userName</h1>
              <p>استعد لتحقيق المزيد اليوم</p>
            </div>
          </div>
        </div>


        <div className='search-bar'>
          <div className='search-icon'>
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="إبحث هنا..."
          />
        </div>


        <div className='settings-language'>
          <button className='settings-btn'>
            <Settings size={20} color="#333333" />
          </button>
          <button className='language-btn'>
            <Globe size={20} color="#333333" />
          </button>
        </div>

      </div>

    </header>
  );
};

export default Header;
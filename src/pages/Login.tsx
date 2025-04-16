import React, {useState} from 'react';
import logo from '../assets/logo/logo.svg';
import bro from '../assets/login-in/bro.png';
// import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const tooglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="login-form">
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          البريد الإلكتروني:
        </label>
        <input
          type="email"
          id="email"
          className="form-input"
          placeholder="أدخل بريدك الإلكتروني"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">
          كلمة المرور:
        </label>
        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="form-input"
            placeholder="أدخل كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
          type='button'
          className='password-toogle'
          onClick={tooglePasswordVisibility}
          aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          >
          <i className={` fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="login-button">
          تسجيل الدخول
        </button>
        <a href="#" className="forgot-password">
          هل نسيت كلمة المرور؟
        </a>
      </div>
    </form>
  );
};

interface LoginHeaderProps {}

const LoginHeader: React.FC<LoginHeaderProps> = () => {
  return (
    <div className="login-header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <h2 className="login-title">تسجيل الدخول إلى لوحة التحكم</h2>
      <p className="login-subtitle">مرحباً بك! قم بتسجيل الدخول للمتابعة.</p>
    </div>
  );
};

interface LoginIllustrationProps {}

const LoginIllustration: React.FC<LoginIllustrationProps> = () => {
  return (
    <div className="login-illustration">
      <img src={bro} alt="Login Illustration" />
    </div>
  );
};

interface LoginContainerProps {}

const LoginContainer: React.FC<LoginContainerProps> = () => {
  return (
    <div className="login-container">
      <LoginIllustration />
      <div className="login-form-wrapper">
        <LoginHeader />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginContainer;
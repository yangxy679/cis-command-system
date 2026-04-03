import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { RegisterForm } from './RegisterForm';
import { AuthLayout } from './AuthLayout';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    department: '',
    rank: '士兵',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('密码不匹配');
      return;
    }

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        department: formData.department,
        rank: formData.rank,
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('注册失败:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <AuthLayout
      title="注册CIS作战指挥系统"
      subtitle="创建您的指挥系统账户"
    >
      <RegisterForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          已有账户？{' '}
          <button
            onClick={() => navigate('/login')}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            立即登录
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;

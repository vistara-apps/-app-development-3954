import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ mode, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
    companySize: ''
  });
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        await signup(formData);
      }
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal" onClick={(e) => e.target.className === 'modal' && onClose()}>
      <div className="modal-content">
        <div style={{ position: 'relative' }}>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
          
          <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>
            {mode === 'login' ? 'Login to KOLS' : 'Join KOLS'}
          </h2>

          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  className="input"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
                <select
                  name="companySize"
                  className="input"
                  value={formData.companySize}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Company Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="200+">200+ employees</option>
                </select>
              </>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="input"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn" style={{ width: '100%' }}>
              {mode === 'login' ? 'Login' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
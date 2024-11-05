'use client'

import React, { useState } from 'react';
import { useStore } from '@/hooks/useStore';
import Input from './Input';
import Button from './Button';
import Modal from './Modal';
import { login } from '@/services/auth';
import 'tailwindcss/tailwind.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setUser, setIsLoading: setIsLoadingStore, setError: setStoreError } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingStore(true);

    try {
      const user = await login(email, password); 
      setUser(user);
    } catch (error: any) {
      setStoreError(error.message || 'Login failed.');
    } finally {
      setIsLoadingStore(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <Input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
      {error && <Modal isOpen={Boolean(error)} onClose={() => setError(null)} title="Error">
        <p>{error}</p>
      </Modal>}
    </form>
  );
};

export default LoginForm;
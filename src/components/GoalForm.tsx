'use client'

import React, { useState, useEffect, FormEvent } from 'react';
import { useStore } from '@/hooks/useStore';
import { createGoal } from '@/services/api';
import Input from './Input';
import Button from './Button';
import Modal from './Modal';
import 'tailwindcss/tailwind.css';

interface Goal {
  id?: number;
  name: string;
  description: string;
  target: number;
}

const GoalForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [target, setTarget] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { goal, setGoal, setError: setStoreError, setIsLoading: setIsLoadingStore } = useStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoadingStore(true);

    try {
      const newGoal = await createGoal({ name, description, target });
      setGoal(newGoal);
      // Handle success, e.g., close modal or redirect
      // ... 
    } catch (error: any) {
      setStoreError(error.message || 'Failed to create goal.');
    } finally {
      setIsLoadingStore(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof Goal) => {
    setGoal({ ...goal, [field]: event.target.value as any });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input type="text" placeholder="Goal Name" value={name} onChange={(e) => handleInputChange(e, 'name')} />
      <Input type="text" placeholder="Description" value={description} onChange={(e) => handleInputChange(e, 'description')} />
      <Input type="number" placeholder="Target" value={target.toString()} onChange={(e) => handleInputChange(e, 'target')} />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Goal'}
      </Button>
      {error && <Modal isOpen={Boolean(error)} onClose={() => setError(null)} title="Error">
        <p>{error}</p>
      </Modal>}
    </form>
  );
};

export default GoalForm;
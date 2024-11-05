'use client'

import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { getGoals, createGoal, updateGoal, deleteGoal } from '@/services/api'; 
import useAuth from '@/hooks/useAuth';
import GoalForm from '@/components/GoalForm';
import GoalList from '@/components/GoalList'; 

export const metadata: Metadata = {
  title: {
    default: 'Fitness Tracker - Goals',
    template: '%s - Fitness Tracker',
  },
  description: 'Manage your fitness goals',
};

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const goalsData = await getGoals(user.id);
        setGoals(goalsData);
      } catch (error) {
        console.error('Error fetching goals:', error);
        // Handle error (e.g., display an error message)
      }
    };

    if (user.id) {
      fetchGoals();
    }
  }, [user.id]);

  const handleGoalCreate = async (newGoal) => {
    try {
      const createdGoal = await createGoal(user.id, newGoal);
      setGoals([...goals, createdGoal]);
    } catch (error) {
      console.error('Error creating goal:', error);
      // Handle error (e.g., display an error message)
    }
  };

  const handleGoalUpdate = async (updatedGoal) => {
    try {
      const updatedGoals = goals.map((goal) => 
        goal.id === updatedGoal.id ? updatedGoal : goal
      );
      setGoals(updatedGoals); 
      await updateGoal(user.id, updatedGoal.id, updatedGoal);
    } catch (error) {
      console.error('Error updating goal:', error);
      // Handle error (e.g., display an error message)
    }
  };

  const handleGoalDelete = async (goalId) => {
    try {
      await deleteGoal(user.id, goalId);
      setGoals(goals.filter((goal) => goal.id !== goalId));
    } catch (error) {
      console.error('Error deleting goal:', error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Goals</h1>
      <GoalForm onCreate={handleGoalCreate} />
      <GoalList goals={goals} onUpdate={handleGoalUpdate} onDelete={handleGoalDelete} />
    </div>
  );
}
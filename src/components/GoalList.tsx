'use client'

import React, { useState, useEffect } from 'react';
import { useStore } from '@/hooks/useStore';
import { getGoals, deleteGoal, updateGoal } from '@/services/api';
import Button from './Button';
import Modal from './Modal';
import 'tailwindcss/tailwind.css'; 

interface Goal {
  id: number;
  name: string;
  description: string;
  target: number;
}

interface GoalListProps {
  goals: Goal[];
  onDelete: (goalId: number) => void;
  onUpdate: (updatedGoal: Goal) => void; 
}

interface GoalItemProps {
  goal: Goal;
  onDelete: (goalId: number) => void;
  onUpdate: (updatedGoal: Goal) => void;
}

const GoalList: React.FC<GoalListProps> = ({ goals, onDelete, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoalDelete = async (goalId: number) => {
    try {
      await deleteGoal(goalId);
      onDelete(goalId);
    } catch (error: any) {
      setError(error.message || 'Failed to delete goal');
    }
  };

  const handleGoalUpdate = (goal: Goal) => {
    onUpdate(goal);
  };

  const GoalItem: React.FC<GoalItemProps> = ({ goal, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedGoal, setEditedGoal] = useState(goal);
    const [editError, setEditError] = useState(null);

    const handleEditClick = () => {
      setIsEditing(true);
    };

    const handleEditClose = () => {
      setIsEditing(false);
      setEditError(null);
    };

    const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof Goal) => {
      setEditedGoal({ ...editedGoal, [field]: event.target.value as any });
    };

    const handleEditSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      try {
        await updateGoal(editedGoal.id, editedGoal);
        onUpdate(editedGoal);
        handleEditClose();
      } catch (error: any) {
        setEditError(error.message || 'Failed to update goal');
      }
    };

    return (
      <div className="border rounded-md p-4 mb-4">
        <h3 className="text-lg font-bold">{goal.name}</h3>
        <p className="text-gray-600">{goal.description}</p>
        <p className="text-gray-600">Target: {goal.target}</p>
        <div className="flex gap-2 mt-2">
          <Button onClick={handleEditClick}>Edit</Button>
          <Button onClick={() => handleGoalDelete(goal.id)} className="bg-red-500 hover:bg-red-700">Delete</Button>
        </div>
        {isEditing && (
          <Modal isOpen={isEditing} onClose={handleEditClose} title="Edit Goal">
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Goal Name"
                value={editedGoal.name}
                onChange={(e) => handleEditChange(e, 'name')}
                className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              />
              <input
                type="text"
                placeholder="Description"
                value={editedGoal.description}
                onChange={(e) => handleEditChange(e, 'description')}
                className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              />
              <input
                type="number"
                placeholder="Target"
                value={editedGoal.target.toString()}
                onChange={(e) => handleEditChange(e, 'target')}
                className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              />
              <Button type="submit">Save Changes</Button>
              {editError && <p className="text-red-500">{editError}</p>}
            </form>
          </Modal>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Goals</h1>
      {error && (
        <Modal isOpen={Boolean(error)} onClose={() => setError(null)} title="Error">
          <p>{error}</p>
        </Modal>
      )}
      {goals.length > 0 ? (
        <div>
          {goals.map((goal) => (
            <GoalItem key={goal.id} goal={goal} onDelete={handleGoalDelete} onUpdate={handleGoalUpdate} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You have no goals yet. Create one to get started!</p>
      )}
    </div>
  );
};

export default GoalList;
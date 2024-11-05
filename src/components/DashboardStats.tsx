'use client'

import React, { useEffect, useState } from 'react';
import { useStore } from '@/hooks/useStore';
import { getUserData } from '@/services/api';
import { Goal, Workout, User } from '@/types';
import 'tailwindcss/tailwind.css';

interface Props {
  goals: Goal[];
  workouts: Workout[];
  user: User;
}

const DashboardStats: React.FC<Props> = ({ goals, workouts, user }) => {
  const { userData, isLoading, error, setUserData, setIsLoading, setError } = useStore();
  const [averageWorkoutDuration, setAverageWorkoutDuration] = useState(0);
  const [completedGoals, setCompletedGoals] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const data = await getUserData(user.id);
        setUserData(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user.id) {
      fetchUserData();
    }
  }, [user.id]);

  useEffect(() => {
    if (workouts.length > 0) {
      const totalWorkoutDuration = workouts.reduce((acc, workout) => acc + workout.duration, 0);
      const avgDuration = totalWorkoutDuration / workouts.length;
      setAverageWorkoutDuration(avgDuration);
    }
  }, [workouts]);

  useEffect(() => {
    if (goals.length > 0) {
      const completedCount = goals.filter((goal) => goal.completed).length;
      setCompletedGoals(completedCount);
    }
  }, [goals]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Dashboard</h1>
      {isLoading && <p className="text-gray-500">Loading data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {userData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-2">Recent Workouts</h2>
              <ul>
                {userData.recentWorkouts.map((workout) => (
                  <li key={workout.id} className="mb-2">
                    <span className="font-medium">{workout.type}</span> - {workout.duration} minutes
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-2">Goal Progress</h2>
              <p className="text-gray-600">
                You have completed {completedGoals} out of {goals.length} goals!
              </p>
              {/* Optionally add a progress bar or chart to visualize progress */}
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-2">Activity Summary</h2>
              <p className="text-gray-600">
                Average workout duration: {averageWorkoutDuration.toFixed(2)} minutes
              </p>
              {/* Optionally add more activity metrics (e.g., total workouts, most common workout type) */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardStats;
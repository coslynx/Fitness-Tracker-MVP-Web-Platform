'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/hooks/useStore';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import { isAuthenticated } from '@/services/auth';
import { supabaseUrl, supabaseKey } from '@/config';
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { getGoals, getWorkouts } from '@/services/api';
import { User } from '@/types';
import { Session } from 'next-auth/react';
import  LayoutNavbar from '@/components/LayoutNavbar';
import  LayoutFooter from '@/components/LayoutFooter';
import  LayoutSidebar from '@/components/LayoutSidebar';
import  LayoutMain from '@/components/LayoutMain';
import 'tailwindcss/tailwind.css';

const Home: React.FC = () => {
  const router = useRouter();
  const { user, isLoading, setUser, setIsLoading } = useStore();
  const [goals, setGoals] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        setIsLoading(true);
        try {
          const goalsData = await getGoals(user.id);
          setGoals(goalsData);
          const workoutsData = await getWorkouts(user.id);
          setWorkouts(workoutsData);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await isAuthenticated();
      if (isLoggedIn) {
        router.push('/dashboard');
      }
    };

    checkAuth();
  }, []);

  return (
    <LayoutMain>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        <>
          {user ? (
            <>
              <LayoutSidebar goals={goals} workouts={workouts} />
              <LayoutNavbar user={user} />
            </>
          ) : (
            <>
              <div className="flex justify-center items-center h-screen">
                <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                  <h2 className="text-2xl font-bold mb-4">Welcome to Fitness Tracker!</h2>
                  <p className="text-gray-600 mb-6">
                    Track your progress, set goals, and stay motivated on your fitness journey.
                  </p>
                  <div className="flex justify-center items-center gap-4">
                    <LoginForm />
                    <SignupForm />
                  </div>
                </div>
              </div>
            </>
          )}
          <LayoutFooter />
        </>
      )}
    </LayoutMain>
  );
};

export default Home;
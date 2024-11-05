'use client'

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { siteConfig } from '@/config';
import { supabaseUrl, supabaseKey } from '@/config';
import { createClient } from '@supabase/supabase-js';
import type { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { getGoals, getWorkouts, getUserData } from '@/services/api';
import useAuth from '@/hooks/useAuth';
import DashboardStats from '@/components/DashboardStats';
import LayoutNavbar from '@/components/LayoutNavbar';
import LayoutFooter from '@/components/LayoutFooter';
import LayoutSidebar from '@/components/LayoutSidebar';
import LayoutMain from '@/components/LayoutMain';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: '%s - Fitness Tracker',
  },
  description: siteConfig.description,
};

export default function DashboardPage() {
  const [goals, setGoals] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const { session, user } = useAuth();
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    async function fetchData() {
      if (user.id) {
        try {
          const goalsData = await getGoals(user.id);
          setGoals(goalsData);
          const workoutsData = await getWorkouts(user.id);
          setWorkouts(workoutsData);
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle error (e.g., display an error message)
        }
      }
    };

    fetchData();
  }, [user.id]);

  return (
    <LayoutMain>
      {user.id ? (
        <>
          <DashboardStats goals={goals} workouts={workouts} user={user} />
          {/* Add other dashboard content as needed */}
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500">Please log in to view your dashboard.</p>
        </div>
      )}
    </LayoutMain>
  );
}
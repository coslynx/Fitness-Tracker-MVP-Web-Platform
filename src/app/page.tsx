'use client'

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { siteConfig } from '@/config';
import { supabaseUrl, supabaseKey } from '@/config';
import { createClient } from '@supabase/supabase-js';
import type { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { getGoals, getWorkouts } from '@/services/api';
import useAuth from '@/hooks/useAuth';
import  LayoutNavbar from '@/components/LayoutNavbar';
import  LayoutFooter from '@/components/LayoutFooter';
import  LayoutSidebar from '@/components/LayoutSidebar';
import  LayoutMain from '@/components/LayoutMain';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: '%s - Fitness Tracker',
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [goals, setGoals] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const { session, user } = useAuth();
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    async function fetchData() {
      const goals = await getGoals(user.id);
      setGoals(goals);
      const workouts = await getWorkouts(user.id);
      setWorkouts(workouts);
    };
    fetchData();
  }, [user.id]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="flex h-screen overflow-hidden">
            <LayoutSidebar goals={goals} workouts={workouts} />
            <div className="flex flex-col flex-1 overflow-hidden">
              <LayoutNavbar user={user} />
              <LayoutMain>{children}</LayoutMain>
              <LayoutFooter />
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
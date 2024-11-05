import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import { User, Goal, Workout } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const getGoals = async (userId: string): Promise<Goal[]> => {
  try {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    return data as Goal[];
  } catch (error: any) {
    console.error('Error fetching goals:', error);
    throw new Error('Failed to fetch goals');
  }
};

export const createGoal = async (userId: string, goalData: Goal): Promise<Goal> => {
  try {
    const { data, error } = await supabase
      .from('goals')
      .insert({ ...goalData, user_id: userId });

    if (error) {
      throw error;
    }

    return data[0] as Goal;
  } catch (error: any) {
    console.error('Error creating goal:', error);
    throw new Error('Failed to create goal');
  }
};

export const updateGoal = async (userId: string, goalId: number, goalData: Goal): Promise<Goal> => {
  try {
    const { data, error } = await supabase
      .from('goals')
      .update(goalData)
      .eq('id', goalId)
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    return data[0] as Goal;
  } catch (error: any) {
    console.error('Error updating goal:', error);
    throw new Error('Failed to update goal');
  }
};

export const deleteGoal = async (userId: string, goalId: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', goalId)
      .eq('user_id', userId);

    if (error) {
      throw error;
    }
  } catch (error: any) {
    console.error('Error deleting goal:', error);
    throw new Error('Failed to delete goal');
  }
};

export const getUserData = async (userId: string): Promise<User> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId);

    if (error) {
      throw error;
    }

    return data[0] as User;
  } catch (error: any) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data');
  }
};

export const getWorkouts = async (userId: string): Promise<Workout[]> => {
  try {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    return data as Workout[];
  } catch (error: any) {
    console.error('Error fetching workouts:', error);
    throw new Error('Failed to fetch workouts');
  }
};
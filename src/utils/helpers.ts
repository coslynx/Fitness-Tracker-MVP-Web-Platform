import { format } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(date, 'MMMM dd, yyyy');
};

export const formatTime = (date: Date): string => {
  return format(date, 'hh:mm a');
};

export const getDurationString = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
};

export const formatGoalProgress = (completedGoals: number, totalGoals: number): string => {
  const percentage = Math.round((completedGoals / totalGoals) * 100);
  return `${percentage}%`;
};

export const formatWorkoutDuration = (duration: number): string => {
  return `${duration} minutes`;
};

export const isEmailValid = (email: string): boolean => {
  // Basic email validation regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
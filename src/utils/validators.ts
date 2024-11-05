import { isEmailValid } from './helpers';

export const validateEmail = (email: string): boolean => {
  if (!email) {
    return false; 
  }
  return isEmailValid(email); 
};

export const validateGoalData = (goal: { name: string; description: string; target: number }): boolean => {
  if (!goal.name || goal.name.trim() === "") {
    return false; // Goal name cannot be empty
  }
  if (goal.target <= 0) {
    return false; // Target value must be positive
  }
  // Additional validation logic can be added here, for example, checking the length of the description or enforcing specific character sets.
  return true;
};

export const validatePassword = (password: string): boolean => {
  if (password.length < 8) {
    return false; // Password must be at least 8 characters long
  }
  if (!/[A-Z]/.test(password)) {
    return false; // Password must contain at least one uppercase letter
  }
  if (!/[a-z]/.test(password)) {
    return false; // Password must contain at least one lowercase letter
  }
  if (!/[0-9]/.test(password)) {
    return false; // Password must contain at least one number
  }
  return true; 
};

export const validateName = (name: string): boolean => {
  if (!name || name.trim() === "") {
    return false; 
  }
  return true; 
};

export const validateDescription = (description: string): boolean => {
  // You could add more specific validation rules here, like checking for a minimum length.
  return true; 
};

export const validateWorkoutData = (workout: { type: string; duration: number; intensity: string; notes?: string }): boolean => {
  if (!workout.type || workout.type.trim() === "") {
    return false;
  }
  if (workout.duration <= 0) {
    return false;
  }
  if (!workout.intensity || workout.intensity.trim() === "") {
    return false;
  }
  return true;
};
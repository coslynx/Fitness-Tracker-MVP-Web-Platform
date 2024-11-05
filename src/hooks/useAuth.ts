import { useSession, signIn, signOut } from 'next-auth/react';
import { useStore } from '@/hooks/useStore';

export default function useAuth() {
  const { data: session, status } = useSession();
  const { setUser, setIsLoading, setError } = useStore();

  // Handle successful sign-in using NextAuth.js
  const handleSignIn = async (provider: string) => {
    setIsLoading(true);
    try {
      await signIn(provider);
    } catch (error: any) {
      setError(error.message || 'Sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sign-out using NextAuth.js
  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      setUser(null); // Clear user data from the store
    } catch (error: any) {
      setError(error.message || 'Sign-out failed');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    session,
    status,
    signIn: handleSignIn,
    signOut: handleSignOut,
  };
}
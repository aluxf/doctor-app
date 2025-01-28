"use client"
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ReactNode, useEffect } from 'react';

interface RedirectProps {
  children?: ReactNode;
}

const Redirect = <RedirectProps extends Record<string, unknown>>(
  Component: React.ComponentType<RedirectProps>,
): React.FC<RedirectProps> => {
  return function Redirect(props: RedirectProps) {
    const { user, role, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (user) {
        if (role === "patient") router.push('/user/home');
        else if (role === "doctor") router.push('/doc/home');
      }
    }, [user, role, loading, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return user ? <Component {...props} /> : null;
  };
};

export default Redirect;
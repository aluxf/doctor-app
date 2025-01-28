import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ReactNode, useEffect } from 'react';

interface WithAuthProps {
  children?: ReactNode;
}

const withAuth = <WithAuthProps extends Record<string, unknown>>(
  Component: React.ComponentType<WithAuthProps>,
  requiredRole: 'patient' | 'doctor'
): React.FC<WithAuthProps> => {
  return function WithAuth(props: WithAuthProps) {
    const { user, role, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && (!user || role !== requiredRole)) {
        router.push('/login');
      }
    }, [user, role, loading, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return user && role === requiredRole ? <Component {...props} /> : null;
  };
};

export default withAuth;
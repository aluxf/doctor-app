import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ReactNode, useEffect } from 'react';

const withAuth = <WithAuthProps extends Record<string, unknown>>(
    Component: React.ComponentType<WithAuthProps>
  ): React.FC<WithAuthProps> => {
      return function WithAuth(props: WithAuthProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [user, loading, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return user ? <Component {...props} /> : null;
  };
  };
  
  export default withAuth;
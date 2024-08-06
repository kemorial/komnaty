import { IUser, userStore } from '@entities';
import { authService } from '@shared/api/services';
import Loader from '@shared/ui/loader/Loader';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

function Protected({ children }: Props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checker = async () => {
      try {
        if (userStore.isLoggedIn) return;
        const user = await authService.getMe<IUser>();
        userStore.loginSuccessful(user);
        setIsLoading(false);
      } catch (error) {
        navigate('/login');
      }
    };
    checker();
  }, [userStore, navigate]);

  if (isLoading && !userStore.isLoggedIn) return <Loader />;
  return children;
}

export default Protected;

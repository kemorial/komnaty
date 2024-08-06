import { userStore } from '@entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { authService } from '@shared/api/services';
import { Alert, Button, FormItem, IconButton, Input } from '@shared/ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaLock, FaMailBulk, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

interface Props {
  className: string;
}

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const schema = z.object({
  username: z.string().min(8, { message: 'Минимум 8 символов' }),
  email: z.string().email({ message: 'Некорректный email' }),
  password: z.string().min(8, { message: 'Минимум 8 символов' }),
});

export default function RegistrationForm({ className }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (user) => {
    userStore.registrationInProgress();
    try {
      await authService.registration(user);
      userStore.registrationSuccessful();
      navigate('/login');
    } catch (error) {
      const message = authService.parseMessageError(error as Error);
      userStore.loginError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {userStore.isError && <Alert size='md' title={userStore.error} />}

      <FormItem label={'Имя пользователя'} error={errors.username?.message}>
        <Input
          icon={<IconButton color='primary' size='sm' icon={<FaUser />} />}
          disabled={userStore.isFetching}
          placeholder='Введите имя пользователя'
          type={'text'}
          {...register('username')}
        />
      </FormItem>
      <FormItem label={'Email'} error={errors.email?.message}>
        <Input
          icon={<IconButton color='primary' size='sm' icon={<FaMailBulk />} />}
          disabled={userStore.isFetching}
          placeholder='Введите email'
          type={'text'}
          {...register('email')}
        />
      </FormItem>
      <FormItem label={'Пароль'} error={errors.password?.message}>
        <Input
          icon={<IconButton color='primary' size='sm' icon={<FaLock />} />}
          disabled={userStore.isFetching}
          placeholder='Введите пароль'
          type={'password'}
          {...register('password')}
        />
      </FormItem>
      <FormItem>
        <Button isLoading={userStore.isFetching} label='Регистрация' type={'submit'} />
      </FormItem>
    </form>
  );
}

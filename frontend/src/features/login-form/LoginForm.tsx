import { IUser, userStore } from '@entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { authService } from '@shared/api/services';
import { Alert, IconButton, Input } from '@shared/ui';
import Button from '@shared/ui/button/Button';
import FormItem from '@shared/ui/form-item/FormItem';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

interface Props {
  className: string;
}

type Inputs = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email({ message: 'Некорректный email' }),
  password: z.string().min(8, { message: 'Минимум 8 символов' }),
});

export default function LoginForm({ className }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (loginData) => {
    userStore.loginInProgress();
    try {
      // @ts-ignore
      const { user } = await authService.login<IUser>(loginData);
      userStore.loginSuccessful(user);
      navigate('/');
    } catch (error) {
      const message = authService.parseMessageError(error as Error);
      console.log('message', message);
      userStore.loginError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className} autoComplete='on'>
      {userStore.isError && <Alert size='md' title={userStore.error} />}
      <FormItem label={'Email'} error={errors.email?.message}>
        <Input
          disabled={userStore.isFetching}
          icon={<IconButton color='primary' size='sm' icon={<FaUser />} />}
          placeholder={'Введите email'}
          error={errors.email?.message}
          type={'email'}
          {...register('email')}
        />
      </FormItem>
      <FormItem label={'Пароль'} error={errors.password?.message}>
        <Input
          disabled={userStore.isFetching}
          icon={<IconButton color='primary' size='sm' icon={<FaLock />} />}
          placeholder={'Введите пароль'}
          error={errors.password?.message}
          type={'password'}
          {...register('password')}
        />
      </FormItem>
      <FormItem>
        <Button isLoading={userStore.isFetching} type={'submit'} label='Войти' />
      </FormItem>
    </form>
  );
}

import { IRoom, roomStore } from '@entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { roomService } from '@shared/api/services';
import { IconButton, Input } from '@shared/ui';
import FormItem from '@shared/ui/form-item/FormItem';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdDone } from 'react-icons/md';
import { z } from 'zod';
import styles from './NewRoomForm.module.css';

type Inputs = {
  title: string;
};

const schema = z.object({
  title: z.string().min(5, { message: 'Минимум 8 символов' }),
});

export default function NewRoomForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (roomData) => {
    roomStore.savingNewRoomOptimistic();
    try {
      const { room } = await roomService.newRoom<IRoom>(roomData);
      roomStore.addingNewRoomSuccess(room);
    } catch (error) {
      roomStore.addingNewRoomError();
    }
  };

  const Icon = () => {
    return (
      <>
        {isValid ? (
          <IconButton onClick={() => handleSubmit(onSubmit)()} color='primary' icon={<MdDone />} />
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} autoComplete='off'>
        <FormItem errorClassName={styles.error} error={errors.title?.message}>
          <Input
            iconAlign='right'
            disabled={roomStore.isFetching}
            icon={<Icon />}
            placeholder={'Введите имя новой комнаты'}
            error={errors.title?.message}
            type={'text'}
            {...register('title')}
          />
        </FormItem>
      </form>
    </>
  );
}

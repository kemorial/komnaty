import { IconButton, Input } from '@shared/ui';

import { IMessage, messageStore, roomStore, userStore } from '@entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { messageService } from '@shared/api/services';
import FormItem from '@shared/ui/form-item/FormItem';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdSend } from 'react-icons/md';
import { z } from 'zod';
import styles from './ChatInput.module.css';

type Inputs = {
  message: string;
};

const schema = z.object({
  message: z.string().min(1, { message: '' }),
});

export default function ChatInput() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    setFocus('message');
  }, [setFocus, messageStore.isOptimisticInProgress]);

  const onSubmit: SubmitHandler<Inputs> = async (message) => {
    const messageDto = { body: message.message, room_id: roomStore.activeRoom?.id };
    const bufMessage = {
      body: message.message,
      author_username: userStore.user?.username,
      author_id: userStore.user?.id,
    };
    messageStore.savingMessageOptimistic(bufMessage as IMessage);
    try {
      reset();
      await messageService.createMessage<IMessage>(messageDto);
    } catch (error) {
      // roomStore.addingNewRoomError();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} autoComplete='off'>
        <FormItem errorClassName={styles.error} error={errors.message?.message}>
          <Input
            inputClassName={styles.input}
            disabled={messageStore.isOptimisticInProgress}
            containerClassName={styles.input_container}
            iconAlign='right'
            size='md'
            icon={
              <IconButton
                onClick={() => handleSubmit(onSubmit)()}
                color='primary'
                icon={<MdSend />}
              />
            }
            placeholder={'Введите сообщение'}
            error={errors.message?.message}
            type={'text'}
            {...register('message')}
          />
        </FormItem>
      </form>
    </>
  );
}

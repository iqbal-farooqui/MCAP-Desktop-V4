import { Button, PasswordInput, Select, Space, TextInput, Modal, Group } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form/lib/use-form'
import { useInputState } from '@mantine/hooks';
import React from 'react'
import { USERS, ROLES } from '../../App.constants';
import generator from 'generate-password-browser';
import PasswordMeter from './PasswordMeter';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAxiosError from '../../hooks/useAxiosError';
import { AxiosError } from 'axios';
import { MCAPResponse } from '../../models/MCAP.model';
import { User } from '../../models/User.model';
import { showNotification } from '@mantine/notifications';

type Props = {
  opened: boolean,
  onClose(): void
}

export default function CreateNewEmployee({ opened, onClose }: Props) {
  const [name, setName] = useInputState('');
  const [email, setEmail] = useInputState('');
  const [role, setRole] = useInputState('');
  const [password, setPassword] = useInputState('');
  const [passwordConfirm, setPasswordConfirm] = useInputState('');

  const axiosPrivate = useAxiosPrivate();
  const axiosError = useAxiosError();

  const handleGeneratePassword = () => {
    const generatedPassword = generator.generate({
      length: 8,
      numbers: true,
      lowercase: true,
      uppercase: true,
      strict: true,
      excludeSimilarCharacters: true,
      symbols: true
    });

    setPassword(generatedPassword);
    setPasswordConfirm(generatedPassword);
  }

  const handleSubmit = async () => {
    clearFields();
    try {
      const response = await axiosPrivate.post(USERS, {
        name, email, role: role.toLowerCase(), password, passwordConfirm
      });
      const responseData = response?.data as MCAPResponse;
      const newUser = responseData.data as User;
      showNotification({
        title: 'Successfully created New User Account',
        message: `A new account for ${newUser.name} has been created.`,
        autoClose: 10000,
        color: 'green'
      });
      onClose();
    } catch (e) {
      axiosError(e as AxiosError);
    }
  }

  const clearFields = () => {
    setName('');
    setEmail('');
    setRole('');
    setPassword('');
    setPasswordConfirm('');
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Create New Account">
        <>
          <TextInput label="Name" placeholder='Employee Name' data-autofocus required value={name} onChange={setName} />
          <Space h="sm" />
          <TextInput label="Email" placeholder='example@gmail.com' required value={email} onChange={setEmail} />
          <Space h="sm" />
          <Select style={{ zIndex: 2 }} data={['Sales', 'Driver', 'Admin', 'Owner']} label="Role" placeholder='Select...' required value={role} onChange={setRole} />
          <Space h="lg" />
          <Button onClick={() => handleGeneratePassword()}>Automatically Create a Password</Button>
          <Space h="xs" />
          <PasswordInput label="Password" placeholder="Enter the New User's password" required value={password} onChange={setPassword}/>
          <Space h="sm" />
          <PasswordInput label="Confirm Password" placeholder="Enter the New User's password again" required value={passwordConfirm} onChange={setPasswordConfirm}/>
          <Space h="lg" />
          <Group position='right'>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Create New Account</Button>
          </Group>
        </>
      </Modal>
  )
}
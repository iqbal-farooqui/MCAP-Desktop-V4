import { Divider, PasswordInput, Space, Title, Text, Button, Checkbox } from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { useModals } from '@mantine/modals'
import { Axios, AxiosError } from 'axios'
import React, { FormEvent, useState } from 'react'
import QBButton from '../../assets/QBButton'
import useAxiosError from '../../hooks/useAxiosError'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import PasswordMeter from '../Profile/PasswordMeter'
import { changePassword, connectToQuickBooks } from './Settings.service'
import useAuth from '../../hooks/useAuth';

type Props = {}

export default function Settings({ }: Props) {
  const [passwordCurrent, setPasswordCurrent] = useInputState('');
  const [password, setPassword] = useInputState('');
  const [passwordConfirm, setPasswordConfirm] = useInputState('');
  const axiosPrivate = useAxiosPrivate();
  const axiosError = useAxiosError();
  const modals = useModals();
  const { auth, setAuth } = useAuth();

  const handleConnectToQuickBooks = async () => {
    try {
      await connectToQuickBooks(axiosPrivate);
    } catch (e) {
      axiosError(e as AxiosError);
    }
  }
  
  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await changePassword(axiosPrivate, auth, setAuth, passwordCurrent, password, passwordConfirm);
      if (response) {
        modals.openModal({
          title: 'Change Password',
          centered: true,
          children: (
            <Text>Your password was changed successfully</Text>
          ),
          closeButtonLabel: 'Ok',
        })
      }
    } catch (e) {
      axiosError(e as AxiosError);
    }
  }

  return (
    <>
      <Title order={1}>Settings</Title>
      <Space h="xl" />
      <>
        <Title order={3}>Connect to QuickBooks</Title>
        <Space h="lg" />
        <Text>To connect to your QuickBooks account, please click the button below</Text>
        <Space h="md" />
        <QBButton onClick={handleConnectToQuickBooks}/>
      </>
      <Space h="md" />
      <Divider size="md" />
      <Space h="md" />
      <>
        <Title order={3}>Change Your Password</Title>
        <Space h="lg" />
        <form onSubmit={(e) => handleChangePassword(e)}>
          <Text>For security reasons, if you enter your current password incorrectly, you will be logged out and will need to log in again (and connect to QuickBooks again if you need it)</Text>
          <Space h="xs" />
          <Checkbox label="I understand" required />
          <Space h="sm" />
          <PasswordInput label="Current Password" placeholder='Enter your old Password' required onChange={setPasswordCurrent} value={passwordCurrent} />
          <Space h="md" />
          <PasswordInput label="New Password" placeholder='Enter your new Password' required onChange={setPassword} value={password} />
          <Space h="md" />
          <PasswordInput label="Confirm Password" placeholder='Enter your new Password again' required onChange={setPasswordConfirm} value={passwordConfirm} />
          <Space h="md" />
          <Button type="submit">Change Password</Button>
        </form>
      </>
    </>
  )
}
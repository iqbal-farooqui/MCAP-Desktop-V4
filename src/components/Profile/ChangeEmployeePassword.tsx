import { Modal, Button, PasswordInput, Space, Group, Text, Alert } from '@mantine/core';
import { AlertTriangle } from 'tabler-icons-react';
import { useInputState } from '@mantine/hooks';
import React from 'react'
import { User } from '../../models/User.model';
import generator from 'generate-password-browser';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAxiosError from '../../hooks/useAxiosError';
import { USERS } from '../../App.constants';
import { MCAPResponse } from '../../models/MCAP.model';
import { AxiosError } from 'axios';
import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';

type Props = {
    user: User;
    opened: boolean;
    setOpened(): void;
}

function ChangeEmployeePassword({ user, opened, setOpened }: Props) {
    const [password, setPassword] = useInputState('');
    const [passwordConfirm, setPasswordConfirm] = useInputState('');

    const axiosPrivate = useAxiosPrivate();
    const axiosError = useAxiosError();
    const modals = useModals();

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
    
    const handleCloseModal = () => {
        setPassword('');
        setPasswordConfirm('');
        setOpened();
    }

    const handleSubmit = async () => {
        setOpened();
        modals.openConfirmModal({
            title: 'Reset Password',
            centered: true,
            children: (
                <>
                    <Text>{`Are you sure you want to reset ${user.name}'s password?`}</Text>
                </>
            ),
            zIndex: 99,
            labels: { confirm: 'Reset Password', cancel: 'Cancel' },
            onCancel: () => {
                handleCloseModal();
                modals.closeAll()
            },
            onConfirm: async () => {
                try {
                    const response = await axiosPrivate.put(`${USERS}/${user._id}`, {
                        password, passwordConfirm
                    });
                    const responseData = response?.data as MCAPResponse;
                    const changedUser = responseData?.data as User;
                    showNotification({
                        title: 'Successfully reset User Password',
                        message: `${changedUser.name}'s password has been reset.`,
                        autoClose: 10000,
                        color: 'green'
                    });
                    handleCloseModal();
                    modals.closeAll();
                } catch (e) {
                    axiosError(e as AxiosError);
                }
            }
        })
    }

    return (
        <Modal opened={opened} onClose={handleCloseModal} centered title="Reset Password">
            <Button onClick={handleGeneratePassword}>Automatically Create a Password</Button>
            <Space h="md" />
            <PasswordInput label="New Password" placeholder='Enter a Password for the User' value={password} onChange={setPassword}  required />
            <Space h="md" />
            <PasswordInput label="Confirm New Password" placeholder='Enter the Password again' value={passwordConfirm} onChange={setPasswordConfirm} required />
            <Space h="lg" />
            <Alert title="Important!" color="orange" icon={<AlertTriangle size={16} />}>
                Remember to give this password to {user.name} so they can log in. It cannot be accessed again after closing this window.
                Otherwise you will need to update the password again.
            </Alert>
            <Space h="lg" />
            <Group position='right'>
                <Button onClick={handleCloseModal} variant="outline">Cancel</Button>
                <Button onClick={handleSubmit}>Reset Password</Button>
            </Group>
        </Modal>
    )
}

export default ChangeEmployeePassword
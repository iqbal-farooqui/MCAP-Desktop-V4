import { Button, Group, Modal, Select, Space, Stack, TextInput, Text } from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { useModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { AxiosError } from 'axios'
import React, { useEffect } from 'react'
import { USERS } from '../../App.constants'
import useAxiosError from '../../hooks/useAxiosError'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { MCAPResponse } from '../../models/MCAP.model'
import { User } from '../../models/User.model'

type Props = {
    opened: boolean,
    setOpened(): void,
    user: User
}

function UpdateEmployee({ opened, setOpened, user }: Props) {
    const [name, setName] = useInputState('');
    const [email, setEmail] = useInputState('');
    const [role, setRole] = useInputState('');

    const axiosPrivate = useAxiosPrivate();
    const axiosError = useAxiosError();
    const modals = useModals();

    useEffect(() => {
        if (user && user.name && user.email && user.role && user._id) {
            setName(user.name);
            setEmail(user.email);
            setRole(parseRole(user.role));
        }
    }, [user]);

    const parseRole = (role: string) => {
        const firstLetter = role.charAt(0).toUpperCase();
        const restRole = role.substring(1);
        return firstLetter + restRole;
    }

    const handleSubmit = async () => {
        setOpened();
        modals.openConfirmModal({
            title: 'Update User Account',
            centered: true,
            children: (
                <>
                    <Text>{`Are you sure you want to update ${user.name}'s account with the following changes?`}</Text>
                    <Space h="lg" />
                    <Stack>
                        <Group>
                            <Text weight={700}>Name:</Text>
                            <Text>{name}</Text>
                        </Group>
                        <Group>
                            <Text weight={700}>Email:</Text>
                            <Text>{email}</Text>
                        </Group>
                        <Group>
                            <Text weight={700}>Role:</Text>
                            <Text>{role}</Text>
                        </Group>
                    </Stack>
                </>
            ),
            zIndex: 99,
            labels: { confirm: 'Update User', cancel: 'Cancel' },
            onCancel: () => modals.closeAll(),
            onConfirm: async () => {
                try {
                    const response = await axiosPrivate.patch(`${USERS}/${user._id}`, {
                        name, email, role: role.toLowerCase()
                    });
                    const responseData = response?.data as MCAPResponse;
                    const updatedUser = responseData?.data as User;
                    showNotification({
                        title: 'Successfully updated User Account',
                        message: `${updatedUser.name}'s account has been updated.`,
                        autoClose: 10000,
                        color: 'green'
                    });
                    modals.closeAll();
                    setOpened();
                } catch (e) {
                    axiosError(e as AxiosError);
                }
            }
        })
    }

    return (
        <Modal opened={opened} onClose={setOpened} title="Update User Account" centered overlayOpacity={0.55}>
            <>
                <TextInput label="Name" placeholder='Enter a Name' value={name} onChange={setName} required />
                <Space h="md" />
                <TextInput label="Email" placeholder='example@gmail.com' value={email} onChange={setEmail} required />
                <Space h="md" />
                <Select label="Role" placeholder="Select..." value={role} onChange={setRole} data={['Sales', 'Driver', 'Admin', 'Owner']} required />
                <Space h="lg" />
                <Group position='right'>
                    <Button onClick={setOpened} variant="outline">Cancel</Button>
                    <Button onClick={handleSubmit}>Update User</Button>
                </Group>
            </>
        </Modal>
    )
}

export default UpdateEmployee
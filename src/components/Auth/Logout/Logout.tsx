import React from 'react'
import { Button, Modal, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../../hooks/useLogout';

type Props = {
    opened: boolean;
    setOpened(): void;
}

function Logout({ opened, setOpened }: Props) {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  }

  return (
      <>
        <Modal centered opened={opened} title="Logout" onClose={() => setOpened()} closeOnClickOutside={false} trapFocus>
          <Text weight={700} size='lg'>Are you sure you want to logout?</Text>
          <Text color="gray">This will log you out of QuickBooks as well</Text>
          <Button fullWidth mt="xl" onClick={() => handleLogout()}>Log Out</Button>
        </Modal>
      </>
  )
}

export default Logout
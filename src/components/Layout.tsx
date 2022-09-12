import { AppShell, Container, Space } from '@mantine/core';
import React from 'react'
import { Outlet, Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar';

type Props = {}

export default function Layout({}: Props) {
  return (
    <AppShell padding="md" navbar={<NavBar />}>
        <Space h="xl" />
        <Container size='lg' px={120}>
          <Outlet />
        </Container>
      </AppShell>  
  )
}
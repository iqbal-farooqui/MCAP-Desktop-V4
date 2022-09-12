import { Space, Divider } from '@mantine/core'
import React from 'react'
import useAuth from '../../hooks/useAuth'
import Employees from './Employees'
import UserProfile from './UserProfile'

type Props = {}

export default function Profile({ }: Props) {
  const { auth } = useAuth();
  return (
    <>
      <UserProfile />
      {(auth?.user?.role === 'owner' || auth?.user?.role === 'admin') && (
        <>
          <Space h="md" />
          <Divider size="md"/>
          <Space h="md" />
          <Employees />
        </>
      ) }
    </>
  )
}
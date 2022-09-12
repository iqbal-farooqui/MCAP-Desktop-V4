import { Space, Title, Text } from '@mantine/core'
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GET_PROFILE } from '../../App.constants';
import useAxiosError from '../../hooks/useAxiosError';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { MCAPResponse } from '../../models/MCAP.model';
import { User } from '../../models/User.model'

type Props = {}

function UserProfile({ }: Props) {
  const initUser: User = {
    email: '',
    name: '',
    role: '',
    _id: ''
  };
  const [user, setUser] = useState(initUser);
  const axiosPrivate = useAxiosPrivate();
  const axiosError = useAxiosError();

  const parseRole = (role: string) => {
    const firstLetter = role.charAt(0).toUpperCase();
    const restRole = role.substring(1);
    return firstLetter + restRole;
  }

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(GET_PROFILE, {
          signal: controller.signal
        });
        const responseData = response?.data as MCAPResponse;
        const userData = responseData?.data as User;
        userData.role = parseRole(userData.role);
        isMounted && setUser(userData)
      } catch (e) {
        axiosError(e as AxiosError);
      }
    }

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])


  return (
    <>
        <Title order={1}>Profile</Title>
        <Space h="sm" />
      <>
        <Text>Name</Text>
        <Title order={3}>{user.name}</Title>
      </>
      <Space h="sm" />
      <>
        <Text>Role</Text>
        <Title order={3}>{user.role}</Title>
      </>
      <Space h="sm" />
      <>
        <Text>Email</Text>
        <Title order={3}>{user.email}</Title>
      </>
      <Space h="sm" />
      <>
        <Text>Account ID</Text>
        <Title order={3}>{user._id}</Title>
      </>
    </>
  )
}

export default UserProfile
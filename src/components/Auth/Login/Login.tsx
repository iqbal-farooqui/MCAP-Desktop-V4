import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
  Space,
  Text
} from '@mantine/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';
import { loginSchema } from './Login.model';
import axios from '../../../api/Axios';
import { LOGIN } from '../../../App.constants';
import { AxiosError } from 'axios';
import { useModals } from '@mantine/modals';
import { MCAPError } from '../../../models/Error.model';
import { MCAPResponse } from '../../../models/MCAP.model';
import AppVersion from '../../AppVersion';

type Props = {}

export function Login() {
  const { setAuth } = useAuth();
  const modals = useModals();
  const emailRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || '/';

  const form = useForm({
    schema: zodResolver(loginSchema),
    initialValues: {
      email: '',
      password: ''
    }
  });

  const handleLogin = async (values: { email: string, password: string }) => {
    try {
      const response = await axios.post(LOGIN, JSON.stringify(values), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      const responseData = response?.data as MCAPResponse;
      // await persistToken(responseData.token);
      // await persistUser(responseData.data.user.name, responseData.data.user.role);
      if (responseData.token) {
        setAuth({ accessToken: responseData.token, user: responseData.data.user });
        navigate(from, { replace: true });
      }
    } catch (e) {
      let modalText = '';
      const err = e as AxiosError;
      if (err.code === AxiosError.ERR_NETWORK) {
        modalText = 'There was a problem connecting to the server. Maybe your internet connection is down?'
      } else {
        const { response } = err;
        const { message } = response?.data as MCAPError;
        modalText = message;
      }
      
      const id = modals.openModal({
        title: 'Login Failed',
        centered: true,
        children: (
          <>
            <Text>{modalText}</Text>
            <Button fullWidth onClick={() => modals.closeModal(id)} mt="md">Ok</Button>
          </>
        )
      })
    }
  }

  return (
      <Container size={420} my={40}>
        <Space h="xl" />
        <Title
            align="center"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
            Login
      </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
          <TextInput label="Email" placeholder="example@gmail.com" required {...form.getInputProps('email')} autoComplete="false" data-autofocus />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" {...form.getInputProps('password')} autoComplete="false" />
          <Group position="right" mt="md">
            {/* <Anchor size="sm" component={Link} to="/forgotPassword">
              Forgot password?
            </Anchor> */}
          </Group>
          <Button fullWidth mt="xl" type='submit'>
            Sign in
          </Button>
        </form>
      </Paper>
      <Space h="lg" /> 
      <AppVersion />
    </Container>
  );
}
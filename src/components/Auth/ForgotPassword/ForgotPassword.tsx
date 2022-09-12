import React from 'react';
import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
    Box,
  Space,
} from '@mantine/core';
import { ArrowLeft } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';
import { forgotPasswordSchema } from './ForgotPassword.model';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

export function ForgotPassword() {
  const { classes } = useStyles();
  const form = useForm({
    schema: zodResolver(forgotPasswordSchema),
    initialValues: {
      email: ''
    }
  });

  return (
      <Container size={460} my={30}>
          <Space h="xl" />
      <Title className={classes.title} align="center">
        Forgot your password?
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Enter your account's email address to notify an administrator
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={form.onSubmit((value) => console.log(value))}>
          <TextInput label="Your email" placeholder="example@gmail.com" required {...form.getInputProps('email')} />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor color="dimmed" size="sm" className={classes.control} component={Link} to="/login">
              <Center inline>
                <ArrowLeft size={12} />
                <Box ml={5}>Back to login page</Box>
              </Center>
            </Anchor>
            <Button className={classes.control} type="submit">Reset password</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
import { Title, Text, Space, Stack, SimpleGrid, Grid, useMantineTheme } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Home.css'
import HomeAction from './HomeAction';
import { homeActionData } from './HomeAction.data';

type Props = {};

function Home({ }: Props) {
  const { auth } = useAuth()
  const navigate = useNavigate();
  const subheading = `What would you like to do?`
  
  
  const theme = useMantineTheme();

  return (
    <Stack>
      <>
        <Title order={1}>{`Welcome, ${auth.user?.name.split(' ')[0]}`}</Title>
        <Text weight={500} size="md">{subheading}</Text>
        <Space h="sm" />
        <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <HomeAction item={homeActionData[0]}/>
            <Grid gutter="md">
              <Grid.Col>
                <HomeAction item={homeActionData[1]}/>
              </Grid.Col>
              <Grid.Col span={6}>
                <HomeAction item={homeActionData[2]}/>
              </Grid.Col>
              <Grid.Col span={6}>
                <HomeAction item={homeActionData[3]}/>
              </Grid.Col>
            </Grid>
          </SimpleGrid>
      </>
    </Stack>
  )
}

export default Home
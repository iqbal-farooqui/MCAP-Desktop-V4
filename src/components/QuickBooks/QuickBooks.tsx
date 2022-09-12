import { Button, Space, Title } from '@mantine/core'
import { AxiosError } from 'axios';
import React from 'react'
import { QUICKBOOKS_INVOICE, QUICKBOOKS_SEARCH } from '../../App.constants';
import useAxiosError from '../../hooks/useAxiosError';
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { MCAPResponse } from '../../models/MCAP.model';
import SearchDocs from './SearchDocs';

type Props = {}

export default function QuickBooks({ }: Props) {
  const axiosPrivate = useAxiosPrivate();
  const axiosError = useAxiosError();

  return (
    <>
      <Title order={1}>QuickBooks</Title>
      <Space h="lg" />
      <SearchDocs />
    </>
  )
}
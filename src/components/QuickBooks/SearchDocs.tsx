import { ActionIcon, Button, Group, Radio, SegmentedControl, Space, Stack, Table, Text, TextInput, Tooltip } from '@mantine/core';
import { useInputState } from '@mantine/hooks'
import { invoke } from '@tauri-apps/api';
import { AxiosError } from 'axios';
import React, { useState } from 'react'
import { Printer } from 'tabler-icons-react';
import { QUICKBOOKS_ESTIMATE, QUICKBOOKS_INVOICE, QUICKBOOKS_PDF, QUICKBOOKS_SEARCH } from '../../App.constants';
import useAxiosError from '../../hooks/useAxiosError';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { MCAPResponse } from '../../models/MCAP.model';
import { QBDocumentResponse, SearchResult } from './QuickBooks.model';

type Props = {}

function SearchDocs({}: Props) {
  const [document, setDocument] = useInputState('Invoice');
  const [docId, setDocId] = useInputState('');
  const [docs, setDocs] = useState([] as SearchResult[]);
  const [showSearchLabel, setShowSearchLabel] = useState(false);
  const [searchDisabled, setSearchDisabled] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const axiosError = useAxiosError();

  const searchDocs = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSearchDisabled(true);
    try {
        const response = await axiosPrivate.post(QUICKBOOKS_SEARCH, { document, docId });
        const responseData = response?.data as MCAPResponse;
        const searchResults = responseData?.data as SearchResult[];
        setDocs(searchResults);
        setShowSearchLabel(true);
    } catch (e) {
        axiosError(e as AxiosError);
    } finally {
        setSearchDisabled(false);
    }
  }

  const handleOpenDoc = async (type: 'Invoice' | 'Estimate', id: string) => {
    try {
        const response = await axiosPrivate.post(QUICKBOOKS_PDF, { document: type, docId: id });
        const responseData = response?.data as MCAPResponse;
        const qbDocument = responseData?.data as QBDocumentResponse;
        await invoke('print_qb_doc', {
            pdfBuffer: qbDocument.pdfBuffer.data,
            barcodeId: qbDocument.barcodeId,
            software: qbDocument.software,
            docType: qbDocument.docType
        });
    } catch (e) {
        axiosError(e as AxiosError);
    }
  }

  const renderDocResults = () => {
    if (docs.length > 0) {
        const rows = docs.map(doc => (
            <tr key={doc.id}>
                <td>{doc.docId}</td>
                <td>{doc.date}</td>
                <td>{doc.total}</td>
                <td>{doc.balance}</td>
                <td>{doc.type}</td>
                <td>
                    <Tooltip label="Print Document" withArrow>
                        <ActionIcon color="blue" onClick={() => handleOpenDoc(doc.type, doc.id)}>
                            <Printer size={24}/>
                        </ActionIcon>
                    </Tooltip>
                </td>
            </tr>
        ));
        return (
            <Table highlightOnHover>
                <thead>
                    <tr>
                        <th>Document ID</th>
                        <th>Date (YMD)</th>
                        <th>Total</th>
                        <th>Balance</th>
                        <th>Type</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        )
    } else return null;
  }
  
  return (
    <>
        <form onSubmit={(e) => searchDocs(e)}>
            <Group position='apart'>
                <Stack>
                    <SegmentedControl value={document} onChange={setDocument} color="blue" data={[
                        { label: 'Invoice', value: 'Invoice'},
                        { label: 'Estimate', value: 'Estimate' }
                    ]} />
                    <TextInput label='Document ID' placeholder='Enter Document ID' value={docId} onChange={setDocId} required />
                </Stack>
                <Button type="submit" disabled={searchDisabled}>Search Documents</Button>
            </Group>
        </form>

        <Space h="xl" />

        {showSearchLabel && <Text weight={700}>{`Found ${docs.length} ${docs.length != 1 ? `results` : `result`}`}</Text>}
        <Space h="sm" />

        {renderDocResults()}
    </>
  )
}

export default SearchDocs
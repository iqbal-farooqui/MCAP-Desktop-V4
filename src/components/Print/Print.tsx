import { Space, Title, Text, Group, Button, createStyles, Paper, Table, Tooltip, ActionIcon } from '@mantine/core';
import { Eye, FilePlus, Trash } from 'tabler-icons-react';
import React, { useEffect, useState } from 'react'
import openFilePicker, { addBarcode, getBarcodeIds } from './FilePicker.service';
import { MCAPBuffer } from './Print.model';
import useAxiosError from '../../hooks/useAxiosError';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { AxiosError } from 'axios';
import { getPrinters } from 'pdf-to-printer';
import { invoke } from '@tauri-apps/api';
import FileForm from './FileForm';

type Props = {}

const useStyles = createStyles((theme) => ({
  paper: {
    overflowX: 'auto'
  }
}));

export default function Print({ }: Props) {
  const { classes } = useStyles();
  const axiosPrivate = useAxiosPrivate();
  const axiosError = useAxiosError();
  const [file, setFile] = useState({} as MCAPBuffer);
  const [isLoading, setIsLoading] = useState(false);

  const viewDocumentLabel = "View Document";

  async function handleAddDocuments() {
    try {
      let file = await openFilePicker();
      file = await getBarcodeIds(file, setIsLoading, axiosPrivate);
      if (file.software === 'QuickBooks') await addBarcode(file);
      setFile(file);
    } catch (e) {
      const err = e as AxiosError;
      axiosError(err);
    }
    finally {
      setIsLoading(false);
    }
  }

  function renderFilePaper() {
    if (file.path) {
      return (
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>Software</th>
              <th>Document</th>
              <th>ID</th>
              <th>Path</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderFileList()}</tbody>
        </Table>
      )
    } else return <Text align='center'>Please select a document...</Text>
  }

  function renderFileList() {
    console.log(file);
    return (
      <tr>
        <td>{file.software}</td>
        <td>{file.type}</td>
        <td>{file.docId}</td>
        <td>{file.path}</td>
        <td>
          <Group spacing={0} position="right">
            <Tooltip label={viewDocumentLabel} withArrow>
                <ActionIcon>
                    <Eye size={16} />
                </ActionIcon>
            </Tooltip>
            <Tooltip label="Remove" withArrow>
                <ActionIcon color="red" onClick={() => setFile({})}>
                    <Trash size={16} />
                </ActionIcon>
            </Tooltip>
          </Group>
        </td>
      </tr>
    )
  }

  async function openDoc() {
    await invoke('open_doc', { path: file.path, software: file.software, docType: file.type, id: file.docId });
  }

  function isFileCoreTruthy(): boolean {
    if (file && file.barcodeId && file.docId && file.path && file.software && file.type && file.buffer) return true;
    else return false;
  }

  function renderFilePrintInfo() {
    if (isFileCoreTruthy()) {
      return (
        <>
          <Group position='apart'>
            <div>
              <Title order={5}>You selected {`${file.software} ${file.type} ${file.docId} (barcode will be ${file.barcodeId})`}</Title>
              <Text>{file.path}</Text>
            </div>
            <Button onClick={() => openDoc()}>Print PDF</Button>
          </Group>
          <Space h="xl" />
        </>
      )
    }
  }

  function renderFileForm() {
    if (!isFileCoreTruthy()) {
      return (
        <Text align='center'>Select a Document...</Text>
      )
    } else return (
      <>
        <Title order={4}>Please confirm if the document information is correct before printing</Title>
        <Space h="lg" />
        {file.meta && <FileForm doc={file.meta} />}
      </>
    )
  }


  return (
    <>
      <Title order={1}>Print</Title>
      <Space h="xl" />
      <Button fullWidth leftIcon={<FilePlus size={24} />} size="md" radius="md" onClick={handleAddDocuments}>Select Document</Button>
      <Space h="xl" />
      {renderFilePrintInfo()}
      <Paper withBorder p="md" radius="md" className={classes.paper}>
        {renderFileForm()}
      </Paper>
    </>
  )
}
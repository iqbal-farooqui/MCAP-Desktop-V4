import React from 'react'
import { Document, FinancialData, Part } from './Print.model'
import { Group, NumberInput, Space, Table, Text, TextInput, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

type Props = {
    doc: Document
}

function FileForm({ doc }: Props) {
    const renderArray = (arr: string[] | undefined, type?: string, withSpaces = true) => {
        if (arr && arr.length > 0) {
            return (
            arr.map((line, index) => {
                if (index === 0 && type) {
                    return (
                        <>
                            <TextInput label={type} value={line} placeholder={`Address Line ${index + 1}`} />
                            {withSpaces && <Space h="xs" />}
                        </>
                    )
                } else return (
                    <>
                        <TextInput value={line} placeholder={`Address Line ${index + 1}`} />
                        {withSpaces && <Space h="xs" />}
                    </>
                )
            })
        )
        }
    }

    const renderDate = (date: Date | undefined, label: 'Date' | 'Due Date') => {
        if (date) {
            return <DatePicker label={label} placeholder={`Pick a ${label}`} value={new Date(date)} />
        }
    }

    const renderTextFormField = (field: string | undefined, label?: string, placeholder?: string) => {
        if (field) {
            return <TextInput label={label} placeholder={placeholder} value={field} />
        }
    }

    const renderPartsTable = () => {
        if (doc.parts && doc.parts.length > 0) {
            const rows = renderPartsTableRows(doc.parts);
            return (
                <>
                    <Space h="md" />
                    <Title order={4}>Parts</Title>
                    <Space h="sm"/>
                    <Table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Rate</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                    <Space h="xs"/>
                </>
            )
        }
    }

    const convertFinanceToInput = (financialData: FinancialData | undefined, label?: string, placeholder?: string) => {
        if (financialData && financialData.$numberDecimal) {
            return <NumberInput value={parseFloat(financialData.$numberDecimal)} label={label} placeholder={placeholder} precision={2} step={0.01} parser={(value) => value!.replace(/\$\s?|(,*)/g, '')} formatter={
                        (value) =>
                        !Number.isNaN(parseFloat(value!))
                            ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            : '$ '
                    } />
        }
    }

    const renderNumberInput = (int: boolean, num: string | undefined, label?: string, placeholder?: string) => {
        if (num) {
            const numAsNum = int ? parseInt(num) : parseFloat(num);
            return <NumberInput value={numAsNum} placeholder={placeholder} label={label} parser={(value) => value!.replace(/\$\s?|(,*)/g, '')} />
        }
    }

    const renderPartsTableRows = (parts: Part[]) => {
        return parts.map(part => (
            <tr key={part.item}>
                <td>{renderTextFormField(part.item)}</td>
                <td>{renderArray(part.description, undefined, false)}</td>
                <td>{renderNumberInput(true, part.quantity)}</td>
                <td>{convertFinanceToInput(part.rate)}</td>
                <td>{convertFinanceToInput(part.amount)}</td>
            </tr>
        ))
    }

    const renderMoney = () => {
        const rows: JSX.Element[] = [];

        if (doc.subtotal) {
            const item = convertFinanceToInput(doc.subtotal, 'Subtotal', 'Enter Subtotal');
            if (item) rows.push((
                <>
                    {item}
                    <Space h="xs" />
                </>
            ));
        }

        if (doc.hst) {
            const item = convertFinanceToInput(doc.hst, 'HST', 'Enter HST');
            if (item) rows.push((
                <>
                    {item}
                    <Space h="xs" />
                </>
            ));
        }

        if (doc.tax2) {
            const item = convertFinanceToInput(doc.tax2, 'Tax 2', 'Enter Tax 2');
            if (item) rows.push((
                <>
                    {item}
                    <Space h="xs" />
                </>
            ));
        }

        if (doc.total) {
            const item = convertFinanceToInput(doc.total, 'Total', 'Enter Total');
            if (item) rows.push((
                <>
                    {item}
                    <Space h="xs" />
                </>
            ));
        }

        if (doc.deposit) {
            const item = convertFinanceToInput(doc.deposit, 'Deposit', 'Enter Deposit');
            if (item) rows.push((
                <>
                    {item}
                    <Space h="xs" />
                </>
            ));
        }

        if (doc.payment) {
            const item = convertFinanceToInput(doc.payment, 'Payment', 'Enter Payment');
            if (item) rows.push((
                <>
                    {item}
                    <Space h="xs" />
                </>
            ));
        }

        if (doc.balanceDue) {
            const item = convertFinanceToInput(doc.balanceDue, 'Balance Due', 'Enter Balance Due');
            if (item) rows.push((
                <>
                    {item}
                    <Space h="xs" />
                </>
            ));
        }

        return (
            <>
                <Space h="md" />
                {rows}
            </>
            
        )

    }

  return (
    <form>
          <>
            <Group>
                <div>{renderArray(doc.billTo, 'Bill To')}</div>
                <div>{renderArray(doc.shipTo, 'Ship To')}</div>
            </Group>
            <Group>
                <div>{renderDate(doc.date, 'Date')}</div>
                <div>{renderDate(doc.dueDate, 'Due Date')}</div>
                <div>{renderTextFormField(doc.terms, 'Terms', 'Enter Terms')}</div>
                <div>{renderTextFormField(doc.salesman, 'Salesman', 'Enter a Name')}</div>
                <div>{renderTextFormField(doc.source, 'Source', 'Enter a Source')}</div>
            </Group>
            {renderPartsTable()}
            {renderMoney()}
          </>
    </form>
  )
} 

export default FileForm
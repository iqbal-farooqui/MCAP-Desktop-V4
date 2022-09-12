import { DefaultMantineColor } from '@mantine/core';
import { Printer, AddressBook, UserCircle, Settings, Icon } from 'tabler-icons-react';
import { Route } from '../../App.routes';

export interface HomeActionData {
  caption: string,
  icon: Icon,
  color: DefaultMantineColor,
  url: Route
}

export const homeActionData: HomeActionData[] = [
    {
        caption: 'Print a Document saved on your Computer',
        icon: Printer,
        color: 'blue',
        url: '/print'
    },
    {
        caption: 'Print from QuickBooks',
        icon: AddressBook,
        color: 'green',
        url: '/quickbooks'
    },
    {
        caption: 'View Profile',
        icon: UserCircle,
        color: 'red',
        url: '/profile'
    },
    {
        caption: 'Settings',
        icon: Settings,
        color: 'orange',
        url: '/settings'
    }
  ]
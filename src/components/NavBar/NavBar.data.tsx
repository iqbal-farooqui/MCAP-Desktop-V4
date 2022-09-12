import { AddressBook, Icon, Logout, Printer, Settings, UserCircle } from "tabler-icons-react";
import { Route } from "../../App.routes";

interface NavBarItem {
    icon: Icon;
    label: string;
    url: Route;
}

export const navBarMainItems: NavBarItem[] = [
    {
        icon: Printer,
        label: 'Print a Document from your Computer',
        url: '/print'
    },
    {
        icon: AddressBook,
        label: 'Print from QuickBooks',
        url: '/quickbooks'
    },
    {
        icon: UserCircle,
        label: 'Profile',
        url: '/profile'
    },
    {
        icon: Settings,
        label: 'Settings',
        url: '/settings'
    }
];

export const navBarFooterItems: NavBarItem[] = [
    {
        icon: Logout,
        label: 'Logout',
        url: '/login'
    }
]
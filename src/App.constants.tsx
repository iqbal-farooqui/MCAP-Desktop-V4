export const ROLES = [
    'Sales',
    'Driver',
    'Administrator',
    'Owner'
] as const

export const BASE_URL = {
    DEV: 'http://localhost:8000',
    PROD: 'https://www.google.com'
}
export const CSRF = '/csrf';
export const USERS = '/users';
export const LOGIN = '/users/login';
export const LOGOUT = '/users/logout';
export const REFRESH = '/users/refresh';
export const SEND_PDF = '/scans/pdf';
export const GET_PROFILE = '/profile';
export const CHANGE_OWN_PASSWORD = '/profile/updateMyPassword';
export const QUICKBOOKS_SEARCH = '/quickbooks/search';
export const QUICKBOOKS_PDF = '/quickbooks/pdf';
export const QUICKBOOKS_INVOICE = '/quickbooks/invoice';
export const QUICKBOOKS_ESTIMATE = '/quickbooks/estimate';

export const passwordRequirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];
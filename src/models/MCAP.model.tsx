export interface MCAPResponse {
    status: 'success' | 'fail';
    token?: string;
    data?: any
}
export interface MCAPError {
    status: string;
    message: string;
    stack?: string;
    error?: MCAPErrorSummary
}

interface MCAPErrorSummary {
    statusCode: number,
    status: string,
    isOperational: boolean,
    code?: string
}
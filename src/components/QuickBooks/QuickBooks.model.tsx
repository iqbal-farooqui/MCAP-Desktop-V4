export interface SearchResult {
    id: string;
    docId: string;
    date: string;
    total: number;
    balance: number;
    type: 'Invoice' | 'Estimate';
}

export interface QBDocumentResponse {
    barcodeId: string;
    pdfBuffer: any;
    software: string;
    docType: string;
}
export interface MCAPBuffer {
    path?: string;
    buffer?: Uint8Array;
    barcodeId?: string;
    docId?: string;
    type?: string;
    software?: string;
    meta?: Document;
}

export interface Document {
    barcodeId?: string,
    docId?: string,
    type?: string,
    software?: string,
    billTo?: string[],
    shipTo?: string[],
    id?: string,
    date?: Date,
    dueDate?: Date,
    terms?: string,
    salesman?: string,
    source?: string,
    paymentMethod?: string,
    parts?: Part[],
    subtotal?: FinancialData,
    hst?: FinancialData,
    tax2?: FinancialData,
    total?: FinancialData,
    deposit?: FinancialData,
    payment?: FinancialData,
    balanceDue?: FinancialData,
}

export interface Part { 
    item?: string,
    quantity?: string,
    description?: string[],
    rate?: FinancialData,
    amount?: FinancialData,
}

export interface FinancialData {
    $numberDecimal: string
}
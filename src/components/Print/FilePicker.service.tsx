import { invoke } from '@tauri-apps/api';
import { open } from '@tauri-apps/api/dialog';
import { documentDir } from '@tauri-apps/api/path';
import { AxiosInstance } from 'axios';
import { SEND_PDF } from '../../App.constants';
import { MCAPResponse } from '../../models/MCAP.model';
import { MCAPBuffer } from './Print.model';

export const openFilePicker = async (): Promise<MCAPBuffer> => {
    const selectedFile = await open({
        directory: false,
        multiple: false,
        defaultPath: await documentDir()
    }) as string;
    
    return await invoke('retrieve_buffer', { path: selectedFile }) as MCAPBuffer;
}

export const getBarcodeIds = async (fileData: MCAPBuffer, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, axios: AxiosInstance): Promise<MCAPBuffer> => {
    setIsLoading(true);
    
    const response = await axios.post(SEND_PDF, JSON.stringify({ mcapBuffer: { path: fileData.path, buffer: fileData.buffer }}));
    return (response?.data as MCAPResponse).data as MCAPBuffer;
}

export const addBarcode = async (file: MCAPBuffer): Promise<void> => {
    await invoke('add_barcode', {
        path: file.path,
        barcodeId: file.barcodeId
    }) as void;
} 

export default openFilePicker; 
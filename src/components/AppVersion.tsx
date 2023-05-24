import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Text } from '@mantine/core';

type Props = {};

function AppVersion({ }: Props) {
    const [version, setVersion] = useState('');

    const fetchVersion = async () => {
        const version = await invoke<string>('get_version');
        setVersion(version);
    };

    useEffect(() => {
        fetchVersion()
    }, []);

    return (
        <Text>App Version: {version}</Text>
    )
}

export default AppVersion;
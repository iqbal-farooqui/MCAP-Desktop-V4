import { Box, Center, Text } from '@mantine/core';
import React from 'react'
import { Check, X } from 'tabler-icons-react';

type Props = {
    meets: boolean,
    label: string
}

function PasswordRequirement({ meets, label }: Props) {
  return (
    <Text color={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        {meets ? <Check size={14} /> : <X size={14} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

export default PasswordRequirement
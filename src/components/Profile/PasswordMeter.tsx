import { Group, PasswordInput, Progress } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import React from 'react'
import { passwordRequirements } from '../../App.constants';
import PasswordRequirement from './PasswordRequirement';

type Props = {
    placeholder: string
}

function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    passwordRequirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
        multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (passwordRequirements.length + 1)) * multiplier, 0);
}

function PasswordMeter({ placeholder }: Props) {
    const [value, setValue] = useInputState('');
    const strength = getStrength(value);
    const checks = passwordRequirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
    ));
    const bars = Array(4)
        .fill(0)
        .map((_, index) => (
            <Progress
                styles={{ bar: { transitionDuration: '0ms' } }}
                value={
                value.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
                }
                color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
                key={index}
                size={4}
            />
        ));
    
  return (
    <div>
      <PasswordInput
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        label="Password"
        required
      />

      <Group spacing={5} grow mt="xs" mb="md">
        {bars}
      </Group>

      <PasswordRequirement label="Has at least 8 characters" meets={value.length > 7} />
      {checks}
    </div>
  );
}

export default PasswordMeter
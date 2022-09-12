import { UnstyledButton, Text, createStyles, Title } from '@mantine/core'
import React from 'react'
import { HomeActionData } from "./HomeAction.data";
import { Link } from 'react-router-dom';

type Props = {
    item: HomeActionData
}

const useStyles = createStyles(theme => ({
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: theme.radius.md,
        transition: 'box-shadow 150ms ease, transform 100ms ease',
        width: '100%',
        minHeight: '100%',
        padding: '20px',
        fontSize: '20px',

        '&:hover': {
            boxShadow: `${theme.shadows.md} !important`,
            transform: 'scale(1.05)',
        }
    }
}));

export default function HomeAction({ item }: Props) {
    const { classes, theme } = useStyles();

  return (
      <Link to={item.url} style={{ textDecoration: 'none' }}>
        <UnstyledButton key={item.caption} className={classes.item} style={{ backgroundColor: theme.colors[item.color][6] }}>
            <item.icon size={50} color='white'/>
            <Text size='lg' weight={500} mt={7} align='center' color='white'>{item.caption}</Text>
        </UnstyledButton>
      </Link>
  )
}
import { createStyles, Tooltip, UnstyledButton } from '@mantine/core';
import { Link } from 'react-router-dom';
import React from 'react'
import { Icon } from 'tabler-icons-react'

type Props = {
  icon: Icon;
  url: string;
  label: string;
  active?: boolean;
  onClick?(): void;
}

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.white,
    opacity: 0.85,

    '&:hover': {
      opacity: 1,
      backgroundColor: theme.colors[theme.primaryColor][5],
    },
  },

  active: {
    opacity: 1,
    '&, &:hover': {
      backgroundColor: theme.colors[theme.primaryColor][7],
    },
  },
}));

function NavbarLink({ icon: Icon, label, active, url, onClick }: Props) {
    const { classes, cx } = useStyles();

    return (
        <Tooltip label={label} position="right" withArrow transitionDuration={0}>
          <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
            <Icon />
          </UnstyledButton>
        </Tooltip>
    );
}

export default NavbarLink
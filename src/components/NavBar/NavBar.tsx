import { Navbar, Center, Group, createStyles, Space, Image } from '@mantine/core';
import { useState } from 'react'
import NavbarLink from './NavBarLink';
import { navBarMainItems, navBarFooterItems } from './NavBar.data';
import MCAPLogo from '../../assets/MCAPLogo';
import Logout from '../Auth/Logout/Logout';
import { Link } from 'react-router-dom';

type Props = {}

const useNavbarStyles = createStyles((theme) => ({
  navbar: {
        backgroundColor: theme.colors[theme.primaryColor][6],
        position: 'fixed',
        zIndex: 1,
        top: 0,
        left: 0,
        overflowX: 'hidden'
  },
}));

export default function NavBar({}: Props) {
    const [mainActive, setMainActive] = useState(-1);
    const [footerActive, setFooterActive] = useState(-1);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const { classes } = useNavbarStyles();

    function handleMainClick(index: number) {
        setMainActive(index);

    }

    function handleLogoutClick(index: number) {
        setFooterActive(index);
        setIsLogoutOpen(true);
    }

    function handleCloseLogoutModalClick() {
        setFooterActive(-1);
        setIsLogoutOpen(false);
    }

    const mainLinks = navBarMainItems.map((link, index) => (
        <Link to={link.url} style={{ textDecoration: 'none' }} key={link.url}>
            <NavbarLink {...link} url={link.url} active={index === mainActive} onClick={() => setMainActive(index)} />
        </Link>
    ));

    const footerLinks = navBarFooterItems.map((link, index) => (
        <NavbarLink {...link} key={link.label} active={index === footerActive} onClick={() => handleLogoutClick(index)} />
    ));

  return (
      <Navbar height='100vh' width={{ base: 80 }} className={classes.navbar}>
          <Link to="/" onClick={() => setMainActive(-1)}>
              <Center>
              <MCAPLogo />
          </Center>
          </Link>
          <Navbar.Section grow mt={50}>
              <Group direction="column" align="center" spacing={0}>
                  {mainLinks}
              </Group>
          </Navbar.Section>
          <Navbar.Section>
              <Group direction='column' align="center" spacing={0}>
                  {footerLinks}
              </Group>
              <Logout opened={isLogoutOpen} setOpened={handleCloseLogoutModalClick} />
              <Space h="sm" />
          </Navbar.Section>
    </Navbar>
  )
}
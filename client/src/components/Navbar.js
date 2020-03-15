import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery, useTheme } from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
// import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';

import AuthDialog from './AuthDialog';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center'
  },
  rootSmall: {
    justifyContent: 'unset',
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    width: '64px'
  },
  logoSmall: {
    width: '56px',
    transform: 'translate(-50%, 0%)',
    '-moz-transform': 'translate(-50%, 0%)',
    left: '50%',
    top: '0',
    position: 'absolute'
  },
  list: {
    width: 250
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  loginButton: {
    marginRight: theme.spacing(1)
  },
}));

function Navbar() {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)
  // const [desktop, setDesktop] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [signUpDialogOpen, setSignUpDialogOpen] = useState(false)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const toggleDrawer = isOpen => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    
    setDrawerOpen(isOpen)
  }

  const handleSignUpDialogOpen = () => {
    setSignUpDialogOpen(true)
  }

  const handleSignUpDialogClose = () => {
    setSignUpDialogOpen(false)
  }

  const handleLoginDialogOpen = () => {
    setLoginDialogOpen(true)
  }

  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false)
  }

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {
        !isAuthenticated &&
        <div className="drawer-auth-links">
          <span className="drawer-auth-btn" onClick={(e) => {
            toggleDrawer(false)(e)
            handleLoginDialogOpen()
          }}>
            LOGIN
          </span>
          &nbsp;
          /
          &nbsp;
          <span className="drawer-auth-btn" onClick={(e) => {
            toggleDrawer(false)(e)
            handleSignUpDialogOpen()
          }}>
            SIGN UP
          </span>
        </div>
      }
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <React.Fragment>
      <AppBar color="inherit" position="static">
        <Toolbar>
          <Container classes={{ root: smallScreen ? classes.rootSmall : classes.root }}>
            <Box display={{ xs: 'block', sm: 'none' }}>
              <IconButton edge="start"
                onClick={toggleDrawer(true)}
                className={classes.menuButton}
                color="inherit" aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Link to="/">
              <img className={smallScreen ? classes.logoSmall : classes.logo} src="/img/logo.png" />
            </Link>
            {
              !isAuthenticated &&
              <Box display={{ xs: 'none', sm: 'flex' }}>
                <Button className={classes.loginButton} onClick={handleLoginDialogOpen}
                  variant="outlined" color="inherit">
                  Login
                </Button>
                <Button onClick={handleSignUpDialogOpen} variant="contained" color="primary">
                  Sign Up
                </Button>
              </Box>
            }
          </Container>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        {sideList()}
      </Drawer>
      <AuthDialog open={signUpDialogOpen}
        authType={'signup'} handleClose={handleSignUpDialogClose}
      />
      <AuthDialog open={loginDialogOpen}
        authType={'login'} handleClose={handleLoginDialogClose}
      />
    </React.Fragment>
  )
}

export default Navbar

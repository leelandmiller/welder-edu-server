import React from 'react'
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { withStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
// import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const titleStyles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    borderBottom: '1px solid #ececec'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const dialogStyles = theme => ({
  paper: {
    width: '380px'
  },
  paperSmall: {
    width: '100%',
    height: '480px',
    alignSelf: 'flex-start'
  },
  contentRoot: {
    paddingTop: '24px'
  },
  fbButtonRoot: {
    width: '100%',
    textTransform: 'none',
    color: 'white',
    backgroundColor: '#1778f2',
    '&:hover': {
      backgroundColor: '#1778f2'
    }
  },
  fbButtonIc: {
    width: '24px'
  },
  fbButtonText: {
    marginLeft: '8px'
  }
})

const DialogTitle = withStyles(titleStyles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const AuthDialog = withStyles(dialogStyles)(props => {
  const { classes, handleClose, open, authType } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const fbClick = `${API_URL}/auth/facebook`

  const MyDialogContent = type => (
    <React.Fragment>
      <DialogTitle id="alert-dialog-slide-title" onClose={handleClose}>
        {
          type === 'signup' ?
            'Sign Up & Start Learning!' :
            'Log In to Your Account!'
        }
      </DialogTitle>
      <DialogContent classes={{ root: classes.contentRoot }}>
        <DialogContentText id="alert-dialog-slide-description">
          <Button href={fbClick} classes={{ root: classes.fbButtonRoot }}>
            <img className={classes.fbButtonIc} src="/img/f_logo_RGB-White_250.png" />
            <span className={classes.fbButtonText}>Continue with Facebook</span>
          </Button>
        </DialogContentText>
      </DialogContent>
    </React.Fragment>
  )

  return (
    <div>
      <Dialog fullScreen={fullScreen}
        classes={{
          paper: fullScreen ? classes.paperSmall : classes.paper
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted maxWidth="xs"
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <MyDialogContent type={authType}/>
        {/* {
          authType === 'signup' ?
            <SignUpDialogContent/> :
            <LoginDialogContent/>
        } */}
      </Dialog>
    </div>
  )
});

export default AuthDialog

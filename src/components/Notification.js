import { makeStyles, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
  root: {
    top: theme.spacing(9)
  }
}))

export default function Notification({ notify, setNotify }) {

  const classes = useStyles()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false
    })
  }

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      className={classes.root}
      onClose={handleClose}
    >
      <Alert
        severity={notify.type}
        onClose={handleClose}
      >
        {notify.message}
      </Alert>
    </Snackbar>
  )
}

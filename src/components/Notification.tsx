import { makeStyles, Snackbar, SnackbarCloseReason } from "@material-ui/core";
import { Alert, Color } from "@material-ui/lab";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(9),
  },
}));



type PropsType = {
  notify: NotifyType
  setNotify: SetNotifyType 
}

type NotifyType = {
  isOpen: boolean;
  message: string;
  type: Color;
}

type SetNotifyType = Dispatch<SetStateAction<{
  isOpen: boolean;
  message: string;
  type: Color;
}>>


export default function Notification({ notify, setNotify }: PropsType) {
  const classes = useStyles();

  const handleClose = (
    event: SyntheticEvent<Element, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      className={classes.root}
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}

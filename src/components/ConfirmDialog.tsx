import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography } from "@material-ui/core";
import { NotListedLocation } from "@material-ui/icons";
import { ConfirmDialogType } from "../pages/employees/Employees";
import { Controls } from "./controls/Controls";

const useStyles = makeStyles(theme => ({
  dialog: {
    position: 'absolute',
    top: theme.spacing(5),
    padding: theme.spacing(2)
  },
  dialogContent: {
    textAlign: 'center'
  },
  dialogTitle: {
    textAlign: 'center'
  },
  dialogActions: {
    justifyContent: 'center'
  },
  titleIcon: {
    '& .MuiSvgIcon-root': {
      fontSize: '8rem'
    }
  }
}))

type PropsType = {
  confirmDialog: ConfirmDialogType
  setConfirmDialog: (x: ConfirmDialogType) => void
}

export default function ConfirmDialog({ confirmDialog, setConfirmDialog }: PropsType) {

  const classes = useStyles()

  return (
    <Dialog
      open={confirmDialog.isOpen}
      classes={{ paper: classes.dialog }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <IconButton className={classes.titleIcon} disableFocusRipple>
          <NotListedLocation />
        </IconButton>
      </DialogTitle>
      <DialogContent
        className={classes.dialogContent}
      >
        <Typography variant="h6">
          {confirmDialog.title}
        </Typography>
        <Typography variant="subtitle2">
          {confirmDialog.subtitle}
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Controls.Button
          text="No"
          color="default"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <Controls.Button
          text="Yes"
          color="secondary"
          onClick={() => { confirmDialog.onConfirm() }}
        />
      </DialogActions>
    </Dialog>
  )
}

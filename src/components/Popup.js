import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from "@material-ui/core";
import { Controls } from "./controls/Controls";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5)
  }
}))

export default function Popup({ title, children, openPopup, setOpenPopup }) {
  const classes = useStyles()
  return (
    <Dialog dividers maxWidth="md" classes={{ paper: classes.dialogWrapper }} open={openPopup}>
      <DialogTitle>
        <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">{title}</Typography>
          <Controls.ActionButton
            color="primary"
            onClick={() => setOpenPopup(false)}
          >
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent >
        {children}
      </DialogContent>
    </Dialog>
  )
}

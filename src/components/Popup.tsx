import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { Controls } from "./controls/Controls";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
}));

type PropsType = {
  title: string;
  children?: React.ReactNode;
  openPopup: boolean;
  setOpenPopup: (arg0: boolean) => void;
};

export default function Popup({
  title,
  children,
  openPopup,
  setOpenPopup,
}: PropsType) {
  const classes = useStyles();
  return (
    <Dialog
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
      open={openPopup}
    >
      <DialogTitle>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Controls.ActionButton
            color="primary"
            onClick={() => setOpenPopup(false)}
          >
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <Divider className={classes.divider} />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

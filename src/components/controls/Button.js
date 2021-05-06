import { Button as MuiButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1)
  },
}))

export default function Button({ variant = "contained", color = "primary", size = "large", text, onClick, ...other }) {
  const classes = useStyles()
  return (
    <MuiButton
      classes={{ root: classes.root }}
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      {...other}
    >{text}</MuiButton>
  )
}

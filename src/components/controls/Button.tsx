import { Button as MuiButton, ButtonProps, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1)
  },
}))

type PropsType = ButtonProps & {
  onClick?: () => void
  text: string
}
export default function Button({ variant = "contained", color = "primary", size = "large", text, onClick, ...other }: PropsType) {
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

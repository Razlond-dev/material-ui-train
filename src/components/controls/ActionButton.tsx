import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5)
  },
  secondary: {
    backgroundColor: theme.palette.secondary.light,
    '& .MuiButton-label': {
      color: theme.palette.secondary.main
    }
  },
  primary: {
    backgroundColor: theme.palette.primary.light,
    '& .MuiButton-label': {
      color: theme.palette.primary.main,
    }
  },
}))

type PropsType = {
  color: "root" | "secondary" | "primary"
  children: React.ReactNode
  onClick: () => void
}

export default function ActionButton({ color, children, onClick }: PropsType) {
  const classes = useStyles()
  return (
    <Button
      className={`${classes.root} ${classes[color]}`}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

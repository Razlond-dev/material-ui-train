import { Card, makeStyles, Paper, Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#fdfdff"
  },
  pageHeader: {
    padding: theme.spacing(4),
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  pageIcon: {
    display: 'inline-block',
    padding: theme.spacing(2),
    color: '#3cc441b'
  },
  pageTitle: {
    paddingLeft: theme.spacing(4)
  },
  pageTitle__title: {
    opacity: '0.6'
  }
}))

const PageHeader = ({ icon, title, subtitle }) => {
  const classes = useStyles()
  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>
          {icon}
        </Card>
        <div className={classes.pageTitle}>
          <Typography

            variant="h6"
            component="div"
          >{title}</Typography>
          <Typography
            className={classes.pageTitle__title}
            variant="subtitle2"
            component="div"
          >{subtitle}</Typography>
        </div>
      </div>
    </Paper>
  )
}

export default PageHeader
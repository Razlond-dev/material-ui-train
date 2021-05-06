import PageHeader from "../../components/PageHeader"
import EmployeeForm from "./EmployeeForm"
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  }
}))

const Employees = () => {
  const classes = useStyles()
  return (
    <>
      <PageHeader
        title="New Employee"
        subtitle="Form design with validation"
        icon={<AccountBalanceIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <EmployeeForm />
      </Paper>
    </>
  )
}

export default Employees
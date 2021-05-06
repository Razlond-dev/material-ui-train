import PageHeader from "../../components/PageHeader"
import EmployeeForm from "./EmployeeForm"
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';



const Employees = () => {
  return (
    <>
      <PageHeader
        title="New Employee"
        subtitle="Form design with validation"
        icon={<AccountBalanceIcon fontSize="large" />}
      />
      <EmployeeForm />
    </>
  )
}

export default Employees
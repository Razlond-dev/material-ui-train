import PageHeader from "../../components/PageHeader"
import EmployeeForm from "./EmployeeForm"
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from "@material-ui/core";
import useTable from "../../utils/useTable";
import * as employeeService from "../../services/employeeService";
import { useState } from "react";
import { Controls } from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  }
}))

const headCells = [
  { id: 'fullName', label: 'Employee Name' },
  { id: 'email', label: 'Email Address' },
  { id: 'mobile', label: 'Mobile Number ' },
  { id: 'department', label: 'Department' },
]

const Employees = () => {
  const classes = useStyles()
  const [records, setRecords] = useState(employeeService.getAllEmployees())
  const [filterFn, setFilterFn] = useState({fn: items => {return items}})

  const { TableContainer, TableHead, TblPagination, recordsAfterPaginAndSorting } = useTable(records, headCells, filterFn)

  const handleSearch = e => {
    let target = e.target
    setFilterFn({
      fn: items => {
        if (target.value === '') {
          return items
        } else {
          return items.filter(x => x.fullName.includes(target.value))
        }
      }
    })
  }

  return (
    <>
      <PageHeader
        title="New Employee"
        subtitle="Form design with validation"
        icon={<AccountBalanceIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <EmployeeForm />
        <Toolbar>
          <Controls.Input
            label="Search Employees"
            startAdornment={<InputAdornment position="start">
              <Search />
            </InputAdornment>}
            onChange={handleSearch}
          />
        </Toolbar>
        <TableContainer>
          <TableHead />
          <TableBody>
            {
              recordsAfterPaginAndSorting().map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.mobile}</TableCell>
                  <TableCell>{item.department}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </TableContainer>
        <TblPagination />
      </Paper>
    </>
  )
}

export default Employees
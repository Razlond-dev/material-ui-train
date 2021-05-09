import {
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AddIcon from "@material-ui/icons/Add";
import { Color } from "@material-ui/lab";
import { SyntheticEvent, useState } from "react";
import ConfirmDialog from "./../../components/ConfirmDialog";
import Notification from "../../components/Notification";
import PageHeader from "./../../components/PageHeader";
import Popup from "./../../components/Popup";
import * as employeeService from "./../../services/employeeService";
import useTable from "./../../utils/useTable";
import EmployeeForm from "./EmployeeForm";
import { Controls } from './../../components/controls/Controls';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "fullName", label: "Employee Name" },
  { id: "email", label: "Email Address" },
  { id: "mobile", label: "Mobile Number " },
  { id: "department", label: "Department" },
  { id: "actions", label: "Actions", disableSorting: true },
];

type NotifyType = {
  isOpen: boolean;
  message: string;
  type: Color;
};

export type ConfirmDialogType = {
  isOpen: boolean;
  title: string;
  subtitle: string;
  onConfirm: (id?: number) => void;
};

const Employees = () => {
  const classes = useStyles();
  const [records, setRecords] = useState(employeeService.getAllEmployees());
  const [filterFn, setFilterFn] = useState({
    fn: (items: Array<{ fullName: string }>) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [
    recordForEdit,
    setRecordForEdit,
  ] = useState<employeeService.EmployeeType | null>(null);
  const [notify, setNotify] = useState<NotifyType>({
    isOpen: false,
    message: "",
    type: "success",
  });
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogType>({
    isOpen: false,
    title: "",
    subtitle: "",
    onConfirm: () => {},
  });

  const {
    TableContainer,
    TableHead,
    TblPagination,
    recordsAfterPaginAndSorting,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e: SyntheticEvent) => {
    let target = e.target as HTMLInputElement;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") {
          return items;
        } else {
          return items.filter((x) => x.fullName.includes(target.value));
        }
      },
    });
  };

  const addOrEdit = (
    employee: employeeService.EmployeeType,
    resetForm: () => void
  ) => {
    if (employee.id === 0) {
      employeeService.insertEmployee(employee);
    } else {
      employeeService.updateEmployee(employee);
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(employeeService.getAllEmployees());
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };

  const openInPopup = (item: null | employeeService.EmployeeType) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id: number): void => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    employeeService.deleteEmployee(id);
    setRecords(employeeService.getAllEmployees());
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  return (
    <>
      <PageHeader
        title="New Employee"
        subtitle="Form design with validation"
        icon={<AccountBalanceIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Employees"
            // startAdornment={
            //   <InputAdornment position="start">
            //     <Search />
            //   </InputAdornment>
            // }
            onChange={handleSearch}
          />
          <Controls.Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <TableContainer>
          <TableHead />
          <TableBody>
            {recordsAfterPaginAndSorting().map(
              (item: employeeService.EmployeeType) => (
                <TableRow key={item.id}>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.mobile}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => {
                        openInPopup(item);
                      }}
                    >
                      <EditOutlined />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="secondary"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure you want to delete this record?",
                          subtitle: "You can not undo this action",
                          onConfirm: () => onDelete(item.id),
                        });
                      }}
                    >
                      <DeleteOutlined />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </TableContainer>
        <TblPagination />
      </Paper>
      <Popup
        title="Employee Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EmployeeForm addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default Employees;

import {
  makeStyles,
  Table,
  TableCell,
  TableHead as MuiTableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import { MouseEvent, SyntheticEvent, useState } from "react";
import { ChildrenPropsType } from "./useForm";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

export default function useTable(
  records: string | any[],
  headCells: any[],
  filterFn: { fn: any }
) {
  const classes = useStyles();

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState<'desc' | 'asc'>('asc');
  const [orderBy, setOrderBy] = useState<number>(0);

  const TableContainer = ({ children }: ChildrenPropsType) => (
    <Table className={classes.table}>{children}</Table>
  );
// TODO orderBy possibly string
  const TableHead = () => {
    const handleSortRequest = (cellId: number) => {
      console.log(cellId);
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };

    return (
      <MuiTableHead>
        <TableRow>
          {headCells.map((item) => (
            <TableCell
              key={item.id}
              sortDirection={orderBy === item.id ? order : false}
            >
              {item.disableSorting ? (
                item.label
              ) : (
                <TableSortLabel
                  active={orderBy === item.id}
                  direction={orderBy === item.id ? order : "asc"}
                  onClick={() => {
                    handleSortRequest(item.id);
                  }}
                >
                  {item.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </MuiTableHead>
    );
  };

  const handleChangePage = (event: MouseEvent | null, newPage: number) => {
    setPage(newPage);
  };

  // TODO: maybe not InputElement
  const handleChangeRowPerPage = (event: SyntheticEvent) => {
    let target = event.target as HTMLButtonElement
    setRowsPerPage(parseInt(target.value, 10));
    setPage(0);
  };

  function stableSort(array: any[], comparator: { (a: any, b: any): number; (arg0: any, arg1: any): any; }) {
    const stabilizetThis = array.map((el, index) => [el, index]);
    stabilizetThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizetThis.map((el) => el[0]);
  }

  function getComparator(order: string, orderBy: number) {
    return order === "desc"
      ? (a: { [x: string]: number; }, b: { [x: string]: number; }) => descendingComparator(a, b, orderBy)
      : (a: { [x: string]: number; }, b: { [x: string]: number; }) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a: { [x: string]: number; }, b: { [x: string]: number; }, orderBy: string | number) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const recordsAfterPaginAndSorting = () => {
    return stableSort(
      filterFn.fn(records),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowPerPage}
    />
  );

  return {
    TableContainer,
    TableHead,
    TblPagination,
    recordsAfterPaginAndSorting,
  };
}

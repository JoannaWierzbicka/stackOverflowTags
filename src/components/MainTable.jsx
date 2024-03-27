import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import TablePaginationActions from "../utils/tablePagination";
import createTableData from "../utils/createTableData";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert, TableHead } from "@mui/material";
import {
  stableSort,
  handleRequestSort,
  getComparator,
} from "../utils/handleSort";
import {
  StyledTableCell,
  StyledTableRow,
} from "../components/styledComponents";

export default function MainTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await createTableData();
        setRows(data);
      } catch (error) {
        setError(error.data.error_message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortedRows = stableSort(rows, getComparator(order, orderBy));

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleErrorAlert = () => {
    setError(null);
  };

  if (isLoading)
    return <CircularProgress color="secondary" thickness={2} size={150} />;
  if (error)
    return (
      <Alert severity="error" onClose={() => handleErrorAlert()}>
        {error}
      </Alert>
    );

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: "30px" }}>
        StackOverflow TAGS Table
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="custom pagination table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  handleRequestSort(
                    "name",
                    setOrder,
                    setOrderBy,
                    orderBy,
                    order
                  )
                }
              >
                TAG
              </StyledTableCell>
              <StyledTableCell
                align="right"
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  handleRequestSort(
                    "count",
                    setOrder,
                    setOrderBy,
                    orderBy,
                    order
                  )
                }
              >
                COUNT
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? sortedRows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : sortedRows
            ).map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell style={{ width: 160 }} align="right">
                  {row.count}
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <StyledTableRow style={{ height: 53 * emptyRows }}>
                <StyledTableCell colSpan={6} />
              </StyledTableRow>
            )}
          </TableBody>
          <TableFooter>
            <StyledTableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </StyledTableRow>
          </TableFooter>
        </Table>
      </TableContainer>{" "}
    </>
  );
}

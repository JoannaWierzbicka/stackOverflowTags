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
import { Alert } from "@mui/material";
import { stableSort, getComparator } from "../utils/handleSort";
import {
  CustomTableHeader,
  StyledTableCell,
  StyledTableRow,
} from "./styledComponents";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

export default function MainTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await createTableData();
        if (!data) {
          setError(true);
        } else {
          setRows(data);
          setError(false);
        }
      } catch (error) {
        setError(true);
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

  if (isLoading)
    return <CircularProgress color="secondary" thickness={2} size={150} />;
  if (error)
    return (
      <Alert
        icon={<SentimentDissatisfiedIcon fontSize="inherit" />}
        severity="error"
      >
        We encountered a problem. Please try again later or refresh the page.
      </Alert>
    );
  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: "30px" }}>
      StackOverflow TAGS Table
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="custom pagination table">
          <CustomTableHeader
            setOrder={setOrder}
            setOrderBy={setOrderBy}
            orderBy={orderBy}
            order={order}
          />
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
                rowsPerPageOptions={[
                  5,
                  10,
                  15,
                  20,
                  25,
                  { label: "All", value: -1 },
                ]}
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
                sx={{
                  "& .MuiTablePagination-displayedRows": {
                    width: 80,
                  },
                }}
              />
            </StyledTableRow>
          </TableFooter>
        </Table>
      </TableContainer>{" "}
    </>
  );
}

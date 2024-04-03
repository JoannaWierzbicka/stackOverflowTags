import { TableHead } from "@mui/material";
import { handleRequestSort } from "../../utils/handleSort";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import PropTypes from "prop-types";
import StyledTableCell from "./StyledTableCell";
import StyledTableRow from "./StyledTableRow";

export const CustomTableHeader = (props) => {
  const { setOrder, setOrderBy, orderBy, order } = props;
  return (
    <TableHead>
      <StyledTableRow >
        <StyledTableCell
          sx={{ cursor: "pointer" }}
          onClick={() =>
            handleRequestSort("name", setOrder, setOrderBy, orderBy, order)
          }
        >
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            TAG{" "}
            {orderBy === "name" && (
              <>
                {order === "asc" ? (
                  <NorthIcon fontSize="small" />
                ) : (
                  <SouthIcon fontSize="small" />
                )}
              </>
            )}
          </div>
        </StyledTableCell>
        <StyledTableCell
          align="right"
          sx={{ cursor: "pointer" }}
          onClick={() =>
            handleRequestSort("count", setOrder, setOrderBy, orderBy, order)
          }
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            COUNT{" "}
            {orderBy === "count" && (
              <>
                {order === "asc" ? (
                  <NorthIcon fontSize="small" />
                ) : (
                  <SouthIcon fontSize="small" />
                )}
              </>
            )}
          </div>
        </StyledTableCell>
      </StyledTableRow>
    </TableHead>
  );
};

CustomTableHeader.propTypes = {
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  title: PropTypes.string
};

export default CustomTableHeader;

import { IconButton, styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useContext } from "react"
import useSortParams, { Order } from "../Hooks/useSortParams";
import { StationsContext } from "./Stations"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SortIcon from '@mui/icons-material/Sort';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from "../App";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableCellPointer = styled(TableCell)(({ theme }) => ({
  textTransform: 'capitalize'
}));

const columns = ['name', 'margin', 'profit', 'volume'];

export const StationsList = () => {
  const stations = useContext(StationsContext)
  const navigate = useNavigate();
  const { sort, setSortParams } = useSortParams('name');
  const { orderBy, order } = sort;

  return (
    <>
      <h1 className="page-header">
        Stations List
      </h1>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((col, i) => (
              <TableCellPointer 
                key={col}
                align={i ? 'right' : 'left'}
              >
                {col}{' '}
                <IconButton
                  size="small"
                  onClick={() => {setSortParams(col)}}
                >
                  {orderBy === col ? 
                    (order === Order.ASC ? 
                      <ArrowDropUpIcon fontSize="small"/> : 
                      <ArrowDropDownIcon fontSize="small" />) : 
                    <SortIcon fontSize="small" />}
                </IconButton>
              </TableCellPointer>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {stations.map(({ id, name, metrics }) => (
            <StyledTableRow
              onClick={() => navigate(ROUTES.STATION_VIEW.replace(':id', `${id}`))}
              key={`row-${id}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {name}
              </TableCell>
              <TableCell align="right"><>{metrics.margin}</></TableCell>
              <TableCell align="right"><>{metrics.profit}</></TableCell>
              <TableCell align="right"><>{metrics.volume}</></TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}
export default StationsList

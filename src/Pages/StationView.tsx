import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import { StationsContext } from './Stations';
import { Navigate, useParams } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const StationView = () => {
  const { id = '' } = useParams<{ id: string }>();
  const stations = useContext(StationsContext);
  /* 
    there is no reason to get the station by id,
    because usually the user will go to this page from the previous one.
    It makes sense when there is a pagination and we have no all list or
    if the user goes to a page with a URL, but this case is rare 
  */
  const stationId = parseInt(id);
  if (!stationId) return <Navigate replace to="/stations" />;
  const station = stations.find(({ id }) => (id === stationId))
  if (!station) return <Navigate replace to="/stations" />;
  
  return (
    <div>
      <h1 className="page-header">
        Stations View
      </h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 320 }} aria-label="customized table">
          <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Station ID:
              </StyledTableCell>
              <StyledTableCell align="right">{id}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Name:
              </StyledTableCell>
              <StyledTableCell align="right">{station.name}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Margin:
              </StyledTableCell>
              <StyledTableCell align="right"><>{station.metrics.margin}</></StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Profit:
              </StyledTableCell>
              <StyledTableCell align="right"><>{station.metrics.profit}</></StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Volume:
              </StyledTableCell>
              <StyledTableCell align="right"><>{station.metrics.volume}</></StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StationView;

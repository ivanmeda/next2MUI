import {
  Grid,
  makeStyles,
  useTheme,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { FilterList } from "@material-ui/icons";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({}));
function TableForm(props) {
  const classes = useStyles();
  const theme = useTheme;

  return (
    <Grid>
      <Grid
        item
        container
        justifyContent="flex-end"
        style={{ marginTop: "5em" }}
      >
        <Grid item style={{ marginRight: 75 }}>
          <FilterList color="secondary" style={{ fontSize: 50 }} />
        </Grid>
      </Grid>
      <Grid item style={{ marginBottom: "15em" }}>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Service</TableCell>
                <TableCell align="center">Features</TableCell>
                <TableCell align="center">Complexity</TableCell>
                <TableCell align="center">Platforms</TableCell>
                <TableCell align="center">Users</TableCell>
                <TableCell align="center">Totals</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center" align="center">
                    {row.date}
                  </TableCell>
                  <TableCell align="center">{row.service}</TableCell>
                  <TableCell align="center" style={{ maxWidth: "5em" }}>
                    {row.features}
                  </TableCell>
                  <TableCell align="center">{row.complexity}</TableCell>
                  <TableCell align="center">{row.platforms}</TableCell>
                  <TableCell align="center">{row.users}</TableCell>
                  <TableCell align="center">{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default TableForm;

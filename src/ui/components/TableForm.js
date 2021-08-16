import { Grid, makeStyles, useTheme } from "@material-ui/core";
import { FilterList } from "@material-ui/icons";
import EnhancedTable from "./EnhancedTable";

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
        <EnhancedTable rows={props.rows} />
      </Grid>
    </Grid>
  );
}

export default TableForm;

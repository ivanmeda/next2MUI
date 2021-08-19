import DateFnsUtils from "@date-io/date-fns";
import {
  Grid,
  makeStyles,
  useTheme,
  Typography,
  TextField,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Switch,
  Dialog,
  DialogContent,
  Radio,
  RadioGroup,
  MenuItem,
} from "@material-ui/core";
import { Select, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useReducer, useState } from "react";
import { format } from "date-fns";
import EnhancedTable from "../src/ui/components/EnhancedTable";

const useStyles = makeStyles((theme) => ({
  service: {
    fontWeight: 300,
  },
  users: {
    marginRight: 0,
  },
  btn: {
    color: "#fff",
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));
const createData = (
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total,
  search
) => {
  return {
    name,
    date,
    service,
    features,
    complexity,
    platforms,
    users,
    total,
    search,
  };
};

function ProjectManager() {
  const classes = useStyles();
  const theme = useTheme;

  const [rows, setRows] = useState([
    createData(
      "Zachary Reece",
      "11/2/19",
      "Website",
      "E-Commerce",
      "N/A",
      "N/A",
      "N/A",
      "$1500",
      true
    ),
    createData(
      "Bill Gates",
      "10/17/19",
      "Custom Software",
      "GPS, Push Notifications, Users/Authentication, File Transfer",
      "Medium",
      "Web Application",
      "0-10",
      "$1600",
      true
    ),
    createData(
      "Steve Jobs",
      "2/13/19",
      "Custom Software",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "Web Application",
      "10-100",
      "$1250",
      true
    ),
    createData(
      "Stan Smith",
      "2/13/19",
      "Mobile App",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "iOS, Android",
      "10-100",
      "$1250",
      true
    ),
    createData(
      "Albert Einstein",
      "2/13/19",
      "Mobile App",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "Android",
      "10-100",
      "$1250",
      true
    ),
  ]);

  const initialState = {
    website: false,
    ios: false,
    android: false,
    software: false,
    // rows: [createData("ivan", '11/2/19', 'Website')],
  };

  function reducer(state, action) {
    switch (action.type) {
      case "website":
        return {
          ...state,
          website: !state.website,
        };
      case "ios":
        return {
          ...state,
          ios: !state.ios,
        };
      case "android":
        return {
          ...state,
          android: !state.android,
        };
      case "software":
        return {
          ...state,
          software: !state.software,
        };

      default:
        return state;
    }
  }

  const platformsOptions = ["Web", "iOS", "Android"];
  var featuresOptions = [
    "Photo/Video",
    "GPS",
    "File Transfer",
    "User/Authentication",
    "Biometrics",
    "Push Notifications",
  ];

  var websiteOptions = ["Basic", "Interactive", "E-Commerce"];

  const [state, dispatch] = useReducer(reducer, initialState);
  const [dialog, setDialog] = useState(false);
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [total, setTotal] = useState("");
  const [service, setService] = useState("");
  const [users, setUsers] = useState("");
  const [complexity, setComplexity] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  console.log(state);

  const addProject = () => {
    setRows([
      ...rows,
      createData(
        name,
        format(date, "MM/dd/yy"),
        service,
        features.join(", "),
        service === "Website" ? "N/A" : complexity,
        service === "Website" ? "N/A" : platforms.join(", "),
        service === "Website" ? "N/A" : users,
        `$${total}`,
        true
      ),
    ]);
    setDialog(false);
    setName("");
    setDate(new Date());
    setTotal("");
    setService("");
    setComplexity("");
    setUsers("");
    setPlatforms([]);
    setFeatures([]);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);

    const rowData = rows.map((row) =>
      Object.values(row).filter((option) => option !== true && option !== false)
    );

    const matches = rowData.map((row) =>
      row.map((option) =>
        option.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );

    const newRows = [...rows];
    matches.map((row, index) =>
      row.includes(true)
        ? (newRows[index].search = true)
        : (newRows[index].search = false)
    );

    setRows(newRows);
    setPage(0);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container direction="column">
        <Grid item style={{ marginTop: "2em", marginLeft: "5em" }}>
          <Typography variant="h1">Projects</Typography>
        </Grid>
        <Grid item>
          <TextField
            placeholder="Search project details or create a new entry."
            value={search}
            onChange={handleSearch}
            style={{ width: "35em", marginLeft: "5em" }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{ cursor: "pointer" }}
                  onClick={() => setDialog(true)}
                >
                  <AddIcon color="primary" style={{ fontSize: 30 }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item style={{ marginLeft: "5em", marginTop: "2em" }}>
          <FormGroup row>
            <FormControlLabel
              style={{ marginRight: "5em" }}
              label="Websites"
              labelPlacement="start"
              control={
                <Switch
                  checked={state.website}
                  color="primary"
                  onChange={() => dispatch({ type: "website" })}
                />
              }
            ></FormControlLabel>
            <FormControlLabel
              style={{ marginRight: "5em" }}
              label="iOS"
              labelPlacement="start"
              control={
                <Switch
                  checked={state.ios}
                  color="primary"
                  onChange={() => dispatch({ type: "ios" })}
                />
              }
            ></FormControlLabel>
            <FormControlLabel
              style={{ marginRight: "5em" }}
              label="Android"
              labelPlacement="start"
              control={
                <Switch
                  checked={state.android}
                  color="primary"
                  onChange={() => dispatch({ type: "android" })}
                />
              }
            ></FormControlLabel>
            <FormControlLabel
              label="Software"
              labelPlacement="start"
              control={
                <Switch
                  checked={state.software}
                  color="primary"
                  onChange={() => dispatch({ type: "software" })}
                />
              }
            ></FormControlLabel>
          </FormGroup>
        </Grid>
        <Grid>
          <Grid item style={{ marginTop: "5em", marginBottom: "35em" }}>
            <EnhancedTable
              setRows={setRows}
              rows={rows}
              page={page}
              setPage={setPage}
              websiteChecked={state.website}
              iOSChecked={state.ios}
              androidChecked={state.android}
              softwareChecked={state.software}
            />
          </Grid>
        </Grid>
        <Dialog
          fullWidth
          maxWidth="md"
          open={dialog}
          onClose={() => setDialog(false)}
        >
          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="h1" gutterBottom>
                Add a new project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Grid item container direction="column" sm>
                  <Grid item>
                    <TextField
                      fullWidth
                      id="name"
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  direction="column"
                  style={{ marginTop: "5em" }}
                >
                  <Grid item>
                    <Typography variant="h4">Service</Typography>
                  </Grid>
                  <Grid item>
                    <RadioGroup
                      aria-label="service"
                      name="service"
                      value={service}
                      onChange={(e) => {
                        setService(e.target.value);
                        setFeatures([]);
                      }}
                    >
                      <FormControlLabel
                        classes={{ label: classes.service }}
                        value="Website"
                        label="Website"
                        control={<Radio />}
                      />
                      <FormControlLabel
                        classes={{ label: classes.service }}
                        value="Mobile App"
                        label="Mobile App"
                        control={<Radio />}
                      />
                      <FormControlLabel
                        classes={{ label: classes.service }}
                        value="Custom Software"
                        label="Custom Software"
                        control={<Radio />}
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item style={{ marginTop: "5em" }}>
                    <Select
                      labelId="platforms"
                      id="platforms"
                      disabled={service === "Website"}
                      multiple
                      style={{ width: "12em" }}
                      displayEmpty
                      renderValue={
                        platforms.length > 0 ? undefined : () => "Platforms"
                      }
                      value={platforms}
                      onChange={(event) => setPlatforms(event.target.value)}
                    >
                      {platformsOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid
                  item
                  container
                  direction="column"
                  sm
                  style={{ marginTop: 16 }}
                  alignItems="center"
                >
                  <Grid item>
                    <KeyboardDatePicker
                      format="MM/dd/yyyy"
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      item
                      container
                      direction="column"
                      style={{ marginTop: "5em" }}
                    >
                      <Grid item>
                        <Typography variant="h4">Complexity</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label="complexity"
                          name="Complexity"
                          value={complexity}
                          onChange={(e) => setComplexity(e.target.value)}
                        >
                          <FormControlLabel
                            disabled={service === "Website"}
                            classes={{ label: classes.service }}
                            value="Low"
                            label="Low"
                            control={<Radio />}
                          />
                          <FormControlLabel
                            disabled={service === "Website"}
                            classes={{ label: classes.service }}
                            value="Medium"
                            label="Medium"
                            control={<Radio />}
                          />
                          <FormControlLabel
                            disabled={service === "Website"}
                            classes={{ label: classes.service }}
                            value="High"
                            label="High"
                            control={<Radio />}
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container direction="column" sm>
                  <Grid item>
                    <TextField
                      id="total"
                      label="Total"
                      value={total}
                      onChange={(e) => setTotal(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item style={{ alignSelf: "flex-end" }}>
                    <Grid
                      item
                      container
                      direction="column"
                      style={{ marginTop: "5em" }}
                      // alignItems="flex-end"
                    >
                      <Grid item>
                        <Typography variant="h4">Users</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label="users"
                          name="Users"
                          value={users}
                          onChange={(e) => setUsers(e.target.value)}
                        >
                          <FormControlLabel
                            disabled={service === "Website"}
                            classes={{
                              label: classes.service,
                              root: classes.users,
                            }}
                            value="0-10"
                            label="0-10"
                            control={<Radio />}
                          />
                          <FormControlLabel
                            disabled={service === "Website"}
                            classes={{
                              label: classes.service,
                              root: classes.users,
                            }}
                            value="10-100"
                            label="10-100"
                            control={<Radio />}
                          />
                          <FormControlLabel
                            disabled={service === "Website"}
                            classes={{
                              label: classes.service,
                              root: classes.users,
                            }}
                            value="100+"
                            label="100+"
                            control={<Radio />}
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginTop: "5em" }}>
                    <Select
                      MenuProps={{ style: { zIndex: 1302 } }}
                      style={{ width: "12em" }}
                      labelId="features"
                      id="features"
                      multiple
                      displayEmpty
                      renderValue={
                        features.length > 0 ? undefined : () => "Features"
                      }
                      value={features}
                      onChange={(event) => setFeatures(event.target.value)}
                    >
                      {service === "Website"
                        ? (featuresOptions = websiteOptions)
                        : null}
                      {featuresOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="center"
              style={{ marginTop: "3em" }}
            >
              <Grid item>
                <Button
                  variant="text"
                  style={{ fontWeight: 300 }}
                  color="primary"
                  onClick={() => setDialog(false)}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  className={classes.btn}
                  color="default"
                  onClick={addProject}
                  disabled={
                    service === "Website"
                      ? name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        features.length > 1
                      : name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        users.length === 0 ||
                        complexity.length === 0 ||
                        platforms.length === 0 ||
                        service.length === 0
                  }
                >
                  Add Project+
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default ProjectManager;

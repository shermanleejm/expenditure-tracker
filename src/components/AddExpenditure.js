import React, { Component, useState } from "react";
import {
  Card,
  Typography,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  Button,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import testData from "../test/sample_data.json";
// import MomentUtils from "@date-io/moment";

class CreditDebitRadio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: "credit",
    };
  }

  render() {
    return (
      <FormControl component="fieldset">
        <RadioGroup
          value={this.state.radioValue}
          onChange={(event) =>
            this.setState({ radioValue: event.target.value })
          }
        >
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <FormControlLabel
                value="credit"
                control={<Radio color="primary" />}
                label="Credit"
                labelPlacement="end"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                value="debit"
                control={<Radio color="primary" />}
                label="Debit"
                labelPlacement="end"
              />
            </Grid>
          </Grid>
        </RadioGroup>
      </FormControl>
    );
  }
}

export default class AddExpenditure extends Component {
  // const [selectedDate, handleDateChange] = useState(new Date());
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: new Date(),
      expenditureType: ["Leisure", "Salary", "Food"],
      formSubmitted: false,
    };
  }

  handleDateChange(newDate) {
    this.setState({
      selectedDate: newDate,
    });
  }

  addEntry() {
    var oldstate = this.state;
    this.setState({});
  }

  render() {
    if (this.state.formSubmitted) {

    } 
    return (
      <div style={{ textAlign: "center", padding: "10px" }}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item style={{ width: "90vw" }}>
            <Card
              style={{
                backgroundColor:
                  localStorage.getItem("darkMode") == "true"
                    ? "#696969"
                    : "#ededed",
              }}
            >
              <CardContent>
                <Typography variant="h6">Enter the date of purchase</Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    clearable
                    placeholder="dd/mm/yyyy"
                    value={this.state.selectedDate}
                    onChange={(date) => this.handleDateChange(date)}
                    format="dd-MMM-yyyy"
                    style={{ width: "80%" }}
                  />
                </MuiPickersUtilsProvider>
              </CardContent>
            </Card>
          </Grid>
          {/* {this.state.dailyEntries.map((option) => {
            return option;
          })} */}
          <Grid item style={{ width: "90vw" }}>
            <Card
              style={{
                backgroundColor:
                  localStorage.getItem("darkMode") == "true"
                    ? "#696969"
                    : "#ededed",
              }}
            >
              <CardContent>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="stretch"
                  spacing={2}
                >
                  <Grid item>
                    <Autocomplete
                      options={this.state.expenditureType}
                      // getOptionLabel={(option) => option.type}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Type of expenditure"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <TextField variant="outlined" label="Item name" fullWidth />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Amount"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <CreditDebitRadio />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item style={{ width: "90vw" }}>
            <Card
              style={{
                backgroundColor:
                  localStorage.getItem("darkMode") == "true"
                    ? "#696969"
                    : "#ededed",
              }}
            >
              <Button fullWidth>submit</Button>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

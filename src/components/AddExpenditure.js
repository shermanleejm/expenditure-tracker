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
  Paper,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import testData from "../test/sample_data.json";
// import MomentUtils from "@date-io/moment";

import { initDB, addSpending } from "./ConnectionManager";

class CreditDebitRadio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: "credit",
      formSubmitted: false,
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
      db: initDB(),
      selectedDate: new Date(),
      category: null,
      itemName: null,
      amount: null,
      radioValue: "credit",
      expenditureType: ["Leisure", "Salary", "Food"],
      formSubmitted: false,
      amountIsInt: true,
      categoryIsFilled: true,
      itemNameIsFilled: true,
    };
  }

  isInt(value) {
    var x;
    if (isNaN(value)) {
      return false;
    }
    x = parseFloat(value);
    return (x | 0) === x;
  }

  addEntry() {
    var oldstate = this.state;
    this.setState({});
  }

  render() {
    // let testDate = new Date(Date.parse("1996-01-19"));
    // console.log(testDate.toISOString().slice(0, 10));
    // console.log(this.state.selectedDate.toLocaleDateString());
    if (this.state.formSubmitted === true) {
      return (
        <div style={{ padding: "20px" }}>
          <Paper
            elevation={3}
            style={{
              width: "80vw",
              padding: "20px",
              margin: "auto",
              marginTop: "20px",
              backgroundColor:
                localStorage.getItem("darkMode") == "true"
                  ? "#696969"
                  : "#ededed",
            }}
          >
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="center"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h6">
                  Expenditure has been recorded!
                </Typography>
              </Grid>
              <Grid item>
                <Button onClick={() => this.setState({ formSubmitted: false })}>
                  ADD MORE
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </div>
      );
    } else {
      return (
        <div style={{ textAlign: "center", padding: "10px" }}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
            style={{ marginTop: "20px" }}
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
                  <Typography variant="h6">
                    Enter the date of purchase
                  </Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      clearable
                      placeholder="dd/mm/yyyy"
                      value={this.state.selectedDate}
                      onChange={(date) => {
                        this.setState({ selectedDate: date });
                      }}
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
                            label="Category"
                            variant="outlined"
                          />
                        )}
                        onChange={(event, value) => {
                          this.setState({
                            category: value,
                            categoryIsFilled: true,
                          });
                        }}
                      />
                      {!this.state.categoryIsFilled && (
                        <div style={{ textAlign: "left" }}>
                          <Typography color="error" variant="caption">
                            Please choose a category
                          </Typography>
                        </div>
                      )}
                    </Grid>
                    <Grid item>
                      <TextField
                        ref="itemName"
                        variant="outlined"
                        label="Item name"
                        fullWidth
                        onChange={(event) => {
                          this.setState({
                            itemName: event.target.value,
                            itemNameIsFilled: true,
                          });
                        }}
                        error={!this.state.itemNameIsFilled}
                        helperText={
                          !this.state.itemNameIsFilled && "Please enter a name"
                        }
                      />
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
                        onChange={(event) => {
                          let val = event.target.value;
                          if (this.isInt(val)) {
                            this.setState({
                              amount: event.target.value,
                              amountIsInt: true,
                            });
                          } else {
                            this.setState({
                              amountIsInt: false,
                              amount: null,
                            });
                            return false;
                          }
                        }}
                        error={!this.state.amountIsInt}
                        helperText={
                          !this.state.amountIsInt && "Please enter a number"
                        }
                      />
                    </Grid>
                    <Grid item>
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
                            justify="space-between"
                            alignItems="center"
                          >
                            <Grid item md={2}>
                              <FormControlLabel
                                value="credit"
                                control={<Radio color="primary" />}
                                label="Credit"
                                labelPlacement="end"
                              />
                            </Grid>
                            <Grid item md={2}>
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
                <Button
                  fullWidth
                  onClick={() => {
                    if (this.state.category === null) {
                      this.setState({ categoryIsFilled: false });
                    }

                    if (this.state.amount === null) {
                      this.setState({ amountIsInt: false });
                    }

                    if (this.state.itemName === null) {
                      this.setState({ itemNameIsFilled: false });
                    }

                    if (
                      this.state.category !== null &&
                      this.state.amount !== null &&
                      this.state.itemName !== null
                    ) {
                      this.setState({
                        formSubmitted: true,
                      });
                      let value = {
                        category: this.state.category,
                        itemName: this.state.itemName,
                        amount: this.state.amount,
                        transactionType: this.state.radioValue,
                        date: this.state.selectedDate.toISOString().slice(0, 10),
                      };
                      console.log(value);
                      addSpending(value);
                    }
                  }}
                >
                  submit
                </Button>
              </Card>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}

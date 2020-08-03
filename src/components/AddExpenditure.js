import React, { Component, useState } from "react";
import { Card, Typography } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
// import MomentUtils from "@date-io/moment";

export default function AddExpenditure() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <div style={{ textAlign: "center" }}>
      <Card
        color="secondary"
        style={{
          textAlign: "center",
          padding: 20,
          width: "80%",
          fontSize: "50px",
          display: "inline-block",
        }}
      >
        <Typography variant="h6">Enter the date of purchase</Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            clearable
            placeholder="dd/mm/yyyy"
            value={selectedDate}
            onChange={(date) => handleDateChange(date)}
            format="dd/MM/yyyy"
            minDate={new Date("1900-01-01")}
            style={{ width: "80%" }}
          />
        </MuiPickersUtilsProvider>
      </Card>
    </div>
  );
}

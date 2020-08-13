import { ResponsiveLine } from "@nivo/line";
import React, { Component } from "react";
import testData from "../test/sample_data.json";
import { getSpending } from "./ConnectionManager";
import { Button, Typography } from "@material-ui/core";

export default class Overview extends Component {
  constructor(props) {
    super(props);

    var data;
    if (localStorage.getItem("useTestData") == "true") {
      data = testData;
    }

    this.state = {
      useTestData: localStorage.getItem("useTestData") == "true",
      data: data,
    };
  }

  displayData(data) {
    this.setState({ data: data });
  }

  getData() {
    var db;
    let dbReq = indexedDB.open("main", 1);
    dbReq.onsuccess = (event) => {
      db = event.target.result;
      var getAllResult = db
        .transaction(["spending"], "readonly")
        .objectStore("spending")
        .getAll();
      getAllResult.onsuccess = () => {
        var data = getAllResult.result;
        this.setState({ data: data });
      };
    };
  }

  render() {
    return (
      <div>
        <div style={{ width: "80%", margin: "auto", padding: "20px" }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              this.getData();
              localStorage.setItem("useTestData", "false");
            }}
          >
            Refresh
          </Button>

          {localStorage.getItem("useTestData") == "true" && (
            <div style={{ padding: "20px", margin: "auto" }}>
              <Typography variant="p">
                We are currently showing test data. If you would like to see
                your latest expenditure, click refresh.
              </Typography>
            </div>
          )}

        </div>
      </div>
    );
  }
}

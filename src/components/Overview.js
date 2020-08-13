import { ResponsiveLine } from "@nivo/line";
import React, { Component } from "react";
import testData from "./sample_data";
import { getSpending } from "./ConnectionManager";
import { Button, Typography } from "@material-ui/core";
import { ResponsiveCalendar } from "@nivo/calendar";
import { ResponsivePie } from "@nivo/pie";

export default class Overview extends Component {
  constructor(props) {
    super(props);
    var data = [];
    if (localStorage.getItem("useTestData") == "true") {
      data = testData.testData.sort(this.compare);
      var arr = data;
      arr.map((row) => {
        row["value"] = row["amount"];
        row["day"] = row["date"];
        row["id"] = row["category"];
        row["label"] = row["category"];
      });
      console.log(arr);
    }

    this.state = {
      useTestData: localStorage.getItem("useTestData") == "true",
      data: data,
    };
  }

  compare(a, b) {
    if (a.date < b.date) {
      return -1;
    }
    return 1;
  }

  displayData(data) {
    this.setState({ data: data });
  }

  displayCalendar() {
    var oldState = this.state;
    var calendarData = {};
    oldState.data.map((row) => {
      if (row.day in calendarData) {
        if (row.transactionType === "credit") {
          calendarData[row.day] += row.amount;
        }
      } else {
        if (row.transactionType === "credit") {
          calendarData[row.day] = row.amount;
        }
      }
    });

    var result = [];
    Object.keys(calendarData).map((key) => {
      result.push({
        day: key,
        value: calendarData[key],
      });
    });

    return (
      <ResponsiveCalendar
        data={result}
        from={result[0].day}
        to={result[result.length - 1].day}
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        theme={{
          labels: {
            text: {
              fill:
                localStorage.getItem("darkMode") == "true"
                  ? "#ffffff"
                  : "#2e2e2e",
            },
          },
          tooltip: {
            container: {
              background:
                localStorage.getItem("darkMode") == "true"
                  ? "#858585"
                  : "#ffffff",
              color:
                localStorage.getItem("darkMode") == "true"
                  ? "#ffffff"
                  : "#2e2e2e",
            },
          },
        }}
        legends={[
          {
            anchor: "bottom-left",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemTextColor:
              localStorage.getItem("darkMode") == "true"
                ? "#ffffff"
                : "#2e2e2e",
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
    );
  }

  displayPie() {
    var oldState = this.state;
    var pieData = {};
    oldState.data.map((row) => {
      if (row.category in pieData) {
        pieData[row.category] += row.amount;
      } else {
        pieData[row.category] = row.amount;
      }
    });
    var result = [];
    Object.keys(pieData).map((key) => {
      if (key !== "Salary") {
        result.push({
          id: key,
          label: key,
          value: pieData[key],
        });
      }
    });

    return (
      <ResponsivePie
        data={result}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "nivo" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor={
          localStorage.getItem("darkMode") == "true" ? "#ffffff" : "#000000"
        }
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: "color" }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        theme={{
          tooltip: {
            container: {
              background:
                localStorage.getItem("darkMode") == "true"
                  ? "#858585"
                  : "#ffffff",
              color:
                localStorage.getItem("darkMode") == "true"
                  ? "#ffffff"
                  : "#2e2e2e",
            },
          },
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            translateY: 56,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    );
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
        data.map((row) => {
          row["day"] = row["date"];
        });
        this.setState({ data: data });
      };
    };
  }

  render() {
    if (localStorage.getItem("useTestData") != "true") {
      setTimeout(this.getData(), 3000);
    }

    return (
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
              We are currently showing test data. If you would like to see your
              latest expenditure, click refresh.
            </Typography>
          </div>
        )}

        {this.state.data.length == 0 && (
          <div style={{ padding: "20px", margin: "auto" }}>
            <Typography variant="p">
              Please click refresh or enable test data under profile.
            </Typography>
          </div>
        )}

        <div
          style={{
            overflowX: "scroll",
            overflowY: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{ height: "30vh", width: "100vh", display: "inline-block" }}
          >
            {this.state.data.length > 0 && this.displayCalendar()}
          </div>
        </div>
        <div style={{ height: "30vh", margin: "auto" }}>
          {this.state.data.length > 0 && this.displayPie()}
        </div>
      </div>
    );
  }
}

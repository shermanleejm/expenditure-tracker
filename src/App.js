import React, { useState, Component } from "react";
import Calendar from "react-calendar";
import {
  AppBar,
  Toolbar,
  ThemeProvider,
  createMuiTheme,
  makeStyles,
  Paper,
  Switch,
  Typography,
  List,
  Fab,
  BottomNavigation,
  BottomNavigationAction,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import PersonIcon from "@material-ui/icons/Person";

import { initDB, addSpending } from "./components/ConnectionManager";
import Overview from "./components/Overview";
import AddExpenditure from "./components/AddExpenditure";
import Profile from "./components/Profile";

const useStyles = makeStyles({
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
});

const styles = {
  root: {
    color: "green",
    "&$selected": {
      color: "red",
    },
  },
  selected: {},
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navBarValue: "addExpenditure",
      isDark: localStorage.getItem("darkMode") == "true",
      useTestData: localStorage.getItem("useTestData") == "true",
      db: this.initDB(),
      navBarItems: {
        overview: {
          icon: <TrendingUpIcon fontSize="Large" />,
          label: "Overview",
          value: "overview",
          component: <Overview />,
        },
        addExpenditure: {
          icon: <AddIcon fontSize="Large" />,
          label: "Add",
          value: "addExpenditure",
          component: <AddExpenditure db={this.initDB()} />,
        },
        profile: {
          icon: <PersonIcon fontSize="Large" />,
          label: "Profile",
          value: "profile",
          component: (
            <Profile
              toggleDM={this.toggleDarkMode}
              toggleTD={this.toggleTestData}
            />
          ),
        },
      },
    };
  }

  initDB() {
    let db;
    let dbReq = indexedDB.open("main", 1);

    dbReq.onupgradeneeded = function (event) {
      db = event.target.result;
      let spending = db.createObjectStore("spending", { autoIncrement: true });
    };

    dbReq.onsuccess = function (event) {
      db = event.target.result;
    };

    dbReq.onerror = function (event) {
      console.log("error opening database " + event.target.errorCode);
      alert(
        "Sorry, this application requires some functionalities that are not supported by your browser. Please use a newer browser, thank you! "
      );
    };

    return db;
  }

  setNavBarValue(newValue) {
    this.setState({
      navBarValue: newValue,
    });
  }

  toggleDarkMode = () => {
    var oldState = this.state;
    this.setState({
      isDark: !oldState.isDark,
    });
    localStorage.setItem("darkMode", JSON.stringify(!oldState.isDark));
  };

  toggleTestData = () => {
    var oldState = this.state;
    this.setState({
      useTestData: !oldState.useTestData,
    });
    localStorage.setItem("useTestData", JSON.stringify(!oldState.useTestData));
  };

  render() {
    var theme = createMuiTheme({
      palette: {
        type: this.state.isDark ? "dark" : "light",
        primary: {
          // main: "#3700B3",
          main: this.state.isDark ? "#ff1940" : "#6200EE",
        },
        secondary: {
          main: this.state.isDark ? "#858585" : "#ffffff",
        },
      },
    });

    var classes = this.props.useStyles;

    const actionClasses = this.props.styles;

    return (
      <ThemeProvider theme={theme}>
        <Paper style={{ height: "100vh" }}>
          {this.state.navBarItems[this.state.navBarValue].component}

          <Paper elevation={1}>
            <BottomNavigation
              value={this.state.navBarValue}
              displayLabel
              onChange={(event, newValue) => this.setNavBarValue(newValue)}
              style={{
                paddingBottom: "10px",
                position: "fixed",
                bottom: 0,
                top: "auto",
                width: "100%",
                zIndex: 2,
              }}
            >
              {Object.keys(this.state.navBarItems).map((key) => (
                <BottomNavigationAction
                  label={this.state.navBarItems[key].label}
                  icon={this.state.navBarItems[key].icon}
                  value={this.state.navBarItems[key].value}
                />
              ))}
            </BottomNavigation>
          </Paper>
        </Paper>
      </ThemeProvider>
    );
  }
}

export default App;

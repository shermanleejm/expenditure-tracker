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
import { openDB } from "idb";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import PersonIcon from "@material-ui/icons/Person";

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

async function initDB() {
  var idb = await openDB("spending", 1);
}

// async function addToStore(value) {

//   db.put("spending", value)
//     .then((result) => {
//       console.log("success", result);
//     })
//     .catch((err) => console.log("error: ", err));

//   db.close();
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navBarValue: "addExpenditure",
      isDark: (localStorage.getItem("darkMode") == 'true'),
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
          component: <AddExpenditure />,
        },
        profile: {
          icon: <PersonIcon fontSize="Large" />,
          label: "Profile",
          value: "profile",
          component: <Profile toggleDM={this.toggleDarkMode} />,
        },
      },
    };
  }

  setNavBarValue(newValue) {
    this.setState({
      navBarValue: newValue,
    });
  }

  toggleDarkMode = () => {
    var oldState = this.state
    this.setState({
      isDark: !oldState.isDark,
    });
    localStorage.setItem("darkMode", JSON.stringify(!oldState.isDark));
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

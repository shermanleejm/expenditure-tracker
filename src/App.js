import React, { useState } from "react";
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
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";

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

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [showDrawer, toggleDrawer] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: isDark ? "dark" : "light",
      primary: {
        main: isDark ? "#3700B3" : "#6200EE",
      },
      secondary: {
        main: isDark ? "#03DAC6" : "#018786",
      },
    },
  });

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Paper color="primary" style={{ height: "100%" }}>
        <AppBar
          postition="static"
          color="primary"
          style={{ bottom: 0, top: "auto" }}
        >
          <Toolbar edge="start">
            <MenuIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                toggleDrawer(!showDrawer);
                console.log(showDrawer);
              }}
            />
            <Fab className={classes.fabButton} color="secondary">
              <AddIcon />
            </Fab>
            <div style={{ flexGrow: 1 }} />
            <Typography>Dark Mode</Typography>
            <Switch checked={isDark} onChange={() => setIsDark(!isDark)} />
          </Toolbar>
        </AppBar>
        {showDrawer && <List></List>}
      </Paper>
    </ThemeProvider>
  );
}

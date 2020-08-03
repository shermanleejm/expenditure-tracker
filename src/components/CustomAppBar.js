import React, { Component } from "react";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

const navBarItems = [
  {
    icon: <TrendingUpIcon fontSize="Large" />,
    title: "Overview",
    value: "overview",
  },
  {
    icon: <AddIcon fontSize="Large" />,
    title: "Add",
    value: "add",
  },
];

export default function CustomAppBar() {
  return (
    <Paper
      elevation={0}
      style={{ width: "100%", bottom: 0, position: "fixed", margin: "0 auto" }}
    >
      <Grid container direction="row" justify="space-evenly" spacing={3}>
        {navBarItems.map((item) => (
          <Grid direction="column">
            <Button size="large">
              {item.icon}
            </Button>

          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

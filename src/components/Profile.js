import React, { Component, useState } from "react";
import { Switch, Grid, Typography } from "@material-ui/core";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDark: localStorage.getItem("darkMode") == "true",
      useTestData: localStorage.getItem("useTestData") == "true",
    };
  }

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <Grid container direction="column" spacing={1}>
          <Grid
            item
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="p">Dark Mode</Typography>
            </Grid>
            <Grid item>
              <Switch
                checked={this.state.isDark}
                onClick={() => {
                  var oldState = this.state;
                  this.setState({
                    isDark: !oldState.isDark,
                  });
                  this.props.toggleDM();
                }}
                color="primary"
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="p">Use test data</Typography>
            </Grid>
            <Grid item>
              <Switch
                checked={this.state.useTestData}
                onClick={() => {
                  var oldState = this.state;
                  this.setState({
                    useTestData: !oldState.useTestData,
                  });
                  this.props.toggleTD();
                }}
                color="primary"
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Profile;

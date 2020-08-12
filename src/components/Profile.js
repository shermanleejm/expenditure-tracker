import React, { Component, useState } from "react";
import { Switch, Grid, Typography } from "@material-ui/core";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDark: localStorage.getItem("darkMode") == "true",
    };
  }

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <Grid
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
      </div>
    );
  }
}

export default Profile;

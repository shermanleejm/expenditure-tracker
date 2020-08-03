import React, { Component, useState } from "react";
import { Switch } from "@material-ui/core";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state={
      isDark: (localStorage.getItem("darkMode") == 'true')
    }
  }

  render() {

    return (
      <div style={{ height: "100%" }}>
        <Switch
          checked={this.state.isDark}
          onClick={() => {
            var oldState = this.state
            this.setState({
              isDark: !oldState.isDark
            })
            this.props.toggleDM();
          }}
          color="primary"
        />
      </div>
    );
  }
}

export default Profile;

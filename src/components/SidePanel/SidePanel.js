import React from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel";
import Channels from "./Channels";
import { connect } from "react-redux";
import DirectMessages from "./DirectMessages";

function SidePanel({ currentUser }) {
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ bacgrkound: "#4c3c4c", fontSize: "1.2rem" }}
    >
      <UserPanel currentUser={currentUser} />
      <Channels currentUser={currentUser} />
      <DirectMessages currentUser={currentUser} />
    </Menu>
  );
}

const mapStateFromProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateFromProps)(SidePanel);

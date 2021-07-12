import React from "react";
import { Dropdown, Grid, Header, Icon } from "semantic-ui-react";
import firebase from "../../firebase";
import { connect } from "react-redux";

function UserPanel({ currentUser }) {
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("Signed Out"));
  };
  const dropdownOptions = [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{currentUser.displayName}</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "avatar",
      text: <span>Change Avartar</span>,
    },
    {
      key: "signOut",
      text: <spa onClick={handleSignOut}>Sign Out</spa>,
    },
  ];
  return (
    <Grid style={{ background: "#4c3c4c" }}>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <Header.Content>DevChat</Header.Content>
          </Header>
        </Grid.Row>
        <Header style={{ padding: "0.25rem" }} as="h4" inverted>
          <Dropdown
            trigger={<span>{currentUser.displayName}</span>}
            options={dropdownOptions}
          />
        </Header>
      </Grid.Column>
    </Grid>
  );
}

const mapStateFromProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateFromProps)(UserPanel);

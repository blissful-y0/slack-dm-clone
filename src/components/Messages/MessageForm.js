import React, { useState } from "react";
import { Segment, Button, Input } from "semantic-ui-react";
import firebase from "../../firebase";

function MessageForm({ currentChannel, currentUser }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const messageRef = firebase.database().ref("messages");

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  // const createMessage = () => {
  //   const message = {
  //     content: message,
  //     // timestamp: firebase.database.ServerValue.TIMESTAMP,
  //     user: {
  //       id: currentUser.uid,
  //       name: currentUser.displayName,
  //       avatar: currentUser.photoURL,
  //     },
  //   };
  // };

  const sendMessage = () => {
    if (message) {
      setLoading(true);
      messageRef
        .child(currentChannel.id)
        .push()
        .set({
          content: message,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          user: {
            id: currentUser.uid,
            name: currentUser.displayName,
            avatar: currentUser.photoURL,
          },
        })
        .then(() => {
          setLoading(false);
          setMessage("");
          setErrors([]);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      console.log(errors);
      setErrors("Add a message");
    }
  };

  return (
    <Segment>
      <Input
        fluid
        name="message"
        style={{ marginBottom: "0.7em" }}
        label={<Button icon={"add"} />}
        labelPosition="left"
        placeholder="Wirte your message"
        onChange={handleInputChange}
        value={message}
      />
      <Button.Group icon widths="2">
        <Button
          onClick={sendMessage}
          color="orange"
          content="Add Reply"
          labelPosition="left"
          icon="edit"
          disabled={loading}
        />
        <Button
          color="teal"
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
        />
      </Button.Group>
    </Segment>
  );
}

export default MessageForm;

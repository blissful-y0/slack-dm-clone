import React, { Fragment } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import firebase from "../../firebase";

export default function Messages({ currentChannel, currentUser }) {
  const messageRef = firebase.database().ref("messages");

  return (
    <Fragment>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages"></Comment.Group>
      </Segment>
      <MessageForm
        currentChannel={currentChannel}
        messageRef={messageRef}
        currentUser={currentUser}
      />
    </Fragment>
  );
}

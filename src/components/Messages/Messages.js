import React, { Fragment, useEffect } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import firebase from "../../firebase";

export default function Messages({ currentChannel, currentUser }) {
  const messageRef = firebase.database().ref("messages");

  useEffect(() => {
    if (currentChannel && currentUser) {
      addListners(currentChannel.id);
    }
  }, []);

  const addListners = (channelId) => {
    let loadedMessages = [];
    messageRef.child(channelId).on("child_added", (snap) => {
      snap.push(loadedMessages);
      console.log(loadedMessages);
    });
  };

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

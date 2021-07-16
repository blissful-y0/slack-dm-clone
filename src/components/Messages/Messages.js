import React, { Fragment, useEffect, useState } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import firebase from "../../firebase";
import Message from "./Message";

export default function Messages({ currentChannel, currentUser }) {
  const messageRef = firebase.database().ref("messages");
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(true);

  useEffect(() => {
    if (currentChannel && currentUser) {
      addListners(currentChannel.id);
    }
  }, []);

  const addListners = (channelId) => {
    addMessageListneres(channelId);
  };

  const addMessageListneres = (channelId) => {
    let loadedMessages = [];
    messageRef.child(channelId).on("child_added", (snap) => {
      const data = snap.val();
      loadedMessages.push(data);
      setMessages(loadedMessages);
      setMessagesLoading(false);
    });
  };

  return (
    <Fragment>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages">
          {messages.map((message) => {
            <Comment key={message.timestamp}>
              <Comment.Avatar src={message.user.avatar} />
              <Comment.Content
                className={
                  message.user.uid === currentUser.uid ? "message__self" : ""
                }
              >
                <Comment.Text>{message.content}</Comment.Text>
              </Comment.Content>
            </Comment>;
          })}
        </Comment.Group>
      </Segment>
      <MessageForm
        currentChannel={currentChannel}
        messageRef={messageRef}
        currentUser={currentUser}
      />
    </Fragment>
  );
}

import React from "react";
import { Comment } from "semantic-ui-react";

export default function Message({ currentUser, message }) {
  console.log(message);

  return (
    <Comment>
      <Comment.Avatar src={message.user.avatar} />
      <Comment.Content className={1234}>
        <Comment.Text>{message.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
}

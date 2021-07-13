import React, { Fragment, useState } from "react";
import { Icon, Menu, Modal, Form, Input, Button } from "semantic-ui-react";
import firebase from "../../firebase";
import UserPanel from "./UserPanel";

function Channels({ currentUser }) {
  const [channels, setChannels] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [channelInfo, setChannelInfo] = useState({
    channelName: "",
    channelDetails: "",
  });
  const channelsRef = firebase.database().ref("channels");

  const onClickModalOpen = () => setModalOpen((prev) => !prev);

  const handleChange = (event) => {
    setChannelInfo({ ...channelInfo, [event.target.name]: event.target.value });
  };

  const addChannel = () => {
    const key = channelsRef.push().key;
    const newChannel = {
      id: key,
      name: channelInfo.channelName,
      details: channelInfo.channelDetails,
      createdBy: {
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      },
    };
    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        setChannelInfo({
          channelName: "",
          channelDetails: "",
        });
        onClickModalOpen();
        console.log("channel added");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (channelInfo.channelName && channelInfo.channelDetails) {
      addChannel();
    } else {
      console.log("Fill");
    }
  };

  return (
    <Fragment>
      {
        <Modal basic open={modalOpen} onClose={onClickModalOpen}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={handleSubmit}>
              <Icon name="checkmark" />
              Add
            </Button>
            <Button color="red" inverted>
              <Icon onClick={onClickModalOpen} name="remove" />
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      }
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>{" "}
          ({channels.length}) <Icon name="add" onClick={onClickModalOpen} />
        </Menu.Item>
        {channels}
      </Menu.Menu>
    </Fragment>
  );
}

export default Channels;

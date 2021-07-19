import React from "react";
import { Icon, Menu, Modal, Form, Input, Button } from "semantic-ui-react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setCurrentChannel, setPrivateChannel } from "../../actions";

class Channels extends React.Component {
  state = {
    activeChannel: "",
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetails: "",
    channelsRef: firebase.database().ref("channels"),
    modal: false,
    firstLoad: true,
  };

  componentDidMount() {
    this.addListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    let loadedChannels = [];
    this.state.channelsRef.on("child_added", (snap) => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
    });
  };

  removeListeners = () => {
    this.state.channelsRef.off();
  };

  setFirstChannel = () => {
    const firstChannel = this.state.channels[0];
    if (this.state.firstLoad && this.state.channels.length > 0) {
      this.props.setCurrentChannel(firstChannel);
      this.setActiveChannel(firstChannel);
    }
    this.setState({ firstLoad: false });
  };

  addChannel = () => {
    const { channelsRef, channelName, channelDetails, user } = this.state;

    const key = channelsRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL,
      },
    };

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: "", channelDetails: "" });
        this.closeModal();
        console.log("channel added");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeChannel = (channel) => {
    this.setActiveChannel(channel);
    this.props.setCurrentChannel(channel);
    this.props.setPrivateChannel(false);
  };

  setActiveChannel = (channel) => {
    this.setState({ activeChannel: channel.id });
  };

  displayChannels = (channels) =>
    channels.length > 0 &&
    channels.map((channel) => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        actvie={channel.id === this.state.activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ));

  isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  render() {
    const { channels, modal } = this.state;

    return (
      <React.Fragment>
        <Menu.Menu className="menu">
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{" "}
            ({channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {this.displayChannels(channels)}
        </Menu.Menu>

        {/* Add Channel Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(
  Channels
);

// function Channels({ currentUser }) {
//   useEffect(() => {
//     let loadedChannels = [];
//     channelsRef.on("child_added", (snapShot) => {
//       const data = snapShot.val();
//       loadedChannels.push(data);
//     });
//     setChannels(loadedChannels);
//   }, []);

//   const [channels, setChannels] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [channelInfo, setChannelInfo] = useState({
//     channelName: "",
//     channelDetails: "",
//   });
//   const channelsRef = firebase.database().ref("channels");

//   const onClickModalOpen = () => setModalOpen((prev) => !prev);

//   const handleChange = (event) => {
//     setChannelInfo({ ...channelInfo, [event.target.name]: event.target.value });
//   };

//   const addChannel = () => {
//     const key = channelsRef.push().key;
//     const newChannel = {
//       id: key,
//       name: channelInfo.channelName,
//       details: channelInfo.channelDetails,
//       createdBy: {
//         name: currentUser.displayName,
//         avatar: currentUser.photoURL,
//       },
//     };
//     channelsRef
//       .child(key)
//       .update(newChannel)
//       .then(() => {
//         setChannelInfo({
//           channelName: "",
//           channelDetails: "",
//         });
//         onClickModalOpen();
//         console.log("channel added");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (channelInfo.channelName && channelInfo.channelDetails) {
//       addChannel();
//     } else {
//       console.log("Fill");
//     }
//   };

//   const displayChannels = (channels) => {
//     channels.length > 0 &&
//       channels.map((channel) => (
//         <Menu.Item
//           key={channel.id}
//           onClick={() => console.log(channel)}
//           name={channel.name}
//           style={{ opacity: 0.7 }}
//         >
//           # {channel.name}
//         </Menu.Item>
//       ));
//   };

//   return (
//     <Fragment>
//       {
//         <Modal basic open={modalOpen} onClose={onClickModalOpen}>
//           <Modal.Header>Add a Channel</Modal.Header>
//           <Modal.Content>
//             <Form onSubmit={handleSubmit}>
//               <Form.Field>
//                 <Input
//                   fluid
//                   label="Name of Channel"
//                   name="channelName"
//                   onChange={handleChange}
//                 />
//               </Form.Field>
//               <Form.Field>
//                 <Input
//                   fluid
//                   label="About the Channel"
//                   name="channelDetails"
//                   onChange={handleChange}
//                 />
//               </Form.Field>
//             </Form>
//           </Modal.Content>
//           <Modal.Actions>
//             <Button color="green" inverted onClick={handleSubmit}>
//               <Icon name="checkmark" />
//               Add
//             </Button>
//             <Button color="red" inverted>
//               <Icon onClick={onClickModalOpen} name="remove" />
//               Cancel
//             </Button>
//           </Modal.Actions>
//         </Modal>
//       }
//       <Menu.Menu style={{ paddingBottom: "2em" }}>
//         <Menu.Item>
//           <span>
//             <Icon name="exchange" /> CHANNELS
//           </span>{" "}
//           ({channels.length}) <Icon name="add" onClick={onClickModalOpen} />
//         </Menu.Item>
//         {displayChannels(channels)}
//       </Menu.Menu>
//     </Fragment>
//   );
// }

// export default Channels;

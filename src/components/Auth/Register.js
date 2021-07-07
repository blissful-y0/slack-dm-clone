import React, { useState } from "react";
import firebase from "../../firebase";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

export function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data.username);
  };

  const handleChange = (event) => {
    const userData = {
      ...data,
      [event.target.name]: event.target.value,
    };
    setData(userData);
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Register for DevChat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={handleChange}
              type="text"
            />
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={handleChange}
              type="email"
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={handleChange}
              type="password"
            />
            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="lock"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={handleChange}
              type="password"
            />
            <Button color="orange" fluid size="large">
              Submit
            </Button>
          </Segment>
        </Form>
        <Message error>
          <h3>Error</h3>
        </Message>
        <Message>
          Already a User? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
export default Register;

// displayErrors = (errors) =>
//   errors.map((error, i) => <p key={i}>{error.message}</p>);

// isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
//   return (
//     !username.length ||
//     !email.length ||
//     !password.length ||
//     !passwordConfirmation.length
//   );
// };

// isPasswordValid = ({ password, passwordConfirmation }) => {
//   if (password.length < 6 || passwordConfirmation.length < 6) {
//     return false;
//   } else if (password !== passwordConfirmation) {
//     return false;
//   } else {
//     return true;
//   }
// };

// handleChange = (event) => {
//   this.setState({ [event.target.name]: event.target.value });
// };

// handleSubmit = (event) => {
//   event.preventDefault();
//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(this.state.email, this.state.password)
//     .then((userCredential) => {
//       console.log(userCredential);
//     })
//     .catch((error) => {
//       console.error(error.message);
//     });
// };

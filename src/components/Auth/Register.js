import React, { useState } from "react";
import firebase from "../../firebase";
import "firebase/database";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import md5 from "md5";
import { Link } from "react-router-dom";

export function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const database = firebase.database().ref("users/");

  const saveUser = (user) => {
    return database.child(user.uid).set({
      name: user.displayName,
      avartar: user.photoURL,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        user
          .updateProfile({
            displayName: data.username,
            photoURL: `http://gravatar.com/avatar/${md5(
              data.email
            )}?d=identicon`,
          })
          .then(() =>
            saveUser(user).then(() => {
              console.log("User Saved");
              setLoading(false);
            })
          )
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, ":", errorMessage);
        setLoading(false);
      });
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
            <Button
              disabled={loading}
              className={loading ? "Loading" : ""}
              color="orange"
              fluid
              size="large"
            >
              Submit
            </Button>
          </Segment>
        </Form>
        {/* {errorMessage === null ? (
          <div></div>
        ) : (
          <Message error>
            <h3>Error</h3>
            <h2>{errorMessage}</h2>
          </Message>
        )} */}
        <Message>
          Already a User? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
export default Register;

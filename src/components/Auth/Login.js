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
import { Link } from "react-router-dom";

export function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((signInUser) => {
        console.log(signInUser);
      })
      .catch((error) => {
        console.log(error);
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
        <Header as="h2" icon color="violet" textAlign="center">
          <Icon name="code branch" color="violet" />
          Login to DevChat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
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
            <Button
              disabled={loading}
              className={loading ? "Loading" : ""}
              color="violet"
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
          Don't have an account? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
export default Login;

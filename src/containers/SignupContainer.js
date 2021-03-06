import React from "react";
import { withRouter } from "react-router";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
import AuthService from "../services/AuthService";

class Signup extends React.Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    // console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSignUp = e => {
    console.log("Signup fired");
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const first_name = this.state.first_name;
    const last_name = this.state.last_name;
    const email = this.state.email;

    username &&
      password &&
      fetch("https://flatxpo-api.herokuapp.com/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          user: {
            username,
            password,
            first_name,
            last_name,
            email
          }
        })
      })
        .then(() => this.Auth.login(this.state.username, this.state.password))
        .then(() => this.props.history.replace("/"))
        .catch(err => {
          alert(err);
          this.props.history.replace("/signup");
        });
  };

  render() {
    return (
      <div className="login-form">
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}

        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" textAlign="center">
              <Image src={require("../assets/wireframe/boolean-icing.png")} />{" "}
              Create your account
            </Header>
            <Form size="large" onSubmit={this.handleSignUp}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="First name"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Last name"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />

                <Button color="blue" fluid size="large">
                  Sign Up
                </Button>
              </Segment>
            </Form>
            <Message>
              Already signed up with us?{" "}
              <a onClick={() => this.props.history.push("/login")}>Login</a> or{" "}
              <a onClick={() => this.props.history.push("/")}>Home</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default withRouter(Signup);

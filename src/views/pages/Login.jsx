/*!

=========================================================
* Argon Dashboard PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";
import NotificationAlert from "react-notification-alert";
// core components
import AuthHeader from "components/Headers/AuthHeader.jsx";
import axios from "axios";
import FadeIn from "react-fade-in";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    submitting: false,
    errorMessage: "Please fill out both inputs!",
    error: false,
  };

  componentDidMount = () => {
    if (localStorage.getItem("golfx_token")) {
      console.log("take me to dash");
      window.location.href = "/admin/calendar";
    }
  };

  Login = (e) => {
    e.preventDefault();

    let user = { email: "jp ", name: "jp " };
    this.props.creds(user);

    this.setState({ submitting: true });
    this.setState({ error: false });
    //  log input
    // console.log(this.state.password)
    // console.log(this.state.username)

    if (this.state.password === "" || this.state.username === "") {
      console.log("missing data");

      this.setState({
        errorMessage: "Please fill out both inputs!",
        error: true,
      });
      this.setState({ submitting: false });
    } else {
      console.log("login in");

      axios
        .post(
          "https://golfx-fitting-db-ddbaf77fdd8d.herokuapp.com/api/auth/local",
          {
            identifier: this.state.username,
            password: this.state.password,
          }
        )
        .then((response) => {
          // Handle success.
          console.log("Well done!");
          console.log("User profile", response.data.user);
          console.log("User token", response.data.jwt);
          this.setState({ submitting: false });

          localStorage.setItem(
            "golfx_user",
            JSON.stringify(response.data.user)
          );
          localStorage.setItem(
            "golfx_token",
            JSON.stringify(response.data.jwt)
          );
          window.location.href = "/admin/calendar";
        })
        .catch((error) => {
          // Handle error.
          console.log("An error occurred:", error);
          this.setState({
            errorMessage: "Username or password was incorrect!",
            error: true,
          });
          this.setState({ submitting: false });
        });
    }
  };

  render() {
    return (
      <>
        <AuthHeader title="Welcome!" lead="KBS" />
        <NotificationAlert ref="notificationAlert" />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Alert color="warning" isOpen={this.state.error} fade={true}>
                <span className="alert-inner--icon">
                  <i className="ni ni-sound-wave" />
                </span>{" "}
                <span className="alert-inner--text">
                  <strong>Error!</strong> {this.state.errorMessage}
                </span>
              </Alert>
              <FadeIn>
                <Card className="bg-secondary border-0 mb-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    {/* <div className="text-center text-muted mb-4">
                    <small>sign in </small>
                  </div> */}
                    <Form role="form">
                      <FormGroup
                        className={classnames("mb-3", {
                          focused: this.state.focusedEmail,
                        })}
                      >
                        <InputGroup className="input-group-merge input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            value={this.state.username}
                            onChange={(e) =>
                              this.setState({ username: e.target.value })
                            }
                            // onFocus={() => this.setState({ focusedEmail: true })}
                            // onBlur={() => this.setState({ focusedEmail: false })}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup
                        className={classnames({
                          focused: this.state.focusedPassword,
                        })}
                      >
                        <InputGroup className="input-group-merge input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            value={this.state.password}
                            onChange={(e) => {
                              this.setState({ password: e.target.value });
                            }}
                            // onFocus={() =>
                            //   this.setState({ focusedPassword: true })
                            // }
                            // onBlur={() =>
                            //   this.setState({ focusedPassword: false })
                            // }
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id=" customCheckLogin"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor=" customCheckLogin"
                        >
                          <span className="text-muted">Remember me</span>
                        </label>
                      </div>

                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="info"
                          type="button"
                          disabled={this.state.submitting}
                          onClick={(e) => this.Login(e)}
                        >
                          Sign in
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </FadeIn>
              <Row className="mt-3">
                {/* forgot password  */}
                {/* <Col xs="6">
                  <a
                    className="text-light"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <small>Forgot password?</small>
                  </a>
                </Col> */}
                {/* <Col className="text-right" xs="6">
                  <a
                    className="text-light"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <small>Create new account</small>
                  </a>
                </Col> */}
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Login;

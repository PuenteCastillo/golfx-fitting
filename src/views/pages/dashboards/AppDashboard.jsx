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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Form,
  Input,
  ListGroupItem,
  ListGroup,
  Media,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import AlternativeHeader from "components/Headers/AlternativeHeader.jsx";
// core components
import CardsHeader from "components/Headers/CardsHeader.jsx";

import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.jsx";

import { creds } from "variables/general";

class AppDashboard extends React.Component {
  state = {
    activeNav: 1,
    chartExample1Data: "data1"
  };
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };
  componentWillMount() {
    console.log(creds);
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  render() {
    return (
      <>
      {/* <AlternativeHeader /> */}
        <CardsHeader parentName="Dashboard" />
        {/* <CardsHeader name="Default" parentName="Dashboards" /> */}
        <Container className="mt--6" fluid>
          <Row>
            <Col xl="8">
              <Card className="bg-default">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-light text-uppercase ls-1 mb-1">
                        Overview
                      </h6>
                      <h5 className="h3 text-white mb-0">Sales value</h5>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem className="mr-2 mr-md-0">
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 2
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Line
                      data={chartExample1[this.state.chartExample1Data]}
                      options={chartExample1.options}
                      id="chart-sales-dark"
                      className="chart-canvas"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card>
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h5 className="h3 mb-0">Total orders</h5>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Bar
                      data={chartExample2.data}
                      options={chartExample2.options}
                      className="chart-canvas"
                      id="chart-bars"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl="4">
              <Card>
                <CardHeader>
                  <h5 className="h3 mb-0">Team members</h5>
                </CardHeader>

                <CardBody>
                  <ListGroup className="list my--3" flush>
                    <ListGroupItem className="px-0">
                      <Row className="align-items-center">
                        <Col className="col-auto">
                          <a
                            className="avatar rounded-circle"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/team-1.jpg")}
                            />
                          </a>
                        </Col>
                        <div className="col ml--2">
                          <h4 className="mb-0">
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                              John Michael
                            </a>
                          </h4>
                          <span className="text-success">●</span>{" "}
                          <small>Online</small>
                        </div>
                        <Col className="col-auto">
                          <Button color="primary" size="sm" type="button">
                            Add
                          </Button>
                        </Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem className="px-0">
                      <Row className="align-items-center">
                        <Col className="col-auto">
                          <a
                            className="avatar rounded-circle"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/team-2.jpg")}
                            />
                          </a>
                        </Col>
                        <div className="col ml--2">
                          <h4 className="mb-0">
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                              Alex Smith
                            </a>
                          </h4>
                          <span className="text-warning">●</span>{" "}
                          <small>In a meeting</small>
                        </div>
                        <Col className="col-auto">
                          <Button color="primary" size="sm" type="button">
                            Add
                          </Button>
                        </Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem className="px-0">
                      <Row className="align-items-center">
                        <Col className="col-auto">
                          <a
                            className="avatar rounded-circle"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/team-3.jpg")}
                            />
                          </a>
                        </Col>
                        <div className="col ml--2">
                          <h4 className="mb-0">
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                              Samantha Ivy
                            </a>
                          </h4>
                          <span className="text-danger">●</span>{" "}
                          <small>Offline</small>
                        </div>
                        <Col className="col-auto">
                          <Button color="primary" size="sm" type="button">
                            Add
                          </Button>
                        </Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem className="px-0">
                      <Row className="align-items-center">
                        <Col className="col-auto">
                          <a
                            className="avatar rounded-circle"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/team-4.jpg")}
                            />
                          </a>
                        </Col>
                        <div className="col ml--2">
                          <h4 className="mb-0">
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                              John Michael
                            </a>
                          </h4>
                          <span className="text-success">●</span>{" "}
                          <small>Online</small>
                        </div>
                        <Col className="col-auto">
                          <Button color="primary" size="sm" type="button">
                            Add
                          </Button>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  </ListGroup>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card>
                <CardHeader>
                  <h5 className="h3 mb-0">To do list</h5>
                </CardHeader>

                <CardBody className="p-0">
                  <ListGroup data-toggle="checklist" flush>
                    <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                      <div className="checklist-item checklist-item-success checklist-item-checked">
                        <div className="checklist-info">
                          <h5 className="checklist-title mb-0">
                            Call with Dave
                          </h5>
                          <small>10:30 AM</small>
                        </div>
                        <div>
                          <div className="custom-control custom-checkbox custom-checkbox-success">
                            <input
                              className="custom-control-input"
                              defaultChecked
                              id="chk-todo-task-1"
                              type="checkbox"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="chk-todo-task-1"
                            />
                          </div>
                        </div>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                      <div className="checklist-item checklist-item-warning">
                        <div className="checklist-info">
                          <h5 className="checklist-title mb-0">
                            Lunch meeting
                          </h5>
                          <small>10:30 AM</small>
                        </div>
                        <div>
                          <div className="custom-control custom-checkbox custom-checkbox-warning">
                            <input
                              className="custom-control-input"
                              id="chk-todo-task-2"
                              type="checkbox"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="chk-todo-task-2"
                            />
                          </div>
                        </div>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                      <div className="checklist-item checklist-item-info">
                        <div className="checklist-info">
                          <h5 className="checklist-title mb-0">
                            Argon Dashboard Launch
                          </h5>
                          <small>10:30 AM</small>
                        </div>
                        <div>
                          <div className="custom-control custom-checkbox custom-checkbox-info">
                            <input
                              className="custom-control-input"
                              id="chk-todo-task-3"
                              type="checkbox"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="chk-todo-task-3"
                            />
                          </div>
                        </div>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                      <div className="checklist-item checklist-item-danger checklist-item-checked">
                        <div className="checklist-info">
                          <h5 className="checklist-title mb-0">
                            Winter Hackaton
                          </h5>
                          <small>10:30 AM</small>
                        </div>
                        <div>
                          <div className="custom-control custom-checkbox custom-checkbox-danger">
                            <input
                              className="custom-control-input"
                              defaultChecked
                              id="chk-todo-task-4"
                              type="checkbox"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="chk-todo-task-4"
                            />
                          </div>
                        </div>
                      </div>
                    </ListGroupItem>
                  </ListGroup>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card>
                <CardHeader>
                  <h5 className="h3 mb-0">Progress track</h5>
                </CardHeader>

                <CardBody>
                  <ListGroup className="list my--3" flush>
                    <ListGroupItem className="px-0">
                      <Row className="align-items-center">
                        <Col className="col-auto">
                          <a
                            className="avatar rounded-circle"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/bootstrap.jpg")}
                            />
                          </a>
                        </Col>
                        <div className="col">
                          <h5>Argon Design System</h5>
                          <Progress
                            className="progress-xs mb-0"
                            color="orange"
                            max="100"
                            value="60"
                          />
                        </div>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem className="px-0">
                      <Row className="align-items-center">
                        <Col className="col-auto">
                          <a
                            className="avatar rounded-circle"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/angular.jpg")}
                            />
                          </a>
                        </Col>
                        <div className="col">
                          <h5>Angular Now UI Kit PRO</h5>
                          <Progress
                            className="progress-xs mb-0"
                            color="success"
                            max="100"
                            value="100"
                          />
                        </div>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem className="px-0">
                      <Row className="align-items-center">
                        <Col className="col-auto">
                          <a
                            className="avatar rounded-circle"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/sketch.jpg")}
                            />
                          </a>
                        </Col>
                        <div className="col">
                          <h5>Black Dashboard</h5>
                          <Progress
                            className="progress-xs mb-0"
                            color="danger"
                            max="100"
                            value="72"
                          />
                        </div>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem className="px-0">
                      <Row className="align-items-center">
                        <Col className="col-auto">
                          <a
                            className="avatar rounded-circle"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/react.jpg")}
                            />
                          </a>
                        </Col>
                        <div className="col">
                          <h5>React Material Dashboard</h5>
                          <Progress
                            className="progress-xs mb-0"
                            color="info"
                            max="100"
                            value="90"
                          />
                        </div>
                      </Row>
                    </ListGroupItem>
                  </ListGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl="5">
             
            </Col>
          
          </Row>
         
        </Container>
      </>
    );
  }
}

export default AppDashboard;

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
// JavaScript library that creates a callendar with events
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Modal,
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
// core components

import { events } from "variables/general.jsx";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
let calendar;

class CalendarView extends React.Component {
  state = {
    events: events,
    alert: null,
    fittings: null,
  };
  componentDidMount() {
    let myState = this;
    // console.log('state.events', this.state.events)
    axios({
      method: "GET",
      url: "https://golfx-fitting-db-ddbaf77fdd8d.herokuapp.com/api/fittings?populate=*",
    })
      .then(function (response) {
        console.log("response", response);
        // for each item in response.data.data combine .id and .attributes
        for (let i = 0; i < response.data.data.length; i++) {
          response.data.data[i] = {
            ...response.data.data[i].attributes,
            id: response.data.data[i].id,
          };
        }
        console.log("response.data.data", response.data.data);
        // Use .createdAt to sort fittings by date and keep the 10 most recent fittings
        response.data.data.sort(function (a, b) {
          return new Date(b.fitting_date) - new Date(a.fitting_date);
        });
        response.data.data = response.data.data.slice(0, 5);
        console.log("response.data.data", response.data.data);

        myState.setState({ fittings: response.data.data });
        // console.log("fittings", myState.state.fittings);
        myState.convertToEvent(myState.state.fittings);
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  convertToEvent = (info) => {
    let event = [];

    let data = info;
    console.log("esdafsd", data);

    for (let i = 0; i < data.length; i++) {
      console.log("real datadata", data[i]);

      let full_name =
        data[i].customers.data[0].attributes.name_first +
        " " +
        data[i].customers.data[0].attributes.name_last;
      console.log("full name", full_name);
      let item = {
        id: data[i].id,
        title: full_name || "N/A",
        start: data[i].fitting_date,
        allDay: false,
        className: "bg-" + data[i].status_color,
        description: data[i].fitting_notes || "N/A",
      };
      // console.log('item', item)
      console.log(item.start);
      event.push(item);
    }
    console.log("events", event);

    this.setState({ events: event });
    // console.log('state after items pushed', this.state.events)
    // setTimeout(this.createCalendar(), 1000);
    this.createCalendar();
  };

  createCalendar = () => {
    console.log("is this being called correctly?", this.state.events);
    calendar = new Calendar(this.refs.calendar, {
      plugins: [interaction, dayGridPlugin],
      defaultView: "dayGridMonth",
      selectable: true,
      selectHelper: true,
      editable: true,
      events: this.state.events,

      eventClick: ({ event }) => {
        // console.log(event._def.extendedProps.description);
        this.setState({
          modalChange: true,
          eventId: event.id,
          eventTitle: event.title,
          eventDescription: event._def.extendedProps.description,
          radios: "bg-info",
          event: event,
        });
      },
    });
    calendar.render();
    // console.log('state in create calendar', calendar.render())
    this.setState({
      currentDate: calendar.view.title,
    });
  };
  changeView = (newView) => {
    calendar.changeView(newView);
    this.setState({
      currentDate: calendar.view.title,
    });
  };
  addNewEvent = () => {
    var newEvents = this.state.events;
    // console.log('what is this',newEvents);
    newEvents.push({
      title: this.state.eventTitle,
      start: this.state.startDate,
      end: this.state.endDate,
      className: this.state.radios,
      id: this.state.events[this.state.events.length - 1] + 1,
    });
    calendar.addEvent({
      title: this.state.eventTitle,
      start: this.state.startDate,
      end: this.state.endDate,
      className: this.state.radios,
      id: this.state.events[this.state.events.length - 1] + 1,
    });
    this.setState({
      modalAdd: false,
      events: newEvents,
      startDate: undefined,
      endDate: undefined,
      radios: "bg-info",
      eventTitle: undefined,
    });
  };

  changeEvent = () => {
    var newEvents = this.state.events.map((prop, key) => {
      if (prop.id + "" === this.state.eventId + "") {
        this.state.event.remove();
        calendar.addEvent({
          ...prop,
          title: this.state.eventTitle,
          className: this.state.radios,
          description: this.state.eventDescription,
        });
        return {
          ...prop,
          title: this.state.eventTitle,
          className: this.state.radios,
          description: this.state.eventDescription,
        };
      } else {
        return prop;
      }
    });
    this.setState({
      modalChange: false,
      events: newEvents,
      radios: "bg-info",
      eventTitle: undefined,
      eventDescription: undefined,
      eventId: undefined,
      event: undefined,
    });
  };
  deleteEventSweetAlert = () => {
    this.setState({
      alert: (
        <ReactBSAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Are you sure?"
          onConfirm={() =>
            this.setState({
              alert: false,
              radios: "bg-info",
              eventTitle: undefined,
              eventDescription: undefined,
              eventId: undefined,
            })
          }
          onCancel={() => this.deleteEvent()}
          confirmBtnCssClass="btn-secondary"
          cancelBtnBsStyle="danger"
          confirmBtnText="Cancel"
          cancelBtnText="Yes, delete it"
          showCancel
          btnSize=""
        >
          You won't be able to revert this!
        </ReactBSAlert>
      ),
    });
  };
  deleteEvent = () => {
    var newEvents = this.state.events.filter(
      (prop) => prop.id + "" !== this.state.eventId
    );
    this.state.event.remove();
    this.setState({
      alert: (
        <ReactBSAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Success"
          onConfirm={() => this.setState({ alert: null })}
          onCancel={() => this.setState({ alert: null })}
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          A few words about this sweet alert ...
        </ReactBSAlert>
      ),
      modalChange: false,
      events: newEvents,
      radios: "bg-info",
      eventTitle: undefined,
      eventDescription: undefined,
      eventId: undefined,
      event: undefined,
    });
  };
  render() {
    return (
      <>
        {this.state.alert}
        <div className="header header-dark bg-white pb-6 content__title content__title--calendar">
          <Container fluid>
            <div className="header-body">
              <Row className="align-items-center py-4">
                <Col lg="6">
                  <h6 className="fullcalendar-title h2 text-black d-inline-block mb-0 mr-1">
                    {this.state.currentDate}
                  </h6>
                  <Breadcrumb
                    className="d-none d-md-inline-block ml-lg-4"
                    listClassName="breadcrumb-links breadcrumb-dark"
                  ></Breadcrumb>
                </Col>
                <Col className="mt-3 mt-md-0 text-md-right" lg="6">
                  <Button
                    className="fullcalendar-btn-prev btn-neutral"
                    color="default"
                    onClick={() => {
                      calendar.next();
                      this.changeView("dayGridMonth");
                    }}
                    size="sm"
                  >
                    <i className="fas fa-angle-left" />
                  </Button>
                  <Button
                    className="fullcalendar-btn-next btn-neutral"
                    color="default"
                    onClick={() => {
                      calendar.prev();
                      this.changeView("dayGridMonth");
                    }}
                    size="sm"
                  >
                    <i className="fas fa-angle-right" />
                  </Button>
                  {/* <Button
                    className="btn-neutral"
                    color="default"
                    data-calendar-view="month"
                    onClick={() => this.changeView("dayGridMonth")}
                    size="sm"
                  >
                    Month
                  </Button> */}
                  {/* <Button
                    className="btn-neutral"
                    color="default"
                    data-calendar-view="basicWeek"
                    onClick={() => this.changeView("dayGridWeek")}
                    size="sm"
                  >
					Week
					//this is a comment to add to heroku
                  </Button>
                  <Button
                    className="btn-neutral"
                    color="default"
                    data-calendar-view="basicDay"
                    onClick={() => this.changeView("dayGridDay")}
                    size="sm"
                  >
                    Day
                  </Button> */}
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <Container className="mt--6" fluid>
          <Row>
            <div className="col">
              <Card className="card-calendar">
                <CardHeader>
                  <h5 className="h3 mb-0">Calendar</h5>
                </CardHeader>
                <CardBody className="p-0">
                  <div
                    className="calendar"
                    data-toggle="calendar"
                    id="calendar"
                    ref="calendar"
                  />
                </CardBody>
              </Card>
              <Modal
                isOpen={this.state.modalAdd}
                toggle={() => this.setState({ modalAdd: false })}
                className="modal-dialog-centered modal-secondary"
              >
                <div className="modal-body">
                  <form className="new-event--form">
                    <FormGroup>
                      <label className="form-control-label">Event title</label>
                      <Input
                        className="form-control-alternative new-event--title"
                        placeholder="Event Title"
                        type="text"
                        onChange={(e) =>
                          this.setState({ eventTitle: e.target.value })
                        }
                      />
                    </FormGroup>
                    <FormGroup className="mb-0">
                      <label className="form-control-label d-block mb-3">
                        Status color
                      </label>
                      <ButtonGroup
                        className="btn-group-toggle btn-group-colors event-tag"
                        data-toggle="buttons"
                      >
                        <Button
                          className={classnames("bg-info", {
                            active: this.state.radios === "bg-info",
                          })}
                          color=""
                          type="button"
                          onClick={() => this.setState({ radios: "bg-info" })}
                        />
                        <Button
                          className={classnames("bg-warning", {
                            active: this.state.radios === "bg-warning",
                          })}
                          color=""
                          type="button"
                          onClick={() =>
                            this.setState({ radios: "bg-warning" })
                          }
                        />
                        <Button
                          className={classnames("bg-danger", {
                            active: this.state.radios === "bg-danger",
                          })}
                          color=""
                          type="button"
                          onClick={() => this.setState({ radios: "bg-danger" })}
                        />
                        <Button
                          className={classnames("bg-success", {
                            active: this.state.radios === "bg-success",
                          })}
                          color=""
                          type="button"
                          onClick={() =>
                            this.setState({ radios: "bg-success" })
                          }
                        />
                        <Button
                          className={classnames("bg-default", {
                            active: this.state.radios === "bg-default",
                          })}
                          color=""
                          type="button"
                          onClick={() =>
                            this.setState({ radios: "bg-default" })
                          }
                        />
                        <Button
                          className={classnames("bg-primary", {
                            active: this.state.radios === "bg-primary",
                          })}
                          color=""
                          type="button"
                          onClick={() => {
                            this.setState({ radios: "bg-primary" });
                          }}
                        />
                      </ButtonGroup>
                    </FormGroup>
                  </form>
                </div>
                <div className="modal-footer">
                  <Button
                    className="new-event--add"
                    color="primary"
                    type="button"
                    onClick={this.addNewEvent}
                  >
                    Add event
                  </Button>
                  <Button
                    className="ml-auto"
                    color="link"
                    type="button"
                    onClick={() => this.setState({ modalAdd: false })}
                  >
                    Close
                  </Button>
                </div>
              </Modal>
              <Modal
                isOpen={this.state.modalChange}
                toggle={() => this.setState({ modalChange: false })}
                className="modal-dialog-centered modal-secondary"
              >
                <div className="modal-header">
                  <h6 className="modal-title" id="modal-title-default">
                    Fitting for {this.state.eventTitle}
                  </h6>
                  <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => this.toggleModal("defaultModal")}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <h3>Golfer notes</h3>
                  <p>{this.state.eventDescription || "N/A"}</p>
                </div>
                <div className="modal-footer">
                  <Link
                    to={{
                      pathname: `/admin/fittingSheetView/` + this.state.eventId,
                    }}
                  >
                    <Button
                      className={classnames({
                        Force_hide:
                          JSON.parse(localStorage.getItem("golfx_user"))
                            .position === "Sales",
                      })}
                      color="primary"
                      type="button"
                    >
                      View Fitting
                    </Button>
                  </Link>
                  <Button
                    className="ml-auto"
                    color="link"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => this.setState({ modalChange: false })}
                  >
                    Close
                  </Button>
                </div>
              </Modal>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default CalendarView;

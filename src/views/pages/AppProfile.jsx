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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  FormGroup,
  Form,
  Input,
  ListGroupItem,
  ListGroup,
  Progress,
  Container,
  Row,
  Col,
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  UncontrolledTooltip,
  Modal,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
// core components
import ProfileHeader from "components/Headers/ProfileHeader.jsx";
import axios from 'axios';
import { dataTable } from "variables/general";
import LoadingScreen from "./LoadingScreen";
import { Link, Redirect } from "react-router-dom";
import moment from 'moment';
import classnames from "classnames";
import ReactDatetime from "react-datetime";

class AppProfile extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      show_update_BTN: false,
      fitting: [],
      data: false,
      showLoad: true,
      pic: '',
      fullName: '',
      dataRetrieve: false,
      Fitting_Notes: '',
      fittingModal: false,
      new_fitting_date: moment().format(),
      updateInfo:[]
    }

  }
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  componentDidMount = () => {

    const { id } = this.props.match.params
    let profile = dataTable.find(x => x.id === id);

    axios.get(`https://kbsgolfx-db.herokuapp.com/customers/` + id)
      // axios.get(`http://localhost:1337/restaurants/`)
      .then(res => {
        const profile = res.data;
        let fullName = profile.name_first + ' ' + profile.name_last;
        this.setState({ profile: profile, updateInfo: profile.updates, data: true, showLoad: false, fullName: fullName, fittings: profile.fittings, Fitting_Notes: profile.fitting_notes, dataRetrieve: true });
        localStorage.setItem('customer_info', JSON.stringify(profile));



      })
  }

  renderImg = () => {

    if (this.state.data) {
      let addOn = "";
      let link = 'http://localhost:1337';
      // if img exisit use it 
      if (this.state.profile.picture) {
        console.log('it exist');
        console.log(this.state.profile.fitting_notes);
        addOn = this.state.profile.picture.url;
        link += addOn;
      } else {
        // else use default img
        link = "https://cdn4.vectorstock.com/i/1000x1000/35/53/person-icon-female-user-profile-avatar-vector-18833553.jpg";
        console.log(" doesn't Exits");

      }
      console.log(this.state.profile);

      console.log(link);
      return (
        <img
          alt="..."
          className="rounded-circle"
          src={link}
        />
      )
    }

  }


  make_a_fitting = (e) => {
    e.preventDefault();
    this.setState({ showLoad: true });
    let thisisit = this;

 
    axios({
      method: "post",
      url: "https://kbsgolfx-db.herokuapp.com/fittings",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("golfx_token")
        )}`
      },
      data: {
        fitting_date: thisisit.state.new_fitting_date,
        customer: {
          id: this.state.profile.id
        },
        status: 'Ready For Fitting',
        status_color: 'success',

      }
    })
      .then(function (response) {
        console.log(response);
        thisisit.update_Activity('fas fa-file-alt', 'Fitting Created', "warning");
      })
      .catch(function (error) {
        console.log(error.response);
      });



  }



  // ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗     ███████╗ █████╗ ██╗   ██╗███████╗    ██████╗ ████████╗███╗   ██╗
  // ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗    ██╔════╝██╔══██╗██║   ██║██╔════╝    ██╔══██╗╚══██╔══╝████╗  ██║
  // ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝    ███████╗███████║██║   ██║█████╗      ██████╔╝   ██║   ██╔██╗ ██║
  // ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗    ╚════██║██╔══██║╚██╗ ██╔╝██╔══╝      ██╔══██╗   ██║   ██║╚██╗██║
  // ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║    ███████║██║  ██║ ╚████╔╝ ███████╗    ██████╔╝   ██║   ██║ ╚████║
  // ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝    ╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝    ╚═════╝    ╚═╝   ╚═╝  ╚═══╝

  handleChange = () => {
    console.log('do somthing');
    this.setState({ show_update_BTN: true });
  }
  renderSaveBTN = () => {

    if (this.state.show_update_BTN) {
      return (
        <Col className="text-right" xs="4">
          <Button
            color="primary"
            href="#pablo"
            onClick={e => this.update_Golfer(e)}
            size="sm"
          >
            Save Changes
        </Button>
        </Col>
      );
    }

  }

  // ██╗   ██╗██████╗ ██████╗  █████╗ ████████╗███████╗    ██████╗ ██████╗        ██████╗  ██████╗ ██╗     ███████╗███████╗██████╗ 
  // ██║   ██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔════╝    ██╔══██╗██╔══██╗      ██╔════╝ ██╔═══██╗██║     ██╔════╝██╔════╝██╔══██╗
  // ██║   ██║██████╔╝██║  ██║███████║   ██║   █████╗      ██║  ██║██████╔╝█████╗██║  ███╗██║   ██║██║     █████╗  █████╗  ██████╔╝
  // ██║   ██║██╔═══╝ ██║  ██║██╔══██║   ██║   ██╔══╝      ██║  ██║██╔══██╗╚════╝██║   ██║██║   ██║██║     ██╔══╝  ██╔══╝  ██╔══██╗
  // ╚██████╔╝██║     ██████╔╝██║  ██║   ██║   ███████╗    ██████╔╝██████╔╝      ╚██████╔╝╚██████╔╝███████╗██║     ███████╗██║  ██║
  //  ╚═════╝ ╚═╝     ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝    ╚═════╝ ╚═════╝        ╚═════╝  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝


  update_Golfer = (e) => {
    e.preventDefault();
    this.setState({ showLoad: true });

    let activity = this.state.updateInfo;
activity.push(
  {
    icon: "fas fa-user-edit",
    note: this.state.profile.name_first +"'s profile was updated",
    worker: JSON.parse(localStorage.getItem('golfx_user')).name_first + ' ' + JSON.parse(localStorage.getItem('golfx_user')).name_last ,
    color: "success",
    date:  moment().format()
    }
);


    console.log('first_name', document.getElementById('input-first-name').value)
    console.log('notes', document.getElementById('input-fitting-notes').value)
    console.log('email', document.getElementById('input-email').value)

    axios({
      method: 'put',
      url: 'https://kbsgolfx-db.herokuapp.com/customers/' + this.state.profile.id,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('golfx_token'))}`,
      },
      data: {
        id: 1,
        name_first: document.getElementById('input-first-name').value,
        name_last: document.getElementById('input-last-name').value,
        phone: document.getElementById('input-phone').value,
        email: document.getElementById('input-email').value,
        address: document.getElementById('input-address').value,
        city: document.getElementById('input-city').value,
        state: document.getElementById('input-country').value,
        zipcode: document.getElementById('input-postal-code').value,
        fitting_notes: document.getElementById('input-fitting-notes').value,
        fittings: this.state.Fitting_Note,
        updates: activity
      }
    })
      .then(function (response) {
        console.log(response);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error.response);
        this.setState({ showLoad: false });
      });

  }

  // ██████╗ ███████╗██╗     ███████╗████████╗███████╗    ███████╗██╗████████╗████████╗██╗███╗   ██╗ ██████╗ 
  // ██╔══██╗██╔════╝██║     ██╔════╝╚══██╔══╝██╔════╝    ██╔════╝██║╚══██╔══╝╚══██╔══╝██║████╗  ██║██╔════╝ 
  // ██║  ██║█████╗  ██║     █████╗     ██║   █████╗      █████╗  ██║   ██║      ██║   ██║██╔██╗ ██║██║  ███╗
  // ██║  ██║██╔══╝  ██║     ██╔══╝     ██║   ██╔══╝      ██╔══╝  ██║   ██║      ██║   ██║██║╚██╗██║██║   ██║
  // ██████╔╝███████╗███████╗███████╗   ██║   ███████╗    ██║     ██║   ██║      ██║   ██║██║ ╚████║╚██████╔╝
  // ╚═════╝ ╚══════╝╚══════╝╚══════╝   ╚═╝   ╚══════╝    ╚═╝     ╚═╝   ╚═╝      ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝ 

  delete_Fitting = (e, id) => {
    e.preventDefault();
    console.log(id);
    let mystate = this;
    this.setState({ showLoad: true });
    axios({
      method: 'delete',
      url: 'https://kbsgolfx-db.herokuapp.com/fittings/' + id,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('golfx_token'))}`,
      },
    })
      .then(function (response) {
        console.log(response);
        mystate.update_Activity('fas fa-trash', 'Fitting was deleted', "warning");
       
        // window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error.response);
      });




  }


  update_Activity = ( icon, note, color) => {
console.log('updating activity');
    let activity = this.state.updateInfo;
        activity.push(
          {
            icon: icon,
            note: note,
            worker: JSON.parse(localStorage.getItem('golfx_user')).name_first + ' ' + JSON.parse(localStorage.getItem('golfx_user')).name_last ,
            color: color,
            date:  moment().format()
            }
        );
        console.log('hello world')
        axios({
          method: 'put',
          url: 'https://kbsgolfx-db.herokuapp.com/customers/' + this.state.profile.id,
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('golfx_token'))}`,
          },
          data: {
            id: 1,
            updates: activity
          }
        })
          .then(function (response) {
            console.log(response);
            window.location.reload(false);
          }) .catch(function (error) {
            console.log(error.response);
          });
      

  }

  get_date = (e) => {
    // console.log(moment(e._d).format())
    this.setState({ new_fitting_date: moment(e._d).format() })
    
  }

  // ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗     ███████╗██╗████████╗████████╗██╗███╗   ██╗ ██████╗ 
  // ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗    ██╔════╝██║╚══██╔══╝╚══██╔══╝██║████╗  ██║██╔════╝ 
  // ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝    █████╗  ██║   ██║      ██║   ██║██╔██╗ ██║██║  ███╗
  // ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗    ██╔══╝  ██║   ██║      ██║   ██║██║╚██╗██║██║   ██║
  // ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║    ██║     ██║   ██║      ██║   ██║██║ ╚████║╚██████╔╝
  // ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝    ╚═╝     ╚═╝   ╚═╝      ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝ 

  renderFiting = () => {

    if (this.state.dataRetrieve) {
      console.log('render fitting', this.state.fittings);
      console.log('render profile', this.state.profile);

      return (
        this.state.fittings.map((item, key) =>

          <ListGroupItem className="px-0">
            <Row className="align-items-center">
              <Col className="col-auto">
                {/* <a
              className="avatar rounded-circle"
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              <img
                alt="..."
                src={require("assets/img/theme/team-1.jpg")}
              />
            </a> */}
              </Col>
              <div className="col ml--2">
                <h4 className="mb-0">
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    {moment(item.fitting_date).format("ddd, MMM Do @ h:mm a")}
                  </a>
                </h4>
                <span className={"text-" + item.status_color}>●</span>{" "}
                <small> {item.status || 'N/A'}</small>
              </div>

              <Col className="col-auto">
                {/* // edit fitting */}

                <Link to={{
                  pathname: `/admin/fittingSheetView/` + item.id,
                }} >
                  <Button className={classnames("text-primary",{
                      Force_hide:
                        JSON.parse(localStorage.getItem("golfx_user"))
                          .position === "Sales"
                    })}
                  color="white" size="sm" type="button">
                    <i className="fal fa-pencil-alt"></i>
                  </Button>
                </Link>

                {/* /// delete fitting  */}
                <Button className="btnSpace text-primary" color="white" size="sm" type="button" onClick={e => this.delete_Fitting(e, item.id)}>
                  <i className="far fa-trash-alt"></i>
                </Button>

              </Col>
            </Row>
          </ListGroupItem>
        )
      )



    }

  }

  renderUpdate = () => {

    if(this.state.data){
    
      console.log(this.state.updateInfo)
      return (
        this.state.updateInfo.map((item, key) =>
  
        <div className="timeline-block">
        <span className={"timeline-step badge-" + item.color}>
          {/* <i className="ni ni-bell-55" /> */}
          {/* <i class="fas fa-file-alt"></i> */}
          {/* <i class="fas fa-trash"></i> */}
          {/* <i class="fas fa-wrench"></i> */}
          {/* <i class="fas fa-user-plus"></i> */}
          <i class={item.icon}></i>
          {/* <i class="fas fa-user-edit"></i> */}
          {/* <i class="fas fa-pen"></i> */}
        </span>
        <div className="timeline-content">
         <small className="text-light font-weight-bold">
            {moment(item.date).format("ddd, MMM Do")}
          </small> 
          {/* <h5 className="text-white mt-3 mb-0">created a new user</h5> */}
          <p className="text-light text-sm mt-1 mb-0">
           {item.note}
          </p>
          <div className="mt-3">
            <Badge color={item.color} pill>
              {item.worker}
            </Badge>
           
          </div>
        </div>
      </div>
  
        ));

    }
  }

  render() {
    return (
      <>
        <LoadingScreen show={this.state.showLoad} />
        <ProfileHeader name={this.state.fullName} />

        <Modal
          className="modal-dialog-centered"
          size="sm"
          isOpen={this.state.fittingModal}
          toggle={() => this.toggleModal("fittingModal")}
        >
          <div className="modal-body p-0">
            <Card className="bg-secondary border-0 mb-0">
              <CardHeader className="bg-transparent ">
                <div className="text-muted text-center mt-2 ">
                  <small>Create a fitting</small>
                </div>

              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">

                <Form role="form">
                  <FormGroup
                    className={classnames("mb-3", {
                      focused: this.state.focusedEmail
                    })}
                  >
                    <label
                      className="form-control-label "
                      htmlFor="exampleDatepicker"
                    >
                      Fitting Date
                            </label>
                    <ReactDatetime

                      defaultValue={ moment().format("ddd, MMM Do, h:mm a")}

                      // inputProps={{
                      //   placeholder: {mystate.state.fitting_date}
                      // }}
                      // timeFormat={false}

                      dateFormat="ddd, MMM Do"
                      onChange={e => this.get_date(e)}
                    />
                  </FormGroup>


                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                      onClick={e => this.make_a_fitting(e)}
                    >
                      Create Fitting
                                  </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Modal>




        <Container className="mt--6" fluid>
          <Row>
            
            <Col className="order-xl-2" xl="4">
<Row>
<Col>

              <Card>
                <CardHeader>
                  <h5 className="h3 mb-0">Fitting</h5>
                </CardHeader>

                <CardBody>
                  <ListGroup className="list my--3" flush>

                    {this.renderFiting()}

                  </ListGroup>
                </CardBody>
                <CardFooter className="bg-transparent">

                  {/* <Link to={{
                    pathname: `/admin/fittingSheet`,
                    query: { golfer: this.state.profile }
                  }} > */}
                  <Button block color="primary" size="lg" type="button" onClick={() => this.toggleModal("fittingModal")}>
                    Add Fitting
                  </Button>
                  {/* </Link> */}

                </CardFooter>
              </Card>
              </Col>
</Row>
<Row>
  <Col>
  
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <h3 className="mb-0 text-white">Activity</h3>
                </CardHeader>
                <CardBody>
                  <div
                    className="timeline timeline-one-side"
                    data-timeline-axis-style="dashed"
                    data-timeline-content="axis"
                  >
                    {this.renderUpdate()}
                    
 
                  </div>
                </CardBody>
              </Card>
            
  </Col>
</Row>

            </Col>
            <Col className="order-xl-1" xl="8">
              {/* <Row>
                <Col lg="6">
                  <Card className="bg-gradient-success border-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            className="text-uppercase text-muted mb-0 text-white"
                            tag="h5"
                          >
                            Total traffic
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0 text-white">
                            350,897
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-white text-dark rounded-circle shadow">
                            <i className="ni ni-active-40" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-sm">
                        <span className="text-white mr-2">
                          <i className="fa fa-arrow-up" />
                          3.48%
                        </span>
                        <span className="text-nowrap text-light">
                          Since last month
                        </span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6">
                  <Card className="bg-gradient-danger border-0" tag="h5">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle className="text-uppercase text-muted mb-0 text-white">
                            Performance
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0 text-white">
                            49,65%
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-white text-dark rounded-circle shadow">
                            <i className="ni ni-spaceship" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-sm">
                        <span className="text-white mr-2">
                          <i className="fa fa-arrow-up" />
                          3.48%
                        </span>
                        <span className="text-nowrap text-light">
                          Since last month
                        </span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row> */}
              <Card>
                <CardHeader>
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Profile</h3>
                    </Col>
                    {this.renderSaveBTN()}
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <Input
                              defaultValue={this.state.profile.name_first}
                              id="input-first-name"
                              placeholder="First name"
                              onChange={e => this.handleChange()}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              defaultValue={this.state.profile.name_last}
                              id="input-last-name"
                              placeholder="Last name"
                              onChange={e => this.handleChange()}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-phone"
                            >
                              Phone #
                            </label>
                            <Input
                              defaultValue={this.state.profile.phone}
                              id="input-phone"
                              placeholder="Username"
                              type="text"
                              onChange={e => this.handleChange()}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              defaultValue={this.state.profile.email}
                              id="input-email"
                              // placeholder={this.state.profile.email}
                              onChange={e => this.handleChange()}
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />

                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              defaultValue={this.state.profile.address}
                              id="input-address"
                              placeholder="Home Address"
                              onChange={e => this.handleChange()}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              City
                            </label>
                            <Input
                              defaultValue={this.state.profile.city}
                              id="input-city"
                              placeholder="City"
                              onChange={e => this.handleChange()}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              State
                            </label>
                            <Input
                              defaultValue={this.state.profile.state}
                              id="input-country"
                              placeholder="Country"
                              onChange={e => this.handleChange()}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-postal-code"
                            >
                              Postal code
                            </label>
                            <Input
                              defaultValue={this.state.profile.zipcode}
                              id="input-postal-code"
                              placeholder="Postal code"
                              onChange={e => this.handleChange()}
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>


                    <hr className="my-4" />

                    <h6 className="heading-small text-muted mb-4">Player Notes</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label className="form-control-label">Player Notes </label>
                        <Input
                          type="textarea"
                          //  defaultValue={this.state.profile.fitting_notes}
                          id="input-fitting-notes"
                          value={this.state.Fitting_Notes}
                          rows="4"
                          onChange={e => { this.handleChange(); this.setState({ Fitting_Notes: e.target.value }) }}


                        />
                      </FormGroup>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default AppProfile;

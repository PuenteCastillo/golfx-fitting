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
// react plugin that prints a given react component

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  FormGroup,
  CardBody,
  Input,
  Label,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardFooter,
} from "reactstrap";
import classnames from "classnames";
// core components

import ProfileHeader from "components/Headers/ProfileHeader.jsx";

import FittingTable2 from "./FittingTable2";
import { Prompt } from "react-router";
import axios from "axios";
const clubSelect = [
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "PW", label: "PW" },
  { value: "GW", label: "GW" },
  { value: "sw", label: "sw" },
  { value: "LW", label: "LW" },
];
const HybridSelect = [
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
];
const WoodSelect = [
  { value: "Drive", label: "Drive" },
  { value: "3W", label: "3W" },
  { value: "4W", label: "4W" },
  { value: "5W", label: "5W" },
  { value: "7W", label: "7W" },
];

class FittingSheet extends React.Component {
  // ██╗   ██╗ █████╗ ██████╗ ██╗ █████╗ ██████╗ ██╗     ███████╗███████╗
  // ██║   ██║██╔══██╗██╔══██╗██║██╔══██╗██╔══██╗██║     ██╔════╝██╔════╝
  // ██║   ██║███████║██████╔╝██║███████║██████╔╝██║     █████╗  ███████╗
  // ╚██╗ ██╔╝██╔══██║██╔══██╗██║██╔══██║██╔══██╗██║     ██╔══╝  ╚════██║
  //  ╚████╔╝ ██║  ██║██║  ██║██║██║  ██║██████╔╝███████╗███████╗███████║
  //   ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝╚══════╝

  state = {
    alert: null,
    Render_Submit_button: true,
    fitting_notes: "",
    building_notes: "",
    static_specs: {
      height: "",
      wrist_to_floor: "",
      normal_shot_shape: "",
      normal_trajectory: "",
    },
    seven_iron_specs: {
      length: "",
      lie: "",
      loft: "",
      cpm: "",
      gripsize: "",
    },
    customer_info: {
      name:
        JSON.parse(localStorage.getItem("customer_info")).name_first +
        " " +
        JSON.parse(localStorage.getItem("customer_info")).name_last,
      phone: JSON.parse(localStorage.getItem("customer_info")).phone,
      email: JSON.parse(localStorage.getItem("customer_info")).email,
      address: JSON.parse(localStorage.getItem("customer_info")).address,
      city: JSON.parse(localStorage.getItem("customer_info")).city,
      state: JSON.parse(localStorage.getItem("customer_info")).state,
      zipcode: JSON.parse(localStorage.getItem("customer_info")).zipcode,
    },
    sycnSeven: {
      club: "7",
      loft: "",
      lie: "",
      cpm: "",
      sw: "",
      length: "5",
      oem: "",
      club_type: "",
      shaft_type: "",
      GripSize: "",
    },
    activeTab: "1",
    sevenlength: "",
    sevenlie: "",
    sevenLoft: "",
    sevencpm: "",
    sevenGripsize: "",
    profile: [],
    num: 1,
    irons: [
      {
        id: 1,
        club: "",
        loft: "",
        lie: "",
        cpm: "",
        sw: "",
        length: "",
        oem: "",
        club_type: "",
        shaft_type: "",
      },
    ],
    hybrids: [
      {
        id: 1,
        club: "",
        loft: "",
        lie: "",
        cpm: "",
        sw: "",
        length: "",
        oem: "",
        club_type: "",
        shaft_type: "",
        marked: "Delete",
      },
    ],
    woods: [
      {
        id: 1,
        club: "",
        loft: "",
        lie: "",
        cpm: "",
        sw: "",
        length: "",
        oem: "",
        club_type: "",
        shaft_type: "",
        marked: "Delete",
      },
    ],
  };

  componentDidMount = () => {
    // this.creta_a_fitting();
    //  console.log(this.state.customer_info);
    console.log(JSON.parse(localStorage.getItem("customer_info")));
  };

  componentWillUnmount = () => {
    // alert("Hello! I am an alert box!!");
    /// save before quiting!!!!
  };

  // ██████╗██████╗ ███████╗ █████╗ ████████╗███████╗    ███████╗██╗████████╗████████╗██╗███╗   ██╗ ██████╗
  // ██╔════╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██╔════╝    ██╔════╝██║╚══██╔══╝╚══██╔══╝██║████╗  ██║██╔════╝
  // ██║     ██████╔╝█████╗  ███████║   ██║   █████╗      █████╗  ██║   ██║      ██║   ██║██╔██╗ ██║██║  ███╗
  // ██║     ██╔══██╗██╔══╝  ██╔══██║   ██║   ██╔══╝      ██╔══╝  ██║   ██║      ██║   ██║██║╚██╗██║██║   ██║
  // ╚██████╗██║  ██║███████╗██║  ██║   ██║   ███████╗    ██║     ██║   ██║      ██║   ██║██║ ╚████║╚██████╔╝
  //  ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝    ╚═╝     ╚═╝   ╚═╝      ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝

  creta_a_fitting = () => {
    axios({
      method: "post",
      url: "https://golfx-fitting-db-ddbaf77fdd8d.herokuapp.com/api/fittings",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("golfx_token")
        )}`,
      },
      data: {
        fitting_notes: this.state.fitting_notes,
        building_notes: this.state.building_notes,
        customer: {
          id: JSON.parse(localStorage.getItem("customer_info")).id,
        },
        customer_info: this.state.customer_info,
        seven_iron_specs: this.state.seven_iron_specs,
        static_specs: this.state.static_specs,
        irons: this.state.irons,
        hybrids: this.state.hybrids,
        wood: this.state.woods,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  toggle = (e) => {
    this.setState({ activeTab: e });
  };

  expand = (e) => {
    e.preventDefault();
    console.log("hello world");

    if (this.state.hideDetail) {
      this.setState({ hideDetail: false });
    } else {
      this.setState({ hideDetail: true });
    }
  };

  updateSeven = () => {
    console.log("yolo");
    console.log();

    // connset 7 iron with the rest

    // let oldSevenIron = this.state.irons;

    // console.log(oldSevenIron.find(x => x.club === "7"));

    // if( oldSevenIron.find(x => x.club === "7") === undefined){

    //   console.log('7 does not exist Create a new one');

    // } else{
    //   console.log('7 exist Create update old one ');

    //   let oldSeven = oldSevenIron.find(x => x.club === "7");

    //   oldSevenIron.find(v => v.club === "7").loft = this.state.sevenLoft;
    //   oldSevenIron.find(v => v.club === "7").lie = this.state.sevenlie;
    //   oldSevenIron.find(v => v.club === "7").cpm = this.state.sevencpm;
    //   oldSevenIron.find(v => v.club === "7").length = this.state.sevenlength;
    //   oldSevenIron.find(v => v.club === "7").GripSize = this.state.sevenLoft;

    //   console.log('new irons', oldSevenIron);

    //   this.setState({ irons: oldSevenIron});
    //   console.log('state irons', this.state.irons);

    // }
  };

  // ██╗   ██╗██████╗ ██████╗  █████╗ ████████╗███████╗    ██╗   ██╗  ██╗   ██╗    ██╗
  // ██║   ██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔════╝    ██║   ██║  ██║   ██║    ██║
  // ██║   ██║██████╔╝██║  ██║███████║   ██║   █████╗      ██║   ███████║   ██║ █╗ ██║
  // ██║   ██║██╔═══╝ ██║  ██║██╔══██║   ██║   ██╔══╝      ██║   ██╔══██║   ██║███╗██║
  // ╚██████╔╝██║     ██████╔╝██║  ██║   ██║   ███████╗    ██║██╗██║  ██║██╗╚███╔███╔╝
  //  ╚═════╝ ╚═╝     ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝    ╚═╝╚═╝╚═╝  ╚═╝╚═╝ ╚══╝╚══╝

  updateIrons = (data) => {
    this.setState({ irons: data });
    console.log(this.state.irons);
  };
  updateHybrids = (data) => {
    this.setState({ hybrids: data });
    console.log(this.state.hybrids);
  };
  updateWoods = (data) => {
    this.setState({ woods: data });
    console.log(this.state.woods);
  };

  // ██╗   ██╗██████╗ ██████╗  █████╗ ████████╗███████╗    ███████╗████████╗ █████╗ ████████╗██╗ ██████╗        ███████╗██████╗ ███████╗ ██████╗███████╗
  // ██║   ██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔════╝    ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██║██╔════╝        ██╔════╝██╔══██╗██╔════╝██╔════╝██╔════╝
  // ██║   ██║██████╔╝██║  ██║███████║   ██║   █████╗      ███████╗   ██║   ███████║   ██║   ██║██║             ███████╗██████╔╝█████╗  ██║     ███████╗
  // ██║   ██║██╔═══╝ ██║  ██║██╔══██║   ██║   ██╔══╝      ╚════██║   ██║   ██╔══██║   ██║   ██║██║             ╚════██║██╔═══╝ ██╔══╝  ██║     ╚════██║
  // ╚██████╔╝██║     ██████╔╝██║  ██║   ██║   ███████╗    ███████║   ██║   ██║  ██║   ██║   ██║╚██████╗███████╗███████║██║     ███████╗╚██████╗███████║
  //  ╚═════╝ ╚═╝     ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝╚══════╝╚══════╝╚═╝     ╚══════╝ ╚═════╝╚══════╝

  update_static_specs = (New_Value, What_Var) => {
    let new_static_specs = this.state.static_specs;
    if (What_Var === "height") {
      new_static_specs.height = New_Value;
    }
    if (What_Var === "wrist_to_floor") {
      new_static_specs.wrist_to_floor = New_Value;
    }
    if (What_Var === "normal_shot_shape") {
      new_static_specs.normal_shot_shape = New_Value;
    }
    if (What_Var === "normal_trajectory") {
      new_static_specs.normal_trajectory = New_Value;
    }
    this.setState({ static_specs: new_static_specs });
  };

  // ██╗   ██╗██████╗ ██████╗  █████╗ ████████╗███████╗    ███████╗███████╗██╗   ██╗███████╗███╗   ██╗        ██╗██████╗  ██████╗ ███╗   ██╗        ███████╗██████╗ ███████╗ ██████╗███████╗
  // ██║   ██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔════╝    ██╔════╝██╔════╝██║   ██║██╔════╝████╗  ██║        ██║██╔══██╗██╔═══██╗████╗  ██║        ██╔════╝██╔══██╗██╔════╝██╔════╝██╔════╝
  // ██║   ██║██████╔╝██║  ██║███████║   ██║   █████╗      ███████╗█████╗  ██║   ██║█████╗  ██╔██╗ ██║        ██║██████╔╝██║   ██║██╔██╗ ██║        ███████╗██████╔╝█████╗  ██║     ███████╗
  // ██║   ██║██╔═══╝ ██║  ██║██╔══██║   ██║   ██╔══╝      ╚════██║██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║        ██║██╔══██╗██║   ██║██║╚██╗██║        ╚════██║██╔═══╝ ██╔══╝  ██║     ╚════██║
  // ╚██████╔╝██║     ██████╔╝██║  ██║   ██║   ███████╗    ███████║███████╗ ╚████╔╝ ███████╗██║ ╚████║███████╗██║██║  ██║╚██████╔╝██║ ╚████║███████╗███████║██║     ███████╗╚██████╗███████║
  //  ╚═════╝ ╚═╝     ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝    ╚══════╝╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚══════╝╚═╝     ╚══════╝ ╚═════╝╚══════╝

  update_seven_iron_specs = (New_Value, What_Var) => {
    let new_seven_iron_specs = this.state.seven_iron_specs;
    if (What_Var === "length") {
      new_seven_iron_specs.length = New_Value;
    }
    if (What_Var === "lie") {
      new_seven_iron_specs.lie = New_Value;
    }
    if (What_Var === "loft") {
      new_seven_iron_specs.loft = New_Value;
    }
    if (What_Var === "cpm") {
      new_seven_iron_specs.cpm = New_Value;
    }
    if (What_Var === "gripsize") {
      new_seven_iron_specs.gripsize = New_Value;
    }
    this.setState({ seven_iron_specs: new_seven_iron_specs });
  };

  // ███████╗██╗   ██╗██████╗ ███╗   ███╗██╗████████╗    ██████╗ ████████╗███╗   ██╗
  // ██╔════╝██║   ██║██╔══██╗████╗ ████║██║╚══██╔══╝    ██╔══██╗╚══██╔══╝████╗  ██║
  // ███████╗██║   ██║██████╔╝██╔████╔██║██║   ██║       ██████╔╝   ██║   ██╔██╗ ██║
  // ╚════██║██║   ██║██╔══██╗██║╚██╔╝██║██║   ██║       ██╔══██╗   ██║   ██║╚██╗██║
  // ███████║╚██████╔╝██████╔╝██║ ╚═╝ ██║██║   ██║       ██████╔╝   ██║   ██║ ╚████║
  // ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝   ╚═╝       ╚═════╝    ╚═╝   ╚═╝  ╚═══╝

  Render_Submit_button = () => {
    if (this.state.Render_Submit_button) {
      return (
        <CardFooter>
          <Button
            className="float-right"
            color="primary"
            size="lg"
            type="button"
            onClick={this.creta_a_fitting}
          >
            Submit Fitting
          </Button>
        </CardFooter>
      );
    }
  };

  // ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗
  // ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗
  // ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝
  // ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
  // ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║
  // ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝

  render() {
    return (
      <>
        {this.state.alert}
        <ProfileHeader
          name={
            JSON.parse(localStorage.getItem("customer_info")).name_first +
            " " +
            JSON.parse(localStorage.getItem("customer_info")).name_last
          }
        />
        {/* <SimpleHeader name="Golfer" parentName="Fitting Sheet" /> */}

        <Container className="mt--6" fluid>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <div className="pl-lg-4">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">Player Details </h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={(e) => this.expand(e)}
                          size="sm"
                        >
                          <i class="fas fa-expand-arrows-alt"></i>
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </CardHeader>
                <CardBody>
                  <Collapse isOpen={this.state.hideDetail}>
                    <CardBody>
                      <Row>
                        <Col md={{ size: "5" }}>
                          <h3 className="mb-4">Static Specs </h3>

                          <FormGroup className="row">
                            <Label
                              className="form-control-label"
                              htmlFor="example-text-input"
                              md="3"
                            >
                              Height:
                            </Label>
                            <Col md="9">
                              <Input
                                // defaultValue="John Snow"
                                value={this.state.static_specs.height}
                                onChange={(e) =>
                                  this.update_static_specs(
                                    e.target.value,
                                    "height"
                                  )
                                }
                                id="data_height"
                                type="text"
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup className="row">
                            <Label
                              className="form-control-label"
                              htmlFor="example-text-input"
                              md="3"
                            >
                              Wrist To Floor:
                            </Label>
                            <Col md="9">
                              <Input
                                // defaultValue="John Snow"
                                value={this.state.static_specs.wrist_to_floor}
                                onChange={(e) =>
                                  this.update_static_specs(
                                    e.target.value,
                                    "wrist_to_floor"
                                  )
                                }
                                type="text"
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup className="row">
                            <Label
                              className="form-control-label"
                              htmlFor="example-text-input"
                              md="3"
                            >
                              Normal Shot Shape:
                            </Label>
                            <Col md="9">
                              <Input
                                // defaultValue="John Snow"
                                value={
                                  this.state.static_specs.normal_shot_shape
                                }
                                onChange={(e) =>
                                  this.update_static_specs(
                                    e.target.value,
                                    "normal_shot_shape"
                                  )
                                }
                                type="text"
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup className="row">
                            <Label
                              className="form-control-label"
                              htmlFor="example-text-input"
                              md="3"
                            >
                              Normal trajectory:
                            </Label>
                            <Col md="9">
                              <Input
                                // defaultValue="John Snow"
                                value={
                                  this.state.static_specs.normal_trajectory
                                }
                                onChange={(e) =>
                                  this.update_static_specs(
                                    e.target.value,
                                    "normal_trajectory"
                                  )
                                }
                                type="text"
                              />
                            </Col>
                          </FormGroup>
                        </Col>

                        <Col md={{ size: "5", offset: 1 }}>
                          <h3 className="mb-4">Customer 7 Iron Specs</h3>

                          <FormGroup className="row">
                            <Label
                              className="form-control-label"
                              htmlFor="example-text-input"
                              md="3"
                            >
                              length:
                            </Label>
                            <Col md="9">
                              <Input
                                // defaultValue={this.state.sycnSeven.length}
                                type="number"
                                value={this.state.seven_iron_specs.length}
                                onChange={(e) =>
                                  this.update_seven_iron_specs(
                                    e.target.value,
                                    "length"
                                  )
                                }
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup className="row">
                            <Label
                              className="form-control-label"
                              htmlFor="example-text-input"
                              md="3"
                            >
                              lie:
                            </Label>
                            <Col md="9">
                              <Input
                                // defaultValue={this.state.sycnSeven.lie}
                                id="example-text-input"
                                type="number"
                                value={this.state.seven_iron_specs.lie}
                                onChange={(e) =>
                                  this.update_seven_iron_specs(
                                    e.target.value,
                                    "lie"
                                  )
                                }
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup className="row">
                            <Label
                              className="form-control-label"
                              htmlFor="example-text-input"
                              md="3"
                            >
                              Loft:
                            </Label>
                            <Col md="9">
                              <Input
                                // defaultValue={this.state.sycnSeven.loft}
                                id="example-text-input"
                                type="text"
                                value={this.state.seven_iron_specs.loft}
                                onChange={(e) =>
                                  this.update_seven_iron_specs(
                                    e.target.value,
                                    "loft"
                                  )
                                }
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup className="row">
                            <Label
                              className="form-control-label"
                              htmlFor="example-text-input"
                              md="3"
                            >
                              cpm:
                            </Label>
                            <Col md="9">
                              <Input
                                // defaultValue={this.state.sycnSeven.cpm}
                                id="example-text-input"
                                type="text"
                                value={this.state.seven_iron_specs.cpm}
                                onChange={(e) =>
                                  this.update_seven_iron_specs(
                                    e.target.value,
                                    "cpm"
                                  )
                                }
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup className="row">
                            <Label
                              className="form-control-label"
                              htmlFor="example-text-input"
                              md="3"
                            >
                              Gripsize:
                            </Label>
                            <Col md="9">
                              <Input
                                // defaultValue={this.state.sycnSeven.GripSize}
                                id="example-text-input"
                                type="number"
                                value={this.state.seven_iron_specs.gripsize}
                                onChange={(e) =>
                                  this.update_seven_iron_specs(
                                    e.target.value,
                                    "gripsize"
                                  )
                                }
                              />
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                    <hr className="my-4" />
                  </Collapse>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label className="form-control-label">
                          Fitting Notes{" "}
                        </label>
                        <Input
                          // defaultValue={this.state.profile.fitting_notes}
                          // placeholder={this.state.profile.fitting_notes}
                          rows="4"
                          type="textarea"
                          value={this.state.fitting_notes}
                          onChange={(e) => {
                            this.setState({ fitting_notes: e.target.value });
                          }}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <label className="form-control-label">
                          Build Notes{" "}
                        </label>
                        <Input
                          // defaultValue={this.state.profile.fitting_notes}
                          // placeholder={this.state.profile.fitting_notes}
                          rows="4"
                          type="textarea"
                          value={this.state.building_notes}
                          onChange={(e) => {
                            this.setState({ building_notes: e.target.value });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "1",
                        })}
                        onClick={() => {
                          this.toggle("1");
                        }}
                      >
                        IRONS
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "2",
                        })}
                        onClick={() => {
                          this.toggle("2");
                        }}
                      >
                        HYBRIDS
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "3",
                        })}
                        onClick={() => {
                          this.toggle("3");
                        }}
                      >
                        Woods
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>

                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    {/* Tab one  */}
                    <Row>
                      <Col>
                        <FittingTable2
                          clubSelect={clubSelect}
                          irons={(e) => this.updateIrons(e)}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    {/* Tab two */}

                    <Row>
                      <Col>
                        <FittingTable2
                          clubSelect={HybridSelect}
                          irons={(e) => this.updateHybrids(e)}
                        />
                      </Col>
                    </Row>
                  </TabPane>

                  <TabPane tabId="3">
                    {/* Tab two */}

                    <Row>
                      <Col>
                        <FittingTable2
                          clubSelect={WoodSelect}
                          irons={(e) => this.updateWoods(e)}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>

                {this.Render_Submit_button()}
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default FittingSheet;

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
  Collapse,
} from "reactstrap";
import classnames from "classnames";
// core components
import LoadingScreen from "./LoadingScreen";
// import FittingHeader from "components/Headers/FittingHeader.jsx";
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import FittingTable2 from "./FittingTable2";
import FittingTablePutter from "./FittingTablePutter";
// import { Prompt } from "react-router";
import axios from "axios";
// import AppCard from "./Parts/AppCard";
import CustomerNotes from "./Parts/CustomerNotes";
// import SpecModel from "./Parts/SpecModel";
// import Seven_iron_Model from "./Parts/Seven_iron_Model";

// import Data_Static_Specs from "./Parts/Data_Static_Specs";
// import Data_Seven_Iron_Spec from "./Parts/Data_Seven_Iron_Spec";
import Iron_table_Modal from "./Parts/Iron_table_Modal";

import { PDFDownloadLink } from "@react-pdf/renderer";
import FittingPDF from "./FittingPDF";
import Static_specs from "./FittingParts/Static_specs";
import Seven_iron_specs from "./FittingParts/Seven_iron_specs";
import Fitting_notes from "./FittingParts/Fitting_notes";
import Building_notes from "./FittingParts/Building_notes";
import ReactDatetime from "react-datetime";
import moment from "moment";
// import { thisExpression } from "@babel/types";
import Select2 from "react-select2-wrapper";
// import { stat } from "fs";

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
const Wedgeselect = [
  { value: "GW", label: "GW" },
  { value: "SW", label: "SW" },
  { value: "LW", label: "LW" },
];

const PutterSelect = [
  {
    value: "putter",
    label: "putter",
  },
];

class Fitting extends React.Component {
  state = {
    showLoad: true,
    axiosComplete: false,
    static_specs: null,
    seven_iron_specs: null,
    fitting_notes: "",
    building_notes: "",
    iron_table_modal: false,
    irons: {},
    woods: {},
    wedges: {},
    putter: {},
    hybrids: {},
    customer: {},
    fitting_date: "",
    skipGen: false,
    fitting_id: "",
    status: "",
    didStateChange: false,
  };

  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;
    axios({
      method: "GET",
      url:
        `https://golfx-fitting-db-ddbaf77fdd8d.herokuapp.com/api/fittings/` +
        id +
        "?_limit=-1&populate=*",
      // headers: {
      //   Authorization: `Bearer ${JSON.parse(
      //     localStorage.getItem("golfx_token")
      //   )}`,
      // },
    }).then((res) => {
      let fitting = res.data.data;
      let currentFitting = res.data.data.attributes;
      currentFitting.id = res.data.data.id;
      console.log("getting fitting", currentFitting);
      let currentCustomer = currentFitting.customer.data.attributes;
      currentCustomer.id = currentFitting.customer.data.id;

      this.setState({
        static_specs: currentFitting.Static_specs,
        seven_iron_specs: currentFitting.Seven_iron_specs,
        fitting_notes: currentFitting.fitting_notes,
        building_notes: currentFitting.building_notes,
        irons: currentFitting.Irons,
        woods: currentFitting.Wood,
        hybrids: currentFitting.Hybrids,
        wedges: currentFitting.Wedge,
        putter: currentFitting.Putter,
        showLoad: false,
        axiosComplete: true,
        customer: currentCustomer,
        fitting_date: currentFitting.fitting_date,
        status: currentFitting.status,
        fitting_id: currentFitting.id,
      });
    });
  };

  Set_Staic_Specs = (data) => {
    console.log("setting static specs", data);
    this.setState({ static_specs: data, didStateChange: true });
  };

  Set_Seven_Iron = (data) => {
    // add a unique id to each item in data
    for (let i = 0; i < data.length; i++) {
      data[i].id = i;
    }
    console.log("setting seven iron specs", data);
    this.setState({ seven_iron_specs: data, didStateChange: true });
  };
  isEmpty = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  updateIrons = (data) => {
    this.setState({ irons: data, didStateChange: true });
    console.log(this.state.irons);
    this.check_status();
  };
  updateHybrids = (data) => {
    this.setState({ hybrids: data, didStateChange: true });
    console.log(this.state.hybrids);
    this.check_status();
  };
  updateWoods = (data) => {
    this.setState({ woods: data, didStateChange: true });
    console.log(this.state.woods);
    this.check_status();
  };
  updateWedges = (data) => {
    this.setState({ wedges: data, didStateChange: true });
    console.log(this.state.wedges);
    this.check_status();
  };
  updatePutters = (data) => {
    this.setState({ putter: data, didStateChange: true });
    console.log(this.state.putter);
    this.check_status();
  };

  simplifiedFunction = (value) => {
    this.setState({
      status: "Ready For Build",
    });
  };

  check_status = (data) => {
    let exisitingClub = [];

    if (this.state.irons) {
      let Irons = this.state.irons;
      exisitingClub = exisitingClub.concat(Irons);
    }

    if (this.state.hybrids) {
      exisitingClub = exisitingClub.concat(this.state.hybrids);
    }

    if (this.state.woods) {
      exisitingClub = exisitingClub.concat(this.state.woods);
    }

    if (this.state.wedges) {
      exisitingClub = exisitingClub.concat(this.state.wedges);
    }

    if (this.state.putter) {
      exisitingClub = exisitingClub.concat(this.state.putter);
    }
    console.log("output", exisitingClub);
    console.log("items in table", exisitingClub.length);

    var arrayLength = exisitingClub.length;
    var CompleteCount = 0;
    var PickedUpCount = 0;
    let ReadyBuildCount = 0;

    for (var i = 0; i < arrayLength; i++) {
      console.log(exisitingClub[i].Club_status);

      if (
        exisitingClub[i].Club_status === "Completed" ||
        exisitingClub[i].Club_status === "Ignore"
      ) {
        CompleteCount++;
        if (CompleteCount === arrayLength) {
          console.log("all are completed");
          this.setState({
            status: "Drying Rack",
          });
        }
      }
      if (
        exisitingClub[i].Club_status === "Picked Up" ||
        exisitingClub[i].Club_status === "Ignore"
      ) {
        PickedUpCount++;

        if (PickedUpCount === arrayLength) {
          this.setState({
            status: "Complete",
          });
        }
      }

      if (exisitingClub[i].Club_status === "Ready for Build") {
        console.log("it ready to build");
        ReadyBuildCount++;
      }

      //Do something
    }
    console.log("build count", ReadyBuildCount);
    if (ReadyBuildCount > 0) {
      console.log("changing the state");
      this.setState({
        status: "Ready For Build",
      });

      console.log(this.state.status);
    }
    // console.log('Irons',this.state.irons);
    // console.log('hybrids',this.state.hybrids);
    // console.log('Woods',this.state.woods);
    // console.log('Wedges',this.state.wedges);
    // console.log('putter',this.state.putter);
  };
  render_print = () => {
    if (this.state.axiosComplete && this.state.didStateChange === false) {
      return (
        ////  <></>
        <PDFDownloadLink
          className="btn btn-neutral btn-lg"
          color="default"
          size="lg"
          document={
            <FittingPDF
              fitting_notes={this.state.fitting_notes}
              building_notes={this.state.building_notes}
              seven_iron_specs={this.state.seven_iron_specs}
              static_specs={this.state.static_specs}
              customer_info={this.state.customer}
              irons={this.state.irons}
              hybrids={this.state.hybrids}
              woods={this.state.woods}
              wedge={this.state.wedges}
              putter={this.state.putter}
            />
          }
          fileName={
            this.state.customer.name_first +
            "_" +
            this.state.customer.name_last +
            "_KBSFitting.pdf"
          }
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Export PDF"
          }
        </PDFDownloadLink>
      );
    } else {
      return (
        <Button color="primary" outline type="button" disabled="true">
          Save Before Exporting
        </Button>
      );
    }
  };

  render_irons = () => {
    if (this.isEmpty(this.state.irons)) {
      if (this.state.skipGen) {
        return (
          <FittingTable2
            simplifiedFunction={this.simplifiedFunction}
            clubSelect={clubSelect}
            irons={(e) => this.updateIrons(e)}
            startingData={this.state.irons}
            table="IRON"
          />
        );
      } else {
        return (
          <div
            className="m-5"
            onClick={(e) => this.toggleModal("iron_table_modal")}
          >
            <h4 className="text-center"> Add Irons </h4>
            <h1 className="text-center">
              <i class="fa-solid fa-table iconSize"></i>
            </h1>
            <h4 className="text-center">
              {" "}
              <i class="fas fa-plus text-primary"></i>
            </h4>
          </div>
        );
      }
    } else {
      return (
        <FittingTable2
          simplifiedFunction={this.simplifiedFunction}
          clubSelect={clubSelect}
          irons={(e) => this.updateIrons(e)}
          startingData={this.state.irons}
          table="IRON"
        />
      );
    }
  };

  openTable = (state) => {
    this.setState({
      showIrons: true,
      showHybrids: true,
      showWoods: true,
      showWedges: true,
      showPutters: true,
    });

    this.setState({
      [state]: true,
    });
  };
  set_iron_data = (data) => {
    this.setState({
      irons: data,
      iron_data_recieved: true,
      didStateChange: true,
    });
  };

  creta_a_fitting = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    /// filter out id

    console.log("static specs", this.state.static_specs);
    let mystate = this;
    this.setState({ showLoad: true });
    let comp_state = this;
    let iron_data = this.state.irons;

    for (let i = 0; i < iron_data.length; i++) {
      delete iron_data[i].id;
    }
    let hybrid_data = this.state.hybrids;
    for (let i = 0; i < hybrid_data.length; i++) {
      delete hybrid_data[i].id;
    }
    let wood_data = this.state.woods;

    for (let i = 0; i < wood_data.length; i++) {
      delete wood_data[i].id;
    }
    let wedge_data = this.state.wedges;
    // console.log(this.state.wedges);
    for (let i = 0; i < this.state.wedges.length; i++) {
      delete wedge_data[i].id;
    }
    let putter_data = this.state.putter;
    // console.log(this.state.wedges);
    for (let i = 0; i < this.state.putter.length; i++) {
      delete putter_data[i].id;
    }
    let color = "success";
    if (mystate.state.status === "Complete") {
      color = "default";
    } else if (mystate.state.status === "Ready For Build") {
      color = "warning";
    } else if (mystate.state.status === "On Order") {
      color = "secoundary";
    } else if (mystate.state.status === "Drying Rack") {
      color = "primary";
    } else if (mystate.state.status === "Ready For Fitting") {
      color = "success";
    } else {
      color = "success";
    }

    let data = {};

    if (!this.isEmpty(mystate.state.seven_iron_specs)) {
      data.Seven_iron_specs = mystate.state.seven_iron_specs;
    }
    if (!this.isEmpty(mystate.state.fitting_notes)) {
      data.fitting_notes = mystate.state.fitting_notes;
    }
    if (!this.isEmpty(mystate.state.building_notes)) {
      data.building_notes = mystate.state.building_notes;
    }
    if (!this.isEmpty(mystate.state.static_specs)) {
      data.Static_specs = mystate.state.static_specs;
    }

    // Set new data or else the data is empty
    if (!this.isEmpty(iron_data)) {
      data.Irons = iron_data;
      console.log("iron data", iron_data);
    } else {
      data.Irons = [];
    }
    if (!this.isEmpty(hybrid_data)) {
      data.Hybrids = hybrid_data;
    } else {
      data.Hybrids = [];
    }
    if (!this.isEmpty(wood_data)) {
      data.Wood = wood_data;
    } else {
      data.Wood = [];
    }

    if (!this.isEmpty(wedge_data)) {
      console.log(" this is data for wedges");
      data.Wedge = wedge_data;
    } else {
      data.Wedge = [];
    }

    if (!this.isEmpty(putter_data)) {
      data.putter = putter_data;
    } else {
      data.putter = [];
    }

    if (!this.isEmpty(mystate.state.fitting_date)) {
      data.fitting_date = mystate.state.fitting_date;
    }

    if (!this.isEmpty(mystate.state.status)) {
      data.status = mystate.state.status;
    }

    if (!this.isEmpty(color)) {
      data.status_color = color;
    }
    console.log(wedge_data);
    console.log("full data", data);
    console.log("id", mystate.state.fitting_id);
    // data.attributes = data;

    axios({
      method: "put",
      url:
        "https://golfx-fitting-db-ddbaf77fdd8d.herokuapp.com/api/fittings/" +
        mystate.state.fitting_id,
      // headers: {
      //   Authorization: `Bearer ${JSON.parse(
      //     localStorage.getItem("golfx_token")
      //   )}`,
      // },
      data: {
        data,
      },
    })
      .then(function (response) {
        // comp_state.setState({ showLoad: false })
        console.log(response);

        // window.location.reload(false);
        // console.log('#################################');
        // console.log('Butthole');
        // console.log('irons data', mystate.state.irons);
        // console.log('hybrids data', mystate.state.hybrids);
        // console.log('woods data', mystate.state.woods);
        // console.log('wedges data', mystate.state.wedges);
        // console.log('putter data', mystate.state.putter);
      })
      .catch(function (error) {
        console.log(error);
        comp_state.setState({ showLoad: false });
      });
  };

  skip = (e) => {
    this.setState({ skipGen: true, didStateChange: true });
    this.toggleModal("iron_table_modal");
  };
  get_date = (e) => {
    this.setState({
      fitting_date: moment(e._d).format(),
      didStateChange: true,
    });
  };
  render_Fitting = () => {
    if (this.state.axiosComplete) {
      return (
        <Container className="mt--6" fluid>
          <Iron_table_Modal
            simplifiedFunction={this.simplifiedFunction}
            skip={(e) => this.skip(e)}
            data={this.state.irons}
            open={this.state.iron_table_modal}
            toggle={(e) => this.toggleModal("iron_table_modal")}
            set_iron_data={(e) => this.set_iron_data(e)}
          />
          {/* Right Side */}
          <Row>
            <Col className="order-xl-2" xl="4">
              <CustomerNotes
                name={
                  this.state.customer.name_first +
                  " " +
                  this.state.customer.name_last
                }
                phone={this.state.customer.phone}
                email={this.state.customer.email}
                city={this.state.customer.city}
                id={this.state.customer.id}
                fitting_notes={this.state.customer.fitting_notes}
              />
              <Row>
                <Col>
                  <Card>
                    <CardHeader>Fitting Date</CardHeader>
                    <CardBody>
                      <FormGroup>
                        <label
                          className="form-control-label "
                          htmlFor="exampleDatepicker"
                        >
                          Fitting Date
                        </label>
                        <ReactDatetime
                          defaultValue={moment(this.state.fitting_date).format(
                            "dddd, MMMM Do YYYY, h:mm a"
                          )}
                          // inputProps={{
                          //   placeholder: {mystate.state.fitting_date}
                          // }}
                          // timeFormat={false}

                          dateFormat="YYYY-DD-MM"
                          onChange={(e) => this.get_date(e)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label
                          className="form-control-label "
                          htmlFor="exampleDatepicker"
                        >
                          Status
                        </label>
                        <Select2
                          className="form-control"
                          id="input-status"
                          defaultValue={this.state.status}
                          // options={{
                          // placeholder: "Select"
                          // }}

                          data={[
                            {
                              id: "Ready For Fitting",
                              text: "Ready For Fitting",
                            },
                            { id: "On Order", text: "On Order" },
                            {
                              id: "Ready For Build",
                              text: "Ready For Build",
                            },
                            { id: "Drying Rack", text: "Drying Rack" },
                            { id: "Complete", text: "Complete" },
                          ]}
                          value={this.state.status}
                          onChange={(e) =>
                            this.setState({
                              status: e.target.value,
                              didStateChange: true,
                            })
                          }
                        />
                      </FormGroup>

                      {/* 
                          <FormGroup >
                        <label
                          className="form-control-label"
                          htmlFor="example-time-input"
                          md="2"
                        >
                          Time
                        </label>
                       
                          <Input
                            defaultValue="10:30"
                            id="input-time"
                            type="time"        
                          />
                      
                      </FormGroup> */}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                {/* Note Section */}
                <Fitting_notes
                  data={this.state.fitting_notes}
                  // Set_spec={e => this.Set_Staic_Specs(e)}
                  changeValue={(e) => {
                    this.setState({ fitting_notes: e, didStateChange: true });
                  }}
                />

                <Building_notes
                  data={this.state.building_notes}
                  // Set_spec={e => this.Set_Staic_Specs(e)}
                  changeValue={(e) => {
                    this.setState({
                      building_notes: e,
                      didStateChange: true,
                    });
                  }}
                />
              </Row>
            </Col>

            {/* Left Side */}
            <Col className="order-xl-1" xl="8">
              <Row>
                {/* Static Spec  */}
                <Static_specs
                  data={this.state.static_specs}
                  Set_spec={(e) => this.Set_Staic_Specs(e)}
                />

                <Seven_iron_specs
                  data={this.state.seven_iron_specs}
                  Set_spec={(e) => this.Set_Seven_Iron(e)}
                />
              </Row>

              {/* Tables */}

              <Row>
                <Col>
                  <Card>
                    <CardHeader onClick={(e) => this.openTable("showIrons")}>
                      IRONS
                    </CardHeader>
                    {/* <Collapse isOpen={this.state.showIrons}> */}
                    <Collapse isOpen={true}>
                      <Card>
                        <CardBody>{this.render_irons()}</CardBody>
                      </Card>
                    </Collapse>
                    <CardHeader onClick={(e) => this.openTable("showHybrids")}>
                      HYBRIDS
                    </CardHeader>
                    {/* <Collapse isOpen={this.state.showHybrids}> */}
                    <Collapse isOpen={true}>
                      <Card>
                        <CardBody>
                          <FittingTable2
                            simplifiedFunction={this.simplifiedFunction}
                            clubSelect={HybridSelect}
                            irons={(e) => this.updateHybrids(e)}
                            startingData={this.state.hybrids}
                            table={"HYBRID"}
                          />
                        </CardBody>
                      </Card>
                    </Collapse>
                    <CardHeader onClick={(e) => this.openTable("showWoods")}>
                      WOODS
                    </CardHeader>
                    {/* <Collapse isOpen={this.state.showWoods}> */}
                    <Collapse isOpen={true}>
                      <Card>
                        <CardBody>
                          <FittingTable2
                            simplifiedFunction={this.simplifiedFunction}
                            clubSelect={WoodSelect}
                            irons={(e) => this.updateWoods(e)}
                            startingData={this.state.woods}
                            table={"WOOD"}
                          />
                        </CardBody>
                      </Card>
                    </Collapse>
                    <CardHeader onClick={(e) => this.openTable("showWedges")}>
                      WEDGES
                    </CardHeader>
                    {/* <Collapse isOpen={this.state.showWedges}> */}
                    <Collapse isOpen={true}>
                      <Card>
                        <CardBody>
                          <FittingTable2
                            simplifiedFunction={this.simplifiedFunction}
                            clubSelect={Wedgeselect}
                            irons={(e) => this.updateWedges(e)}
                            startingData={this.state.wedges}
                            table={"WEDGE"}
                          />
                        </CardBody>
                      </Card>
                    </Collapse>
                    <CardHeader onClick={(e) => this.openTable("showPutters")}>
                      PUTTER
                    </CardHeader>
                    {/* <Collapse isOpen={this.state.showPutters}> */}
                    <Collapse isOpen={true}>
                      <Card>
                        <CardBody>
                          <FittingTablePutter
                            simplifiedFunction={this.simplifiedFunction}
                            clubSelect={PutterSelect}
                            irons={(e) => this.updatePutters(e)}
                            startingData={this.state.putter}
                            table={"PUTTER"}
                          />
                        </CardBody>
                      </Card>
                    </Collapse>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      );
    }
  };
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: "https://media.giphy.com/media/11FuEnXyGsXFba/source.gif",
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <>
        {/* {this.state.alert} */}
        <LoadingScreen show={this.state.showLoad}></LoadingScreen>

        <SimpleHeader
          name={
            this.state.customer.name_first + " " + this.state.customer.name_last
          }
          parentName="Fitting Sheet"
        >
          <Button
            className="btn-neutral"
            color="default"
            size="lg"
            onClick={(e) => this.creta_a_fitting(e)}
          >
            Save
          </Button>
          {this.render_print()}
        </SimpleHeader>

        {this.render_Fitting()}

        <div></div>
      </>
    );
  }
}

export default Fitting;

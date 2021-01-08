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
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Alert,
  CardFooter,
  Col,
  CardTitle
} from "reactstrap";
import Dropzone from "dropzone";
import ReactDatetime from "react-datetime";

// core components
import Select2 from "react-select2-wrapper";
import axios from 'axios';
import moment from 'moment'
import SimpleHeader from "../../components/Headers/SimpleHeader";

class AddGolfer extends React.Component {
  state = {
    value: '',
    username: '',
    password: '',
    submitting: false,
    errorMessage: 'Please fill out both inputs!',
    error: false,
    firstName: '',
    VfirstName: false,
    lastName: '',
    VlastName: false,
    phone: '',
    vphone: false,
    email: '',
    Vemail: false,
    address: '',
    city: '',
    state: '',
    zipcode: null,
    fitting_notes: '',
    error: false,
    errorMessage: '',
    btnDisable: false,
    fittingDate: '',
    picture: null,
    fitting_date: ''

  };

  componentDidMount = () => {
    console.log(JSON.parse(localStorage.getItem('golfx_user')).name_first + ' ' + JSON.parse(localStorage.getItem('golfx_user')).name_last )
    let thisisit = this
    // this variable is to delete the previous image from the dropzone state
    // it is just to make the HTML DOM a bit better, and keep it light


  }

  validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  fittingDate = (e) => {

    console.log(e._d);
    console.log('hello world')
    // console.log(document.getElementById("input-time").value)
    // console.log(document.getElementById("input-time").value)

  }

  newGolfer = (e) => {


    e.preventDefault();

    this.setState({ btnDisable: true })
    let loginErro = false;
    if (this.state.firstName === '') {
      this.setState({ VfirstName: true, error: true, errorMessage: 'Please fill out the necessary inputs!' })
      loginErro = true;
    }
    if (this.state.lastName === '') {
      this.setState({ VlastName: true, error: true, errorMessage: 'Please fill out the necessary inputs!' })
      loginErro = true;
    }
    if (this.state.phone === '') {
      this.setState({ VfirstName: true, error: true, errorMessage: 'Please fill out the necessary inputs!' })
      loginErro = true;
    }
    if (this.state.phone === '') {
      this.setState({ Vphone: true, error: true, errorMessage: 'Please fill out the necessary inputs!' })
      loginErro = true;
    }
    if (this.state.email === '') {
      this.setState({ Vemail: true, error: true, errorMessage: 'Please fill out the necessary inputs!' })
      loginErro = true;
    }

    if (this.validateEmail(this.state.email) === false) {
      this.setState({ btnDisable: false, Vemail: true, error: true, errorMessage: 'Please use a valid email', })

      loginErro = true;

    }


    if (loginErro === true) {
      this.setState({ btnDisable: false })
      return;
    }



    console.log('fn= ' + this.state.firstName + 'ln= ' + this.state.lastName + 'phone= ' + this.state.phone + 'email= ' + this.state.email + 'address= ' + this.state.address + 'city= ' + this.state.city + 'state= ' + this.state.state + 'zipcode= ' + this.state.zipcode + 'fitting= ' + this.state.fitting_notes)

    let thisisit = this;



    axios({
      method: 'get',
      url: 'https://kbsgolfx-db.herokuapp.com/customers?email=' + this.state.email,

    })
      .then(function (response) {
        console.log(response);

        if (response.data[0]) {
          //  Email already in db alert 
          console.log('Email already in db alert ');
          thisisit.setState({ Vemail: true, error: true, errorMessage: 'Email already exist!', btnDisable: false })

        } else {

          console.log(' New email create user ');
          // New email create user 


          axios({
            method: 'post',
            url: 'https://kbsgolfx-db.herokuapp.com/customers',
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('golfx_token'))}`,
            },
            data: {
              name_first: thisisit.state.firstName,
              name_last: thisisit.state.lastName,
              phone: thisisit.state.phone,
              email: thisisit.state.email,
              address: thisisit.state.address,
              city: thisisit.state.city,
              state: thisisit.state.state,
              zipcode: thisisit.state.zipcode,
              fitting_notes: thisisit.state.fitting_notes,
              picture: thisisit.state.picture,
              updates: [
                {
                  icon: "fas fa-user-plus",
                  note: "New Golfer Added",
                  worker: JSON.parse(localStorage.getItem('golfx_user')).name_first + ' ' + JSON.parse(localStorage.getItem('golfx_user')).name_last ,
                  color: "success",
                  date:  moment().format()
                  },
                  {
                    icon: "fas fa-file-alt",
                    note: "Fitting Created",
                    worker: JSON.parse(localStorage.getItem('golfx_user')).name_first + ' ' + JSON.parse(localStorage.getItem('golfx_user')).name_last ,
                    color: "warning",
                    date:  moment().format()
                    },
                ]
            
            }
          })
            .then(function (response) {
              // this.setState({ btnDisable : false})
        
let profile_id = response.data.id;
              // / make fitting 

              axios({
                method: "post",
                url: "https://kbsgolfx-db.herokuapp.com/fittings",
                headers: {
                  Authorization: `Bearer ${JSON.parse(
                    localStorage.getItem("golfx_token")
                  )}`
                },
                data: {
                  fitting_date: thisisit.state.fitting_date,
                  customer: {
                    id: response.data.id
                  },
                  status:'Ready For Fitting',
                  status_color: 'success',
                  
                }
              })
                .then(function (response) {
                  console.log(response);
                  window.location.href = '/admin/profil/' + profile_id;
                })
                .catch(function (error) {
                  console.log(error.response);
                });







            })
            .catch(function (error) {
              console.log(error.response);
            });


          thisisit.setState({ Vemail: false, error: false })


        }
      })
      .catch(function (error) {
        this.setState({ btnDisable: false })
        console.log(error.response);
      });



  }



  get_date = (e) => {
    // console.log(moment(e._d).format())
    this.setState({ fitting_date: moment(e._d).format() })
    console.log(this.state.fitting_date)
  }

  render() {
    return (
      <>
        <SimpleHeader name="Add Golfer" parentName="Customer" >
          <Button className="btn-neutral" color="default" size="lg" onClick={e => this.newGolfer(e)} disabled={this.state.btnDisable}>
            {/* Save */}
            {this.state.btnDisable ? 'Lading...' : 'Save'}
                  </Button>
          {/* <CardFooter className="bg-transparent">
                  <Button block color="primary" size="lg" type="button" disabled={this.state.btnDisable} onClick={e => this.newGolfer(e)}>
                    Add Golfer
        </Button>
                </CardFooter> */}
        </SimpleHeader>
        <Container className="mt--6" fluid>

          <Row>
            <Col>
              <Row>
                <Col>
                  <Card className="card-pricing border-0 mb-4 bg-gradient-primary ">
                    <CardHeader className="bg-transparent bg-gradient-primary">
                      <h4 className="text-uppercase ls-1  py-3 mb-0 text-white">
                        User information
                  </h4>
                    </CardHeader>
                    <CardBody className="">

                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label text-white"
                                htmlFor="input-first-name"
                              >
                                First name
                            </label>
                              <Input
                                // defaultValue={this.state.profile.name_first}
                                id="input-first-name"
                                // placeholder="First name"
                                type="text"
                                invalid={this.state.VfirstName}
                                value={this.state.firstName}
                                onChange={(e) => this.setState({ firstName: e.target.value })}
                              />


                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label text-white"
                                htmlFor="input-last-name"
                              >
                                Last name
                            </label>
                              <Input
                                // defaultValue={this.state.profile.name_last}
                                id="input-last-name"
                                // placeholder="Last name"
                                type="text"
                                invalid={this.state.VlastName}
                                value={this.state.lastName}
                                onChange={(e) => this.setState({ lastName: e.target.value })}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label text-white"
                                htmlFor="input-phone"
                              >
                                Phone #
                            </label>
                              <Input
                                // defaultValue={this.state.profile.phone}
                                id="input-phone"
                                // placeholder="Username"
                                type="number"
                                invalid={this.state.Vphone}
                                value={this.state.phone}
                                onChange={(e) => this.setState({ phone: e.target.value })}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label text-white"
                                htmlFor="input-email"
                              >
                                Email address
                            </label>
                              <Input
                                id="input-email"
                                // placeholder={this.state.profile.email}
                                type="email"
                                invalid={this.state.Vemail}
                                value={this.state.email}
                                onChange={(e) => this.setState({ email: e.target.value })}
                              />
                            </FormGroup>
                          </Col>




                        </Row>
                        <Alert color="warning" isOpen={this.state.error} fade={true}>
                          <span className="alert-inner--icon">
                            <i className="ni ni-sound-wave" />
                          </span>{" "}
                          <span className="alert-inner--text">
                            <strong>Error!</strong> {this.state.errorMessage}
                          </span>
                        </Alert>
                      </div>

                    </CardBody>
                  </Card>

                </Col>
              </Row>

              <Row>
                <Col>
                  <Card className="card-pricing border-0 mb-4">
                    <CardHeader className="bg-transparent">
                      <h4 className="text-uppercase ls-1  py-3 mb-0">
                        Address information
                  </h4>
                    </CardHeader>
                    <CardBody className="">

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
                                // defaultValue={this.state.profile.address}
                                id="input-address"
                                // placeholder="Home Address"
                                type="address"
                                value={this.state.address}
                                onChange={(e) => this.setState({ address: e.target.value })}
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
                                // defaultValue={this.state.profile.city}
                                id="input-city"
                                // placeholder="City"
                                type="city"
                                value={this.state.city}
                                onChange={(e) => this.setState({ city: e.target.value })}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>


                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                state
                            </label>
                              <Select2
                                className="form-control"
                                defaultValue="CA"
                                // options={{
                                //   placeholder: "Select"
                                // }}
                                value={this.state.state}
                                onChange={(e) => this.setState({ state: e.target.value })}
                                data={[
                                  { id: 'AL', text: "AL" },
                                  { id: 'AK', text: "AK" },
                                  { id: 'AR', text: "AR" },
                                  { id: 'AZ', text: "AZ" },
                                  { id: 'CA', text: "CA" },
                                  { id: 'CO', text: "CO" },
                                  { id: 'CT', text: "CT" },
                                  { id: 'DC', text: "DC" },
                                  { id: 'DE', text: "DE" },
                                  { id: 'FL', text: "FL" },
                                  { id: 'GA', text: "GA" },
                                  { id: 'HI', text: "HI" },
                                  { id: 'IA', text: "IA" },
                                  { id: 'ID', text: "ID" },
                                  { id: 'IL', text: "IL" },
                                  { id: 'IN', text: "IN" },
                                  { id: 'KS', text: "KS" },
                                  { id: 'KY', text: "KY" },
                                  { id: 'LA', text: "LA" },
                                  { id: 'MA', text: "MA" },
                                  { id: 'MD', text: "MD" },
                                  { id: 'ME', text: "ME" },
                                  { id: 'MI', text: "MI" },
                                  { id: 'MN', text: "MN" },
                                  { id: 'MO', text: "MO" },
                                  { id: 'MS', text: "MS" },
                                  { id: 'MT', text: "MT" },
                                  { id: 'NC', text: "NC" },
                                  { id: 'NE', text: "NE" },
                                  { id: 'NH', text: "NH" },
                                  { id: 'NJ', text: "NJ" },
                                  { id: 'NM', text: "NM" },
                                  { id: 'NV', text: "NV" },
                                  { id: 'NY', text: "NY" },
                                  { id: 'ND', text: "ND" },
                                  { id: 'OH', text: "OH" },
                                  { id: 'OK', text: "OK" },
                                  { id: 'OR', text: "OR" },
                                  { id: 'PA', text: "PA" },
                                  { id: 'RI', text: "RI" },
                                  { id: 'SC', text: "SC" },
                                  { id: 'SD', text: "SD" },
                                  { id: 'TN', text: "TN" },
                                  { id: 'TX', text: "TX" },
                                  { id: 'TX', text: "TX" },
                                  { id: 'VT', text: "VT" },
                                  { id: 'VA', text: "VA" },
                                  { id: 'WA', text: "WA" },
                                  { id: 'WI', text: "WI" },
                                  { id: 'WV', text: "WV" },
                                  { id: 'WY', text: "WY" }
                                ]}
                              />

                            </FormGroup>
                          </Col>
                          <Col lg="4">


                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-zip"
                              >
                                Postal code
                            </label>
                              <Input
                                // defaultValue={this.state.profile.city}
                                id="input-zip"
                                // placeholder="City"
                                type="zipcode"
                                value={this.state.zipcode}
                                onChange={(e) => this.setState({ zipcode: e.target.value })}
                              />
                            </FormGroup>


                          </Col>
                        </Row>
                      </div>

                    </CardBody>
                  </Card>
                </Col>
              </Row>

            </Col>


            <Col md="6" xl="6">

              <Row>
                <Col>


                  <Card className="">
                    <CardHeader className="" tag="h3">
                      Fitting Information
                  </CardHeader >
                    <CardBody>
                      <Row><Col>
                        <FormGroup>
                          <label
                            className="form-control-label "
                            htmlFor="input-zip"
                          >
                            Status
                            </label>
                          <Input
                            defaultValue="READY FOR FITTING"
                            id="input-status"
                            // placeholder="City"
                            type="zipcode"
                            value="READY FOR FITTING"
                            disabled={true}
                          // onChange={(e) => this.setState({ zipcode: e.target.value })}
                          />
                        </FormGroup>

                        <FormGroup>
                          <label
                            className="form-control-label "
                            htmlFor="exampleDatepicker"
                          >
                            Fitting Date
                            </label>
                          <ReactDatetime

                            // defaultValue={moment(this.state.fitting_date).format("dddd, MMMM Do YYYY, h:mm a")}
                            dateFormat="YYYY-DD-MM"
                            onChange={e => this.get_date(e)}

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
                  <Card className="card-pricing border-0 mb-4">
                    <CardHeader className="bg-transparent">
                      <h4 className="text-uppercase ls-1  py-3 mb-0">
                        Player Notes
                  </h4>
                    </CardHeader>
                    <CardBody className="">
                      <FormGroup>

                        <Input
                          // defaultValue={this.state.profile.fitting_notes}
                          // placeholder={this.state.profile.fitting_notes}
                          rows="4"
                          type="textarea"
                          value={this.state.fitting_notes}
                          onChange={(e) => this.setState({ fitting_notes: e.target.value })}
                        />
                      </FormGroup>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>




          </Row>




        </Container>

      </>
    );
  }
}

export default AddGolfer;

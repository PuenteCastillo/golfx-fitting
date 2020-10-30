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
	Col,
	Alert,
	CardFooter,
	Modal
} from "reactstrap";

import Select2 from "react-select2-wrapper";
// core components

import axios from "axios";

import SimpleHeader from "../../components/Headers/SimpleHeader";

class AddEmployee extends React.Component {
	state = {
		firstName: "",
		VfirstName: false,
		lastName: "",
		VlastName: false,
		phone: "",
		Vphone: false,
		email: "",
		Vemail: false,
		username: "",
		Vusername: false,
		password: "",
		Vpassword: false,
		position: "",
		Vpassword: false,
		btnDisable: false,
		errorMessage: "hello",
		error: false,
		notificationModal: false
	};
	toggleModal = (state) => {
		this.setState({
			[state]: !this.state[state]
		});
	};
	componentDidMount = () => {};

	validateEmail = (email) => {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	newEmployee = (e) => {
		e.preventDefault();
		console.log("hello world ");

		this.setState({ btnDisable: true });
		let loginErro = false;

		if (this.state.firstName === "") {
			this.setState({
				VfirstName: true,
				error: true,
				errorMessage: "Please fill out the all inputs!"
			});
			loginErro = true;
		}
		if (this.state.lastName === "") {
			this.setState({
				VlastName: true,
				error: true,
				errorMessage: "Please fill out the all inputs!"
			});
			loginErro = true;
		}
		if (this.state.phone === "") {
			this.setState({
				VfirstName: true,
				error: true,
				errorMessage: "Please fill out the all inputs!"
			});
			loginErro = true;
		}
		if (this.state.phone === "") {
			this.setState({
				Vphone: true,
				error: true,
				errorMessage: "Please fill out the all inputs!"
			});
			loginErro = true;
		}
		if (this.state.email === "") {
			this.setState({
				Vemail: true,
				error: true,
				errorMessage: "Please fill out the all inputs!"
			});
			loginErro = true;
		}
		if (this.state.password === "") {
			this.setState({
				Vpassword: true,
				error: true,
				errorMessage: "Please fill out the all inputs!"
			});
			loginErro = true;
		}
		if (this.state.username === "") {
			this.setState({
				Vusername: true,
				error: true,
				errorMessage: "Please fill out the all inputs!"
			});
			loginErro = true;
		}
		if (this.state.position === "") {
			this.setState({
				Vposition: true,
				error: true,
				errorMessage: "Please fill out the all inputs!"
			});
			loginErro = true;
		}

		if (this.validateEmail(this.state.email) === false) {
			this.setState({
				btnDisable: false,
				Vemail: true,
				error: true,
				errorMessage: "Please use a valid email"
			});
			loginErro = true;
		}

		if (loginErro === true) {
			this.setState({ btnDisable: false });

			return;
		}

		console.log(
			"fn= " +
				this.state.firstName +
				"ln= " +
				this.state.lastName +
				"phone= " +
				this.state.phone +
				"email= " +
				this.state.email +
				"username= " +
				this.state.username +
				"password= " +
				this.state.password
		);
		console.log(this.state.position);
		let thisisit = this;

		axios({
			method: "post",
			url: "https://kbsgolfx-db.herokuapp.com/auth/local/register",
			headers: {
				Authorization: `Bearer ${JSON.parse(
					localStorage.getItem("golfx_token")
				)}`
			},
			data: {
				name_first: thisisit.state.firstName,
				name_last: thisisit.state.lastName,
				phone: thisisit.state.phone,
				email: thisisit.state.email,
				password: thisisit.state.password,
				username: thisisit.state.username,
				position: thisisit.state.position
			}
		})
			.then(function(response) {
				// this.setState({ btnDisable : false})
				console.log(response);

				// window.location.href = '/admin/profil/' + response.data.id;
			})
			.catch(function(error) {
				console.log(error.response);
			});

		// thisisit.setState({ Vemail: false, error: false })
	};

	logOut = (e) => {
		e.preventDefault();
		window.location.reload(false);
	};

	render() {
		return (
			<>
				<SimpleHeader name="Add Employee" parentName="Employee" />
				<Container className="mt--6" fluid>
					<Row>
						<Col>
							<Card>
								{/* <CardHeader>
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Profile</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Save Changes
                      </Button>
                    </Col>
                  </Row>
                </CardHeader> */}
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
															// defaultValue={this.state.profile.name_first}
															id="input-first-name"
															// placeholder="First name"
															type="text"
															invalid={this.state.VfirstName}
															value={this.state.firstName}
															onChange={(e) =>
																this.setState({ firstName: e.target.value })
															}
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
															// defaultValue={this.state.profile.name_last}
															id="input-last-name"
															// placeholder="Last name"
															type="text"
															invalid={this.state.VlastName}
															value={this.state.lastName}
															onChange={(e) =>
																this.setState({ lastName: e.target.value })
															}
														/>
													</FormGroup>
												</Col>
											</Row>
											<Row>
												<Col lg="6">
													<FormGroup>
														<label
															className="form-control-label"
															htmlFor="input-username"
														>
															Phone #
														</label>
														<Input
															// defaultValue={this.state.profile.phone}
															id="input-username"
															// placeholder="Username"
															type="number"
															invalid={this.state.Vphone}
															value={this.state.phone}
															onChange={(e) =>
																this.setState({ phone: e.target.value })
															}
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
															id="input-email"
															// placeholder={this.state.profile.email}
															type="email"
															invalid={this.state.Vemail}
															value={this.state.email}
															onChange={(e) =>
																this.setState({ email: e.target.value })
															}
														/>
													</FormGroup>
												</Col>
											</Row>
										</div>

										<h6 className="heading-small text-muted mb-4">
											Credentials
										</h6>
										<div className="pl-lg-4">
											<Row>
												<Col lg="6">
													<FormGroup>
														<label
															className="form-control-label"
															htmlFor="input-first-name"
														>
															username
														</label>
														<Input
															// defaultValue={this.state.profile.name_first}
															id="input-first-name"
															// placeholder="First name"
															type="text"
															invalid={this.state.Vusername}
															value={this.state.username}
															onChange={(e) =>
																this.setState({ username: e.target.value })
															}
														/>
													</FormGroup>
												</Col>
												<Col lg="6">
													<FormGroup>
														<label
															className="form-control-label"
															htmlFor="input-last-name"
														>
															password
														</label>
														<Input
															// defaultValue={this.state.profile.name_last}
															id="input-last-name"
															// placeholder="Last name"
															type="password"
															invalid={this.state.Vpassword}
															value={this.state.password}
															onChange={(e) =>
																this.setState({ password: e.target.value })
															}
														/>
													</FormGroup>
												</Col>
											</Row>
											<Row>
												<Col lg="6">
													<label
														className="form-control-label"
														htmlFor="input-last-name"
													>
														Position
													</label>
													<Select2
														className="form-control"
														defaultValue={"Fitter"}
														// options={{
														//   placeholder: "Select"
														// }}
														invalid={false}
														data={[
															{ id: "DAdmin", text: "Builder" },
															{ id: "Sales", text: "Sales" },
															{ id: "Builder/Fitter", text: "Builder/Fitter" }
														]}
														value={this.state.position}
														onChange={(e) =>
															this.setState({ position: e.target.value })
														}
													/>
												</Col>
											</Row>
										</div>
									</Form>
								</CardBody>
								<CardFooter className="bg-transparent">
									<Alert color="warning" isOpen={this.state.error} fade={true}>
										<span className="alert-inner--icon">
											<i className="ni ni-sound-wave" />
										</span>{" "}
										<span className="alert-inner--text">
											<strong>Error!</strong> {this.state.errorMessage}
										</span>
									</Alert>

									<Button
										block
										color="primary"
										size="lg"
										type="button"
										disabled={this.state.btnDisable}
										onClick={(e) => this.newEmployee(e)}
									>
										Add Employee
									</Button>
								</CardFooter>
							</Card>
						</Col>
					</Row>
				</Container>

				<Modal
					className="modal-dialog-centered modal-danger"
					contentClassName="bg-gradient-danger"
					isOpen={this.state.notificationModal}
					toggle={(e) => this.logOut(e)}
				>
					<div className="modal-header">
						<h6 className="modal-title" id="modal-title-notification">
							User Created
						</h6>
						<button
							aria-label="Close"
							className="close"
							data-dismiss="modal"
							type="button"
							onClick={() => (e) => this.logOut(e)}
						>
							<span aria-hidden={true}>×</span>
						</button>
					</div>
					<div className="modal-body">
						<div className="py-3 text-center">
							<i className="ni ni-bell-55 ni-3x" />
							<h4 className="heading mt-4">You can now log as the new user!</h4>
						</div>
					</div>
					<div className="modal-footer">
						<Button
							className="btn-white"
							color="default"
							type="button"
							onClick={(e) => this.logOut(e)}
						>
							Ok, Got it
						</Button>
						<Button
							className="text-white ml-auto"
							color="link"
							data-dismiss="modal"
							type="button"
							onClick={(e) => this.logOut(e)}
						>
							Close
						</Button>
					</div>
				</Modal>
			</>
		);
	}
}

export default AddEmployee;

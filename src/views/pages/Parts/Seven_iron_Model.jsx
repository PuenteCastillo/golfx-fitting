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
import {
	// UncontrolledAlert,
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,

	InputGroup,
	Modal,
	
} from "reactstrap";
import classnames from "classnames";
import Select2 from "react-select2-wrapper";

class Seven_iron_Model extends React.Component {
	state = {
		defaultModal: false,
		notificationModal: false,
		formModal: false,
		alert: null,
		data: this.props.data
	};

	componentWillMount() {}

	updateDate = (e) => {
		e.preventDefault();

		let newData = this.state.data;

		newData.length = document.getElementById("input-length").value;
		newData.lie = document.getElementById("input-lie").value;
		newData.loft = document.getElementById("input-loft").value;
		newData.cpm = document.getElementById("input-cpm").value;
		newData.gripsize = document.getElementById("input-gripsize").value;
		newData.swing_weight = document.getElementById("input-swing_weight").value;

		this.setState({ data: newData });
		this.props.setSeven_iron(this.state.data);
		this.props.toggle();
	};

	render() {
		return (
			<>
				<Modal className="modal-dialog-centered" size="lg" isOpen={this.props.open} toggle={this.props.toggle}>
					<div className="modal-body p-0">
						<Card className="bg-secondary border-0 mb-0">
							<CardHeader className="bg-transparent pb-5">
								<div className="text-muted text-center mt-2">
									<small>Current Specs </small>
								</div>
							</CardHeader>
							<CardBody className="px-lg-5 py-lg-5">
								{/* <div className="text-center text-muted mb-4">
                                <small>Or sign in with credentials</small>
                              </div> */}
								<Form role="form">
									<div className="row">
										<div className="col-md-6">

									
									<FormGroup
										className={classnames("mb-3", {
											focused: this.state.focusLength
										})}
									>
										<i class="fas fa-ruler-horizontal modal-icon"></i>
										<label className="form-control-label modal-lable" htmlFor="example3cols1Input">
											Length
										</label>
										<InputGroup className="input-group-merge input-group-alternative">
											<Input
												defaultValue={this.state.data.length}
												// placeholder="Length"
												type="text"
												id="input-length"
												onFocus={() => this.setState({ focusLength: true })}
												onBlur={() => this.setState({ focusLength: false })}
											/>
										</InputGroup>
									</FormGroup>

									<FormGroup
										className={classnames("mb-3", {
											focused: this.state.focusLie
										})}
									>
										<i class="fad fa-ruler-triangle modal-icon"></i>
										<label className="form-control-label modal-lable" htmlFor="example3cols1Input">
											Lie
										</label>
										<InputGroup className="input-group-merge input-group-alternative">
											<Input
												defaultValue={this.state.data.lie}
												// placeholder="Lie"
												type="text"
												id="input-lie"
												onFocus={() => this.setState({ focusLie: true })}
												onBlur={() => this.setState({ focusLie: false })}
											/>
										</InputGroup>
									</FormGroup>

									<FormGroup
										className={classnames("mb-3", {
											focused: this.state.focusLoft
										})}
									>
										<i class="fas fa-chart-line modal-icon"></i>
										<label className="form-control-label modal-lable" htmlFor="example3cols1Input">
											Loft
										</label>
										<InputGroup className="input-group-merge input-group-alternative">
											<Input
												defaultValue={this.state.data.loft}
												// placeholder="Loft"
												type="text"
												id="input-loft"
												onFocus={() => this.setState({ focusLoft: true })}
												onBlur={() => this.setState({ focusLoft: false })}
											/>
										</InputGroup>
									</FormGroup>

									</div>
										<div className="col-md-6">
									

									<FormGroup
										className={classnames("mb-3", {
											focused: this.state.focusCPM
										})}
									>
										<i class="fas fa-hashtag modal-icon"></i>
										<label className="form-control-label modal-lable" htmlFor="example3cols1Input">
											CPM
										</label>
										<InputGroup className="input-group-merge input-group-alternative">
											<Input
												defaultValue={this.state.data.cpm}
												// placeholder="CPM"
												type="text"
												id="input-cpm"
												onFocus={() => this.setState({ focusCPM: true })}
												onBlur={() => this.setState({ focusCPM: false })}
											/>
										</InputGroup>
									</FormGroup>

									<FormGroup
										className={classnames("mb-3", {
											focused: this.state.focusGripSize
										})}
									>
										<i class="fas fa-fist-raised modal-icon"></i>
										<label className="form-control-label modal-lable" htmlFor="example3cols1Input">
											GripSize
										</label>
										{/* <InputGroup className="input-group-merge input-group-alternative">
											<Input
												defaultValue={this.state.data.gripsize}
												// placeholder="GripSize"
												type="text"
												id="input-gripsize"
												onFocus={() => this.setState({ focusGripSize: true })}
												onBlur={() => this.setState({ focusGripSize: false })}
											/>
										</InputGroup> */}
										<Select2
											className="form-control"
											// options={{
											//  placeholder: "Select"
											// }}
											defaultValue={this.state.data.gripsize}
											id="input-gripsize"
											data={[
												{ id: "Under", text: "Under" },
												{ id: "Standard", text: "Standard" },
												{ id: "Midsize", text: "Midsize" },
												{ id: "Jumbo", text: "Jumbo" }
											]}
											// value={value}
											value={this.state.gripsize}
											onChange={(e) => {
												this.setState({ gripsize: e.target.value });
											}}
										/>
									</FormGroup>

									<FormGroup
										className={classnames("mb-3", {
											focused: this.state.focusGripSize
										})}
									>
										
										<i class="fas fa-weight-hanging modal-icon"></i>
										<label className="form-control-label modal-lable" htmlFor="example3cols1Input">
											Swing Weight 
										</label>
										<InputGroup className="input-group-merge input-group-alternative">
											<Input
												defaultValue={this.state.data.swing_weight}
												placeholder="Swing Weight"
												type="text"
												id="input-swing_weight"
												onFocus={() => this.setState({ focusSwing_weight: true })}
												onBlur={() => this.setState({ focusSwing_weight: false })}
											/>
										</InputGroup>
										
									</FormGroup>
											
									</div>
									</div>


									<div className="text-center">
										<Button className="my-4" color="primary" type="button" onClick={(e) => this.updateDate(e)}>
											Add
										</Button>
									</div>
								</Form>
							</CardBody>
						</Card>
					</div>
				</Modal>
			</>
		);
	}
}
export default Seven_iron_Model;

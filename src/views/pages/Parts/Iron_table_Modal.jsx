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
	UncontrolledAlert,
	Button,
	
	FormGroup,
	Form,
	Input,

	Modal,
	
	Row,
	Col
} from "reactstrap";
import classnames from "classnames";
import Select2 from "react-select2-wrapper";
import axios from "axios";

class Iron_table_Modal extends React.Component {
	state = {
		showAlert: false,
		defaultModal: false,
		notificationModal: false,
		formModal: false,
		alert: null,
		data: this.props.data,
		productOption: [],
		oem: [],
		oemNames: [],
		clubOption: [],
		sevenIron: [],
		oemChoice: "",
		clubChoice: "",
		shaftChoice: "",
		tippingChoice: ""
	};

	componentWillMount() {
		let myState = this;

		axios
			.all([
				axios.get("https://kbsgolfx-db.herokuapp.com/brands"),
				axios.get("https://kbsgolfx-db.herokuapp.com/clubs"),
				axios.get("https://kbsgolfx-db.herokuapp.com/products")
			])
			.then(
				axios.spread((oemRes, clubRes, productRes) => {
					// do something with both responses

					function sortDate(a, isOem) {
						const data = a;
						let items = [];
						let singleItem = {};
						let dataName = "";
						// console.log('items', items);
						for (let i = 0; i < data.length; i++) {
							dataName = data[i].brand_name || data[i].club_name || data[i].product_name;
							singleItem = { id: dataName, text: dataName };
							items.push(singleItem);
						}
						items.sort((a, b) => a.text.localeCompare(b.text));
						if (isOem === "oem") {
							myState.setState({ oemNames: items, oem: data });
						} else if (isOem === "club") {
							myState.setState({ clubOption: items });
						} else {
							myState.setState({ productOption: items });
						}
					}
					
					// console.log(this.state.oem);
					sortDate(oemRes.data, "oem");
					sortDate(clubRes.data, "club");
					sortDate(productRes.data, "product");
				})
			);
	}

	updateRow = (row) => {
		console.log(this.state.oemChoice);

		//if club is choosen
		// if (row.club_type) {
		//   console.log(row.club_type)
		//   this.setState({ currentClub: row.club_type });
		// }

		//if Oem is choosen
		if (this.state.oemChoice) {
			this.setState({ currentOem: this.state.oemChoice });
			let clubList = this.state.oem.find((x) => x.brand_name === this.state.oemChoice).clubs;
			let items = [];
			let singleItem = {};
			let singleclubList = "";
			let singleId = 0;

			for (let i = 0; i < clubList.length; i++) {
				singleclubList = clubList[i].club_name;
				singleId = clubList[i].club_name;
				singleItem = { id: singleId, text: singleclubList };
				items.push(singleItem);
			}

			// sort alphabetically
			items.sort((a, b) => a.text.localeCompare(b.text));
			//update clubOtion
			this.setState({ clubOption: items });
		}

		console.log("hello row", this.state.clubOption);
		// console.log(this.props.type);

		// this.props.irons(this.state.irons);
	};

	generateData = (e) => {
		e.preventDefault();
		console.log(" gennerating table!");
		let myState = this;

		function genFrom7() {
			let data = [
				{
					id: 102,
					club: 2,
					loft: '',
					// loft: myState.state.sevenIron.loft - 20,
					lie: myState.state.sevenIron.lie - 2.5,
					cpm: '',
					// cpm: myState.state.sevenIron.cpm - 20,
					sw: document.getElementById("input-sw-table").value,
					length: myState.state.sevenIron.length + 2.5 || "",
					tipping: "",
					oem: myState.state.sevenIron.oem,
					club_type: myState.state.sevenIron.club_type,
					shaft_type: myState.state.sevenIron.shaft_type,
					flex: myState.state.sevenIron.flex
				},
				{
					id: 103,
					club: 3,
					loft: '',
					// loft: myState.state.sevenIron.loft - 16,
					lie: myState.state.sevenIron.lie - 2,
					cpm: '',
					// cpm: myState.state.sevenIron.cpm - 16,
					sw: document.getElementById("input-sw-table").value,
					length: myState.state.sevenIron.length + 2 || "",
					tipping: "",
					oem: myState.state.sevenIron.oem,
					club_type: myState.state.sevenIron.club_type,
					shaft_type: myState.state.sevenIron.shaft_type,
					flex: myState.state.sevenIron.flex
				},
				{
					id: 104,
					club: 4,
					loft: '',
					// loft: myState.state.sevenIron.loft - 12,
					lie: myState.state.sevenIron.lie - 1.5,
					cpm: '',
					// cpm: myState.state.sevenIron.cpm - 12,
					sw: document.getElementById("input-sw-table").value,
					length: myState.state.sevenIron.length + 1.5 || "",
					tipping: "",
					oem: myState.state.sevenIron.oem,
					club_type: myState.state.sevenIron.club_type,
					shaft_type: myState.state.sevenIron.shaft_type,
					flex: myState.state.sevenIron.flex
				},
				{
					id: 105,
					club: 5,
					loft: '',
					// loft: myState.state.sevenIron.loft - 8,
					lie: myState.state.sevenIron.lie - 1,
					// cpm: myState.state.sevenIron.cpm - 8,
					sw: document.getElementById("input-sw-table").value,
					length: myState.state.sevenIron.length + 1 || "",
					tipping: "",
					oem: myState.state.sevenIron.oem,
					club_type: myState.state.sevenIron.club_type,
					shaft_type: myState.state.sevenIron.shaft_type,
					flex: myState.state.sevenIron.flex
				},
				{
					id: 106,
					club: 6,
					loft: '',
					// loft: myState.state.sevenIron.loft - 4,
					lie: myState.state.sevenIron.lie - 0.5,
					cpm: '',
					// cpm: myState.state.sevenIron.cpm - 4,
					sw: document.getElementById("input-sw-table").value,
					length: myState.state.sevenIron.length + 0.5 || "",
					tipping: "",
					oem: myState.state.sevenIron.oem,
					club_type: myState.state.sevenIron.club_type,
					shaft_type: myState.state.sevenIron.shaft_type,
					flex: myState.state.sevenIron.flex
				},
				{
					id: 107,
					club: document.getElementById("input-club-table").value,
					loft: myState.state.sevenIron.loft,
					lie: myState.state.sevenIron.lie,
					cpm: myState.state.sevenIron.cpm,
					sw: document.getElementById("input-sw-table").value,
					length: document.getElementById("input-length-table").value,
					tipping: document.getElementById("input-tipping-table").value,
					oem: myState.state.sevenIron.oem,
					club_type: myState.state.sevenIron.club_type,
					shaft_type: document.getElementById("input-shaft-type-table").value,
					flex: myState.state.sevenIron.flex
				},
				{
					id: 108,
					club: 8,
					loft: '',
					// loft: myState.state.sevenIron.loft + 4,
					lie: myState.state.sevenIron.lie + 0.5,
					cpm: '',
					// cpm: myState.state.sevenIron.cpm + 4,
					sw: document.getElementById("input-sw-table").value,
					length: myState.state.sevenIron.length - 0.5 || "",
					tipping: "",
					oem: myState.state.sevenIron.oem,
					club_type: myState.state.sevenIron.club_type,
					shaft_type: myState.state.sevenIron.shaft_type,
					flex: myState.state.sevenIron.flex
				},
				{
					id: 109,
					club: 9,
					loft: '',
					// loft: myState.state.sevenIron.loft + 8,
					lie: myState.state.sevenIron.lie + 1,
					cpm: '',
					// cpm: myState.state.sevenIron.cpm + 8,
					sw: document.getElementById("input-sw-table").value,
					length: myState.state.sevenIron.length - 1 || "",
					tipping: "",
					oem: myState.state.sevenIron.oem,
					club_type: myState.state.sevenIron.club_type,
					shaft_type: myState.state.sevenIron.shaft_type,
					flex: myState.state.sevenIron.flex
				},
				{
					id: 110,
					club: "PW",
					loft: '',
					// loft: myState.state.sevenIron.loft + 12,
					lie: myState.state.sevenIron.lie + 1.5,
					cpm: '',
					// cpm: myState.state.sevenIron.cpm + 12,
					sw: document.getElementById("input-sw-table").value,
					length: myState.state.sevenIron.length - 1.25 || "",
					tipping: "",
					oem: myState.state.sevenIron.oem,
					club_type: myState.state.sevenIron.club_type,
					shaft_type: myState.state.sevenIron.shaft_type,
					flex: myState.state.sevenIron.flex
				}
			];

			myState.props.set_iron_data(data);
			myState.props.toggle();
		}
		// console.log(document.getElementById("input-club-table").value === "7")
		//     if (document.getElementById("input-club-table").value === "7") {
		//       // generate from 7 iron

		console.log("7 iron was made");
		let data = {
			club: document.getElementById("input-club-table").value,
			loft: parseFloat(document.getElementById("input-loft-table").value),
			lie: parseFloat(document.getElementById("input-lie-table").value),
			cpm: parseFloat(document.getElementById("input-cpm-table").value),
			sw: document.getElementById("input-sw-table").value,
			tipping: document.getElementById("input-tipping-table").value,
			length: parseFloat(document.getElementById("input-length-table").value),
			oem: document.getElementById("input-oem-table").value,
			club_type: document.getElementById("input-club-type-table").value,
			shaft_type: document.getElementById("input-shaft-type-table").value,
			flex: document.getElementById("input-flex-table").value
		};

		if (data.loft || data.lie || data.cpm) {
			console.log("7 iron was made", data);
			this.setState({ sevenIron: data });
			setTimeout(function() {
				genFrom7();
			}, 500);
		} else {
			///alert
			this.setState({ focusLie: true, focusCPM: true, focusLoft: true, showAlert: true });
		}

		// }
	};

	updateDate = (e) => {
		e.preventDefault();

		let newData = this.state.data;

		newData.length = document.getElementById("input-length").value;
		newData.lie = document.getElementById("input-lie").value;
		newData.loft = document.getElementById("input-loft").value;
		newData.cpm = document.getElementById("input-cpm").value;
		newData.gripsize = document.getElementById("input-gripsize").value;

		this.setState({ data: newData });
		this.props.setSeven_iron(this.state.data);
		this.props.toggle();
	};

	render() {
		return (
			<>
				<Modal className="modal-dialog-centered" isOpen={this.props.open} toggle={this.props.toggle}>
					<div className="modal-header">
						<div>
							<h6 className="modal-title" id="modal-title-default">
								Table Generator
							</h6>
							<p className="modal-sub-title" id="modal-title-default">
								Please insert players 7 iron data
							</p>
						</div>

						<button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => this.props.toggle()}>
							<span aria-hidden={true}>×</span>
						</button>
					</div>

					<div className="modal-body pushMeUP">
						<Form role="form">
							<Row>
								<Col>
									<FormGroup
										className={classnames("mb-3", {
											focused: this.state.focusLength
										})}
									>
										<label className="form-control-label" htmlFor="exampleFormControlInput1">
											Club
										</label>
										<Select2
											className="form-control"
											disabled={true}
											id="input-club-table"
											defaultValue={"7"}
											// options={{
											// placeholder: "Select"
											// }}

											data={[
												{ id: "2", text: "2" },
												{ id: "3", text: "3" },
												{ id: "4", text: "4" },
												{ id: "5", text: "5" },
												{ id: "6", text: "6" },
												{ id: "7", text: "7" },
												{ id: "8", text: "8" },
												{ id: "9", text: "9" },
												{ id: "PW", text: "PW" },
												{ id: "GW", text: "GW" },
												{ id: "SW", text: "SW" },
												{ id: "LW", text: "LW" }
											]}
											value={this.state.position}
											onChange={(e) => this.setState({ position: e.target.value })}
										/>
									</FormGroup>

									<FormGroup
										className={classnames("mb-3", {
											focused: this.state.focusLoft
										})}
									>
										<label className="form-control-label" htmlFor="exampleFormControlInput1">
											Loft<span className="accent-color">*</span>
										</label>
										<Input
											defaultValue={this.state.data.loft}
											id="input-loft"
											// placeholder="Loft"
											type="number"
											id="input-loft-table"
											onFocus={() => this.setState({ focusLoft: true })}
											onBlur={() => this.setState({ focusLoft: false })}
										/>
									</FormGroup>

									<FormGroup
										className={classnames("mb-3", {
											focused: this.state.focusLie
										})}
									>
										<label className="form-control-label" htmlFor="exampleFormControlInput1">
											Lie<span className="accent-color">*</span>
										</label>
										<Input
											defaultValue={this.state.data.lie}
											// placeholder="Lie"
											type="number"
											id="input-lie-table"
											onFocus={() => this.setState({ focusLie: true })}
											onBlur={() => this.setState({ focusLie: false })}
										/>
									</FormGroup>

									<FormGroup
										className={classnames("mb-3", {
											focused: this.state.focusCPM
										})}
									>
										<label className="form-control-label" htmlFor="exampleFormControlInput1">
											CPM<span className="accent-color">*</span>
										</label>
										<Input
											defaultValue={this.state.data.cpm}
											// placeholder="CPM"
											type="number"
											id="input-cpm-table"
											onFocus={() => this.setState({ focusCPM: true })}
											onBlur={() => this.setState({ focusCPM: false })}
										/>
									</FormGroup>

									<FormGroup
										className={classnames("mb-3", {
											focused: this.state.focusGripSize
										})}
									>
										<label className="form-control-label" htmlFor="exampleFormControlInput1">
											S.W
										</label>

										<Input
											defaultValue={this.state.data.SW}
											// placeholder="S.W"
											type="text"
											id="input-sw-table"
											onFocus={() => this.setState({ focusSW: true })}
											onBlur={() => this.setState({ focusSW: false })}
										/>
									</FormGroup>
									<FormGroup
										className={classnames("mb-3", {
											focused: this.state.focusGripSize
										})}
									>
										<label className="form-control-label" htmlFor="exampleFormControlInput1">
											Flex
										</label>

										<Input
											defaultValue={this.state.data.flex}
											// placeholder="Flex"
											type="text"
											id="input-flex-table"
											onFocus={() => this.setState({ focusFlex: true })}
											onBlur={() => this.setState({ focusFlex: false })}
										/>
									</FormGroup>
								</Col>
								<Col>
									<FormGroup
										className={classnames("mb-3", {
											focused: this.state.focusGripSize
										})}
									>
										<label className="form-control-label" htmlFor="exampleFormControlInput1">
											Length
										</label>

										<Input
											defaultValue={this.state.data.Length}
											// placeholder="Length"
											type="number"
											id="input-length-table"
											onFocus={() => this.setState({ focusLength: true })}
											onBlur={() => this.setState({ focusLength: false })}
										/>
									</FormGroup>

									<FormGroup
										className={classnames("mb-3", {
											focused: this.state.focusGripSize
										})}
									>
										<label className="form-control-label" htmlFor="exampleFormControlInput1">
											Tipping
										</label>

										<Select2
											className="form-control"
											// options={{
											//  placeholder: "Select"
											// }}
											id="input-tipping-table"
											data={[
												{ id: '.5"', text: '.5"' },
												{ id: '1"', text: '1"' },
												{ id: '1.5"', text: '1.5"' },
												{ id: '2"', text: '2"' }
											]}
											value={this.state.tippingChoice}
											onChange={(e) => {
												this.setState({ tippingChoice: e.target.value });
												this.updateRow();
											}}
										/>
									</FormGroup>

									<FormGroup
										className={classnames("mb-3", {
											focused: this.state.focusLength
										})}
									>
										<label className="form-control-label" htmlFor="exampleFormControlInput1">
											OEM
										</label>
										<Select2
											className="form-control"
											defaultValue={"7"}
											// options={{
											//placeholder: "Select"
											// }}

											id="input-oem-table"
											data={this.state.oemNames}
											value={this.state.oemChoice}
											onChange={(e) => {
												this.setState({ oemChoice: e.target.value });
												this.updateRow();
											}}
										/>
									</FormGroup>

									<FormGroup
										className={classnames("mb-3", {
											focused: this.state.focusLength
										})}
									>
										<label className="form-control-label" htmlFor="exampleFormControlInput1">
											Club type
										</label>
										<Select2
											className="form-control"
											defaultValue={"7"}
											id="input-club-type-table"
											// options={{
											//  placeholder: "Select"
											// }}

											data={this.state.clubOption}
											value={this.state.clubChoice}
											onChange={(e) => {
												this.setState({ clubChoice: e.target.value });
												this.updateRow();
											}}
										/>
									</FormGroup>

									<FormGroup
										className={classnames("mb-3", {
											focused: this.state.focusLength
										})}
									>
										<label className="form-control-label" htmlFor="exampleFormControlInput1">
											Shaft Type
										</label>
										<Select2
											className="form-control"
											defaultValue={"7"}
											id="input-shaft-type-table"
											// options={{
											//placeholder: "Select"
											// }}

											data={this.state.productOption}
											value={this.state.shaftChoice}
											onChange={(e) => {
												this.setState({ shaftChoice: e.target.value });
												this.updateRow();
											}}
										/>
									</FormGroup>
								</Col>
							</Row>
						</Form>
					</div>
					<Row>
						<Col>
							<UncontrolledAlert color="warning" isOpen={this.state.showAlert}>
								<span className="alert-icon">
									<i className="ni ni-like-2" />
								</span>
								<span className="alert-text ml-1">
									<strong>Error!</strong> Please fill out the nessesary fields out!
								</span>
							</UncontrolledAlert>
						</Col>
					</Row>
					<div className="modal-footer">
						<Button color="primary" onClick={(e) => this.generateData(e)}>
							Build Table
						</Button>
						<Button className="ml-auto" color="link" data-dismiss="modal" type="button" onClick={(e) => this.props.skip()}>
							Skip >
						</Button>
					</div>
				</Modal>
			</>
		);
	}
}
export default Iron_table_Modal;

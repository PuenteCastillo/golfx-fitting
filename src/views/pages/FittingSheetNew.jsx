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
	CardFooter
} from "reactstrap";
import classnames from "classnames";
// core components

import FittingHeader from "components/Headers/FittingHeader.jsx";
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import FittingTable2 from "./FittingTable2";
import { Prompt } from "react-router";
import axios from "axios";
import AppCard from "./Parts/AppCard";
import CustomerNotes from "./Parts/CustomerNotes";
import SpecModel from "./Parts/SpecModel";
import Seven_iron_Model from "./Parts/Seven_iron_Model";

import Data_Static_Specs from "./Parts/Data_Static_Specs";
import Data_Seven_Iron_Spec from "./Parts/Data_Seven_Iron_Spec";
import Iron_table_Modal from "./Parts/Iron_table_Modal";

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
	{ value: "LW", label: "LW" }
];
const HybridSelect = [
	{ value: "2", label: "2" },
	{ value: "3", label: "3" },
	{ value: "4", label: "4" },
	{ value: "5", label: "5" },
	{ value: "6", label: "6" },
	{ value: "7", label: "7" }
];
const WoodSelect = [
	{ value: "Drive", label: "Drive" },
	{ value: "3W", label: "3W" },
	{ value: "4W", label: "4W" },
	{ value: "5W", label: "5W" },
	{ value: "7W", label: "7W" }
];

class FittingSheetNew extends React.Component {
	// ██╗   ██╗ █████╗ ██████╗ ██╗ █████╗ ██████╗ ██╗     ███████╗███████╗
	// ██║   ██║██╔══██╗██╔══██╗██║██╔══██╗██╔══██╗██║     ██╔════╝██╔════╝
	// ██║   ██║███████║██████╔╝██║███████║██████╔╝██║     █████╗  ███████╗
	// ╚██╗ ██╔╝██╔══██║██╔══██╗██║██╔══██║██╔══██╗██║     ██╔══╝  ╚════██║
	//  ╚████╔╝ ██║  ██║██║  ██║██║██║  ██║██████╔╝███████╗███████╗███████║
	//   ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝╚══════╝

	state = {
		alert: null,
		showIrons: false,
		showHybrids: false,
		showwoods: false,
		specToggle: false,
		iron_table_modal: false,
		seven_iron_sepc_Toggle: false,
		Seven_iron_sepc_recieved: false,
		static_specs_recieved: false,
		iron_data_recieved: false,
		Render_Submit_button: true,
		render_fitting_notes: false,
		fitting_notes: "",
		building_notes: "",
		static_specs: {
			height: "",
			wrist_to_floor: "",
			normal_shot_shape: "",
			normal_trajectory: ""
		},
		seven_iron_specs: {
			length: "",
			lie: "",
			loft: "",
			cpm: "",
			gripsize: ""
		},
		customer_info: {
			name: JSON.parse(localStorage.getItem("customer_info")).name_first + " " + JSON.parse(localStorage.getItem("customer_info")).name_last,
			phone: JSON.parse(localStorage.getItem("customer_info")).phone,
			email: JSON.parse(localStorage.getItem("customer_info")).email,
			address: JSON.parse(localStorage.getItem("customer_info")).address,
			city: JSON.parse(localStorage.getItem("customer_info")).city,
			state: JSON.parse(localStorage.getItem("customer_info")).state,
			zipcode: JSON.parse(localStorage.getItem("customer_info")).zipcode
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
				shaft_type: ""
			}
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
				marked: "Delete"
			}
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
				marked: "Delete"
			}
		]
	};
	toggleModal = (state) => {
		this.setState({
			[state]: !this.state[state]
		});
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

	////// update Specs ////

	setSpec = (newSpec) => {
		this.setState({ static_specs: newSpec, static_specs_recieved: true });
	};

	render_Static_Specs = () => {
		if (this.state.static_specs_recieved) {
			return <Data_Static_Specs data={this.state.static_specs} toggle={(e) => this.toggleModal("specToggle")} />;
		} else {
			return (
				<AppCard
					title="Static Specs"
					btnText="Add specs"
					icon="fad fa-ruler display-2"
					style="icon icon-shape bg-gradient-red text-dark rounded-circle shadow"
					toggle={(e) => this.toggleModal("specToggle")}
				/>
			);
		}
	};

	setSeven_iron = (data) => {
		this.setState({ seven_iron_specs: data, Seven_iron_sepc_recieved: true });
	};

	render_Seven_iron = () => {
		if (this.state.Seven_iron_sepc_recieved) {
			return <Data_Seven_Iron_Spec data={this.state.seven_iron_specs} toggle={(e) => this.toggleModal("seven_iron_sepc_Toggle")} />;
		} else {
			return (
				<AppCard
					title="Current 7 iron"
					btnText="Add 7 iron"
					icon="fad fa-golf-club display-2"
					style="icon icon-shape bg-gradient-red text-dark rounded-circle shadow"
					toggle={(e) => this.toggleModal("seven_iron_sepc_Toggle")}
				/>
			);
		}
	};

	openTable = (state) => {
		this.setState({
			showIrons: false,
			showHybrids: false,
			showWoods: false
		});

		this.setState({
			[state]: true
		});
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
			url: "https://kbsgolfx-db.herokuapp.com/fittings",
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("golfx_token"))}`
			},
			data: {
				fitting_notes: this.state.fitting_notes,
				building_notes: this.state.building_notes,
				customer: {
					id: JSON.parse(localStorage.getItem("customer_info")).id
				},
				customer_info: this.state.customer_info,
				seven_iron_specs: this.state.seven_iron_specs,
				static_specs: this.state.static_specs,
				irons: this.state.irons,
				hybrids: this.state.hybrids,
				wood: this.state.woods
			}
		})
			.then(function(response) {
				console.log(response);
			})
			.catch(function(error) {
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
					<Button className="float-right" color="primary" size="lg" type="button" onClick={this.creta_a_fitting}>
						Submit Fitting
					</Button>
				</CardFooter>
			);
		}
	};

	set_iron_data = (data) => {
		this.setState({ irons: data, iron_data_recieved: true });
	};

	skip = (e) => {
		console.log("skipped");
		this.setState({ iron_data_recieved: true });
		this.toggleModal("iron_table_modal");
	};

	render_irons = () => {
		if (!this.state.iron_data_recieved) {
			return (
				<div className="m-5" onClick={(e) => this.toggleModal("iron_table_modal")}>
					<h4 className="text-center"> Add Irons </h4>
					<h1 className="text-center">
						<i class="fal fa-table iconSize"></i>{" "}
					</h1>
					<h4 className="text-center">
						{" "}
						<i class="fas fa-plus text-primary"></i>
					</h4>
				</div>
			);
		} else {
			return <FittingTable2 clubSelect={clubSelect} irons={(e) => this.updateIrons(e)} startingData={this.state.irons} />;
		}
	};

	render_fitting_note = () => {
		if (this.state.render_fitting_notes) {
			return (
				<Col md="12">
					<Card>
						<Card className="card-pricing border-0 text-center mb-4">
							<CardHeader className="bg-transparent">
								<h4 className="text-uppercase ls-1  py-3 mb-0">Fitting Notes</h4>
							</CardHeader>
							<CardBody>
								<FormGroup>
									{/* <label className="form-control-label">
                Fitting Notes{" "}
              </label> */}
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
							</CardBody>
						</Card>
					</Card>
				</Col>
			);
		} else {
			return (
				<AppCard
					title="Fitting Notes"
					btnText="Add Fitting Notes"
					icon="fad fa-sticky-note display-2"
					style="icon icon-shape bg-gradient-red text-dark rounded-circle shadow"
					toggle={(e) => this.toggleModal("render_fitting_notes")}
				/>
			);
		}
	};

	render_building_note = () => {
		if (this.state.render_building_notes) {
			return (
				<Col md="12">
					<Card className="card-pricing border-0 text-center mb-4">
						<CardHeader className="bg-transparent">
							<h4 className="text-uppercase ls-1  py-3 mb-0">Building Notes</h4>
						</CardHeader>
						<CardBody>
							<FormGroup>
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
						</CardBody>
					</Card>
				</Col>
			);
		} else {
			return (
				<AppCard
					title="Building Notes"
					btnText="Add Fitting Notes"
					icon="fad fa-sticky-note display-2"
					style="icon icon-shape bg-gradient-red text-dark rounded-circle shadow"
					toggle={(e) => this.toggleModal("render_building_notes")}
				/>
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
				{/* {this.state.alert} */}

				<SimpleHeader
					name={JSON.parse(localStorage.getItem("customer_info")).name_first + " " + JSON.parse(localStorage.getItem("customer_info")).name_last}
					parentName="Fitting Sheet"
					update={(e) => this.creta_a_fitting()}
				/>

				<SpecModel
					data={this.state.static_specs}
					open={this.state.specToggle}
					toggle={(e) => this.toggleModal("specToggle")}
					setSpec={(e) => this.setSpec(e)}
				/>
				<Seven_iron_Model
					data={this.state.seven_iron_specs}
					open={this.state.seven_iron_sepc_Toggle}
					toggle={(e) => this.toggleModal("seven_iron_sepc_Toggle")}
					setSeven_iron={(e) => this.setSeven_iron(e)}
				/>
				<Iron_table_Modal
					skip={(e) => this.skip(e)}
					data={this.state.irons}
					open={this.state.iron_table_modal}
					toggle={(e) => this.toggleModal("iron_table_modal")}
					set_iron_data={(e) => this.set_iron_data(e)}
				/>

				<Container className="mt--6" fluid>
					<Row>
						{/* <AppCard title="Static Specs" icon="fas fa-ruler" style="icon icon-shape bg-gradient-red text-dark rounded-circle shadow" />
            <AppCard title="7 Iron Specs" icon="fad fa-golf-club" style="icon icon-shape bg-gradient-blue text-dark rounded-circle shadow" />
            <AppCard title="Fitting Notes" icon="fad fa-golf-club" style="icon icon-shape bg-gradient-blue text-dark rounded-circle shadow" />
            <AppCard title="Building Notes" icon="fad fa-golf-club" style="icon icon-shape bg-gradient-blue text-dark rounded-circle shadow" />
            <AppCard title="Irons" icon="fad fa-golf-club" style="icon icon-shape bg-gradient-blue text-dark rounded-circle shadow" />
            <AppCard title="Hybrid" icon="fad fa-golf-club" style="icon icon-shape bg-gradient-blue text-dark rounded-circle shadow" />
            <AppCard title="Wood" icon="fad fa-golf-club" style="icon icon-shape bg-gradient-blue text-dark rounded-circle shadow" /> */}
					</Row>

					<Row>
						<Col className="order-xl-2" xl="4">
							<CustomerNotes />

							<Row>
								{this.render_fitting_note()}

								{this.render_building_note()}
							</Row>
						</Col>
						<Col className="order-xl-1" xl="8">
							<Row>
								{this.render_Static_Specs()}
								{this.render_Seven_iron()}
							</Row>

							<Row>
								<Col>
									<Card>
										<CardHeader onClick={(e) => this.openTable("showIrons")}>IRONS</CardHeader>
										<Collapse isOpen={this.state.showIrons}>
											<Card>
												<CardBody>{this.render_irons()}</CardBody>
											</Card>
										</Collapse>
										<CardHeader onClick={(e) => this.openTable("showHybrids")}>HYBRIDS </CardHeader>
										<Collapse isOpen={this.state.showHybrids}>
											<Card>
												<CardBody>
													<FittingTable2 clubSelect={HybridSelect} irons={(e) => this.updateHybrids(e)} />
												</CardBody>
											</Card>
										</Collapse>

										<CardHeader onClick={(e) => this.openTable("showWoods")}>WOODS</CardHeader>
										<Collapse isOpen={this.state.showWoods}>
											<Card>
												<CardBody>
													<FittingTable2 clubSelect={WoodSelect} irons={(e) => this.updateWoods(e)} />
												</CardBody>
											</Card>
										</Collapse>
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

export default FittingSheetNew;

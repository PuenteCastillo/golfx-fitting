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

// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
// reactstrap components
import { Button, Card, CardHeader, Container, Row, Col, CardFooter, CardBody, Input } from "reactstrap";
import Select2 from "react-select2-wrapper";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";

import { dataTable } from "variables/general";
import axios from "axios";
console.log("local", dataTable);
const selectRow = {
	mode: "radio",
	clickToSelect: true,
	hideSelectColumn: true,
	bgColor: "#f2f2f2",

	onSelect: (row, isSelect, rowIndex, e) => {
		console.log(row);
		console.log(isSelect);
		console.log(rowIndex);
	}
};

const pagination = paginationFactory({
	page: 1,
	alwaysShowAllBtns: true,
	showTotal: true,
	withFirstAndLast: false,
	sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
		<div className="dataTables_length" id="datatable-basic_length">
			<label>
				Show{" "}
				{
					<select
						name="datatable-basic_length"
						aria-controls="datatable-basic"
						className="form-control form-control-sm"
						onChange={(e) => onSizePerPageChange(e.target.value)}
					>
						<option value="10">10</option>
						<option value="25">25</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
				}{" "}
				entries.
			</label>
		</div>
	)
});

const { SearchBar } = Search;

class Clubs extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			alert: null,
			profile: {},
			oem: [],
			oemList: [],
			brandList: [],
			club: "",
			Vclub: false,
			brand: "",
			addClub: false,
			addOem: false,
			newOem: "",
			VnewOem: false,
			dataRetieve: false
		};
	}
	// this function will copy to clipboard an entire table,
	// so you can paste it inside an excel or csv file
	copyToClipboardAsTable = (el) => {
		var body = document.body,
			range,
			sel;
		if (document.createRange && window.getSelection) {
			range = document.createRange();
			sel = window.getSelection();
			sel.removeAllRanges();
			try {
				range.selectNodeContents(el);
				sel.addRange(range);
			} catch (e) {
				range.selectNode(el);
				sel.addRange(range);
			}
			document.execCommand("copy");
		} else if (body.createTextRange) {
			range = body.createTextRange();
			range.moveToElementText(el);
			range.select();
			range.execCommand("Copy");
		}
		this.setState({
			alert: (
				<ReactBSAlert
					success
					style={{ display: "block", marginTop: "-100px" }}
					title="Good job!"
					onConfirm={() => this.setState({ alert: null })}
					onCancel={() => this.setState({ alert: null })}
					confirmBtnBsStyle="info"
					btnSize=""
				>
					Copied to clipboard!
				</ReactBSAlert>
			)
		});
	};
	selectRow = () => {
		console.log("hello");
	};

	componentDidMount = () => {
		// http://localhost:1337/oems
		console.log("jskabfdhjbsh");

		axios({
			method: "get",
			url: "https://kbsgolfx-db.herokuapp.com/clubs",
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("golfx_token"))}`
			}
		})
			// axios.get(`http://localhost:1337/restaurants/`)
			.then((res) => {
				const clubs = res.data;

				console.log(clubs);

				this.setState({ clubsList: clubs, data: true, dataRetieve: true });
				// this.sortDate();
				// console.log('server', this.state.clubsList)
				// this.renderStores();
			});

		axios({
			method: "get",
			url: "https://kbsgolfx-db.herokuapp.com/brands",
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("golfx_token"))}`
			}
		})
			// axios.get(`http://localhost:1337/restaurants/`)
			.then((res) => {
				const oem = res.data;

				console.log(oem);
				let items = [];
				let singleItem = {};
				let singleOem = "";
				let singleId = 0;
				for (let i = 0; i < oem.length; i++) {
					// copy.push(items[i]);
					singleOem = oem[i].brand_name;
					singleId = oem[i].id;
					singleItem = { id: singleId, text: singleOem };
					items.push(singleItem);

					console.log("items", items);
				}

				this.setState({ oemList: oem, data: true, brandList: items });
				// this.sortDate();
				console.log("oem", this.state.oemList);
				// this.renderStores();
			});
	};

	newClub = (e) => {
		e.preventDefault();
		console.log(this.state.brand);
		console.log(this.state.club);
		let thisisit = this;
		axios({
			method: "post",
			url: "https://kbsgolfx-db.herokuapp.com/clubs",
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("golfx_token"))}`
			},
			data: {
				club_name: thisisit.state.club,
				brand: {
					id: this.state.brand
				}
			}
		})
			.then(function(response) {
				// this.setState({ btnDisable : false})
				console.log(response);
				window.location.href = "/admin/Clubs";
			})
			.catch(function(error) {
				console.log(error.response);
			});
	};

	newClubBtn = (e) => {
		e.preventDefault();
		this.setState({ addClub: true, addOem: false });
	};
	newOemBtn = (e) => {
		e.preventDefault();
		this.setState({ addClub: false, addOem: true });
	};

	renderData = () => {
		if (this.state.dataRetieve) {
			return (
				<ToolkitProvider
					data={this.state.clubsList}
					keyField="id"
					columns={[
						{
							dataField: "id",
							text: "id",
							sort: true
						},
						{
							dataField: "club_name",
							text: "Clubs",
							sort: true
						},
						{
							dataField: "brand.brand_name",
							text: "Oem",
							sort: true
						}
					]}
					search
				>
					{(props) => (
						<div className="py-4 table-responsive">
							<div id="datatable-basic_filter" className="dataTables_filter px-4 pb-1">
								<label>
									Search:
									<SearchBar className="form-control-sm" placeholder="" {...props.searchProps} />
								</label>
							</div>

							<BootstrapTable {...props.baseProps} bootstrap4={true} pagination={pagination} bordered={false} selectRow={selectRow} />
						</div>
					)}
				</ToolkitProvider>
			);
		}
	};

	renderTable = () => {
		if (this.state.data === true) {
			return (
				<Card>
					<CardHeader>
						<Row className="align-items-center">
							<Col xs="8">
								<h3 className="mb-0"> Clubs</h3>
								<p className="text-sm mb-0">Add or Search Clubs</p>
							</Col>
							<Col className="text-right" xs="4">
								<Button color="primary" href="#pablo" onClick={this.newOemBtn} size="sm">
									Add oem
								</Button>
								<Button color="primary" href="#pablo" onClick={this.newClubBtn} size="sm">
									Add Club
								</Button>
							</Col>
						</Row>
					</CardHeader>
					{this.renderData()}
				</Card>
			);
		}
	};

	renderAddClub = () => {
		if (this.state.addClub) {
			return (
				<Card>
					<CardHeader>Add Club</CardHeader>
					<CardBody>
						<h6 className="heading-small text-muted mb-4">Choose Oem</h6>

						<Select2
							className="form-control"
							// options={{
							//   placeholder: "Select"
							// }}
							data={this.state.brandList}
							value={this.state.brand}
							onChange={(e) => this.setState({ brand: e.target.value })}
						/>

						<label className="form-control-label" htmlFor="input-first-name">
							Club Name
						</label>
						<Input
							// defaultValue={this.state.profile.name_first}
							id="input-first-name"
							// placeholder="First name"
							type="text"
							invalid={this.state.Vclub}
							value={this.state.club}
							onChange={(e) => this.setState({ club: e.target.value })}
						/>
					</CardBody>
					<CardFooter>
						<Button block color="primary" size="lg" type="button" onClick={this.newClub}>
							Add Club
						</Button>
					</CardFooter>
				</Card>
			);
		}
	};

	newOem = (e) => {
		e.preventDefault();
		console.log(this.state.newOem);
		let thisisit = this;
		axios({
			method: "post",
			url: "https://kbsgolfx-db.herokuapp.com/brands",
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("golfx_token"))}`
			},
			data: {
				brand_name: thisisit.state.newOem
			}
		})
			.then(function(response) {
				// this.setState({ btnDisable : false})
				console.log(response);
				window.location.href = "/admin/Clubs";
			})
			.catch(function(error) {
				console.log(error.response);
			});
	};

	renderAddOem = () => {
		if (this.state.addOem) {
			return (
				<Card>
					<CardHeader>Add Oem</CardHeader>
					<CardBody>
						<h6 className="heading-small text-muted mb-4">New Oem Name</h6>

						<Input
							// defaultValue={this.state.profile.name_first}
							id="input-first-name"
							// placeholder="First name"
							type="text"
							invalid={this.state.VnewOem}
							value={this.state.newOem}
							onChange={(e) => this.setState({ newOem: e.target.value })}
						/>
					</CardBody>
					<CardFooter>
						<Button block color="primary" size="lg" type="button" onClick={this.newOem}>
							Add Club
						</Button>
					</CardFooter>
				</Card>
			);
		}
	};

	render() {
		return (
			<>
				{this.state.alert}
				<SimpleHeader parentName="Fittings" />
				<Container className="mt--6" fluid>
					{this.renderAddClub()}
					{this.renderAddOem()}
					<Row>
						<div className="col">{this.renderTable()}</div>
					</Row>
				</Container>
			</>
		);
	}
}

export default Clubs;

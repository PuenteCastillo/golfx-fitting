import React from "react";
// react plugin that prints a given react component
import { Button, CardFooter, CardHeader } from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import axios from "axios";

class FittingTable2 extends React.Component {
	state = {
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
				tipping: "",
				club_type: "",
				shaft_type: "",
				flex: "",
				marked: "Delete"
			}
		],
		clubOption: [],
		productOption: [],
		oem: [],
		oemNames: [],
		currentOem: "",
		currentClub: "",
		num: 1,
		selected: []
	};

	componentDidMount = () => {
		let myState = this;

		if (this.props.startingData) {
			for (let i = 0; i < this.props.startingData.length; i++) {
				this.props.startingData[i].marked = "Delete";
				this.props.startingData[i].id += 300;
			}
			this.setState({ irons: this.props.startingData });
			// console.log(this.state.irons);
		}
		let componentInfo = this;
		// ,---.     |        ,---.|         |                      |    ,---.              ,--.      |
		// |  _.,---.|---     |    |    .   .|---.    ,---.,---.,---|    |   |,---.,-.-.    |   |,---.|--- ,---.
		// |   ||---'|        |    |    |   ||   |    ,---||   ||   |    |   ||---'| | |    |   |,---||    ,---|
		// `---'`---'`---'    `---'`---'`---'`---'    `---^`   '`---'    `---'`---'` ' '    `--' `---^`---'`---^
		axios
			.all([
				axios.get("https://kbsgolfx-db.herokuapp.com/brands"),
				axios.get("https://kbsgolfx-db.herokuapp.com/clubs"),
				axios.get("https://kbsgolfx-db.herokuapp.com/products")
			])
			.then(
				axios.spread((oemRes, clubRes, productRes) => {
					// do something with both responses
					console.log('product red', productRes)
					function sortDate(a, isOem) {
						const data = a;
						let items = [];
						let singleItem = {};
						let dataName = "";
						for (let i = 0; i < data.length; i++) {
							dataName = data[i].brand_name || data[i].club_name || data[i].product_name;
							singleItem = { value: dataName, label: dataName };
							items.push(singleItem);
						}
						items.sort((a, b) => a.label.localeCompare(b.label));
						if (isOem === "oem") {
							myState.setState({ oemNames: items, oem: data });
						} else if (isOem === "club") {
							myState.setState({ clubOption: items });
						} else if (isOem === "product") {
							
							myState.setState({ productOption: items });

						}
					}
					// setTimeout(console.log('items', this.state.productOption), 500)
					sortDate(oemRes.data, "oem");
					sortDate(clubRes.data, "club");
					sortDate(productRes.data, "product");
					console.log('product options', this.state.productOption)

					// function getProductCat() {
					// 	console.log("productRes.data", productRes.data);
					// 	console.log("name", myState.props.table);
					// 	let filterCat = [];
					// 	for (let i = 0; i < productRes.data.length; i++) {
					// 		if (productRes.data[i].category === myState.props.table) {
					// 			// console.log(productRes.data[i]);
					// 			filterCat.push(productRes.data[i]);
					// 		}
					// 	}
					// 	sortDate(filterCat, "product");

					// 	// if(){

					// 	// }
					// }
					// getProductCat();
				})
			);
	};

	// ,---.          |             |         |                  |    o
	// `---.,---.,---.|---     ,---.|    .   .|---.    ,---.,---.|--- .,---.,---.,---.
	//     ||   ||    |        |    |    |   ||   |    |   ||   ||    ||   ||   |`---.
	// `---'`---'`    `---'    `---'`---'`---'`---'    `---'|---'`---'``---'`   '`---'

	updateRow = (oldValue, newValue, row, column) => {
		//if club is choosen
		if (row.club_type) {
			console.log(row.club_type);
			this.setState({ currentClub: row.club_type });
		}

		//if Oem is choosen
		if (row.oem) {
			this.setState({ currentOem: row.oem });
			let clubList = this.state.oem.find((x) => x.brand_name === row.oem).clubs;
			let items = [];
			let singleItem = {};
			let singleclubList = "";
			let singleId = 0;

			for (let i = 0; i < clubList.length; i++) {
				singleclubList = clubList[i].club_name;
				singleId = clubList[i].club_name;
				singleItem = { value: singleId, label: singleclubList };
				items.push(singleItem);
			}

			// sort alphabetically
			items.sort((a, b) => a.label.localeCompare(b.label));
			//update clubOtion
			this.setState({ clubOption: items });
		}

		// console.log('hello row', this.state.irons)
		// console.log(this.props.type);

		this.props.irons(this.state.irons);
	};

	// ,---.    |    |    ,   .              ,---.
	// |---|,---|,---|    |\  |,---.. . .    |---',---.. . .
	// |   ||   ||   |    | \ ||---'| | |    |  \ |   || | |
	// `   '`---'`---'    `  `'`---'`-'-'    `   ``---'`-'-'

	newRow = () => {
		let num = this.state.num;
		console.log("test num", num);
		num += 1;
		let oldTable = this.state.irons;
		let oldnum = num - 2;
		let newclub_type = "";
		let newOem = "";

		// if (oldnum < 0) {
		//   newclub_type = "";
		// } else {
		//   newclub_type = this.state.irons[oldnum].club_type;
		//   newOem = this.state.irons[oldnum].oem;
		// }
		// new row information
		let newRow = {
			id: num,
			club: "",
			loft: "",
			lie: "",
			cpm: "",
			sw: "",
			length: "",
			tipping: "",
			oem: this.state.currentOem,
			club_type: this.state.currentClub,
			shaft_type: "",
			flex: "",
			hideDetail: false,
			marked: "Delete"
		};
		// add new row to array
		oldTable.push(newRow);
		// set irons and num
		this.setState({ irons: oldTable, num: num });
	};

	// ,--.      |         |        ,---.
	// |   |,---.|    ,---.|---     |---',---.. . .
	// |   ||---'|    |---'|        |  \ |   || | |
	// `--' `---'`---'`---'`---'    `   ``---'`-'-'

	DelteRow = (e, row) => {
		e.preventDefault();
		let irons = this.state.irons;

		console.log(irons.length);
		if (irons.length > 1) {
			// find object in array and delete
			for (var i = 0; i < irons.length; i++) {
				var obj = irons[i];
				if (irons[i].id === row.id) {
					irons.splice(i, 1);
				}
			}
			//set new Irons
			this.setState({ irons: irons });
		} else {
			console.log("no thanks ");
			let emptyIrons = [
				{
					id: 1,
					club: "",
					loft: "",
					lie: "",
					cpm: "",
					sw: "",
					length: "",
					tipping: "",
					oem: "",
					club_type: "",
					shaft_type: "",
					flex: "",
					marked: "Delete"
				}
			];

			this.setState({ irons: emptyIrons, currentClub: "", currentOem: "" });
		}
	};

	render() {
		const selectRow = {
			// mode: "checkbox",
			// clickToSelect: true,
			// selectColumnPosition: "right",
			clickToEdit: true
		};

		return (
			<>
				<div className="max-100w">
					<BootstrapTable
						keyField="id"
						data={this.state.irons}
						columns={[
							{
								dataField: "club",
								text: "club",
								editor: {
									type: Type.SELECT,
									options: this.props.clubSelect
								}
							},
							{
								dataField: "loft",
								text: "LOFT*"
							},
							{
								dataField: "lie",
								text: "lie*"
							},
							{
								dataField: "cpm",
								text: "FM#"
							},
							{
								dataField: "sw",
								text: "S.W"
							},
							{
								dataField: "length",
								text: "Length"
							},
							{
								dataField: "tipping",
								text: "Tipping"
							},
							{
								dataField: "oem",
								text: "oem",
								editor: {
									type: Type.SELECT,
									options: this.state.oemNames
								}
							},
							{
								dataField: "club_type",
								text: "Club Type",
								editor: {
									type: Type.SELECT,
									options: this.state.clubOption
								}
							},
							{
								dataField: "shaft_type",
								text: "Shaft Type",
								editor: {
									type: Type.SELECT,
									options: this.state.productOption
								}
							},
							{
								dataField: "flex",
								text: "Flex"
							},

							{
								dataField: "marked",
								text: "Delete",
								editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
									<Button color="primary" {...editorProps} value={value} onClick={(e) => this.DelteRow(e, row)}>
										{" "}
										Delete{" "}
									</Button>
								)
							}
						]}
						onTableChange={this.handleTableChange}
						// selectRow={selectRow}
						cellEdit={cellEditFactory({
							mode: "click",
							blurToSave: true,
							afterSaveCell: (oldValue, newValue, row, column) => {
								this.updateRow(oldValue, newValue, row, column);
							}
						})}
					/>

					<Button block className="text-primary shadow-none " color="white" size="lg" type="button" onClick={this.newRow}>
						<i className="fas fa-plus addRow"></i>
					</Button>
				</div>
			</>
		);
	}
}

export default FittingTable2;

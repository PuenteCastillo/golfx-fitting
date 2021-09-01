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
				Club_status:"",
				marked: "Delete"
			}
		],
		clubOption: [],
		productOption: [],
		statusOptions: [
		{label: "Ready for Build", value: "Ready for Build"},
		{label: "Ignore", value: "Ignore"},
		{label: "Completed", value: "Completed"},
		{label: "Picked Up", value: "Picked Up"}],
		oem: [],
		oemNames: [],
		currentOem: "",
		currentClub: "",
		num: 1,
		selected: [],
		clubType: "Irons"
	};
	// componentWillMount = () => {
	// 	// console.log('props', this.props.table);
	// 	// if(this.props.table){
	// 	// 	this.setState({ clubType: this.props.table });
	// 	// }
	// 	// console.log('table type', this.state.clubType);
	// }
	componentDidMount = () => {
		if(this.props.table){
			this.setState({ clubType: this.props.table });
		}
		// console.log('props', this.props.table);
		// if(this.props.table){
		// 	this.setState({ clubType: this.props.table });
		// }
		// console.log('table type', this.state.clubType);
		// var shaftType = this.state.clubType;
		let myState = this;
		// console.log('asdfasdf');
		// console.log("props in fitting table", this.props)
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
					// console.log('product red', productRes)
					// console.log('asdfasdf', this.state.clubType)
					function sortDate(a, isOem) {
						const data = a;
						let items = [];
						let singleItem = {};
						let dataName = "";
						for (let i = 0; i < data.length; i++) {
							// console.log('data', data[i]);
							dataName = data[i].brand_name || data[i].club_name || data[i].product_name;
							// if(shaftType =="WEDGE"){
							// 	console.log('these are irons');
							// }
							// console.log("shaft type in here", shaftType)

							
							if(data[i].category){
								var shaftCategory = data[i].category;
								singleItem = { value: dataName, label: dataName, category: shaftCategory };
							} else{
								singleItem = { value: dataName, label: dataName };
							}
							// console.log(singleItem)
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
					// console.log('product options', this.state.productOption)
					// console.log("state of club", this.state.clubType)
					if(this.state.clubType==="Irons"){
						var shaftData = this.state.productOption;
						var newData = shaftData.filter(club => club.category==="IRON");
						this.setState({productOption: newData});
					}else if(this.state.clubType==="WEDGE"){
						var shaftData = this.state.productOption;
						var newData = shaftData.filter(club => club.category==="WEDGE");
						this.setState({productOption: newData});
						console.log('how data is brokendown', newData);
					}else if(this.state.clubType==="HYBRID"){
						var shaftData = this.state.productOption;
						var newData = shaftData.filter(club => club.category==="HYBRID");
						this.setState({productOption: newData});
					}else if(this.state.clubType==="WOOD"){
						var shaftData = this.state.productOption;
						var newData = shaftData.filter(club => club.category==="WOOD");
						this.setState({productOption: newData});
					}else if(this.state.clubType==="PUTTER"){
						var shaftData = this.state.productOption;
						var newData = shaftData.filter(club => club.category==="PUTTER");
						this.setState({productOption: newData});
					}
					// console.log("dadafs", this.state.productOption);
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
			// console.log(row.club_type);
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

		this.props.simplifiedFunction('adding a new row');
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
			Club_status:"Ready for Build",
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
		if (irons.length > 0) {
			// find object in array and delete
			console.log( 'length is greather then one');
			for (var i = 0; i < irons.length; i++) {
				var obj = irons[i];
				if (irons[i].id === row.id) {
					irons.splice(i, 1);
				}
			}
			//set new Irons
			console.log(irons.length );
			if(irons.length === 0 ){
				irons = [];		
			}
			this.setState({ irons: irons });

			console.log( this.state.irons );
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
					Club_status:"",
					marked: "Delete"
				}
			];

			this.setState({ irons: emptyIrons, currentClub: "", currentOem: "" });
		}
	};

	render() {
		const selectRow = {
			// mode: 'radio',  // multi select
			clickToSelect: true,

			bgColor: function(row, isSelect) {
				// row
				return 'red';
			//   if (isSelect) {
			// 	const { id } = row;
			// 	if (id < 2) return 'blue';
			// 	else if (id < 4) return 'red';
			// 	else return 'yellow';
			//   }
			//   return null;
			}
		  };

		const options = {
			expandRowBgColor: 'rgb(242, 255, 163)'
		  };
		return (
			<>
				
				<div className={`max-100w ${this.state.irons.length ? "" : "hide"}`}>

				
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
								dataField: "Club_status",
								text: "club status",
								editor: {
									type: Type.SELECT,
									options: this.state.statusOptions
								}
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
						
						cellEdit={cellEditFactory({
							mode: "click",
							blurToSave: true,
							afterSaveCell: (oldValue, newValue, row, column) => {
								this.updateRow(oldValue, newValue, row, column);
							}
						})}
						// options= { options }
						// selectRow={selectRow}
					/>
			
				</div>
				<Button block className=" shadow-none add-more-btn " color="white" size="lg" type="button" onClick={this.newRow}>
						<i className="fas fa-plus"></i> Add Club
						  
					</Button>
			</>
		);
	}
}

export default FittingTable2;

import React from "react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from "@react-pdf/renderer";

import kbsLogo from "../../assets/img/KBS-logo.png";
// Create styles
const styles = StyleSheet.create({
	body: {
		paddingTop: 35,
		paddingBottom: 65,
		paddingHorizontal: 35
	},
	logo: {
		height: 30,
		width: 100
	},
	title: {
		fontSize: 24
		// textAlign: 'center',
		// fontFamily: 'Oswald'
	},
	author: {
		fontSize: 12,
		textAlign: "center",
		marginBottom: 40
	},
	subtitle: {
		fontSize: 18,
		margin: 12
		// fontFamily: 'Oswald'
	},
	text: {
		margin: 12,
		fontSize: 14,
		textAlign: "justify"
		// fontFamily: 'Times-Roman'
	},
	image: {
		marginVertical: 15,
		marginHorizontal: 100
	},
	header: {
		fontSize: 12,
		marginBottom: 20,
		textAlign: "center",
		color: "grey"
	},
	specheader: {
		fontSize: 12,
		marginBottom: 5,

		color: "grey"
	},
	tableHeader: {
		fontSize: 12,
		padding: 5,
		textAlign: "center",
		color: "white"
	},
	pageNumber: {
		position: "absolute",
		fontSize: 12,
		bottom: 30,
		left: 0,
		right: 0,
		textAlign: "center",
		color: "grey"
	},
	row: {
		flexDirection: "row",
		backgroundColor: "#fafafa",
		overFlow: "hidden"
	},
	rowData: {
		flexDirection: "row",

		overFlow: "hidden"
	},
	rowHeader: {
		flexDirection: "row",
		backgroundColor: "#E4E4E4",
		overFlow: "hidden"
	},
	rowTitle: {
		flexDirection: "row",
		backgroundColor: "363636",
		overFlow: "hidden"
	},
	section: {
		width: 82,
		minHeight: 20,
		padding: 3,
		flexGrow: 4,
		borderLeft: 0.5,
		borderColor: "#d6d7da",
		borderRight: 0.5,
		borderBottom: 0.5
	},
	sectionData: {
		width: 82,
		minHeight: 20,
		padding: 3,
		flexGrow: 4
		// borderLeft: 0.5,
		// borderColor: '#d6d7da',
		// borderRight: 0.5
	},
	name: {
		textAlign: "right"
	},
	sectionNum: {
		width: 40,
		// minHeight: 10,
		// padding: 3,
		flexGrow: 4,
		borderLeft: 0.5,
		borderColor: "#d6d7da",
		borderRight: 0.5,
		borderBottom: 0.5
	},
	cellText: {
		fontSize: 10
	},
	spacer: {
		height: 20
	},
	label: {
		fontSize: 10,
		color: "black"
	}
});

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

// Create Document Component
// const MyDocument = () => (
class FittingPDF extends React.Component {
	state = {
		irons: [
			{
				id: 1,
				club: "2",
				loft: "2",
				lie: "2",
				cpm: "2",
				sw: "2",
				length: "2",
				oem: "2",
				club_type: "2",
				shaft_type: "2"
			},
			{
				id: 1,
				club: "3",
				loft: "3",
				lie: "3",
				cpm: "3",
				sw: "3",
				length: "3",
				oem: "3",
				club_type: "3",
				shaft_type: "3"
			},
			{
				id: 1,
				club: "44",
				loft: "44",
				lie: "44",
				cpm: "44",
				sw: "44",
				length: "44",
				oem: "44",
				club_type: "44",
				shaft_type: "44"
			}
		]
	};

	componentDidMount = () => {
		console.log(this.props.irons);
	};

	isEmpty = (obj) => {
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) return false;
		}
		return true;
	};

	map_Irons = (data) => {
		return data.map((item, key) => (
			<View style={styles.row}>
				<View style={styles.sectionNum}>
					<Text style={styles.cellText}>{item.club}</Text>
				</View>
				<View style={styles.sectionNum}>
					<Text style={styles.cellText}>{item.loft}</Text>
				</View>
				<View style={styles.sectionNum}>
					<Text style={styles.cellText}>{item.lie}</Text>
				</View>
				<View style={styles.sectionNum}>
					<Text style={styles.cellText}>{item.cpm}</Text>
				</View>
				<View style={styles.sectionNum}>
					<Text style={styles.cellText}>{item.sw}</Text>
				</View>
				<View style={styles.sectionNum}>
					<Text style={styles.cellText}>{item.length}</Text>
				</View>
				{/* <View style={styles.section}>
            <Text style={styles.cellText}>{item.length}</Text>
          </View> */}
				<View style={styles.section}>
					<Text style={styles.cellText}>{item.club_type}</Text>
				</View>
				<View style={styles.section}>
					<Text style={styles.cellText}>{item.shaft_type}</Text>
				</View>
				<View style={styles.section}>
					<Text style={styles.cellText}>{item.flex}</Text>
				</View>
			</View>
		));
	};

	map_putter = (data) => {
		return data.map((item, key) => (
			<View style={styles.row}>
				{/* <View style={styles.sectionNum}>
					<Text style={styles.cellText}>{item.club}</Text>
				</View> */}
				<View style={styles.sectionNum}>
					<Text style={styles.cellText}>{item.loft}</Text>
				</View>
				<View style={styles.sectionNum}>
					<Text style={styles.cellText}>{item.lie}</Text>
				</View>
				{/* <View style={styles.sectionNum}>
					<Text style={styles.cellText}>{item.cpm}</Text>
				</View> */}
				<View style={styles.sectionNum}>
					<Text style={styles.cellText}>{item.sw}</Text>
				</View>
				<View style={styles.sectionNum}>
					<Text style={styles.cellText}>{item.length}</Text>
				</View>
				{/* <View style={styles.section}>
            <Text style={styles.cellText}>{item.length}</Text>
          </View> */}
				<View style={styles.section}>
					<Text style={styles.cellText}>{item.club_type}</Text>
				</View>
				<View style={styles.section}>
					<Text style={styles.cellText}>{item.shaft_type}</Text>
				</View>
				{/* <View style={styles.section}>
					<Text style={styles.cellText}>{item.flex}</Text>
				</View> */}
			</View>
		));
	};

	Make_table = (title, data) => {
		if (!this.isEmpty(data)) {
			return (
				<View>
					<View style={styles.rowTitle}>
						<Text style={styles.tableHeader} fixed>
							{title}
						</Text>
					</View>

					<View style={styles.rowHeader}>
						<View style={styles.sectionNum}>
							<Text style={styles.cellText}>Club</Text>
						</View>
						<View style={styles.sectionNum}>
							<Text style={styles.cellText}>Loft*</Text>
						</View>
						<View style={styles.sectionNum}>
							<Text style={styles.cellText}>Lie*</Text>
						</View>
						<View style={styles.sectionNum}>
							<Text style={styles.cellText}>FM#</Text>
						</View>
						<View style={styles.sectionNum}>
							<Text style={styles.cellText}>S.W</Text>
						</View>
						<View style={styles.sectionNum}>
							<Text style={styles.cellText}>Length</Text>
						</View>
						{/* <View style={styles.section}>
            <Text style={styles.cellText}>Length</Text>
          </View> */}
						<View style={styles.section}>
							<Text style={styles.cellText}>CLUB TYPE</Text>
						</View>
						<View style={styles.section}>
							<Text style={styles.cellText}>SHAFT TYPE</Text>
						</View>
						<View style={styles.section}>
							<Text style={styles.cellText}>Flex</Text>
						</View>
					</View>
					{this.map_Irons(data)}
				</View>
			);
		}
	};

	Make_Putter = (title, data) => {
		if (!this.isEmpty(data)) {
			return (
				<View>
					<View style={styles.rowTitle}>
						<Text style={styles.tableHeader} fixed>
							{title}
						</Text>
					</View>

					<View style={styles.rowHeader}>
						{/* <View style={styles.sectionNum}>
							<Text style={styles.cellText}>Club</Text>
						</View> */}
						<View style={styles.sectionNum}>
							<Text style={styles.cellText}>Loft*</Text>
						</View>
						<View style={styles.sectionNum}>
							<Text style={styles.cellText}>Lie*</Text>
						</View>
						{/* <View style={styles.sectionNum}>
							<Text style={styles.cellText}>FM#</Text>
						</View> */}
						<View style={styles.sectionNum}>
							<Text style={styles.cellText}>S.W</Text>
						</View>
						<View style={styles.sectionNum}>
							<Text style={styles.cellText}>Length</Text>
						</View>
						{/* <View style={styles.section}>
            <Text style={styles.cellText}>Length</Text>
          </View> */}
						<View style={styles.section}>
							<Text style={styles.cellText}>CLUB TYPE</Text>
						</View>
						<View style={styles.section}>
							<Text style={styles.cellText}>SHAFT TYPE</Text>
						</View>
						{/* <View style={styles.section}>
							<Text style={styles.cellText}>Flex</Text>
						</View> */}
					</View>
					{this.map_putter(data)}
				</View>
			);
		}
	};

	RenderNav = () => {
		return (
			<View style={styles.rowData}>
				<View style={styles.sectionData}>
					<Image style={styles.logo} src={kbsLogo} />
				</View>
				<View style={styles.sectionData}>
					<Text style={styles.name}> {this.props.customer_info.name} </Text>
				</View>
			</View>
		);
	};

	player_data = () => {
		return (
			<View>
				<Text style={styles.specheader}> Player Information:</Text>
				<Text style={styles.label}> Name : {this.props.customer_info.name_first + " " + this.props.customer_info.name_last || "N/A"} </Text>
				<Text style={styles.label}> Phone# : {this.props.customer_info.phone || "N/A"}</Text>
				<Text style={styles.label}> Email : {this.props.customer_info.email || "N/A"}</Text>
				<Text style={styles.label}> Address : {this.props.customer_info.address || "N/A"}</Text>
				<Text style={styles.label}> City : {this.props.customer_info.city || "N/A"}</Text>
				<Text style={styles.label}> State : {this.props.customer_info.state || "N/A"} </Text>
				<Text style={styles.label}> Zipcode : {this.props.customer_info.zipcode || "N/A"}</Text>
			</View>
		);
	};

	static_data = () => {
		// console.log('test',this.props.static_specs)
		if (!this.isEmpty(this.props.static_specs)) {
			return (
				<View>
					<Text style={styles.specheader}> Static data: </Text>
					<Text style={styles.label}> Height : {this.props.static_specs.height || "N/A"} </Text>
					<Text style={styles.label}> Wrist to Floor : {this.props.static_specs.wrist_to_floor || "N/A"}</Text>
					<Text style={styles.label}> Normal shot shape : {this.props.static_specs.normal_shot_shape || "N/A"} </Text>
					<Text style={styles.label}> Normal trajectory : {this.props.static_specs.normal_trajectory || "N/A"} </Text>
					<Text style={styles.label}> Handicap: {this.props.static_specs.handicap || "N/A"} </Text>
					<Text style={styles.label}> Club Distance: {this.props.static_specs.club_distance || "N/A"} </Text>
				</View>
			);
		}
	};

	seven_iron_specs = () => {
		if (!this.isEmpty(this.props.seven_iron_specs)) {
			return (
				<View>
					<Text style={styles.specheader}> Current Specs:</Text>
					<Text style={styles.label}> Length : {this.props.seven_iron_specs.length || "N/A"} </Text>
					<Text style={styles.label}> Lie : {this.props.seven_iron_specs.lie || "N/A"} </Text>
					<Text style={styles.label}> Loft : {this.props.seven_iron_specs.loft || "N/A"} </Text>
					<Text style={styles.label}>FM : {this.props.seven_iron_specs.cpm || "N/A"} </Text>
					<Text style={styles.label}>Grip Size : {this.props.seven_iron_specs.gripsize || "N/A"} </Text>
					<Text style={styles.label}>Swing Weight : {this.props.seven_iron_specs.swing_weight || "N/A"} </Text>
				</View>
			);
		}
	};

	render() {
		return (
			<Document>
				<Page style={styles.body}>
					{this.RenderNav()}

					<View style={styles.spacer}></View>

					<View style={styles.rowData}>
						<View style={styles.sectionData}>{this.player_data()}</View>
						<View style={styles.sectionData}>{this.static_data()}</View>
						<View style={styles.sectionData}>{this.seven_iron_specs()}</View>
					</View>
					<View style={styles.spacer}></View>
					<View style={styles.rowData}>
						<View style={styles.sectionData}>
							<Text style={styles.specheader}> Building Notes:</Text>
							<Text style={styles.label}> {this.props.building_notes || "N/A"} </Text>
						</View>
						<View style={styles.sectionData}>
							<Text style={styles.specheader}> Customer Notes:</Text>
							<Text style={styles.label}> {this.props.fitting_notes || "N/A"} </Text>
						</View>
					</View>
					<View style={styles.spacer}></View>

					{this.Make_table("Irons", this.props.irons)}
					<View style={styles.spacer}></View>
					{this.Make_table("Hybrids", this.props.hybrids)}
					<View style={styles.spacer}></View>
					{this.Make_table("Woods", this.props.woods)}
					<View style={styles.spacer}></View>
					{this.Make_table("Wedges", this.props.wedge)}
					<View style={styles.spacer}></View>
					{this.Make_Putter("Putter", this.props.putter)}

					<Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
				</Page>
			</Document>
		);
	}
}

export default FittingPDF;

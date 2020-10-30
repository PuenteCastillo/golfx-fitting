import React from "react";

import { CardFooter } from "reactstrap";
import AppCard from "../Parts/AppCard";
import SpecModel from "../Parts/SpecModel";
import Data_Static_Specs from "../Parts/Data_Static_Specs";

// core components
class Fitting extends React.Component {
	state = {
		static_specs: this.props.data || {},
		specToggle: false
	};

	toggleModal = (state) => {
		this.setState({
			[state]: !this.state[state]
		});
	};

	componentDidMount = () => {
		// console.log(this.props.data);
	};

	//    check if data is empty
	isEmpty = (obj) => {
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) return false;
		}
		return true;
	};

	render_module = () => {
		if (this.isEmpty(this.props.data)) {
			return (
				<>
					<AppCard
						title="Static Specs"
						btnText="Add specs"
						icon="fad fa-ruler display-2"
						style="icon icon-shape bg-gradient-red text-dark rounded-circle shadow"
						toggle={(e) => this.toggleModal("specToggle")}
					/>
				</>
			);
		} else {
			return (
				<>
					<Data_Static_Specs data={this.state.static_specs} toggle={(e) => this.toggleModal("specToggle")} />
				</>
			);
		}
	};

	render() {
		return (
			<>
				<SpecModel
					data={this.state.static_specs}
					open={this.state.specToggle}
					toggle={(e) => this.toggleModal("specToggle")}
					setSpec={(static_specs) => this.props.Set_spec(static_specs)}
				/>
				{this.render_module()}
			</>
		);
	}
}

export default Fitting;

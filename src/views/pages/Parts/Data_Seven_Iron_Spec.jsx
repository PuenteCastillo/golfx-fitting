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
	CardFooter,
	CardTitle
} from "reactstrap";

class Data_Seven_Iron_Spec extends React.Component {
	state = {
		static_specs: this.props.data
	};

	componentWillMount() {}

	render() {
		return (
			<>
				<Col md="6" xl="6">
					<Card className="card-pricing border-0 text-center mb-4">
						<CardHeader className="bg-transparent">
							<h4 className="text-uppercase ls-1  py-3 mb-0">Current Specs</h4>
						</CardHeader>
						<CardBody className="px-lg-7">
							<ul className="list-unstyled my-4">
								<li>
									<div className="d-flex align-items-center">
										<div>
											<div className="icon icon-xs icon-shape bg-gradient-primary text-white shadow rounded-circle">
												<i class="fas fa-ruler-horizontal"></i>
											</div>
										</div>
										<div>
											<span className="pl-2 text-sm">Length: {this.props.data.length || "N/A"}</span>
										</div>
									</div>
								</li>
								<li>
									<div className="d-flex align-items-center">
										<div>
											<div className="icon icon-xs icon-shape bg-gradient-primary text-white shadow rounded-circle">
												<i class="fad fa-ruler-triangle"></i>
											</div>
										</div>
										<div>
											<span className="pl-2 text-sm">Lie : {this.props.data.lie || "N/A"}</span>
										</div>
									</div>
								</li>
								<li>
									<div className="d-flex align-items-center">
										<div>
											<div className="icon icon-xs icon-shape bg-gradient-primary text-white shadow rounded-circle">
												<i class="fas fa-chart-line"></i>
											</div>
										</div>
										<div>
											<span className="pl-2 text-sm">Loft: {this.props.data.loft || "N/A"}</span>
										</div>
									</div>
								</li>
								<li>
									<div className="d-flex align-items-center">
										<div>
											<div className="icon icon-xs icon-shape bg-gradient-primary text-white shadow rounded-circle">
												<i class="fas fa-hashtag"></i>
											</div>
										</div>
										<div>
											<span className="pl-2 text-sm">FM #: {this.props.data.cpm || "N/A"}</span>
										</div>
									</div>
								</li>
								<li>
									<div className="d-flex align-items-center">
										<div>
											<div className="icon icon-xs icon-shape bg-gradient-primary text-white shadow rounded-circle">
												<i class="fas fa-fist-raised"></i>
											</div>
										</div>
										<div>
											<span className="pl-2 text-sm">GripSize: {this.props.data.gripsize || "N/A"}</span>
										</div>
									</div>
								</li>
								<li>
									<div className="d-flex align-items-center">
										<div>
											<div className="icon icon-xs icon-shape bg-gradient-primary text-white shadow rounded-circle">
											<i class="fas fa-weight-hanging"></i>
											</div>
										</div>
										<div>
											<span className="pl-2 text-sm">Swing Weight: {this.props.data.swing_weight || "N/A"}</span>
										</div>
									</div>
								</li>
							</ul>
							<Button className="mb-3" color="primary" type="button" onClick={(e) => this.props.toggle(e)}>
								Edit
							</Button>
						</CardBody>
					</Card>
				</Col>
			</>
		);
	}
}
export default Data_Seven_Iron_Spec;

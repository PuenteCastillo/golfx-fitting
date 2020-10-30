import React, { Component } from "react";
import ReactDOM from "react-dom";
// react library for routing
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// plugins styles from node_modules
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
// plugins styles downloaded
import "assets/vendor/fullcalendar/dist/fullcalendar.min.css";
import "assets/vendor/sweetalert2/dist/sweetalert2.min.css";
import "assets/vendor/select2/dist/css/select2.min.css";
import "assets/vendor/quill/dist/quill.core.css";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
// core styles
import "assets/scss/argon-dashboard-pro-react.scss?v1.0.0";

import AdminLayout from "layouts/Admin.jsx";
import AuthLayout from "layouts/Auth.jsx";
import IndexView from "views/Index.jsx";
import Login from "./views/pages/Login";
import AppProfile from "./views/pages/AppProfile";
import FittingPDF from "./views/pages/FittingPDF";
import Start from "./views/pages/Start";

class App extends React.Component {
	state = {
		user: {}
	};

	componentDidMount = () => {
		console.log(JSON.parse(localStorage.getItem("golfx_user")));
	};

	handelCreds = (e) => {
		this.setState((state) => {
			return {
				user: e
			};
		});
		console.log(this.state.user);
		console.log("child", e);
	};
	testBTN = () => {
		console.log(JSON.parse(localStorage.getItem("golfx_user")));
		console.log(JSON.parse(localStorage.getItem("golfx_token")));
	};

	render() {
		return (
			<Switch>
				<Route path="/admin" render={(props) => <AdminLayout {...props} />} />
				<Route path="/auth" render={(props) => <AuthLayout {...props} />} />
				<Route
					path="/admin/profile/:id"
					render={(props) => <AdminLayout {...props} />}
				/>
				<Route path="/pdf" render={(props) => <FittingPDF />} />

				<Route
					path="/login"
					render={(props) => (
						<Login
							creds={(e) => this.handelCreds(e)}
							test={(e) => this.testBTN(e)}
						/>
					)}
				/>
				<Route path="/" render={(props) => <Start />} />
				<Redirect from="*" to="/" />
			</Switch>
		);
	}
}

export default App;

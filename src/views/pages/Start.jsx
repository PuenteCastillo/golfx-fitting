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
import gif from "../../assets/img/loading.gif";

class Start extends React.Component {
	componentWillMount() {
		setTimeout(function() {
			if (localStorage.getItem("golfx_token")) {
				console.log("take me to dash");
				window.location.href = "/admin/calendar";
			} else {
				console.log("take me to Login");
				window.location.href = "/login";
			}
		}, 3000);
	}

	renderLoading = () => {
		if (true) {
			return (
				<div className="loading_body2">
					<div className="loading_Content2">
						<img src={gif} />
					</div>
				</div>
			);
		}
	};

	render() {
		return <>{this.renderLoading()}</>;
	}
}
export default Start;

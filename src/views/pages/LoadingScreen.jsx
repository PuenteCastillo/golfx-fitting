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



class LoadingScreen extends React.Component {
  componentWillMount() {
  
  }

  renderLoading = () => {

    if(this.props.show){
      return(
        <div className="loading_body"> 
       <div className="loading_Content">
         <img src="https://citydash.ai/images/loading2.gif" />

       </div>
       </div>
      )
    }
  }

  render() {
    return (
      <>
       {this.renderLoading()}
      </>
    );
  }
}
export default LoadingScreen;

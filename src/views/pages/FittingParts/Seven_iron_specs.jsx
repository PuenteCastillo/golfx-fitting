
import React from "react";

import {
  CardFooter
} from "reactstrap";
import AppCard from "../Parts/AppCard";
import Seven_iron_Model from "../Parts/Seven_iron_Model";
import Data_Seven_Iron_Spec from "../Parts/Data_Seven_Iron_Spec";

// core components
class Seven_iron_specs extends React.Component {
  state = {
    seven_iron_specs: this.props.data || {},
    seven_iron_sepc_Toggle: false
  };

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  componentDidMount = () => {
    // console.log(this.props.data);
  };

  //    check if data is empty
  isEmpty = obj => {
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
            title="Current Club"
            btnText="Add 7 iron"
            icon="fad fa-golf-club display-2"
            style="icon icon-shape bg-gradient-red text-dark rounded-circle shadow"
            toggle={e => this.toggleModal("seven_iron_sepc_Toggle")}
          />

        </>
      );
    } else {
      return (
        <>
          <Data_Seven_Iron_Spec
            data={this.state.seven_iron_specs}
            toggle={e => this.toggleModal("seven_iron_sepc_Toggle")}
          />
        </>
      );
    }
  };

  render() {
    return (
      <>
        <Seven_iron_Model
          data={this.state.seven_iron_specs}
          open={this.state.seven_iron_sepc_Toggle}
          toggle={e => this.toggleModal("seven_iron_sepc_Toggle")}
          setSeven_iron={e => this.props.Set_spec(e)}
       
        />
        {this.render_module()}
      </>
    );
  }
}

export default Seven_iron_specs;

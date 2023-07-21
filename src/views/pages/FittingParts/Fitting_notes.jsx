import React from "react";

import { Card, CardHeader, Col, FormGroup, CardBody, Input } from "reactstrap";
import AppCard from "../Parts/AppCard";

// core components
class Fitting_notes extends React.Component {
  state = {
    fitting_notes: this.props.data,
    render_fitting_notes: false,
  };

  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
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

  change_Parent = (e) => {
    this.setState({ fitting_notes: e.target.value });
    let test = this;
    setTimeout(function () {
      test.props.changeValue(test.state.fitting_notes);
    }, 10);
  };

  textArea = () => {
    return (
      <Col md="12" xl="12">
        <Card className="card-pricing border-0 text-center mb-4">
          <CardHeader className="bg-transparent">
            <h4 className="text-uppercase ls-1  py-3 mb-0">Customer Notes</h4>
          </CardHeader>
          <CardBody>
            <FormGroup>
              {/* <label className="form-control-label">
          Fitting Notes{" "}
        </label> */}
              <Input
                // defaultValue={this.state.profile.fitting_notes}
                // placeholder={this.state.profile.fitting_notes}
                rows="4"
                type="textarea"
                value={this.state.fitting_notes}
                onChange={(e) => {
                  this.change_Parent(e);
                }}
              />
            </FormGroup>
          </CardBody>
        </Card>
      </Col>
    );
  };
  render_module = () => {
    if (this.isEmpty(this.props.data)) {
      if (this.state.render_fitting_notes) {
        return <>{this.textArea()}</>;
      } else {
        return (
          <AppCard
            title="Customer Notes"
            btnText="Add Fitting Notes"
            icon="fa-solid fa-note-sticky display-2"
            style="icon icon-shape bg-gradient-red text-dark rounded-circle shadow"
            toggle={(e) => this.toggleModal("render_fitting_notes")}
          />
        );
      }
    } else {
      return <>{this.textArea()}</>;
    }
  };

  render() {
    return <>{this.render_module()}</>;
  }
}

export default Fitting_notes;

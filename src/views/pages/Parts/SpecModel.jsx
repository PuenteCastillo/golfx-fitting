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
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Modal,
} from "reactstrap";
import classnames from "classnames";
import Select2 from "react-select2-wrapper";

class SpecModel extends React.Component {
  state = {
    defaultModal: false,
    notificationModal: false,
    formModal: false,
    alert: null,
    data: this.props.data,
    normal_trajectory: null,
    normal_shot_shape: null,
  };

  componentWillMount() {}

  updateDate = (e) => {
    e.preventDefault();

    let newData = this.state.data;

    newData.height = document.getElementById("input-Height").value;
    newData.wrist_to_floor = document.getElementById(
      "input-wrist_to_floor"
    ).value;
    newData.normal_shot_shape = document.getElementById(
      "input-normal_shot_shape"
    ).value;
    newData.normal_trajectory = document.getElementById(
      "input-normal_trajectory"
    ).value;
    newData.handicap = document.getElementById("input-handicap").value;
    newData.club_distance = document.getElementById(
      "input-club_distance"
    ).value;
    this.setState({ data: newData });

    this.props.setSpec(this.state.data);
    this.props.toggle();
  };

  render() {
    const { value } = this.props;
    return (
      <>
        <Modal
          className="modal-dialog-centered"
          size="lg"
          isOpen={this.props.open}
          toggle={this.props.toggle}
        >
          <div className="modal-body p-0">
            <Card className="bg-secondary border-0 mb-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2">
                  <small>Static Spec</small>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5 ">
                {/* <div className="text-center text-muted mb-4">
                                <small>Or sign in with credentials</small>
                              </div> */}

                <Form role="form">
                  <div class="row">
                    <div className="col-md-6">
                      <FormGroup
                        className={classnames("mb-3", {
                          focused: this.state.focuseHeight,
                        })}
                      >
                        <i class="fas fa-arrows-alt-v  modal-icon"></i>
                        <label
                          className="form-control-label modal-lable"
                          htmlFor="example3cols1Input"
                        >
                          Height
                        </label>
                        <InputGroup className="input-group-merge input-group-alternative">
                          {/* <InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i class="fas fa-arrows-alt-v"></i>
												</InputGroupText>
											</InputGroupAddon> */}
                          <Input
                            defaultValue={this.state.data.height}
                            placeholder="Height"
                            type="text"
                            id="input-Height"
                            onFocus={() =>
                              this.setState({ focuseHeight: true })
                            }
                            onBlur={() =>
                              this.setState({ focuseHeight: false })
                            }
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup
                        className={classnames("mb-3", {
                          focused: this.state.forcedWrist,
                        })}
                      >
                        <i class="fas fa-hand-paper modal-icon"></i>
                        <label
                          className="form-control-label modal-lable"
                          htmlFor="example3cols1Input"
                        >
                          Wrist to Floor
                        </label>
                        <InputGroup className="input-group-merge input-group-alternative">
                          {/* <InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i class="fas fa-hand-paper"></i>
												</InputGroupText>
											</InputGroupAddon> */}
                          <Input
                            defaultValue={this.state.data.wrist_to_floor}
                            placeholder="Wrist to Floor"
                            type="text"
                            id="input-wrist_to_floor"
                            onFocus={() => this.setState({ forcedWrist: true })}
                            onBlur={() => this.setState({ forcedWrist: false })}
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup>
                        <i class="fas fa-shapes modal-icon"></i>
                        <label
                          className="form-control-label modal-lable"
                          htmlFor="example3cols1Input"
                        >
                          Normal Shot Shape
                        </label>
                        <Select2
                          className="form-control"
                          defaultValue={this.state.data.normal_shot_shape}
                          // options={{
                          //  placeholder: "Select"
                          // }}
                          id="input-normal_shot_shape"
                          data={[
                            { id: "Hook", text: "Hook" },
                            { id: "Straight", text: "Straight" },
                            { id: "Slice", text: "Slice" },
                            { id: "Push", text: "Push" },
                            { id: "Pull", text: "Pull" },
                          ]}
                          value={this.state.normal_shot_shape}
                          onChange={(e) => {
                            this.setState({
                              normal_shot_shape: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </div>

                    <div className="col-md-6">
                      <FormGroup>
                        {/* <i class="fal fa-bow-arrow  modal-icon"></i> */}
                        <i class="fa-solid fa-compass modal-icon"></i>
                        <label
                          className="form-control-label modal-lable"
                          htmlFor="example3cols1Input"
                        >
                          Normal trajectory
                        </label>
                        <Select2
                          className="form-control"
                          // options={{
                          //  placeholder: "Select"
                          // }}
                          defaultValue={this.state.data.normal_trajectory}
                          id="input-normal_trajectory"
                          data={[
                            { id: "High", text: "High" },
                            { id: "Mid", text: "Mid" },
                            { id: "Low", text: "Low" },
                          ]}
                          // value={value}
                          value={this.state.normal_trajectory}
                          onChange={(e) => {
                            this.setState({
                              normal_trajectory: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <i class="fab fa-accessible-icon  modal-icon"></i>
                        <label
                          className="form-control-label modal-lable"
                          htmlFor="example3cols1Input"
                        >
                          Handicap
                        </label>
                        <Input
                          defaultValue={this.state.data.handicap}
                          placeholder="Handicap"
                          type="text"
                          id="input-handicap"
                          onFocus={() =>
                            this.setState({ focuseHandicap: true })
                          }
                          onBlur={() =>
                            this.setState({ focuseHandicap: false })
                          }
                        />
                      </FormGroup>
                      <FormGroup>
                        <i class="fas fa-drafting-compass  modal-icon"></i>
                        <label
                          className="form-control-label modal-lable"
                          htmlFor="example3cols1Input"
                        >
                          Club Distance
                        </label>
                        <Input
                          defaultValue={this.state.data.club_distance}
                          placeholder="Club Distance"
                          type="text"
                          id="input-club_distance"
                          onFocus={() =>
                            this.setState({ focuseClub_distance: true })
                          }
                          onBlur={() =>
                            this.setState({ focuseClub_distance: false })
                          }
                        />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                      onClick={(e) => this.updateDate(e)}
                    >
                      Save
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Modal>
      </>
    );
  }
}
export default SpecModel;

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


class Data_Static_Specs extends React.Component {


  state = {
    static_specs: this.props.data,

  }

  componentWillMount() {

  }



  render() {
    return (
      <>
        <Col md="6" xl="6">
        <Card className="card-pricing border-0 text-center mb-4">
                <CardHeader className="bg-transparent">
                  <h4 className="text-uppercase ls-1  py-3 mb-0">
                   Static Specs
                  </h4>
                </CardHeader>
                <CardBody className="px-lg-7">
                
                  <ul className="list-unstyled my-4">
                    <li>
                      <div className="d-flex align-items-center">
                        <div>
                          <div className="icon icon-xs icon-shape bg-gradient-primary text-white shadow rounded-circle">
                          <i class="fas fa-arrows-alt-v"></i>
                          </div>
                        </div>
                        <div>
                          <span className="pl-2 text-sm">
                            Height: {this.props.data.height  || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center">
                        <div>
                          <div className="icon icon-xs icon-shape bg-gradient-primary text-white shadow rounded-circle">
                          <i class="fas fa-hand-paper"></i>
                          </div>
                        </div>
                        <div>
                          <span className="pl-2 text-sm">
                          Wrist to Floor : {this.props.data.wrist_to_floor || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center">
                        <div>
                          <div className="icon icon-xs icon-shape bg-gradient-primary text-white shadow rounded-circle">
                          <i class="fas fa-shapes"></i>
                          </div>
                        </div>
                        <div>
                          <span className="pl-2 text-sm">
                            Norma shot shape: {this.props.data.normal_shot_shape || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center">
                        <div>
                          <div className="icon icon-xs icon-shape bg-gradient-primary text-white shadow rounded-circle">
                          <i class="fal fa-bow-arrow"></i>
                          </div>
                        </div>
                        <div>
                          <span className="pl-2 text-sm">
                            Normal Trajectory: {this.props.data.normal_trajectory || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center">
                        <div>
                          
                        </div>
                        <div>
                          <span className="pl-2 text-sm">
                         
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <Button className="mb-3" color="primary" type="button" onClick={e => this.props.toggle(e)}>
                    Edit
                  </Button>
                </CardBody>
               
              </Card>
        </Col>

      </>
    );
  }
}
export default Data_Static_Specs;

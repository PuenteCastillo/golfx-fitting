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
import { Link, Redirect } from "react-router-dom";

class CustomerNotes extends React.Component {

  componentWillMount() {
   
  }

  render() {
    return (
      <>
    
        <Card className="card-pricing bg-gradient-primary border-0 text-center mb-4">
                <CardHeader className="bg-transparent">
                  <h4 className="text-uppercase ls-1 text-white py-3 mb-0">
                   Player Info 
                  </h4>
                </CardHeader>
                <CardBody className="px-lg-7">
                  <div className="display-2 text-white">{this.props.name} </div>
                  {/* <span className="text-white">per application</span> */}
                  <ul className="list-unstyled my-4">
                    <li>
                      <div className="d-flex align-items-center">
                        <div>
                          <div className="icon icon-xs icon-shape bg-white shadow rounded-circle">
                          <i className="fas fa-phone"></i>
                          </div>
                        </div>
                        <div>
                          <span className="pl-2 text-sm text-white">
                            {this.props.phone || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center">
                        <div>
                          <div className="icon icon-xs icon-shape bg-white shadow rounded-circle">
                          <i className="fas fa-envelope-open-text"></i>
                          </div>
                        </div>
                        <div>
                          <span className="pl-2 text-sm text-white">
                            {this.props.email || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center">
                        <div>
                          <div className="icon icon-xs icon-shape bg-white shadow rounded-circle">
                          <i className="fas fa-map-marked-alt"></i>
                          </div>
                        </div>
                        <div>
                          <span className="pl-2 text-sm text-white">
                             {this.props.city|| 'N/A'}
                          </span>
                        </div>
                      </div>
                    </li>
                    
                    
                  </ul>
                  <Link to={'/admin/profil/' + this.props.id } >
                  <Button className="mb-3" color="primary" type="button" >
                    View Player
                  </Button>
                  </Link>
                </CardBody>
                <CardFooter className="bg-transparent">
                  <a
                    className="text-white"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    {this.props.fitting_notes}
                  </a>
                </CardFooter>
              </Card>
   

      </>
    );
  }
}
export default CustomerNotes;

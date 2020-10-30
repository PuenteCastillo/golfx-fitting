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


class AppCard extends React.Component {
  componentWillMount() {

  }



  render() {
    return (
      <>
        <Col md="6" xl="6">
        <Card className="card-pricing border-0 text-center mb-4">
                <CardHeader className="bg-transparent">
                  <h4 className="text-uppercase ls-1  py-3 mb-0">
                    {this.props.title}
                  </h4>
                </CardHeader>
                <CardBody className="px-lg-7">
                {/* <div className="icon icon-shape bg-gradient-red text-dark rounded-circle shadow">
                            <i className="ni ni-active-40" />
                          </div> */}
                  <i class={this.props.icon}></i>
                  {/* <span className="text-muted">per application</span> */}
                 
                  {/* <Button className="mb-3" color="primary" type="button">
                    Start free trial
                  </Button> */}
                </CardBody>
                <CardFooter>
                
                  <a
                    className="text-primary"
                    href="#pablo"
                    onClick={this.props.toggle}
                  >
                    <i class="fas fa-plus"></i>
                    
                  </a>
                </CardFooter>
              </Card>
        </Col>

      </>
    );
  }
}
export default AppCard;

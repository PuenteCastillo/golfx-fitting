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

// reactstrap components
import {  Container, Row, Col, Button } from "reactstrap";

class FittingHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className="header pb-6 d-flex align-items-center"
          style={{
            minHeight: "500px",
            backgroundImage:
              'url("http://kbsgolfx.com/wp-content/themes/KBSX/images/eventsImg.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          <span className="mask profile-Background " />

          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white">{this.props.name} </h1>
                {/* <p className="text-white mt-0 mb-5">
                  This is your profile page. You can see the progress you've
                  made with your work and manage your projects or assigned tasks
                </p> */}
         
                
                <Button
                  className="btn-neutral"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  Add
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default FittingHeader;

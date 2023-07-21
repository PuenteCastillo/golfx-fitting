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
// nodejs library that concatenates classes
import classnames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";

class AdminNavbar extends React.Component {
  state = {
    user: {},
  };

  componentDidMount = () => {
    console.log(JSON.parse(localStorage.getItem("golfx_user")).name_last);
  };
  componentWillMount = () => {
    if (localStorage.getItem("golfx_user")) {
      console.log("all good!");
    } else {
      window.location.href = "/";
    }
  };

  // function that on mobile devices makes the search open
  openSearch = () => {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function () {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  };
  // function that on mobile devices makes the search close
  closeSearch = () => {
    document.body.classList.remove("g-navbar-search-shown");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-show");
      document.body.classList.add("g-navbar-search-hiding");
    }, 150);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hiding");
      document.body.classList.add("g-navbar-search-hidden");
    }, 300);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hidden");
    }, 500);
  };

  logOut = (e) => {
    e.preventDefault();
    console.log("njksdbfhjkbsjfgdbsdajkf");
    localStorage.removeItem("golfx_token");
    window.location.href = "/";
  };

  // render profile picture if there is any

  renderAvitar() {
    if (JSON.parse(localStorage.getItem("golfx_user")).picture) {
      console.log(" img exist");

      return (
        <img
          alt="..."
          src={JSON.parse(localStorage.getItem("golfx_user")).picture.url}
        />
      );
    }

    return (
      <img
        alt="..."
        src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
      />
    );
  }

  render() {
    return (
      <>
        <Navbar
          className={classnames(
            "navbar-top navbar-expand border-bottom",
            { "navbar-dark bg-white": this.props.theme === "dark" },
            { "navbar-light bg-white": this.props.theme === "dark" }
          )}
        >
          <Container fluid>
            <Collapse navbar isOpen={true}>
              {/* <Form
                className={classnames(
                  "navbar-search form-inline mr-sm-3",
                  { "navbar-search-light": this.props.theme === "dark" },
                  { "navbar-search-dark": this.props.theme === "dark" }
                )}
              >
                <FormGroup className="mb-0">
                  <InputGroup className="input-group-alternative input-group-merge">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-search" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Search" type="text" />
                  </InputGroup>
                </FormGroup>
                <button
                  aria-label="Close"
                  className="close"
                  type="button"
                  onClick={this.closeSearch}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </Form> */}

              <Nav className="align-items-center ml-md-auto" navbar>
                <NavItem className="d-xl-none">
                  <div
                    className={classnames(
                      "pr-3 sidenav-toggler",
                      { active: this.props.sidenavOpen },
                      { "sidenav-toggler-dark": this.props.theme === "ligh" }
                    )}
                    onClick={this.props.toggleSidenav}
                  >
                    <div className="sidenav-toggler-inner">
                      <i className="sidenav-toggler-line" />
                      <i className="sidenav-toggler-line" />
                      <i className="sidenav-toggler-line" />
                    </div>
                  </div>
                </NavItem>
                <NavItem className="d-sm-none">
                  <NavLink onClick={this.openSearch}>
                    <i className="ni ni-zoom-split-in" />
                  </NavLink>
                </NavItem>

                {/* /// notifications drop Down */}

                <UncontrolledDropdown nav>
                  <DropdownToggle className="nav-link" color="" tag="a">
                    {/* <i className="ni ni-ungroup text-dark" /> */}
                    <i className=" addIcon fa-solid fa-plus text-dark"></i>
                  </DropdownToggle>
                  <DropdownMenu
                    className="dropdown-menu-lg dropdown-menu-dark bg-default"
                    right
                  >
                    <h6 className="heading text-muted mb-4 ml-4">
                      {/* <i className=" addIcon fal fa-plus-circle "></i> */}
                      <i className="fas fa-plus"></i> ADD
                    </h6>
                    <Row className="shortcuts">
                      <Col className="shortcut-item">
                        <Link to="/admin/addGolfer">
                          <span className="shortcut-media avatar rounded-circle bg-gradient-red">
                            <i className="fas fa-user-plus"></i>
                          </span>
                          <small>Golfer</small>
                        </Link>
                      </Col>
                      <Col
                        className={classnames("shortcut-item", {
                          Force_hide:
                            JSON.parse(localStorage.getItem("golfx_user"))
                              .position === "Sales" ||
                            JSON.parse(localStorage.getItem("golfx_user"))
                              .position === "Builder/Fitter",
                        })}
                        xs="4"
                      >
                        <Link to="/admin/addEmployee">
                          <span className="shortcut-media avatar rounded-circle bg-gradient-orange">
                            <i className="fad fa-solid fa-briefcase"></i>
                          </span>
                          <small>Employee</small>
                        </Link>
                      </Col>
                      <Col
                        className={classnames("shortcut-item", {
                          Force_hide:
                            JSON.parse(localStorage.getItem("golfx_user"))
                              .position === "Sales",
                        })}
                        tag="a"
                      >
                        <Link to="/admin/Products">
                          <span className="shortcut-media avatar rounded-circle bg-gradient-info">
                            {/* <i className="fad fa-golf-club"></i> */}
                            <i class="fa-solid fa-golf-ball-tee"></i>
                          </span>
                          <small>Products</small>
                        </Link>
                      </Col>
                    </Row>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              <Nav className="align-items-center ml-auto ml-md-0" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle className="nav-link pr-0" color="" tag="a">
                    <Media className="align-items-center">
                      {/* //// avatar //// */}
                      {/* <span className="avatar avatar-sm rounded-circle text-dark">
                        {this.renderAvitar()}
                      </span> */}
                      <Media className="ml-2 d-none d-lg-block">
                        <span className="mb-0 text-sm font-weight-bold text-dark">
                          {
                            JSON.parse(localStorage.getItem("golfx_user"))
                              .name_first
                          }{" "}
                          {
                            JSON.parse(localStorage.getItem("golfx_user"))
                              .name_last
                          }{" "}
                          &nbsp; <i className="fas fa-angle-down"></i>
                        </span>
                      </Media>
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu right>
                    {/* <DropdownItem className="noti-title" header tag="div">
                      <h6 className="text-overflow m-0">Welcome!</h6>
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="ni ni-single-02" />
                      <span>My profile</span>
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="ni ni-settings-gear-65" />
                      <span>Settings</span>
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="ni ni-calendar-grid-58" />
                      <span>Activity</span>
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="ni ni-support-16" />
                      <span>Support</span>
                    </DropdownItem>
                    <DropdownItem divider /> */}
                    <DropdownItem href="#pablo" onClick={(e) => this.logOut(e)}>
                      <i className="ni ni-user-run" />
                      <span>Logout</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}
AdminNavbar.defaultProps = {
  toggleSidenav: () => {},
  sidenavOpen: false,
  theme: "dark",
};
AdminNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "light"]),
};

export default AdminNavbar;

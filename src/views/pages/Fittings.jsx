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
// react plugin that prints a given react component
// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
// reactstrap components
import { Button, Card, CardHeader, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import moment from "moment";
import { dataTable } from "variables/general";
import axios from "axios";
import classnames from "classnames";

console.log("local", dataTable);
const selectRow = {
  mode: "radio",
  clickToSelect: true,
  hideSelectColumn: true,
  bgColor: "#f2f2f2",

  onSelect: (row, isSelect, rowIndex, e) => {
    // console.log(row);
    // console.log(isSelect);
    // console.log(rowIndex);
    // add Link To Profile Page
    // let history = useHistory();
    window.location.href = "/admin/profil/" + row.id;
    // history.push("/admin/profil/" + row.id);
    // <Link to="/admin/addEmployee" />
  },
};

const selectRow_fitting = {
  mode: "radio",
  clickToSelect: true,
  hideSelectColumn: true,
  bgColor: "#f2f2f2",

  onSelect: (row, isSelect, rowIndex, e) => {
    // console.log(row.id);
    // console.log(isSelect);
    // console.log(rowIndex);
    // add Link To Profile Page
    // let history = useHistory();
    window.location.href = "/admin/fittingSheetView/" + row.id;
    // history.push("/admin/profil/" + row.id);
    // <Link to="/admin/addEmployee" />
  },
};

const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: true,
  withFirstAndLast: false,
  sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
    <div className="dataTables_length" id="datatable-basic_length">
      <label>
        Show{" "}
        {
          <select
            name="datatable-basic_length"
            aria-controls="datatable-basic"
            className="form-control form-control-sm"
            onChange={(e) => onSizePerPageChange(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        }{" "}
        entries.
      </label>
    </div>
  ),
});

const { SearchBar } = Search;

class Fittings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      profile: {},
      customer: [],
      customerList: [],
      ready_to_fit: [],
      ready_to_build: [],
      data: false,
    };
  }
  // this function will copy to clipboard an entire table,
  // so you can paste it inside an excel or csv file
  copyToClipboardAsTable = (el) => {
    var body = document.body,
      range,
      sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(el);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(el);
        sel.addRange(range);
      }
      document.execCommand("copy");
    } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
      range.execCommand("Copy");
    }
    this.setState({
      alert: (
        <ReactBSAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Good job!"
          onConfirm={() => this.setState({ alert: null })}
          onCancel={() => this.setState({ alert: null })}
          confirmBtnBsStyle="info"
          btnSize=""
        >
          Copied to clipboard!
        </ReactBSAlert>
      ),
    });
  };
  selectRow = () => {
    // console.log("hello");
  };

  sortfittingdate = (data) => {
    for (var i = 0; i < data.length; i++) {
      // console.log(data[i].fittings[0].)

      console.log(data[i].fittings[0].id);

      // console.log(moment(data[i].fittings[0].fitting_date).format('YYYY-MM-DD'));

      // for (var j = 0; j < data[i].length; j++) {

      // }
    }
  };
  componentDidMount = () => {
    // https://golfx-fitting-db-ddbaf77fdd8d.herokuapp.com/api/fittings?_limit=-1&populate=*
    axios
      .get(
        `https://golfx-fitting-db-ddbaf77fdd8d.herokuapp.com/api/customers?_limit=-1&populate=*`
      )
      .then((res) => {
        const customer = res.data.data;
        let updated_customer = [];
        console.log("customer", customer);
        // for each customer combine .id and .attributes and push to updated_customer
        for (let i = 0; i < customer.length; i++) {
          let customer_id = customer[i].id;
          let single_customer = customer[i].attributes;
          single_customer.id = customer_id;
          updated_customer.push(single_customer);
        }
        console.log("updated customer", updated_customer);

        let stringTest = "helloT000344";
        let newString = stringTest.split("T")[0];
        let fitting_array = customer[0].attributes.fittings.data;
        console.log("customer", fitting_array);

        for (let i = 0; i < fitting_array.length; i++) {
          // old format
          //   if (customer[i].fittings[0]) {
          //     customer[i].fittings[0].fitting_date = moment(
          //       customer[i].fittings[0].fitting_date
          //     ).format("YYYY-MM-DD");
          //   }
          console.log("fitting array", fitting_array[i]);
          // revised format
          if (fitting_array[i]) {
            fitting_array[i].attributes.fitting_date = moment(
              fitting_array[i].attributes.fitting_date
            ).format("YYYY-MM-DD");
          }
        }
        // this.sortfittingdate(customer);

        this.setState({ customerList: updated_customer, data: true });
        this.sortDate();
        // console.log("server", this.state.customerList);
        // this.renderStores();
      });

    axios
      .get(
        `https://golfx-fitting-db-ddbaf77fdd8d.herokuapp.com/api/fittings?_limit=-1&populate=*`
      )
      // axios.get(`http://localhost:1337/restaurants/`)
      .then((res) => {
        const fitting = res.data.data;

        console.log("fitting", fitting);
        let ready_to_fit = [];
        let ready_to_build = [];

        for (let i = 0; i < fitting.length; i++) {
          let fitting_id = fitting[i].id;
          let single_fitting = fitting[i].attributes;
          single_fitting.id = fitting_id;

          //   console.log("fitting", single_fitting);
          if (single_fitting.status === "Ready For Fitting") {
            single_fitting.fitting_date = moment(
              single_fitting.fitting_date
            ).format("dddd, MMMM Do, h:mm a");
            single_fitting.fitting_time = moment(
              single_fitting.fitting_date
            ).format("h:mm a");

            // console.log("single fitting", single_fitting);
            ready_to_fit.push(single_fitting);
          }
          if (single_fitting.status === "Ready For Build") {
            single_fitting.fitting_date = moment(
              single_fitting.fitting_date
            ).format("dddd, MMMM Do, h:mm a");
            single_fitting.fitting_time = moment(
              single_fitting.fitting_date
            ).format("h:mm a");
            ready_to_build.push(single_fitting);
          }
        }

        // console.log("ready", ready_to_fit);
        this.setState({
          ready_to_fit: ready_to_fit,
          ready_to_build: ready_to_build,
        });
      });
  };

  sortDate = () => {
    // console.log("test");
    // var d = new Date();
    // console.log('date', d)
    let customerList = this.state.customerList;
    console.log("customer list", this.state.customerList);

    for (var i = 0; i < this.state.customerList.length; i++) {
      let fitting_list = customerList[i].fittings.data;
      console.log("fitting list", customerList[i].fittings.data);
      if (fitting_list) {
        // var unsortedFittings = customerList[i].fittings;
        // console.log(this.state.customerList[i].last_fitted);

        for (var k = 0; k < fitting_list.length; k++) {
          if (fitting_list.length === 1) {
            // customerList[i].last_fitted = customerList[i].fittings[k].fitting_date;
            // if(customerList[i].fittings[k].status == "Complete"){
            // console.log('completed build', customerList[i].fittings[k].status);
            customerList[i].last_fitted = fitting_list[k].fitting_date;
            var formattedDate = moment(fitting_list[k].fitting_date).format(
              "YYYY-MM-DD"
            );
            customerList[i].last_fitted = formattedDate;
            // }
            //  var formattedDate = moment(customerList[i].fittings[k].fitting_date).format("dddd, MMMM Do, h:mm a");
            //  customerList[i].last_fitted = formattedDate
            // console.log('last fitted', customerList[i].last_fitted)
          } else if (fitting_list.length > 1) {
            // console.log('length of builds', customerList[i].fittings[k]);

            var dates = fitting_list;

            // customerList[i].last_fitted = dates[0];

            // var formattedDate = moment(customerList[i].fittings[k].fitting_date).format("MM-DD-YYYY");
            // customerList[i].last_fitted = formattedDate

            var orderedDates = dates.sort(function (a, b) {
              return Date.parse(a) < Date.parse(b);
            });
            customerList[i].last_fitted = moment(orderedDates[0]).format(
              "YYYY-MM-DD"
            );
            console.log("ordered dates", orderedDates);
            // var formattedDate = moment(customerList[i].fittings[k].fitting_date).format("dddd, MMMM Do, h:mm a");
            // customerList[i].last_fitted = formattedDate
            // for (var l = 0; l<customerList[i].fittings[k].length; l++){

            // }
            // console.log("multiple fittings", customerList[i].fittings)
          }
          // customerList[i].last_fitted = customerList[i].fittings.fitting_date;
        }
      }
      // customerList[i].last_fitted = this.state.customerList[i].last_fitted.split("T")[0];
      // console.log("hi",  customerList[i].fittings);
    }
    // console.log(customerList);
    this.setState({ customer: customerList });
    // console.log(this.state.customer);
  };

  renderTable = () => {
    if (this.state.data === true) {
      return (
        <Card>
          <CardHeader>
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Customers</h3>
                <p className="text-sm mb-0">Add or Search Customers</p>
              </Col>
              <Col className="text-right" xs="4">
                {/* <Button
                  color="primary"
                  href="#pablo"
                  onClick={e =>{ e.preventDefault(); browserHistory.push('/admin/dashboard')  }}
                  size="sm"
                >
                  
                 Add Customer
                      </Button>  */}

                <Link to="/admin/addGolfer">
                  <Button color="primary" size="sm">
                    Add Customer
                  </Button>
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <ToolkitProvider
            data={this.state.customerList}
            keyField="id"
            columns={[
              {
                dataField: "name_first",
                text: "First",
                sort: true,
              },
              {
                dataField: "name_last",
                text: "Last",
                sort: true,
              },
              {
                dataField: "email",
                text: "Email",
                sort: true,
              },
              {
                dataField: "phone",
                text: "Phone #",
                sort: true,
              },
              {
                dataField: "fittings[0].fitting_date",
                text: "Last Fitted",
                sort: true,
              },
            ]}
            search
          >
            {(props) => (
              <div className="py-4 table-responsive">
                <div
                  id="datatable-basic_filter"
                  className="dataTables_filter px-4 pb-1"
                >
                  <label>
                    Search:
                    <SearchBar
                      className="form-control-sm"
                      placeholder=""
                      {...props.searchProps}
                    />
                  </label>
                </div>

                <BootstrapTable
                  {...props.baseProps}
                  bootstrap4={true}
                  pagination={pagination}
                  bordered={false}
                  selectRow={selectRow}
                />
              </div>
            )}
          </ToolkitProvider>
        </Card>
      );
    }
  };

  renderFittingTable = () => {
    if (this.state.ready_to_fit.length > 0) {
      return (
        <Card
          className={classnames("shadow", {
            Force_hide:
              JSON.parse(localStorage.getItem("golfx_user")).position ===
              "Sales",
          })}
        >
          <CardHeader className="bg-transparent border-0">
            <h3 className=" mb-0">Ready For Fitting</h3>
          </CardHeader>
          <ToolkitProvider
            data={this.state.ready_to_fit}
            keyField="id"
            columns={[
              {
                dataField: "fitting_date",
                text: "Fitting Date",
                sort: true,
              },
              {
                dataField: "customer.name_first",
                text: "First",
                sort: true,
              },
              {
                dataField: "customer.name_last",
                text: "Last",
                sort: true,
              },
            ]}
            search
          >
            {(props) => (
              <div className="py-4 table-responsive">
                <BootstrapTable
                  {...props.baseProps}
                  bootstrap4={true}
                  pagination={pagination}
                  bordered={false}
                  selectRow={selectRow_fitting}
                />
              </div>
            )}
          </ToolkitProvider>
        </Card>
      );
    }
  };

  renderBuildTable = () => {
    if (this.state.ready_to_build.length > 0) {
      return (
        <Card
          className={classnames("shadow", {
            Force_hide:
              JSON.parse(localStorage.getItem("golfx_user")).position ===
              "Sales",
          })}
        >
          <CardHeader className="bg-transparent border-0">
            <h3 className=" mb-0">Ready For Building</h3>
          </CardHeader>
          <ToolkitProvider
            data={this.state.ready_to_build}
            keyField="id"
            columns={[
              {
                dataField: "fitting_date",
                text: "Fitting Date",
                sort: true,
              },
              {
                dataField: "customer.name_first",
                text: "First",
                sort: true,
              },
              {
                dataField: "customer.name_last",
                text: "Last",
                sort: true,
              },
            ]}
            search
          >
            {(props) => (
              <div className="py-4 table-responsive">
                <BootstrapTable
                  {...props.baseProps}
                  bootstrap4={true}
                  pagination={pagination}
                  bordered={false}
                  selectRow={selectRow_fitting}
                />
              </div>
            )}
          </ToolkitProvider>
        </Card>
      );
    }
  };

  renderFitting = () => {
    if (this.state.data === true) {
      return (
        <Row>
          <Col>{this.renderFittingTable()}</Col>
          <Col>{this.renderBuildTable()}</Col>
        </Row>
      );
    }
  };

  render() {
    return (
      <>
        {this.state.alert}
        <SimpleHeader parentName="Fittings" />

        <Container className="mt--6" fluid>
          <Row>
            <div className="col">{this.renderTable()}</div>
          </Row>

          <div className="col">{this.renderFitting()}</div>
        </Container>
      </>
    );
  }
}

export default Fittings;

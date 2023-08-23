import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardFooter,
  CardBody,
  Input,
  Modal,
  Alert,
} from "reactstrap";
import Select2 from "react-select2-wrapper";
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import { dataTable } from "variables/general";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";

// ██████╗ ███████╗██╗     ███████╗████████╗███████╗     █████╗ ██████╗ ██████╗  █████╗ ██╗   ██╗
// ██╔══██╗██╔════╝██║     ██╔════╝╚══██╔══╝██╔════╝    ██╔══██╗██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝
// ██║  ██║█████╗  ██║     █████╗     ██║   █████╗      ███████║██████╔╝██████╔╝███████║ ╚████╔╝
// ██║  ██║██╔══╝  ██║     ██╔══╝     ██║   ██╔══╝      ██╔══██║██╔══██╗██╔══██╗██╔══██║  ╚██╔╝
// ██████╔╝███████╗███████╗███████╗   ██║   ███████╗    ██║  ██║██║  ██║██║  ██║██║  ██║   ██║
// ╚═════╝ ╚══════╝╚══════╝╚══════╝   ╚═╝   ╚══════╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝

let listID = [];
let listIDProducts = [];
const selectRow = {
  mode: "checkbox",
  clickToSelect: true,
  // selectColumnPosition: 'right',
  onSelect: (row, isSelect, rowIndex, e) => {
    console.log(row.id);
    console.log(isSelect);
    console.log(rowIndex);
    console.log(e);
    if (isSelect) {
      addId(row);
    } else {
      removeId(row);
    }
  },
  onSelectAll: (isSelect, rows, e) => {
    console.log(isSelect);
    console.log(rows);
    console.log(e);
    if (isSelect) {
      addAll(rows);
    } else {
      clearArr();
    }
  },
};
function addAll(rows) {
  listID = rows;
}

function clearArr() {
  listID = [];
}

function addId(row) {
  listID.push(row);
  console.log("add", listID);
}
function removeId(row) {
  for (let i = 0; i < listID.length; i++) {
    console.log(listID[i]);
    if (listID[i].id === row.id) {
      //remove
      listID.splice(i, 1);
    }
  }
  console.log("remove", listID);
}

function removeIdProducts(row) {
  for (let i = 0; i < listIDProducts.length; i++) {
    console.log(listIDProducts[i]);
    if (listIDProducts[i].id === row.id) {
      //remove
      listIDProducts.splice(i, 1);
    }
  }
  console.log("remove", listIDProducts);
}

function addAllProducts(rows) {
  listIDProducts = rows;
}

function clearArrProducts() {
  listIDProducts = [];
}

function addIdProducts(row) {
  listIDProducts.push(row);
  console.log("add", listIDProducts);
}

const selectRowProducts = {
  mode: "checkbox",
  clickToSelect: true,
  // selectColumnPosition: 'right',
  onSelect: (row, isSelect, rowIndex, e) => {
    if (isSelect) {
      addIdProducts(row);
    } else {
      removeIdProducts(row);
    }
  },
  onSelectAll: (isSelect, rows, e) => {
    if (isSelect) {
      addAllProducts(rows);
    } else {
      clearArrProducts();
    }
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

class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: {},
      ProductsList: [],
      notificationModal: false,
      Product_data: false,
      oemModal: false,
      ClubModal: false,
      oem_data: false,
      showLoad: false,
      ProductCategory: "",
      productError: false,
    };
  }
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  // ██████╗ ███████╗████████╗    ██████╗  █████╗ ████████╗ █████╗
  // ██╔════╝ ██╔════╝╚══██╔══╝    ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
  // ██║  ███╗█████╗     ██║       ██║  ██║███████║   ██║   ███████║
  // ██║   ██║██╔══╝     ██║       ██║  ██║██╔══██║   ██║   ██╔══██║
  // ╚██████╔╝███████╗   ██║       ██████╔╝██║  ██║   ██║   ██║  ██║
  //  ╚═════╝ ╚══════╝   ╚═╝       ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝

  organizeData = (arr) => {
    let newArr = [];
    // for each item in the array
    for (let i = 0; i < arr.length; i++) {
      // combine arr.id and arr.attributes
      let obj = { id: arr[i].id, ...arr[i].attributes };
      // push to new array
      newArr.push(obj);
    }
    return newArr;
  };
  componentDidMount = () => {
    let myObj = this;
    console.log("hello world ");
    axios({
      method: "get",
      // url: "https://golfx-fitting-db-ddbaf77fdd8d.herokuapp.com/api/clubs",
      url: "https://golfx-fitting-db-ddbaf77fdd8d.herokuapp.com/api/clubs?_limit=-1&populate=*",
    })
      // axios.get(`http://localhost:1337/restaurants/`)
      .then((res) => {
        let clubs = myObj.organizeData(res.data.data);

        // for each clubs organize the data of brands
        for (let i = 0; i < clubs.length; i++) {
          const newBrands = [];
          console.log(clubs[i].brand.data);
          // for each data.brand.data combine data.brand.data.id and data.brand.data.attributes and push to newBrands
          let obj = {
            id: clubs[i].brand.data.id,
            ...clubs[i].brand.data.attributes,
          };
          newBrands.push(obj);

          // replace data.brand.data with newBrands
          clubs[i].brand = newBrands;
          console.log("clubs[i].brand", clubs[i].brand);
        }

        console.log("clubs", clubs);

        this.setState({ clubsList: clubs, data: true, dataRetieve: true });
        // this.sortDate();
        // console.log('server', this.state.clubsList)
        // this.renderStores();
      });

    axios({
      method: "get",
      url: "https://golfx-fitting-db-ddbaf77fdd8d.herokuapp.com/api/brands?_limit=-1&populate=*",
    })
      // axios.get(`http://localhost:1337/restaurants/`)
      .then((res) => {
        const oem = myObj.organizeData(res.data.data);
        console.log("oem", oem);

        let items = [];
        let singleItem = {};
        let singleOem = "";
        let singleId = 0;
        for (let i = 0; i < oem.length; i++) {
          // copy.push(items[i]);
          singleOem = oem[i].brand_name;
          singleId = oem[i].id;
          singleItem = { id: singleId, text: singleOem };
          items.push(singleItem);

          console.log("items", items);
        }

        this.setState({ oemList: oem, oem_data: true, brandList: items });
        // this.sortDate();
        console.log("oem", this.state.oemList);
        // this.renderStores();
      });

    axios({
      method: "get",
      url: "https://golfx-fitting-db-ddbaf77fdd8d.herokuapp.com/api/products?_limit=-1&populate=*",
    })
      // axios.get(`http://localhost:1337/restaurants/`)
      .then((res) => {
        const Products = myObj.organizeData(res.data.data);

        console.log("these are products", Products);

        this.setState({
          ProductsList: Products,
          Product_data: true,
          dataRetieve: true,
        });

        // this.sortDate();
        // console.log("ProductsList", this.state.ProductsList);
        // this.renderStores();
      });
  };

  // ██████╗ ███████╗██╗     ███████╗████████╗███████╗
  // ██╔══██╗██╔════╝██║     ██╔════╝╚══██╔══╝██╔════╝
  // ██║  ██║█████╗  ██║     █████╗     ██║   █████╗
  // ██║  ██║██╔══╝  ██║     ██╔══╝     ██║   ██╔══╝
  // ██████╔╝███████╗███████╗███████╗   ██║   ███████╗
  // ╚═════╝ ╚══════╝╚══════╝╚══════╝   ╚═╝   ╚══════╝

  DeleteClub = () => {
    this.setState({ showLoad: true });
    let axiosRequest = [];

    for (let i = 0; i < listID.length; i++) {
      axios
        .delete(
          "https://golfx-fitting-db-ddbaf77fdd8d.herokuapp.com/api/clubs/" +
            listID[i].id
        )
        .then((res) => {
          const Products = res.data;
          console.log(Products);
        });
    }

    setTimeout(function () {
      window.location.reload(false);
    }, 3000);
  };

  DeleteProducts = () => {
    this.setState({ showLoad: true });
    let axiosRequest = [];

    for (let i = 0; i < listIDProducts.length; i++) {
      axios
        .delete(
          "https://golfx-fitting-db-ddbaf77fdd8d.herokuapp.com/api/products/" +
            listIDProducts[i].id
        )
        .then((res) => {
          const Products = res.data;
          console.log(Products);
        });
    }

    setTimeout(function () {
      window.location.reload(false);
    }, 3000);
  };

  // renderDeleteBTn = () => {

  //   return(
  //     <i className="far fa-trash-alt text-primary mr-3" onClick={e => this.DeleteClub()}></i>
  //   )

  // }

  newOem = (e) => {
    e.preventDefault();
    // console.log(this.state.newOem);
    this.setState({ showLoad: true });
    let thisisit = this;
    if (document.getElementById("input-oem").value) {
      let data = {
        brand_name: document.getElementById("input-oem").value.toUpperCase(),
      };
      console.log("Pushing Data: ", data);

      axios({
        method: "post",
        url: "https://golfx-fitting-db-ddbaf77fdd8d.herokuapp.com/api/brands",
        data: {
          data: {
            brand_name: document
              .getElementById("input-oem")
              .value.toUpperCase(),
          },
        },
      })
        .then(function (response) {
          console.log(response);
          window.location.reload(false);
        })
        .catch(function (error) {
          console.log(error.response);
        });
    }
  };

  newClub = (e) => {
    e.preventDefault();
    console.log(this.state.brand);
    // console.log(document.getElementById("input-club").value);
    let thisisit = this;
    this.setState({ showLoad: true });

    // get brand ID as a number
    let brandId = parseInt(this.state.brand);

    let mydata = {
      club_name: document.getElementById("input-club").value,
      brand: {
        id: brandId,
      },
    };

    // console.log("Pushing Data: ", mydata);

    if (document.getElementById("input-club").value && brandId) {
      console.log("club: ", document.getElementById("input-club").value);
      console.log("brandID: ", brandId);
      axios({
        method: "post",
        url: "https://golfx-fitting-db-ddbaf77fdd8d.herokuapp.com/api/clubs",
        data: {
          data: mydata,
        },
      })
        .then(function (response) {
          // this.setState({ btnDisable: false });
          console.log(response);
          window.location.reload(false);
        })
        .catch(function (error) {
          console.log(error.response);
        });
    } else {
      // remove load
      this.setState({ showLoad: false });
      console.log(" missing data");
      // find '.Alert' and remove class 'hide'
      let alert = document.querySelector(".Alert");
      alert.classList.remove("hide");
    }
  };

  newProducts = (e) => {
    this.setState({ productError: false });
    let mystate = this;
    e.preventDefault();
    // this.setState({ showLoad: true });

    if (
      document.getElementById("input-products").value === "" ||
      this.state.ProductCategory === ""
    ) {
      this.setState({ productError: true });
    } else {
      //! send axios
      if (document.getElementById("input-products").value) {
        axios({
          method: "post",
          url: "https://golfx-fitting-db-ddbaf77fdd8d.herokuapp.com/api/products",
          data: {
            data: {
              Product_name: document
                .getElementById("input-products")
                .value.toUpperCase(),
              Category: mystate.state.ProductCategory,
            },
          },
        })
          .then(function (response) {
            console.log(response);

            window.location.reload(false);
          })
          .catch(function (error) {
            console.log(error.response);
          });
      }
    }
  };

  // ████████╗ █████╗ ██████╗ ██╗     ███████╗
  // ╚══██╔══╝██╔══██╗██╔══██╗██║     ██╔════╝
  //    ██║   ███████║██████╔╝██║     █████╗
  //    ██║   ██╔══██║██╔══██╗██║     ██╔══╝
  //    ██║   ██║  ██║██████╔╝███████╗███████╗
  //    ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝

  renderData = () => {
    if (this.state.Product_data) {
      return (
        <ToolkitProvider
          data={this.state.ProductsList}
          keyField="id"
          columns={[
            {
              dataField: "Product_name",
              text: "Name",
              sort: true,
            },
            {
              dataField: "Category",
              text: "Category",
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
                <i
                  className="far fa-trash-alt text-primary mr-3"
                  onClick={(e) => this.DeleteProducts()}
                ></i>
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
                selectRow={selectRowProducts}
              />
            </div>
          )}
        </ToolkitProvider>
      );
    }
  };

  render_club_data = () => {
    if (this.state.oem_data) {
      return (
        <ToolkitProvider
          data={this.state.clubsList}
          keyField="id"
          columns={[
            {
              dataField: "club_name",
              text: "Clubs",
              sort: true,
            },
            {
              dataField: "brand[0].brand_name",
              text: "Oem",
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
                <i
                  className="far fa-trash-alt text-primary mr-3"
                  onClick={(e) => this.DeleteClub()}
                ></i>

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
      );
    }
  };

  renderTable = (title, SubTitle, BTNName, toggleModal) => {
    if (this.state.data === true) {
      return (
        <Card>
          <CardHeader>
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0"> {title} </h3>
                <p className="text-sm mb-0"> {SubTitle} </p>
              </Col>
              <Col className="text-right" xs="4">
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={() => {
                    this.toggleModal(toggleModal);
                  }}
                  size="sm"
                >
                  {BTNName}
                </Button>
              </Col>
            </Row>
          </CardHeader>
          {this.renderData()}
        </Card>
      );
    }
  };

  render_Club_Table = (title, SubTitle, BTNName, toggleModal) => {
    if (this.state.data === true) {
      return (
        <Card>
          <CardHeader>
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0"> Clubs</h3>
                <p className="text-sm mb-0">Add or Search Clubs</p>
              </Col>
              <Col className="text-right" xs="4">
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={() => {
                    this.toggleModal("oemModal");
                  }}
                  size="sm"
                >
                  Add oem
                </Button>
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={() => {
                    this.toggleModal("ClubModal");
                  }}
                  size="sm"
                >
                  Add Club
                </Button>
              </Col>
            </Row>
          </CardHeader>
          {this.render_club_data()}
        </Card>
      );
    }
  };

  // ███╗   ███╗ ██████╗ ██████╗  █████╗ ██╗
  // ████╗ ████║██╔═══██╗██╔══██╗██╔══██╗██║
  // ██╔████╔██║██║   ██║██║  ██║███████║██║
  // ██║╚██╔╝██║██║   ██║██║  ██║██╔══██║██║
  // ██║ ╚═╝ ██║╚██████╔╝██████╔╝██║  ██║███████╗
  // ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝
  render_modal_Prodcuts = () => {
    return (
      <Modal
        className="modal-dialog-centered"
        isOpen={this.state.notificationModal}
        toggle={() => this.toggleModal("notificationModal")}
      >
        <div className="modal-header">
          <h6 className="modal-title" id="modal-title-default">
            Add New Product
          </h6>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => this.toggleModal("notificationModal")}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>Product Name</p>
          <Input
            // defaultValue={this.state.profile.name_last}
            id="input-products"
            placeholder="$-TAPER"
            autoCapitalize
            // onChange={e => this.handleChange()}
            type="text"
          />
          <p>Category</p>
          <Select2
            className="product-dropdown"
            options={{
              placeholder: "Select",
            }}
            data={[
              { text: "IRON", id: "IRON" },
              { text: "HYBRID", id: "HYBRID" },
              { text: "WOOD", id: "WOOD" },
              { text: "WEDGE", id: "WEDGE" },
              { text: "PUTTER", id: "PUTTER" },
            ]}
            value={this.state.ProductCategory}
            onChange={(e) => this.setState({ ProductCategory: e.target.value })}
          />
        </div>
        <div className="container">
          <Alert color="warning" isOpen={this.state.productError} fade={true}>
            <span className="alert-inner--icon">
              <i className="ni ni-sound-wave" />
            </span>{" "}
            <span className="alert-inner--text">
              <strong>Error!</strong> Please fill both Inputs!
              {this.state.errorMessage}
            </span>
          </Alert>
        </div>

        <div className="modal-footer">
          <Button
            color="primary"
            type="button"
            onClick={(e) => this.newProducts(e)}
          >
            Add product
          </Button>
          <Button
            className="ml-auto"
            color="link"
            data-dismiss="modal"
            type="button"
            onClick={() => this.toggleModal("notificationModal")}
          >
            Close
          </Button>
        </div>
      </Modal>
    );
  };

  // ╔═╗┌─┐┌┬┐  ╔╦╗┌─┐┌┬┐┌─┐┬
  // ║ ║├┤ │││  ║║║│ │ ││├─┤│
  // ╚═╝└─┘┴ ┴  ╩ ╩└─┘─┴┘┴ ┴┴─┘

  render_modal_Oem = () => {
    return (
      <Modal
        className="modal-dialog-centered"
        isOpen={this.state.oemModal}
        toggle={() => this.toggleModal("oemModal")}
      >
        <div className="modal-header">
          <h6 className="modal-title" id="modal-title-default">
            Add New Oem
          </h6>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => this.toggleModal("oemModal")}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>Oem Name</p>
          <Input
            // defaultValue={this.state.profile.name_last}
            id="input-oem"
            placeholder="Callaway"
            // onChange={e => this.handleChange()}
            type="text"
          />
        </div>
        <div className="modal-footer">
          <Button color="primary" type="button" onClick={(e) => this.newOem(e)}>
            Add Oem
          </Button>
          <Button
            className="ml-auto"
            color="link"
            data-dismiss="modal"
            type="button"
            onClick={() => this.toggleModal("oemModal")}
          >
            Close
          </Button>
        </div>
      </Modal>
    );
  };

  // ╔═╗┬  ┬ ┬┌┐   ╔╦╗┌─┐┌┬┐┌─┐┬
  // ║  │  │ │├┴┐  ║║║│ │ ││├─┤│
  // ╚═╝┴─┘└─┘└─┘  ╩ ╩└─┘─┴┘┴ ┴┴─┘

  render_modal_Club = () => {
    return (
      <Modal
        className="modal-dialog-centered"
        isOpen={this.state.ClubModal}
        toggle={() => this.toggleModal("ClubModal")}
      >
        <div className="modal-header">
          <h6 className="modal-title" id="modal-title-default">
            Add New Club
          </h6>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => this.toggleModal("ClubModal")}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <label className="form-control-label" htmlFor="input-first-name">
            Oem
          </label>
          <Select2
            className="form-control "
            options={{
              placeholder: "Select",
            }}
            data={this.state.brandList}
            value={this.state.brand}
            onChange={(e) => this.setState({ brand: e.target.value })}
          />
          <div className="mb-4"></div>
          <label className="form-control-label" htmlFor="input-first-name">
            Club Name
          </label>
          <Input
            // defaultValue={this.state.profile.name_last}
            id="input-club"
            placeholder="Callaway"
            // onChange={e => this.handleChange()}
            type="text"
          />
          <div className="Alert hide mt-3 text-warning">
            Please select a OEM AND type in a club name
          </div>
        </div>
        <div className="modal-footer">
          <Button
            color="primary"
            type="button"
            onClick={(e) => this.newClub(e)}
          >
            Add Club
          </Button>
          <Button
            className="ml-auto"
            color="link"
            data-dismiss="modal"
            type="button"
            onClick={() => this.toggleModal("ClubModal")}
          >
            Close
          </Button>
        </div>
      </Modal>
    );
  };

  render() {
    return (
      <>
        {this.state.alert}
        <LoadingScreen show={this.state.showLoad} />
        <SimpleHeader parentName="Products" />
        <Container className="mt--6" fluid>
          <Row>
            <div className="col-md-8">{this.render_Club_Table()}</div>
            <div className="col">
              {this.renderTable(
                "Shafts",
                "Add or Search Shafts",
                "Add Shafts",
                "notificationModal"
              )}
            </div>
          </Row>
        </Container>

        {this.render_modal_Prodcuts()}
        {this.render_modal_Oem()}
        {this.render_modal_Club()}
      </>
    );
  }
}

export default Products;

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
// import Alternative from "views/pages/dashboards/Alternative.jsx";
// import Buttons from "views/pages/components/Buttons.jsx";
import Calendar from "views/pages/Calendar.jsx";
// import Cards from "views/pages/components/Cards.jsx";
// import Charts from "views/pages/Charts.jsx";
// import Components from "views/pages/forms/Components.jsx";
// import Dashboard from "views/pages/dashboards/Dashboard.jsx";
// import Elements from "views/pages/forms/Elements.jsx";
// import Google from "views/pages/maps/Google.jsx";
// import Grid from "views/pages/components/Grid.jsx";
// import Icons from "views/pages/components/Icons.jsx";
// import Lock from "views/pages/examples/Lock.jsx";
// import Login from "./views/pages/Login";
// import Notifications from "views/pages/components/Notifications.jsx";
// import Pricing from "views/pages/examples/Pricing.jsx";
// import Profile from "views/pages/examples/Profile.jsx";
// import ReactBSTables from "views/pages/tables/ReactBSTables.jsx";
// import Register from "views/pages/examples/Register.jsx";
// import Sortable from "views/pages/tables/Sortable.jsx";
// import Tables from "views/pages/tables/Tables.jsx";
// import Timeline from "views/pages/examples/Timeline.jsx";
// import Typography from "views/pages/components/Typography.jsx";
// import Validation from "views/pages/forms/Validation.jsx";
// import Vector from "views/pages/maps/Vector.jsx";
// import Widgets from "views/pages/Widgets.jsx";
// import AppDashboard from "./views/pages/dashboards/AppDashboard";
import Fittings from "./views/pages/Fittings";
import AppProfile from "./views/pages/AppProfile";
import AddGolfer from "./views/pages/AddGolfer";
import AddEmployee from "./views/pages/AddEmployee";
// import Clubs from "./views/pages/Clubs";
// import FittingSheet from "./views/pages/FittingSheet";
// import FittingSheetView from "./views/pages/FittingSheetView";
import Products from "./views/pages/Products";
// import FittingPDF from "./views/pages/FittingPDF";
import FittingSheetNew from "./views/pages/FittingSheetNew";
// import FittingSheetNewView from "./views/pages/FittingSheetNewView";
import Fitting from "./views/pages/Fitting";

// import classnames from "classnames";

let role = false;

console.log(localStorage.getItem("golfx_user"));
if (localStorage.getItem("golfx_user")) {
  if (JSON.parse(localStorage.getItem("golfx_user")).position === "Sales") {
    role = true;
  }
}

console.log("this is a role: ", role);

const routes = [
  {
    path: "/AddEmployee",
    name: "AddEmployee",
    hide: true,
    icon: "ni ni-shop text-primary",
    component: AddEmployee,
    layout: "/admin",
  },
  {
    path: "/addGolfer",
    name: "AddGolfer",
    hide: true,
    icon: "ni ni-shop text-primary",
    component: AddGolfer,
    layout: "/admin",
  },
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "ni ni-shop text-primary",
  //   component: AppDashboard,
  //   layout: "/admin"
  // },
  {
    path: "/calendar",
    name: "Calendar",
    icon: "ni ni-calendar-grid-58 text-red",
    component: Calendar,
    layout: "/admin",
  },
  {
    path: "/fittingSheet",
    name: "fittingSheet",
    icon: "ni ni-shop text-primary",
    hide: true,
    component: FittingSheetNew,
    layout: "/admin",
  },
  // {
  //   path: "/fittingSheetNew",
  //   name: "fittingSheetNew",
  //   icon: "ni ni-shop text-primary",

  //   component: FittingSheetNew,
  //   layout: "/admin"
  // },
  {
    path: "/fittingSheetView/:id",
    name: "fittingSheet",
    icon: "ni ni-shop text-primary",
    hide: true,
    component: Fitting,
    layout: "/admin",
  },

  {
    path: "/customers",
    name: "Customers",
    icon: "fa-solid fa-people-arrows text-primary",
    component: Fittings,
    layout: "/admin",
  },
  // {
  //   path: "/Clubs",
  //   name: "Clubs",
  //   icon: "fal fa-golf-club text-primary",
  //   component: Clubs,

  //   layout: "/admin"
  // },
  {
    path: "/Products",
    name: "Products",
    icon: "fa-solid fa-golf-ball-tee text-primary",
    hide: role,
    component: Products,
    layout: "/admin",
  },

  // {
  //   path: "/PDF",
  //   name: "PDF",
  //   icon: "fal fa-golf-club text-primary",
  //   component: FittingPDF ,
  //   layout: "/"
  // },
  {
    path: "/profil/:id",
    name: "Profile",
    hide: true,
    icon: "ni ni-user-run text-primary",
    component: AppProfile,
    layout: "/admin",
  },
  // {
  //   collapse: true,
  //   name: "Dashboards",
  //   icon: "ni ni-shop text-primary",
  //   state: "dashboardsCollapse",
  //   views: [

  //     {
  //       path: "/alternative-dashboard",
  //       name: "Alternative",
  //       component: Alternative,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  // {
  //   collapse: true,
  //   name: "Examples",
  //   icon: "ni ni-ungroup text-orange",
  //   state: "examplesCollapse",
  //   views: [
  //     {
  //       path: "/pricing",
  //       name: "Pricing",
  //       component: Pricing,
  //       layout: "/auth"
  //     },
  //     {
  //       path: "/login",
  //       name: "Login",
  //       component: Login,
  //       layout: "/auth"
  //     },
  //     {
  //       path: "/register",
  //       name: "Register",
  //       component: Register,
  //       layout: "/auth"
  //     },
  //     {
  //       path: "/lock",
  //       name: "Lock",
  //       component: Lock,
  //       layout: "/auth"
  //     },
  //     {
  //       path: "/timeline",
  //       name: "Timeline",
  //       component: Timeline,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/profile",
  //       name: "Profile",
  //       component: Profile,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  // {
  //   collapse: true,
  //   name: "Components",
  //   icon: "ni ni-ui-04 text-info",
  //   state: "componentsCollapse",
  //   views: [
  //     {
  //       path: "/buttons",
  //       name: "Buttons",
  //       component: Buttons,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/cards",
  //       name: "Cards",
  //       component: Cards,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/grid",
  //       name: "Grid",
  //       component: Grid,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/notifications",
  //       name: "Notifications",
  //       component: Notifications,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/icons",
  //       name: "Icons",
  //       component: Icons,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/typography",
  //       name: "Typography",
  //       component: Typography,
  //       layout: "/admin"
  //     },
  //     {
  //       collapse: true,
  //       name: "Multi Level",
  //       state: "multiCollapse",
  //       views: [
  //         {
  //           path: "#pablo",
  //           name: "Third level menu",
  //           component: () => {},
  //           layout: "/"
  //         },
  //         {
  //           path: "#pablo",
  //           name: "Just another link",
  //           component: () => {},
  //           layout: "/"
  //         },
  //         {
  //           path: "#pablo",
  //           name: "One last link",
  //           component: () => {},
  //           layout: "/"
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   collapse: true,
  //   name: "Forms",
  //   icon: "ni ni-single-copy-04 text-pink",
  //   state: "formsCollapse",
  //   views: [
  //     {
  //       path: "/elements",
  //       name: "Elements",
  //       component: Elements,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/components",
  //       name: "Components",
  //       component: Components,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/validation",
  //       name: "Validation",
  //       component: Validation,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  // {
  //   collapse: true,
  //   name: "Tables",
  //   icon: "ni ni-align-left-2 text-default",
  //   state: "tablesCollapse",
  //   views: [
  //     {
  //       path: "/tables",
  //       name: "Tables",
  //       component: Tables,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/sortable",
  //       name: "Sortable",
  //       component: Sortable,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/react-bs-table",
  //       name: "React BS Tables",
  //       component: ReactBSTables,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  // {
  //   collapse: true,
  //   name: "Maps",
  //   icon: "ni ni-map-big text-primary",
  //   state: "mapsCollapse",
  //   views: [
  //     {
  //       path: "/google",
  //       name: "Google",
  //       component: Google,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/vector",
  //       name: "Vector",
  //       component: Vector,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  // {
  //   path: "/widgets",
  //   name: "Widgets",
  //   icon: "ni ni-archive-2 text-green",
  //   component: Widgets,
  //   layout: "/admin"
  // },
  // {
  //   path: "/charts",
  //   name: "Charts",
  //   icon: "ni ni-chart-pie-35 text-info",
  //   component: Charts,
  //   layout: "/admin"
  // }
];

export default routes;

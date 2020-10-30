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
// ##############################
// // // data for populating the calendar in Calendar view
// #############################
import axios from 'axios';

var today = new Date();
var y = today.getFullYear();
var m = today.getMonth();
var d = today.getDate();

// let customerList = [];

// axios.get(`http://localhost:1337/customers`)
// // axios.get(`http://localhost:1337/restaurants/`)
// .then(res => {
//   const customerList  = res.data;
  
//   console.log(customer)
//   // this.renderStores();
// })

const events = [
  {
    id: 1,
    title: "Call with Dave",
    start: new Date(y, m, 1),
    allDay: true,
    className: "bg-red",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
  },

  {
    id: 2,
    title: "Lunch meeting",
    start: new Date(y, m, d - 1, 10, 30),
    allDay: true,
    className: "bg-orange",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
  },

  {
    id: 3,
    title: "All day conference",
    start: new Date(y, m, d + 7, 12, 0),
    allDay: true,
    className: "bg-green",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
  },

  {
    id: 4,
    title: "Meeting with Mary",
    start: new Date(y, m, d - 2),
    allDay: true,
    className: "bg-blue",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
  },

  {
    id: 5,
    title: "Winter Hackaton",
    start: new Date(y, m, d + 1, 19, 0),
    allDay: true,
    className: "bg-red",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
  },

  {
    id: 6,
    title: "Digital event",
    start: new Date(y, m, 21),
    allDay: true,
    className: "bg-warning",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
  },

  {
    id: 7,
    title: "Marketing event",
    start: new Date(y, m, 21),
    allDay: true,
    className: "bg-purple",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
  },

  {
    id: 8,
    title: "Dinner with Family",
    start: new Date(y, m, 19),
    allDay: true,
    className: "bg-red",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
  },

  {
    id: 9,
    title: "Black Friday",
    start: new Date(y, m, 23),
    allDay: true,
    className: "bg-blue",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
  },

  {
    id: 10,
    title: "Cyber Week",
    start: new Date(y, m, 2),
    allDay: true,
    className: "bg-yellow",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
  }
];

// ##############################
// // // data for populating the calendar in Widgest view
// #############################

const widgetEvents = [
  {
    title: "Lunch meeting",
    start: "2018-11-21",
    end: "2018-11-22",
    className: "bg-orange"
  },
  {
    title: "All day conference",
    start: new Date(y, m - 1, 28),
    allDay: true,
    className: "bg-green"
  },
  {
    title: "Meeting with Mary",
    start: new Date(y, m, 2),
    allDay: true,
    className: "bg-blue"
  },
  {
    title: "Winter Hackaton",
    start: new Date(y, m, 4),
    allDay: true,
    className: "bg-red"
  },
  {
    title: "Digital event",
    start: new Date(y, m, 8),
    end: new Date(y, m, 10),
    allDay: true,
    className: "bg-warning"
  },
  {
    title: "Marketing event",
    start: new Date(y, m, 11),
    allDay: true,
    className: "bg-purple"
  },
  {
    title: "Dinner with Family",
    start: new Date(y, m, 20),
    allDay: true,
    className: "bg-red"
  },
  {
    title: "Black Friday",
    start: new Date(y, m, 24),
    allDay: true,
    className: "bg-blue"
  },
  {
    title: "Cyber Week",
    start: new Date(y, m, 3),
    allDay: true,
    className: "bg-yellow"
  }
];

// ##############################
// // // data for populating the table in ReactTables view
// #############################

const dataTable = [
  {
    "id": "69",
    "isActive": false,
    "picture": "http://placehold.it/200x200",
    "name": "West Porter",
    "email": "westporter@portaline.com",
    "phone": "+1 (943) 530-3022",
    "address": "106 Cozine Avenue",
    "city": "Fontanelle",
    "state": "Kentucky",
    "zip": 4435
  },
  {
    "id": "5dae34e699b347e04ce2daf3",
    "isActive": false,
    "picture": "http://placehold.it/200x200",
    "name": "Alston Madden",
    "email": "alstonmadden@portaline.com",
    "phone": "+1 (931) 469-3534",
    "address": "188 Fuller Place",
    "city": "Libertytown",
    "state": "Georgia",
    "zip": 3661
  },
  {
    "id": "5dae34e650bab1d8494b5c1b",
    "isActive": true,
    "picture": "http://placehold.it/200x200",
    "name": "Guzman Christian",
    "email": "guzmanchristian@portaline.com",
    "phone": "+1 (943) 536-2527",
    "address": "992 Heath Place",
    "city": "Mooresburg",
    "state": "Puerto Rico",
    "zip": 1241
  },
  {
    "id": "5dae34e630ab51e27035ba1f",
    "isActive": false,
    "picture": "http://placehold.it/200x200",
    "name": "Ollie Nielsen",
    "email": "ollienielsen@portaline.com",
    "phone": "+1 (810) 553-2723",
    "address": "247 Kings Place",
    "city": "Romeville",
    "state": "Guam",
    "zip": 7140
  },
  {
    "id": "5dae34e690fc8dd0f0f95859",
    "isActive": true,
    "picture": "http://placehold.it/200x200",
    "name": "Patterson Brown",
    "email": "pattersonbrown@portaline.com",
    "phone": "+1 (889) 560-2409",
    "address": "893 Amity Street",
    "city": "Marenisco",
    "state": "Northern Mariana Islands",
    "zip": 2522
  },
  {
    "id": "5dae34e62ff474850cb17ce5",
    "isActive": true,
    "picture": "http://placehold.it/200x200",
    "name": "Berger Heath",
    "email": "bergerheath@portaline.com",
    "phone": "+1 (838) 543-2663",
    "address": "415 Wilson Street",
    "city": "Bethany",
    "state": "Florida",
    "zip": 6071
  }, {
    "id": "5dae35c0e8ef25a0680ea8cb",
    "isActive": false,
    "picture": "http://placehold.it/200x200",
    "name": "Christie Snyder",
    "email": "christiesnyder@portaline.com",
    "phone": "+1 (868) 489-2091",
    "address": "996 Leonora Court",
    "city": "Bath",
    "state": "Massachusetts",
    "zip": 8547
  },
  {
    "id": "5dae35c03322c19ef1878596",
    "isActive": false,
    "picture": "http://placehold.it/200x200",
    "name": "Goodwin Townsend",
    "email": "goodwintownsend@portaline.com",
    "phone": "+1 (820) 432-2423",
    "address": "799 Garden Place",
    "city": "Oceola",
    "state": "Maine",
    "zip": 9955
  },
  {
    "id": "5dae35c08bb043e702facdb8",
    "isActive": false,
    "picture": "http://placehold.it/200x200",
    "name": "Carmela Joyner",
    "email": "carmelajoyner@portaline.com",
    "phone": "+1 (890) 446-2596",
    "address": "146 Losee Terrace",
    "city": "Bannock",
    "state": "Kentucky",
    "zip": 4783
  },
  {
    "id": "5dae35c0d69a692f7678e97b",
    "isActive": false,
    "picture": "http://placehold.it/200x200",
    "name": "Annmarie Giles",
    "email": "annmariegiles@portaline.com",
    "phone": "+1 (878) 535-2762",
    "address": "310 Evergreen Avenue",
    "city": "Biehle",
    "state": "Arizona",
    "zip": 5564
  },
  {
    "id": "5dae35c0aed14623132552c6",
    "isActive": false,
    "picture": "http://placehold.it/200x200",
    "name": "Tina Santana",
    "email": "tinasantana@portaline.com",
    "phone": "+1 (948) 540-2428",
    "address": "909 Hale Avenue",
    "city": "Disautel",
    "state": "Arkansas",
    "zip": 4219
  },
  {
    "id": "5dae35c0b57bb037b0100b94",
    "isActive": false,
    "picture": "http://placehold.it/200x200",
    "name": "Lynn Sykes",
    "email": "lynnsykes@portaline.com",
    "phone": "+1 (932) 468-3455",
    "address": "191 Catherine Street",
    "city": "Brewster",
    "state": "Virginia",
    "zip": 8116
  },
  {
    "id": "5dae35c094077fcda3b39233",
    "isActive": true,
    "picture": "http://placehold.it/200x200",
    "name": "Estes Witt",
    "email": "esteswitt@portaline.com",
    "phone": "+1 (971) 578-3558",
    "address": "214 Coleridge Street",
    "city": "Silkworth",
    "state": "Michigan",
    "zip": 8108
  }
];

let creds = {
  role : 'admin',
  name : '',
  picture: '',
  email: '',
  token: ''
}


export { events, widgetEvents, dataTable, creds };

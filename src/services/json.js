const board = {
  _id: "b101",
  title: "Board Title",
  createdAt: 154514,
  byMember: {
    id: "m101",
    fullname: "Shiran Abir",
    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png",
  },
  labels: [{ title: 'Presentation', color: '#9aadbb', id: 'l101' }, { title: 'Meeting', color: '#0086c0', id: 'l102' }, { title: 'With Team', color: '#9d99b9', id: 'l103' }, { title: '', color: '#d1d1d1', id: 'lDefault' }],
  status: [{ title: 'Done', color: '#00c876', id: 's101' }, { title: 'Working on it', color: '#fdab3d', id: 's102' }, { title: 'Stuck', color: '#e2445c', id: 's103' }, { title: '', color: '#d1d1d1', id: 'sDefault' }],
  priority: [{ title: 'Critical', color: '#333333', id: 'p101' }, { title: 'High', color: '#401694', id: 'p102' }, { title: 'Medium', color: '#5559df', id: 'p103' }, { title: 'Low', color: '#579bfc', id: 'p104' }, { title: '', color: '#d1d1d1', id: 'pDefault' }],
  members: [
    {
      id: "m101",
      name: "Shiran Abir",
      email: "shiran@gmail.com",
      isAdmin: false,
      joinedAt: 1658291514565,
      lastSeen: 1658291514565,
      imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512",
      color: "#f5f5f5"
    },
    {
      id: "m102",
      name: "Meital Twito",
      email: "Meital@gmail.com",
      isAdmin: true,
      joinedAt: 1658291514565,
      lastSeen: 1658291514565,
      imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512",
      color: "#f5f5f5"
    },
    {
      id: "m103",
      name: "Nachum Yosef",
      email: "Nachum@gmail.com",
      isAdmin: false,
      joinedAt: 1658291514565,
      lastSeen: 1658291514565,
      imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U03CGDCUXPA-307cccdf69f0-512",
      color: "#f5f5f5"
    },
    {
      id: "m104",
      name: "Tal Amit",
      email: "Tal@gmail.com",
      isAdmin: false,
      joinedAt: 1658291514565,
      lastSeen: 1658291514565,
      imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U03D7GH63TL-f539888b0745-512",
      color: "#f5f5f5"
    }
  ],
  colsOrder: [
    { title: "Item", type: "item" },
    { title: "Text", type: "textCmp" },
    { title: "date", type: "date" },
    { title: "status", type: "status" },
    { title: "person", type: "person" },
    { title: "label", type: "labelCmp" },
    { title: "priority", type: "priority" },
    { title: "location", type: "location" },
    { title: "creation log", type: "creationLog" },
  ],
  groups: [
    {
      id: "group_101",
      title: "Service tasks",
      color: "#fb642e",
      tasks: [
        {
          id: "t101",
          groupId: "group_101",
          isDone: true,
          cols: [
            {
              type: "item",
              value: "Create repository"
            },
            {
              type: "person",
              value: [
                {
                  id: "m102",
                  fullname: "Meital Twito",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512"
                },
              ]
            },
            {
              type: "textCmp",
              value: "Open new repo in GitHub",
            },
            {
              type: "status",
              value: "s101",
            },
            {
              type: "priority",
              value: "p101",
            },
            {
              type: "date",
              value: 1658993111000,
            },
            {
              type: "creationLog",
              value: 1658486565000,
            },
            {
              type: "location",
              value: "https://goo.gl/maps/J6Fj9Wq9MQvSuAQF8",
            },
            {
              type: "labelCmp",
              value: 'l101',
            },
          ],
          conversation: [
            {
              startingMsg: {
                by: {
                  id: "m102",
                  fullname: "Meital Twito",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512"
                },
                at: 1658982115257,
                content: 'Please start this task'
              },
              id: c101,
              replies: [{
                by: {
                  id: "m103",
                  fullname: "Nachum Yosef",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U03CGDCUXPA-307cccdf69f0-512"
                },
                at: 1658982115257,
                content: 'Ok'
              },]
            },
          ]
        },
        {
          id: "t102",
          groupId: "group_101",
          isDone: true,
          cols: [
            {
              type: "item",
              value: "Fix the Css"
            },
            {
              type: "person",
              value: [
                {
                  id: "m101",
                  fullname: "Shiran Abir",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512"
                },
                {
                  id: "m102",
                  fullname: "Meital Twito",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512"
                }
              ]
            },
            {
              type: "textCmp",
              value: "Add border radius",
            },
            {
              type: "status",
              value: "s101",
            },
            {
              type: "priority",
              value: "p102",
            },
            {
              type: "date",
              value: 1659079511000,
            },
            {
              type: "creationLog",
              value: 1657881765000,
            },
            {
              type: "location",
              value: "https://goo.gl/maps/J6Fj9Wq9MQvSuAQF8",
            },
            {
              type: "labelCmp",
              value: 'l101',
            },
          ]
        },
      ]

    },
    {
      id: "group_102",
      title: "UI tasks",
      color: "#a25ddc",
      tasks: [
        {
          id: "t121",
          groupId: "group_102",
          isDone: false,
          cols: [
            {
              type: "item",
              value: "Create new board"
            },
            {
              type: "person",
              value: [
                {
                  id: "m102",
                  fullname: "Meital Twito",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512"
                },
                {
                  id: "m103",
                  fullname: "Nachum Yosef",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U03CGDCUXPA-307cccdf69f0-512"
                }
              ]
            },
            {
              type: "textCmp",
              value: "Support new board",
            },
            {
              type: "status",
              value: "s103",
            },
            {
              type: "priority",
              value: "p104",
            },
            {
              type: "date",
              value: 1658291514565,
            },
            {
              type: "creationLog",
              value: 1652352165000,
            },
            {
              type: "location",
              value: "https://goo.gl/maps/J6Fj9Wq9MQvSuAQF8",
            },
            {
              type: "labelCmp",
              value: 'l102',
            },
          ]
        },
        {
          id: "t122",
          groupId: "group_102",
          isDone: false,
          cols: [
            {
              type: "item",
              value: "Suppore chat"
            },
            {
              type: "person",
              value: [
                {
                  id: "m101",
                  fullname: "Shiran Abir",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512"
                },
                {
                  id: "m102",
                  fullname: "Meital Twito",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512"
                }
              ]
            },
            {
              type: "textCmp",
              value: "Add border radius",
            },
            {
              type: "status",
              value: "s103",
            },
            {
              type: "priority",
              value: "p104",
            },
            {
              type: "date",
              value: 1659165911000,
            },
            {
              type: "creationLog",
              value: 1659177765000,
            },
            {
              type: "location",
              value: "https://goo.gl/maps/J6Fj9Wq9MQvSuAQF8",
            },
            {
              type: "labelCmp",
              value: 'l103',
            },
          ]
        },
        {
          id: "t123",
          groupId: "group_102",
          isDone: false,
          cols: [
            {
              type: "item",
              value: "Create full crud"
            },
            {
              type: "person",
              value: [
                {
                  id: "m101",
                  fullname: "Shiran Abir",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512"
                },
                {
                  id: "m102",
                  fullname: "Meital Twito",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512"
                },
                {
                  id: "m103",
                  fullname: "Nachum Yosef",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U03CGDCUXPA-307cccdf69f0-512"
                }
              ]
            },
            {
              type: "textCmp",
              value: "Somthing Smart to say",
            },
            {
              type: "status",
              value: "s102",
            },
            {
              type: "priority",
              value: "p101",
            },
            {
              type: "date",
              value: 1658042711000,
            },
            {
              type: "creationLog",
              value: 1658291514565,
            },
            {
              type: "location",
              value: "https://goo.gl/maps/J6Fj9Wq9MQvSuAQF8",
            },
            {
              type: "labelCmp",
              value: 'l102',
            },
          ]
        },
      ],
    },
    {
      id: "group_103",
      title: "Improve UI",
      color: "#3ac874",
      tasks: [
        {
          id: "t104",
          groupId: "group_103",
          isDone: true,
          cols: [
            {
              type: "item",
              value: "Get icons"
            },
            {
              type: "person",
              value: [
                {
                  id: "m101",
                  fullname: "Shiran Abir",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512"
                },
                {
                  id: "m102",
                  fullname: "Meital Twito",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512"
                },
                {
                  id: "m103",
                  fullname: "Nachum Yosef",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U03CGDCUXPA-307cccdf69f0-512"
                },
                {
                  id: "m104",
                  fullname: "Tal Amit",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U03D7GH63TL-f539888b0745-512"
                }
              ]
            },
            {
              type: "textCmp",
              value: "Find the icons",
            },
            {
              type: "status",
              value: "s101",
            },
            {
              type: "priority",
              value: "p102",
            },
            {
              type: "date",
              value: 1659338711000,
            },
            {
              type: "creationLog",
              value: 1656585765000,
            },
            {
              type: "location",
              value: "https://goo.gl/maps/J6Fj9Wq9MQvSuAQF8",
            },
            {
              type: "labelCmp",
              value: 'l103',
            },
          ]
        },
        {
          id: "t105",
          groupId: "group_103",
          isDone: false,
          cols: [
            {
              type: "item",
              value: "Fix Scss"
            },
            {
              type: "person",
              value: [
                {
                  id: "m102",
                  fullname: "Meital Twito",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512"
                },
                {
                  id: "m104",
                  fullname: "Tal Amit",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U03D7GH63TL-f539888b0745-512"
                }
              ]
            },
            {
              type: "textCmp",
              value: "Add colors",
            },
            {
              type: "status",
              value: "s103",
            },
            {
              type: "priority",
              value: "p103",
            },
            {
              type: "date",
              value: 1659511511000,
            },
            {
              type: "creationLog",
              value: 1656153765000,
            },
            {
              type: "location",
              value: "https://goo.gl/maps/J6Fj9Wq9MQvSuAQF8",
            },
            {
              type: "labelCmp",
              value: 'l101',
            },
          ]
        },
      ]

    },
    {
      id: "group_104",
      title: "Work on CRUD",
      color: "#f85ac4",
      tasks: [
        {
          id: "t106",
          groupId: "group_104",
          isDone: true,
          cols: [
            {
              type: "item",
              value: "Support remove one task"
            },
            {
              type: "person",
              value: [
                {
                  id: "m101",
                  fullname: "Shiran Abir",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512"
                },
                {
                  id: "m103",
                  fullname: "Nachum Yosef",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U03CGDCUXPA-307cccdf69f0-512"
                },
                {
                  id: "m104",
                  fullname: "Tal Amit",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U03D7GH63TL-f539888b0745-512"
                }
              ]
            },
            {
              type: "textCmp",
              value: "Use store",
            },
            {
              type: "status",
              value: "s101",
            },
            {
              type: "priority",
              value: "p101",
            },
            {
              type: "date",
              value: 1658647511000,
            },
            {
              type: "creationLog",
              value: 1656153765000,
            },
            {
              type: "location",
              value: "https://goo.gl/maps/J6Fj9Wq9MQvSuAQF8",
            },
            {
              type: "labelCmp",
              value: "l102",
            },
          ]
        },
        {
          id: "t107",
          groupId: "group_104",
          isDone: false,
          cols: [
            {
              type: "item",
              value: "Connect backend"
            },
            {
              type: "person",
              value: [
                {
                  id: "m102",
                  fullname: "Meital Twito",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512"
                },
                {
                  id: "m104",
                  fullname: "Tal Amit",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U03D7GH63TL-f539888b0745-512"
                }
              ]
            },
            {
              type: "textCmp",
              value: "Connect the front to the back",
            },
            {
              type: "status",
              value: "s102",
            },
            {
              type: "priority",
              value: "p102",
            },
            {
              type: "date",
              value: 1658820311000,
            },
            {
              type: "creationLog",
              value: 1655894565000,
            },
            {
              type: "location",
              value: "https://goo.gl/maps/J6Fj9Wq9MQvSuAQF8",
            },
            {
              type: "labelCmp",
              value: 'l103',
            },
          ]
        },
        {
          id: "t108",
          groupId: "group_104",
          isDone: false,
          cols: [
            {
              type: "item",
              value: "Create sockets"
            },
            {
              type: "person",
              value: [
                {
                  id: "m102",
                  fullname: "Meital Twito",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512"
                },
                {
                  id: "m103",
                  fullname: "Nachum Yosef",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U03CGDCUXPA-307cccdf69f0-512"
                }
              ]
            },
            {
              type: "textCmp",
              value: "Connect the sockets to backend",
            },
            {
              type: "status",
              value: "s102",
            },
            {
              type: "priority",
              value: "p103",
            },
            {
              type: "date",
              value: 1658906711000,
            },
            {
              type: "creationLog",
              value: 1655721765000,
            },
            {
              type: "location",
              value: "https://goo.gl/maps/J6Fj9Wq9MQvSuAQF8",
            },
            {
              type: "labelCmp",
              value: 'l102',
            },

          ]
        },
        {
          id: "t109",
          groupId: "group_104",
          isDone: true,
          cols: [
            {
              type: "item",
              value: "Make drag and drop work!"
            },
            {
              type: "person",
              value: [
                {
                  id: "m103",
                  fullname: "Nachum Yosef",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U03CGDCUXPA-307cccdf69f0-512"
                },
                {
                  id: "m104",
                  fullname: "Tal Amit",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U03D7GH63TL-f539888b0745-512"
                }
              ]
            },
            {
              type: "textCmp",
              value: "Improve drag and drop functionality",
            },
            {
              type: "status",
              value: "s101",
            },
            {
              type: "priority",
              value: "p101",
            },
            {
              type: "date",
              value: 1662017111000,
            },
            {
              type: "creationLog",
              value: 1655635365000,
            },
            {
              type: "location",
              value: "https://goo.gl/maps/J6Fj9Wq9MQvSuAQF8",
            },
            {
              type: "labelCmp",
              value: 'l101',
            },

          ]
        },
        {
          id: "t110",
          groupId: "group_104",
          isDone: false,
          cols: [
            {
              type: "item",
              value: "Connect last components"
            },
            {
              type: "person",
              value: [
                {
                  id: "m101",
                  fullname: "Shiran Abir",
                  imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512"
                }
              ]
            },
            {
              type: "textCmp",
              value: "Make the components render the data",
            },
            {
              type: "status",
              value: "s102",
            },
            {
              type: "priority",
              value: "p101",
            },
            {
              type: "date",
              value: 1658291514565,
            },
            {
              type: "creationLog",
              value: 1658291514565,
            },
            {
              type: "location",
              value: "https://goo.gl/maps/J6Fj9Wq9MQvSuAQF8",
            },
            {
              type: "labelCmp",
              value: 'l103',
            },

          ]
        }
      ]

    }
  ]
}

// colsOrder: [
//   { title: "Item", type: "item" },
//   { title: "Text", type: "textCmp" },
//   { title: "date", type: "date" },
//   { title: "status", type: "status" },
//   { title: "person", type: "person" },
//   { title: "label", type: "labelCmp" },
//   { title: "priority", type: "priority" },
//   { title: "location", type: "location" },
//   { title: "creation log", type: "creationLog" },
// ],
const newJsonBoard = {
  "_id": {
      "$oid": "62e7c9f3d0ef9fd61a084d2a"
  },
  "title": "Marketing & BizDev",
  "createdAt": {
      "$numberInt": "154514"
  },
  "byMember": {
      "id": "m101",
      "fullname": "Shiran Abir",
      "imgUrl": "https://cdn1.monday.com/dapulse_default_photo.png"
  },
  "labels": [{
      "title": "Presentation",
      "color": "#9aadbb",
      "id": "l101"
  }, {
      "title": "Meeting",
      "color": "#0086c0",
      "id": "l102"
  }, {
      "title": "With Team",
      "color": "#9d99b9",
      "id": "l103"
  }, {
      "title": "",
      "color": "#d1d1d1",
      "id": "lDefault"
  }],
  "status": [{
      "title": "Done",
      "color": "#00c876",
      "id": "s101"
  }, {
      "title": "Working on it",
      "color": "#fdab3d",
      "id": "s102"
  }, {
      "title": "Stuck",
      "color": "#e2445c",
      "id": "s103"
  }, {
      "title": "",
      "color": "#d1d1d1",
      "id": "sDefault"
  }],
  "priority": [{
      "title": "Critical",
      "color": "#333333",
      "id": "p101"
  }, {
      "title": "High",
      "color": "#401694",
      "id": "p102"
  }, {
      "title": "Medium",
      "color": "#5559df",
      "id": "p103"
  }, {
      "title": "Low",
      "color": "#579bfc",
      "id": "p104"
  }, {
      "title": "",
      "color": "#d1d1d1",
      "id": "pDefault"
  }],
  "members": [{
      "id": "m101",
      "name": "Shiran Abir",
      "email": "shiran@gmail.com",
      "isAdmin": false,
      "joinedAt": {
          "$numberDouble": "1.6582915145650E+12"
      },
      "lastSeen": {
          "$numberDouble": "1.6582915145650E+12"
      },
      "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512",
      "color": "#f5f5f5"
  }, {
      "id": "m102",
      "name": "Meital Twito",
      "email": "Meital@gmail.com",
      "isAdmin": true,
      "joinedAt": {
          "$numberDouble": "1.6582915145650E+12"
      },
      "lastSeen": {
          "$numberDouble": "1.6582915145650E+12"
      },
      "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512",
      "color": "#f5f5f5"
  }, {
      "id": "m103",
      "name": "Nachum Yosef",
      "email": "Nachum@gmail.com",
      "isAdmin": false,
      "joinedAt": {
          "$numberDouble": "1.6582915145650E+12"
      },
      "lastSeen": {
          "$numberDouble": "1.6582915145650E+12"
      },
      "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U03CGDCUXPA-307cccdf69f0-512",
      "color": "#f5f5f5"
  }, {
      "id": "m104",
      "name": "Tal Amit",
      "email": "Tal@gmail.com",
      "isAdmin": false,
      "joinedAt": {
          "$numberDouble": "1.6582915145650E+12"
      },
      "lastSeen": {
          "$numberDouble": "1.6582915145650E+12"
      },
      "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U03D7GH63TL-f539888b0745-512",
      "color": "#f5f5f5"
  }],
  "colsOrder": [{
      "title": "Item",
      "type": "item"
  }, {
      "title": "Text",
      "type": "textCmp"
  }, {
      "title": "person",
      "type": "person"
  }, {
      "title": "date",
      "type": "date"
  }, {
      "title": "label",
      "type": "labelCmp"
  }, {
      "title": "status",
      "type": "status"
  }, {
      "title": "priority",
      "type": "priority"
  }, {
      "title": "location",
      "type": "location"
  }, {
      "title": "creation log",
      "type": "creationLog"
  }],
  "groups": [{
      "title": "BizDev",
      "color": "#a25ddc",
      "tasks": [{
          "id": "HZ702",
          "cols": [{
              "type": "item",
              "value": "with Viola"
          }, {
              "type": "creationLog",
              "value": {
                  "$numberDouble": "1.6593467042740E+12"
              }
          }, {
              "type": "date",
              "value": {
                  "$numberDouble": "1.6595604000000E+12"
              }
          }, {
              "type": "person",
              "value": [{
                  "id": "m102",
                  "fullname": "Meital Twito",
                  "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512"
              }]
          }, {
              "type": "textCmp",
              "value": "Kanban Collab"
          }, {
              "type": "status",
              "value": "s102"
          }, {
              "type": "labelCmp",
              "value": "l101"
          }, {
              "type": "priority",
              "value": "p101"
          }, {
              "type": "location",
              "value": {
                  "title": "Nahalat Binyamin St",
                  "lnglat": {
                      "lat": {
                          "$numberDouble": "32.059662"
                      },
                      "lng": {
                          "$numberDouble": "34.772449"
                      }
                  }
              }
          }],
          "isDone": false,
          "createdAt": {
              "$numberDouble": "1.6593467042740E+12"
          },
          "createdBy": {
              "id": "m101",
              "name": "Shiran Abir",
              "email": "shiran@gmail.com",
              "isAdmin": false,
              "joinedAt": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "lastSeen": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512",
              "color": "#f5f5f5"
          },
          "groupId": "v0aWZ"
      }, {
          "id": "PkSu9",
          "cols": [{
              "type": "item",
              "value": "with Trello.com"
          }, {
              "type": "creationLog",
              "value": {
                  "$numberDouble": "1.6593478977730E+12"
              }
          }, {
              "type": "date",
              "value": {
                  "$numberDouble": "1.6605972000000E+12"
              }
          }, {
              "type": "person",
              "value": [{
                  "id": "m101",
                  "fullname": "Shiran Abir",
                  "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512"
              }, {
                  "id": "m104",
                  "fullname": "Tal Amit",
                  "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U03D7GH63TL-f539888b0745-512"
              }]
          }, {
              "type": "textCmp",
              "value": "Increasing Storage"
          }, {
              "type": "status",
              "value": "s101"
          }, {
              "type": "labelCmp",
              "value": "l102"
          }, {
              "type": "priority",
              "value": "p102"
          }, {
              "type": "location",
              "value": {
                  "title": "HaArba'a St",
                  "lnglat": {
                      "lat": {
                          "$numberDouble": "32.070418"
                      },
                      "lng": {
                          "$numberDouble": "34.785121"
                      }
                  }
              }
          }],
          "isDone": false,
          "createdAt": {
              "$numberDouble": "1.6593478977740E+12"
          },
          "createdBy": {
              "id": "m102",
              "name": "Meital Twito",
              "email": "Meital@gmail.com",
              "isAdmin": true,
              "joinedAt": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "lastSeen": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512",
              "color": "#f5f5f5"
          },
          "groupId": "v0aWZ"
      }],
      "id": "v0aWZ"
  }, {
      "title": "Events",
      "color": "#fb642e",
      "tasks": [{
          "id": "M167M",
          "cols": [{
              "type": "item",
              "value": "HighTech Summit in HK"
          }, {
              "type": "creationLog",
              "value": {
                  "$numberDouble": "1.6593481094380E+12"
              }
          }, {
              "type": "date",
              "value": {
                  "$numberDouble": "1.6643988000000E+12"
              }
          }, {
              "type": "person",
              "value": [{
                  "id": "m101",
                  "fullname": "Shiran Abir",
                  "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512"
              }, {
                  "id": "m102",
                  "fullname": "Meital Twito",
                  "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512"
              }, {
                  "id": "m104",
                  "fullname": "Tal Amit",
                  "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U03D7GH63TL-f539888b0745-512"
              }]
          }, {
              "type": "textCmp",
              "value": "Entering the Chinese market"
          }, {
              "type": "status",
              "value": "s102"
          }, {
              "type": "labelCmp",
              "value": "l101"
          }, {
              "type": "priority",
              "value": "p102"
          }, {
              "type": "location",
              "value": {
                  "title": "HK",
                  "lnglat": {
                      "lat": {
                          "$numberDouble": "22.3193039"
                      },
                      "lng": {
                          "$numberDouble": "114.1693611"
                      }
                  }
              }
          }],
          "isDone": false,
          "createdAt": {
              "$numberDouble": "1.6593481094380E+12"
          },
          "createdBy": {
              "id": "m101",
              "name": "Shiran Abir",
              "email": "shiran@gmail.com",
              "isAdmin": false,
              "joinedAt": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "lastSeen": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512",
              "color": "#f5f5f5"
          },
          "groupId": "WvOMK"
      }, {
          "id": "Vagbe",
          "cols": [{
              "type": "item",
              "value": "Tech 12 High-Tech Conference"
          }, {
              "type": "creationLog",
              "value": {
                  "$numberDouble": "1.6593481617050E+12"
              }
          }, {
              "type": "date",
              "value": {
                  "$numberDouble": "1.6620660000000E+12"
              }
          }, {
              "type": "person",
              "value": [{
                  "id": "m101",
                  "fullname": "Shiran Abir",
                  "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512"
              }, {
                  "id": "m102",
                  "fullname": "Meital Twito",
                  "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512"
              }]
          }, {
              "type": "textCmp",
              "value": null
          }, {
              "type": "status",
              "value": "s101"
          }, {
              "type": "labelCmp",
              "value": "l103"
          }, {
              "type": "priority",
              "value": "p103"
          }, {
              "type": "location",
              "value": {
                  "title": "Azrieli Center",
                  "lnglat": {
                      "lat": {
                          "$numberDouble": "32.0740769"
                      },
                      "lng": {
                          "$numberDouble": "34.7922028"
                      }
                  }
              }
          }],
          "isDone": false,
          "createdAt": {
              "$numberDouble": "1.6593481617050E+12"
          },
          "createdBy": {
              "id": "m102",
              "name": "Meital Twito",
              "email": "Meital@gmail.com",
              "isAdmin": true,
              "joinedAt": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "lastSeen": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512",
              "color": "#f5f5f5"
          },
          "groupId": "WvOMK"
      }, {
          "id": "9GPyh",
          "cols": [{
              "type": "item",
              "value": "Startup for Startup Podcast"
          }, {
              "type": "creationLog",
              "value": {
                  "$numberDouble": "1.6593482116770E+12"
              }
          }, {
              "type": "date",
              "value": {
                  "$numberDouble": "1.6602516000000E+12"
              }
          }, {
              "type": "person",
              "value": [{
                  "id": "m101",
                  "fullname": "Shiran Abir",
                  "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512"
              }, {
                  "id": "m102",
                  "fullname": "Meital Twito",
                  "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512"
              }]
          }, {
              "type": "textCmp",
              "value": null
          }, {
              "type": "status",
              "value": "sDefault"
          }, {
              "type": "labelCmp",
              "value": "l103"
          }, {
              "type": "priority",
              "value": "p104"
          }, {
              "type": "location",
              "value": {
                  "title": "Herzliya Pituah",
                  "lnglat": {
                      "lat": {
                          "$numberDouble": "32.174202"
                      },
                      "lng": {
                          "$numberDouble": "34.802932"
                      }
                  }
              }
          }],
          "isDone": false,
          "createdAt": {
              "$numberDouble": "1.6593482116770E+12"
          },
          "createdBy": {
              "id": "m104",
              "name": "Tal Amit",
              "email": "Tal@gmail.com",
              "isAdmin": false,
              "joinedAt": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "lastSeen": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U03D7GH63TL-f539888b0745-512",
              "color": "#f5f5f5"
          },
          "groupId": "WvOMK"
      }, {
          "id": "CRFO1",
          "cols": [{
              "type": "item",
              "value": "SheCodes Hackaton"
          }, {
              "type": "creationLog",
              "value": {
                  "$numberDouble": "1.6593482525200E+12"
              }
          }, {
              "type": "date",
              "value": {
                  "$numberDouble": "1.6618932000000E+12"
              }
          }, {
              "type": "person",
              "value": [{
                  "id": "m104",
                  "fullname": "Tal Amit",
                  "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U03D7GH63TL-f539888b0745-512"
              }]
          }, {
              "type": "textCmp",
              "value": null
          }, {
              "type": "status",
              "value": "sDefault"
          }, {
              "type": "labelCmp",
              "value": "l102"
          }, {
              "type": "priority",
              "value": "p102"
          }, {
              "type": "location",
              "value": null
          }],
          "isDone": false,
          "createdAt": {
              "$numberDouble": "1.6593482525200E+12"
          },
          "createdBy": {
              "id": "m102",
              "name": "Meital Twito",
              "email": "Meital@gmail.com",
              "isAdmin": true,
              "joinedAt": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "lastSeen": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512",
              "color": "#f5f5f5"
          },
          "groupId": "WvOMK"
      }, {
          "id": "WJ9iz",
          "cols": [{
              "type": "item",
              "value": "Coding Academy Apps&Beer"
          }, {
              "type": "creationLog",
              "value": {
                  "$numberDouble": "1.6593483483600E+12"
              }
          }, {
              "type": "date",
              "value": {
                  "$numberDouble": "1.6593876000000E+12"
              }
          }, {
              "type": "person",
              "value": [{
                  "id": "m101",
                  "fullname": "Shiran Abir",
                  "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512"
              }, {
                  "id": "m102",
                  "fullname": "Meital Twito",
                  "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512"
              }, {
                  "id": "m104",
                  "fullname": "Tal Amit",
                  "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U03D7GH63TL-f539888b0745-512"
              }]
          }, {
              "type": "textCmp",
              "value": null
          }, {
              "type": "status",
              "value": "s102"
          }, {
              "type": "labelCmp",
              "value": "l102"
          }, {
              "type": "priority",
              "value": "p102"
          }, {
              "type": "location",
              "value": null
          }],
          "isDone": false,
          "createdAt": {
              "$numberDouble": "1.6593483483600E+12"
          },
          "createdBy": {
              "id": "m104",
              "name": "Tal Amit",
              "email": "Tal@gmail.com",
              "isAdmin": false,
              "joinedAt": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "lastSeen": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U03D7GH63TL-f539888b0745-512",
              "color": "#f5f5f5"
          },
          "groupId": "WvOMK"
      }],
      "id": "WvOMK"
  }, {
      "title": "Creative",
      "tasks": [{
          "id": "efV8k",
          "cols": [{
              "type": "item",
              "value": "New logo Design"
          }, {
              "type": "creationLog",
              "value": {
                  "$numberDouble": "1.6593484941820E+12"
              }
          }, {
              "type": "date",
              "value": {
                  "$numberDouble": "1.6643124000000E+12"
              }
          }, {
              "type": "person",
              "value": [{
                  "id": "m102",
                  "fullname": "Meital Twito",
                  "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512"
              }, {
                  "id": "m104",
                  "fullname": "Tal Amit",
                  "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U03D7GH63TL-f539888b0745-512"
              }]
          }, {
              "type": "textCmp",
              "value": null
          }, {
              "type": "status",
              "value": "s102"
          }, {
              "type": "labelCmp",
              "value": "l103"
          }, {
              "type": "priority",
              "value": "p101"
          }, {
              "type": "location",
              "value": null
          }],
          "isDone": false,
          "createdAt": {
              "$numberDouble": "1.6593484941820E+12"
          },
          "createdBy": {
              "id": "m101",
              "name": "Shiran Abir",
              "email": "shiran@gmail.com",
              "isAdmin": false,
              "joinedAt": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "lastSeen": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512",
              "color": "#f5f5f5"
          },
          "groupId": "02zcN"
      }, {
          "id": "cdS34",
          "cols": [{
              "type": "item",
              "value": "Wolt collab Teaser"
          }, {
              "type": "creationLog",
              "value": {
                  "$numberDouble": "1.6593485371550E+12"
              }
          }, {
              "type": "date",
              "value": {
                  "$numberDouble": "1.6618932000000E+12"
              }
          }, {
              "type": "person",
              "value": [{
                  "id": "m102",
                  "fullname": "Meital Twito",
                  "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512"
              }, {
                  "id": "m101",
                  "fullname": "Shiran Abir",
                  "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512"
              }]
          }, {
              "type": "textCmp",
              "value": "Internal Ad"
          }, {
              "type": "status",
              "value": "s101"
          }, {
              "type": "labelCmp",
              "value": "l103"
          }, {
              "type": "priority",
              "value": "p102"
          }, {
              "type": "location",
              "value": null
          }],
          "isDone": false,
          "createdAt": {
              "$numberDouble": "1.6593485371550E+12"
          },
          "createdBy": {
              "id": "m104",
              "name": "Tal Amit",
              "email": "Tal@gmail.com",
              "isAdmin": false,
              "joinedAt": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "lastSeen": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U03D7GH63TL-f539888b0745-512",
              "color": "#f5f5f5"
          },
          "groupId": "02zcN"
      }, {
          "id": "bSJkB",
          "cols": [{
              "type": "item",
              "value": "Facebook Campaign Ad"
          }, {
              "type": "creationLog",
              "value": {
                  "$numberDouble": "1.6593485687360E+12"
              }
          }, {
              "type": "date",
              "value": {
                  "$numberDouble": "1.6616340000000E+12"
              }
          }, {
              "type": "person",
              "value": [{
                  "id": "m101",
                  "fullname": "Shiran Abir",
                  "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512"
              }]
          }, {
              "type": "textCmp",
              "value": null
          }, {
              "type": "status",
              "value": "s102"
          }, {
              "type": "labelCmp",
              "value": "l101"
          }, {
              "type": "priority",
              "value": "p102"
          }, {
              "type": "location",
              "value": {
                  "title": "Hod Hasharon",
                  "lnglat": {
                      "lat": {
                          "$numberDouble": "32.149961"
                      },
                      "lng": {
                          "$numberDouble": "34.8838788"
                      }
                  }
              }
          }],
          "isDone": false,
          "createdAt": {
              "$numberDouble": "1.6593485687360E+12"
          },
          "createdBy": {
              "id": "m101",
              "name": "Shiran Abir",
              "email": "shiran@gmail.com",
              "isAdmin": false,
              "joinedAt": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "lastSeen": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512",
              "color": "#f5f5f5"
          },
          "groupId": "02zcN"
      }, {
          "id": "9s7jt",
          "cols": [{
              "type": "item",
              "value": "Calcalist Ad"
          }, {
              "type": "creationLog",
              "value": {
                  "$numberDouble": "1.6593488422300E+12"
              }
          }, {
              "type": "date",
              "value": null
          }, {
              "type": "person",
              "value": [{
                  "id": "m104",
                  "fullname": "Tal Amit",
                  "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U03D7GH63TL-f539888b0745-512"
              }]
          }, {
              "type": "textCmp",
              "value": null
          }, {
              "type": "status",
              "value": "s103"
          }, {
              "type": "labelCmp",
              "value": "l102"
          }, {
              "type": "priority",
              "value": "p103"
          }, {
              "type": "location",
              "value": {
                  "title": "Ramat Hasharon",
                  "lnglat": {
                      "lat": {
                          "$numberDouble": "32.137793"
                      },
                      "lng": {
                          "$numberDouble": "34.840278"
                      }
                  }
              }
          }],
          "isDone": false,
          "createdAt": {
              "$numberDouble": "1.6593488422300E+12"
          },
          "createdBy": {
              "id": "m102",
              "name": "Meital Twito",
              "email": "Meital@gmail.com",
              "isAdmin": true,
              "joinedAt": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "lastSeen": {
                  "$numberDouble": "1.6582915145650E+12"
              },
              "imgUrl": "https://ca.slack-edge.com/T035GULFZRD-U035UPCBQG5-18ec439dc732-512",
              "color": "#f5f5f5"
          },
          "groupId": "02zcN"
      }],
      "id": "02zcN",
      "color": "#227f4c"
  }]
}
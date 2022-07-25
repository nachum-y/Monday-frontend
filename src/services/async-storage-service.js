export const storageService = {
  query,
  get,
  post,
  put,
  remove,
}

function query(entityType) {
  const entities = JSON.parse(localStorage.getItem(entityType)) || _createDefaultBoard(entityType)
  return Promise.resolve(entities)
}

function get(entityType, entityId) {
  return query(entityType).then((entities) => entities.find((entity) => entity._id === entityId))
}

function post(entityType, newEntity) {
  newEntity._id = _makeId()
  return query(entityType).then((entities) => {
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
  })
}

function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
  })
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === entityId)
    entities.splice(idx, 1)
    _save(entityType, entities)
  })
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
  let str = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    str += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return str
}

function _createDefaultBoard(entityType) {
  const defultBoard = [{
    _id: "b101",
    title: "Board Title",
    createdAt: 154514,
    byMember: {
      id: "m101",
      fullname: "Shiran Abir",
      imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png",
    },
    labels:[{title:'label 1', color: '#9aadbb',id:'l101'},{title:'label 2', color: '#0086c0',id:'l102'},{title:'label 3', color: '#9d99b9',id:'l103'},{title:'', color: '#d1d1d1',id:'lDefault'}],
    members: [
      {
        id: "m101",
        name: "Shiran Abir",
        email: "shiran@gmail.com",
        isAdmin: false,
        joinedAt: 1658291514565,
        lastSeen: 1658291514565,
        imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png",
        color: "#f5f5f5"
      },
      {
        id: "m102",
        name: "Meital Twito",
        email: "Meital@gmail.com",
        isAdmin: true,
        joinedAt: 1658291514565,
        lastSeen: 1658291514565,
        imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png",
        color: "#f5f5f5"
      },
      {
        id: "m103",
        name: "Nachum Yosef",
        email: "Nachum@gmail.com",
        isAdmin: false,
        joinedAt: 1658291514565,
        lastSeen: 1658291514565,
        imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png",
        color: "#f5f5f5"
      }
    ],
    colsOrder: [
      { title: "Item", type: "item" },
      { title: "Text", type: "textCmp" },
      { title: "person", type: "person" },
      { title: "priority", type: "priority" },
      { title: "status", type: "status" },
      { title: "date", type: "date" },
      { title: "creation log", type: "creationLog" },
      { title: "location", type: "location" },
      { title: "label", type: "labelCmp" }
    ],
    groups: [
      {
        id: "group_101",
        title: "Service tasks",
        color: "#fb642e",
        tasks: [
          {
            id: "t101",
            groupId:"group_101",
            cols: [
              {
                type: "item",
                value: "Create repository"
              },
              {
                type: "person",
                value: [
                  {
                    id: "m101",
                    fullname: "Shiran Abir",
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  },
                  {
                    id: "m102",
                    fullname: "Meital Twito",
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  },
                ]
              },
              {
                type: "textCmp",
                value: "Open new repo in GitHub",
              },
              {
                type: "status",
                value: "done",
                isDone: true,
              },
              {
                type: "priority",
                value: "critical",
              },
              {
                type: "date",
                value: 1658993111000,
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
                value: 'l101',
              },
            ]
          },
          {
            id: "t102",
            groupId:"group_101",
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
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  },
                  {
                    id: "m102",
                    fullname: "Meital Twito",
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  }
                ]
              },
              {
                type: "textCmp",
                value: "Add border radius",
              },
              {
                type: "status",
                value: "done",
                isDone: true,
              },
              {
                type: "priority",
                value: "high",
              },
              {
                type: "date",
                value: 1659079511000,
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
            groupId : "group_102",
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
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  },
                  {
                    id: "m103",
                    fullname: "Nachum Yosef",
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  }
                ]
              },
              {
                type: "textCmp",
                value: "Support new board",
              },
              {
                type: "status",
                value: "stuck",
                isDone: false,
              },
              {
                type: "priority",
                value: "low",
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
                value: 'l102',
              },
            ]
          },
          {
            id: "t122",
            groupId : "group_102",
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
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  },
                  {
                    id: "m102",
                    fullname: "Meital Twito",
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  }
                ]
              },
              {
                type: "textCmp",
                value: "Add border radius",
              },
              {
                type: "status",
                value: "stuck",
                isDone: false,
              },
              {
                type: "priority",
                value: "low",
              },
              {
                type: "date",
                value: 1659165911000,
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
          },
          {
            id: "t123",
            groupId:"group_102",
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
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  },
                  {
                    id: "m102",
                    fullname: "Meital Twito",
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  },
                  {
                    id: "m103",
                    fullname: "Nachum Yosef",
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  }
                ]
              },
              {
                type: "textCmp",
                value: "Somthing Smart to say",
              },
              {
                type: "status",
                value: "working on it",
                isDone: false,
              },
              {
                type: "priority",
                value: "critical",
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
            groupId:"group_103",
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
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  },
                  {
                    id: "m102",
                    fullname: "Meital Twito",
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  },
                  {
                    id: "m103",
                    fullname: "Nachum Yosef",
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  }
                ]
              },
              {
                type: "textCmp",
                value: "Find the icons",
              },
              {
                type: "status",
                value: "done",
                isDone: false,
              },
              {
                type: "priority",
                value: "high",
              },
              {
                type: "date",
                value: 1659338711000,
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
          },
          {
            id: "t105",
            groupId:"group_103",
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
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  }
                ]
              },
              {
                type: "textCmp",
                value: "Add colors",
              },
              {
                type: "status",
                value: "stuck",
                isDone: false,
              },
              {
                type: "priority",
                value: "medium",
              },
              {
                type: "date",
                value: 1659511511000,
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
            groupId:"group_104",
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
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  },
                  {
                    id: "m103",
                    fullname: "Nachum Yosef",
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  }
                ]
              },
              {
                type: "textCmp",
                value: "Use store",
              },
              {
                type: "status",
                value: "done",
                isDone: true,
              },
              {
                type: "priority",
                value: "critical",
              },
              {
                type: "date",
                value: 1658647511000,
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
          {
            id: "t107",
            groupId:"group_104",
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
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  }
                ]
              },
              {
                type: "textCmp",
                value: "Connect the front to the back",
              },
              {
                type: "status",
                value: "working on it",
                isDone: false,
              },
              {
                type: "priority",
                value: "high",
              },
              {
                type: "date",
                value: 1658820311000,
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
          },
          {
            id: "t108",
            groupId:"group_104",
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
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  },
                  {
                    id: "m103",
                    fullname: "Nachum Yosef",
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  }
                ]
              },
              {
                type: "textCmp",
                value: "Connect the sockets to backend",
              },
              {
                type: "status",
                value: "working on it",
                isDone: false,
              },
              {
                type: "priority",
                value: "medium",
              },
              {
                type: "date",
                value: 1658906711000,
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
          {
            id: "t109",
            groupId:"group_104",
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
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  }
                ]
              },
              {
                type: "textCmp",
                value: "Improve drag and drop functionality",
              },
              {
                type: "status",
                value: "done",
                isDone: true,
              },
              {
                type: "priority",
                value: "critical",
              },
              {
                type: "date",
                value: 1662017111000,
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
                value: 'l101',
              },
              
            ]
          },
          {
            id: "t110",
            groupId:"group_104",
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
                    imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                  }
                ]
              },
              {
                type: "textCmp",
                value: "Make the components render the data",
              },
              {
                type: "status",
                value: "working on it",
                isDone: false,
              },
              {
                type: "priority",
                value: "critical",
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
  }]

  _save(entityType, defultBoard)
  return defultBoard
}

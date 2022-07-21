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
      imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
    },
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
      { title: "Item", type: "Item" },
      { title: "Text", type: "Text" },
      { title: "person", type: "person" },
      { title: "priority", type: "priority" },
      { title: "status", type: "status" },
      { title: "date", type: "date" },
      { title: "creation log", type: "creationLog" },
      { title: "location", type: "location" },
      { title: "label", type: "label" }
    ],
    groups: [
      {
        id: "group_101",
        title: "Open Tasks",
        color: "blue",
        tasks: [
          {
            id: "t101",
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
                type: "text",
                value: "Somthing Smart to say",
              },
              {
                type: "status",
                value: "Working on it",
                isDone: false,
              },
              {
                type: "priority",
                value: "Critical",
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
                type: "label",
                value: { title: "Services", color: "#f5f5f5" },
              },
            ]
          },
          {
            id: "t102",
            cols: [
              {
                type: "item",
                value: "Fix Css"
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
                type: "text",
                value: "Add border radius",
              },
              {
                type: "status",
                value: "done",
                isDone: true,
              },
              {
                type: "priority",
                value: "High",
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
                type: "label",
                value: { title: "Services", color: "#f5f5f5" },
              },
            ]
          },
        ]

      },
      {
        id: "group_102",
        title: "Open Tasks",
        color: "blue",
        tasks: [
          {
            id: "t101",
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
                type: "text",
                value: "Somthing Smart to say",
              },
              {
                type: "status",
                value: "Working on it",
                isDone: false,
              },
              {
                type: "priority",
                value: "Critical",
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
                type: "label",
                value: { title: "Services", color: "#f5f5f5" },
              },
            ]
          },
          {
            id: "t102",
            cols: [
              {
                type: "item",
                value: "Fix Css"
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
                type: "text",
                value: "Add border radius",
              },
              {
                type: "status",
                value: "done",
                isDone: true,
              },
              {
                type: "priority",
                value: "High",
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
                type: "label",
                value: { title: "Services", color: "#f5f5f5" },
              },
            ]
          },
        ]

      }
    ]
  }]

  _save(entityType, defultBoard)
  return defultBoard
}

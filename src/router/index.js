import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue'
import boardApp from '../views/board-app.vue'
import openTask from '../components/board/open-task.cmp.vue'
import kanbanView from '../views/kanban-view.vue'
import groupList from '../components/board/group-list.cmp.vue'
import cardView from '../views/card-view.vue'
import map from '../views/map.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/boards/:boardId',
      name: 'boards',
      component: boardApp,
      children: [
        {
          name: 'mainTable',
          path: '',
          component: groupList,
          children: [
            {
              name: 'openTask',
              path: 'task/:taskId',
              component: openTask,
            },
          ]
        },
        {
          name: 'kanban',
          path: 'kanban',
          component: kanbanView,
        },
        {
          name: 'card',
          path: 'card',
          component: cardView,
        },
      ]
    },
    {
      path: '/my_inbox',
      name: ' myInbox',
      // component: myInbox
    },
    {
      path: '/activity_log',
      name: ' activityLog',
      // component: activityLog
    },
    {
      path: '/map',
      name: 'map',
      component: map
    },

  ]
})

export default router

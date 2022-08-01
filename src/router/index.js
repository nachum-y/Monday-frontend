import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue'
import boardApp from '../views/board-app.vue'
import openTask from '../components/board/open-task.cmp.vue'
import kanbanView from '../views/kanban-view.vue'
import groupList from '../components/board/group-list.cmp.vue'
import cardView from '../views/card-view.vue'
import dashboardView from '../views/dashboard-view.vue'
import map from '../views/map.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homePage',
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
          path: 'map',
          name: 'map',
          component: map
        },
        {
          name: 'card',
          path: 'card',
          component: cardView,
        },
        {
          name: 'dashboard',
          path: 'dashboard',
          component: dashboardView,
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

  ]
})

export default router

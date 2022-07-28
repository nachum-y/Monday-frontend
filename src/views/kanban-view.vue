<template>

  <div class="kanbn-view">
    <div class="kanbn-view-border"></div>
    <div class="kanban-view-content">
      <div class="kanban-list-component" v-for="(s, idx) in tasksByStatus" :key="idx">
        <div :style="{ backgroundColor: s.color }" class="kanban-list-component-header"> <span
            class="kanban-list-component-header-title">{{ statusTitle(s.title) }}</span></div>
        <div class="kanban-list-component-inn">
          <div class="color-indicator" :style="{ backgroundColor: s.color }"></div>
          <div class="card-holder">
            <div class="card" v-for="(task, idx) in s.tasks" :key="idx">
              <div class="card-title">{{ task.cols[0].value }}</div>
              <div class="card-data">
                <div v-show="colsToDisplay.includes(col.type)" class="card-data-item" v-for="(col, idx) in task.cols"
                  :key="idx">
                  <div class="card-data-item-col-icon" :class="col.type"> </div>
                  <div class="card-data-item-col-title">
                    {{ col.type }}
                  </div>
                  <div class="card-data-item-col-content">
                    <component :is="col.type" :task="col" :row="task" :labels="labels" :status="status"
                      :priority="priority" :boardMembers="boardMembers">
                    </component>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="kanbn-view-menu">
            <div class="kanbn-view-menu-settings">
              <div class="kanbn-view-menu-settings-title">Customize View</div>
              <div v-for="(col, index) in allCols" :key="index" @click="toggleView(col)">{{ col }}</div>
            </div>

          </div>

        </div>
      </div>
</template>
<script>
import person from '../components/board/board-col/person.cmp.vue'
import date from '../components/board/board-col/date.cmp.vue'
import priority from '../components/board/board-col/priority.cmp.vue'
import labelCmp from '../components/board/board-col/label.cmp.vue'
import creationLog from '../components/board/board-col/creationLog.cmp.vue'
import textCmp from '../components/board/board-col/text.cmp.vue'
import location from '../components/board/board-col/location.cmp.vue'
import status from '../components/board/board-col/status.cmp.vue'
import { ref } from 'vue'
export default {

    data() {
        return {
            tasksByStatus: null,
            colsToDisplay: ['person','priority','labelCmp','creationLog','date', 'textCmp', 'location', 'status'],
            labels: null,
            status: null,
            priority: null,
            boardMembers: null,
            isShown: '',
            board: null,
            allCols: ['person','priority','labelCmp','creationLog','date', 'textCmp', 'location','status'],

    }
  },

  created() {
    this.tasksByStatus = this.$store.getters.getTasksByStatus
    this.boardMembers = this.$store.getters.getMembers
    this.labels = this.$store.getters.getLabels
    this.status = this.$store.getters.getStatus
    this.priority = this.$store.getters.getPriority
    this.board = this.$store.getters.board
  },
  methods: {
    statusTitle(title) {
      if (!title) return 'Default'
      return title
    },
    toggleView(col) {
      if (this.colsToDisplay.includes(col)) {
        const idx = this.colsToDisplay.findIndex(c => c === col)
        this.colsToDisplay.splice(idx, 1)
      } else {
        this.colsToDisplay.push(col)
      }
    }

  },
  components: {
    person,
    date,
    priority,
    labelCmp,
    creationLog,
    textCmp,
    location,
<<<<<<< HEAD
  },
=======
    status
},
>>>>>>> 0c76c2501de29916a5edbdf971c2d5e542c4cc36
}
</script>
<style>
</style>
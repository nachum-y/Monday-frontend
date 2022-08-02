<template>
  <div class="kanbn-view" v-if="tasksByStatus">
    <div class="kanbn-view-border"></div>
    <draggable class=" kanban-view-content " v-model="tasksByStatus" :handle="'.handle'" tag="div"
      :item-key="key => key" :dragClass="'drag-kanban'" :ghostClass="'ghost-kanban'">
      <template #item="{ element }">
        <div class="kanban-list-component">
          <div :style="{ backgroundColor: element.color }" class="kanban-list-component-header handle"> <span
              class="kanban-list-component-header-title">{{ statusTitle(element.title) }}</span></div>
          <div class="kanban-list-component-inn">
            <div class="color-indicator" :style="{ backgroundColor: element.color }"></div>
            <div class="card-holder">
              <kanban-card :taskList="element.tasks" :labels="labels" :status="status" :priority="priority"
                :boardMembers="boardMembers" :typeView="typeView" :labelId="element.id" :colsToDisplay="colsToDisplay"
                @updateTask="updateTask" />
            </div>
            <div class="kanban-list-component-add-item">
              <input class="kanban-list-component-add-item-input" placeholder="+Add Item">
            </div>
          </div>
        </div>
      </template>
    </draggable>
    <div class="kanbn-view-menu">
      <div class="kanbn-view-menu-settings">
        <div class="kanbn-view-menu-settings-title">Customize View</div>
        <div class="kanbn-view-menu-settings-title-secondary">Kanban Column</div>

         <el-select v-model="selectedView" @change="changeKnabanView(selectedView)" class="m-2" placeholder="Select" size="large">
            <el-option v-for="view in kanbanViews" :key="view" :value="view">{{ view }}</el-option>
         </el-select>
        <div class="kanbn-view-menu-settings-title-secondary">Card Columns</div>
        <div class="kanbn-view-menu-settings-item" v-for="(col, index) in allCols" :key="index" @click="toggleView(col)">
          <div :class="colsToDisplay.includes(col) ? 'checkbox-selected' : 'checkbox'"></div>
          <span>{{colTitle(col)}}</span>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import kanbanCard from '../components/board/kanban/kanban-card.cmp.vue'
import person from '../components/board/board-col/person.cmp.vue'
import date from '../components/board/board-col/date.cmp.vue'
import priority from '../components/board/board-col/priority.cmp.vue'
import labelCmp from '../components/board/board-col/label.cmp.vue'
import creationLog from '../components/board/board-col/creationLog.cmp.vue'
import textCmp from '../components/board/board-col/text.cmp.vue'
import location from '../components/board/board-col/location.cmp.vue'
import status from '../components/board/board-col/status.cmp.vue'
export default {

  data() {
    return {
      tasksByStatus: this.$store.getters.getTasksByStatus,
      colsToDisplay: ['person', 'date', 'status'],
      labels: null,
      kanbanViews: ['priority', 'labels', 'status'],
      selectedView: '',
      status: null,
      priority: null,
      boardMembers: null,
      isShown: '',
      board: null,
      allCols: ['person', 'priority', 'labelCmp', 'creationLog', 'date', 'textCmp', 'location', 'status'],
      typeView: 'status'

    }
  },

  created() {
    // this.tasksByStatus = this.$store.getters.getTasksByStatus
    this.boardMembers = this.$store.getters.getMembers
    this.labels = this.$store.getters.getLabels
    this.status = this.$store.getters.getStatus
    this.priority = this.$store.getters.getPriority
    this.board = this.$store.getters.board
  },
  methods: {
    colTitle(ColType){
        let titleToDisplay = ColType
        switch (ColType) {
          case 'creationLog':
            titleToDisplay = 'creation Log'
            break;
          case 'labelCmp':
            titleToDisplay = 'labels'
            break;
          case 'textCmp':
            titleToDisplay = 'text'
          break;
          default:
            break;
        }
        return titleToDisplay
    },
    statusTitle(title) {
      if (!title) return 'Defualt'
      return title
    },
    toggleView(col) {
      if (this.colsToDisplay.includes(col)) {
        const idx = this.colsToDisplay.findIndex(c => c === col)
        this.colsToDisplay.splice(idx, 1)
      } else {
        this.colsToDisplay.push(col)
      }
    },
    move(ev) {
      console.log(ev)
    },
    async updateTask(data) {
      try {
        await this.$store.dispatch({ type: 'updateTask', data })
        this.tasksByStatus = this.$store.getters.getTasksByStatus
        // socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')
      }
      catch (error) {
        console.log(error)
      }
    },
    changeKnabanView(view) {
      console.log(view)
      this.typeView = view
      if (view === 'labels') this.typeView = 'labelCmp'
      this.$store.commit({ type: 'setKanbanStatus', view })
      this.tasksByStatus = this.$store.getters.getTasksByStatus
    },
  },
  components: {
    draggable,
    person,
    date,
    priority,
    labelCmp,
    creationLog,
    textCmp,
    location,
    status,
    kanbanCard
  },
}
</script>
<style>




</style>
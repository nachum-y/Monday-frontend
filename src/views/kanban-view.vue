<template>
<div class="kanbn-view" v-if="tasksByStatus">
<div class="kanbn-view-border"></div>
<div class="kanban-view-content">
            <div class="kanban-list-component"  v-for="(s, idx) in tasksByStatus" :key="idx">
                <div :style="{backgroundColor: s.color}" class="kanban-list-component-header"> <span class="kanban-list-component-header-title">{{statusTitle(s.title)}}</span></div>
                <div class="kanban-list-component-inn"> 
                  <div class="color-indicator" :style="{backgroundColor: s.color}"></div>
                  <div class="card-holder">
                    <div class="card" v-for="(task, idx) in s.tasks" :key="idx">
                      <div class="card-title">{{task.cols[0].value}}</div>
                      <div class="card-data">
                        <div v-show="colsToDisplay.includes(col.type)" class="card-data-item" v-for="(col, idx) in task.cols" :key="idx" >
                          <div class="card-data-item-col-icon" :class="col.type"> </div> 
                            <div class="card-data-item-col-title">
                              {{col.type}}
                            </div>
                            <div class="card-data-item-col-content">
                                <component @updateTask="updateTask" :is="col.type" :task="col"
                                :row="task" :labels="labels"
                                :status="status" :priority="priority" :boardMembers="boardMembers">
                                </component>
                            </div>                 
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="kanban-list-component-add-item"> 
                    <input class="kanban-list-component-add-item-input" placeholder="+Add Item">
                  </div>
                </div>
            </div>
</div>
<div class="kanbn-view-menu">
  <div class="kanbn-view-menu-settings">
    <div class="kanbn-view-menu-settings-title">Customize View</div>
    <div v-for="(col, index) in allCols" :key="index" @click="toggleView(col)">{{col}}</div>
    <div @click="changeKnabanView(view)" v-for="view in kanbanViews" :key="view">{{view}}</div>
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
            tasksByStatus: this.$store.getters.getTasksByStatus,
            colsToDisplay: ['person','priority','labelCmp','creationLog','date', 'textCmp', 'location', 'status'],
            labels: null,
            kanbanViews: ['priority','labels','status'],
            status: null, 
            priority: null, 
            boardMembers: null,
            isShown: '',
            board: null,
            allCols: ['person','priority','labelCmp','creationLog','date', 'textCmp', 'location','status'],

        }
    },

created(){
    // this.tasksByStatus = this.$store.getters.getTasksByStatus
    this.boardMembers = this.$store.getters.getMembers
    this.labels = this.$store.getters.getLabels
    this.status = this.$store.getters.getStatus
    this.priority = this.$store.getters.getPriority
    this.board = this.$store.getters.board
},
methods:{
    statusTitle(title){
        if(!title) return 'Defualt'
        return title
    },
    toggleView(col){
      if(this.colsToDisplay.includes(col)){
        const idx = this.colsToDisplay.findIndex(c => c === col)
        this.colsToDisplay.splice(idx,1)
      }else{
        this.colsToDisplay.push(col)
      }
    },
    async updateTask(data){
      try{
        await this.$store.dispatch({ type: 'updateTask', data })
        this.tasksByStatus = this.$store.getters.getTasksByStatus
        // socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')
      }
      catch(error){
        console.log(error);
      }
    },
     changeKnabanView(view){
      this.$store.commit({ type: 'setKanbanStatus', view })
      this.tasksByStatus = this.$store.getters.getTasksByStatus
    },
},
components:{
    person,
    date,
    priority,
    labelCmp,
    creationLog,
    textCmp,
    location,
    status
},
}
</script>
<style>
</style>
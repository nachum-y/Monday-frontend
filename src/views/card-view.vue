<template>
  <div class="card-container" v-if="board">
        <div class="cards-holder">
            <div class="task-card" v-for="task in getTasks" :key="task.id">     
                <div class="person-img-holder">
                    <img class="card-img" :src="task.createdBy.imgUrl" alt="">
                </div>
                <div class="card-view-header">
                    <div class="card-view-title">
                        <span class="card-span">
                            {{task.cols[0].value}}
                        </span>
                    </div>
                    <div class="conversation-icon-holder">
                        <div class="conversation-icon"></div>
                    </div>
                </div>
                <div class="card-view-data">
                    <div class="cell-wrapper">
                        <div class="person-title data-title">
                            <div class="card-icon-holder">
                                <div class="person-icon-card"></div>
                            </div>
                        <span class="item-title-text">Person</span> 
                        </div>
                        <div class="card-members-container">
                            <div class="person-holder data-item">
                                <img v-for="member in taskMembers(task)" :key="member.id" class="person-card-bullet" :src="member.imgUrl">
                            </div>  
                        </div>
                    </div>
                    <div class="cell-wrapper">
                        <div class="status-title data-title">
                            <div class="card-icon-holder">
                                <div class="status-icon-card"></div>
                            </div>
                            <span class="item-title-text">Status</span>
                        </div>
                        <div :style="{ backgroundColor: taskStatus(task).color}" class="status-holder data-item">{{taskStatus(task).title}}</div>     
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data()
    {
        return{
            board: null,
        }
    },

    created(){
        this.board = this.$store.getters.board
    },
    computed:{
        getTasks(){
            let tasks =  this.board.groups.map(group=>{
                return group.tasks.map(task => task)
            })
            tasks = tasks.flat()
            return tasks
        },
    },
    methods:{
        taskStatus(task){
            const col =  task.cols.find(col=>{
                return col.type === 'status'
            })
            const statusData = this.board.status
            return statusData.find(status=>{
                return status.id === col.value
            })
        },
        taskMembers(task){
            const defaultImg = 'https://cdn.monday.com/icons/dapulse-person-column.svg'
            const person = task.cols.find(col=> col.type === 'person')
            if (!person.value || person.value.length === 0) return [{imgUrl:defaultImg}]
            return person.value
        },
    },

}
</script>

<style>

</style>
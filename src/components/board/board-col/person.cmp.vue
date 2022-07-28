<template>

    <div ref="personCmpRef" :class="'task-' + task.type" class="person-cell">
        <div @click="showPersonMenu($event)" style="width: 100%;" class="task-person">
            <div class="icon-dapulse-addbtn"></div>
            <div class="bullets-container">
                <div v-for="(person, idx) in task.value" :key="person.id" class="person-bullet">
                    <img :src="userAvatar(idx)" />
                </div>
            </div>
            <div v-if="!task.value" class="person-bullet-container">
                <img src="https://cdn.monday.com/icons/dapulse-person-column.svg" class="person-bullet-default">
            </div>
        </div>
        <person-selection-menu @selectPerson="selectPerson" :taskMembers="taskMembers" v-click-outside="closeActionsModal" v-if="showPersonMenuOption"
            :person="showPersonMenuOption.person" :pos="showPersonMenuOption.posModal"
            :boardMembers="boardMembers"></person-selection-menu>
    </div>

</template>
<script>
import personSelectionMenu from '../menus/person-selection-menu.cmp.vue'
export default {
    emits: ['updateTask'],
    name: ['person'],
    props: {
        task: Object,
        boardMembers: Array,
        row: Object,
    },
    data() {
        return {
            showPersonMenuOption: null,
            showPersonMenuOptionLeft: 0,
            taskMembers: []
        }
    },
    methods: {
        personToDisplay(idx) {
            if (!this.task.value) return ''
            let names = this.task.value[idx].fullname.split(" ")
            let personShort = names[0].slice(0, 1) + names[1].slice(0, 1)
            return personShort
        },
        userAvatar(idx) {
            return this.task.value[idx].imgUrl
        },
        showPersonMenu(el, person) {
            this.showPersonMenuOption = {}
            // this.showPersonMenuOption.person = person
            var rect = this.$refs.personCmpRef.getBoundingClientRect()
            this.showPersonMenuOption.posModal = { eltop: el.layerY, left: this.showPersonMenuOptionLeft, rect }
        },
        closeActionsModal() {
            this.showPersonMenuOption = null
        },
        selectPerson(memberToAdd) {
            let updatedTaskMembers = JSON.parse(JSON.stringify(this.task.value))
            updatedTaskMembers.push(memberToAdd)
            let newCol = { type: this.task.type, value: updatedTaskMembers }
            let newData = { newCol, taskId: this.row.id, groupId: this.row.groupId }
            this.taskMembers = updatedTaskMembers.map(person=>person.id)
            // this.$emit('updateTask', newData)

        },
    },
    computed: {
    },
    components: {
        personSelectionMenu,
    },
    created(){
        if(!this.task.value){
        this.taskMembers = []
        }else{
            this.taskMembers = this.task.value.map(person => person.id)
        }
    },
    mounted() {
        this.showPersonMenuOptionLeft = window.outerWidth
    },
}
</script>
<style>
.person-cell {
    position: relative;
}
</style>
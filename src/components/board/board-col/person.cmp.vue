<template>
    <div :class="'task-' + task.type" >
        <div class="icon-dapulse-addbtn"></div>
        <div class="bullets-container">
            <div v-for="(person, idx) in task.value" :key="person.id" class="person-bullet" @click="showPersonMenu($event, person)">
                <span>
                    {{personToDisplay(idx)}}
                </span>
            </div>
        </div>
        <person-selection-menu v-click-outside="closeActionsModal" v-if="showPersonMenuOption"
            :person="showPersonMenuOption.person" :pos="showPersonMenuOption.posModal"
            @changePerson="togglePerson" :boardMembers="boardMembers" >
        </person-selection-menu>
    </div>
</template>
<script>
import personSelectionMenu from '../menus/person-selection-menu.cmp.vue'
export default {
    emits:['updateTask'],
    name: ['person'],
        props: {
        task: Object,
        boardMembers: Array,
        row: Object,
    },
    data() {
        return {
            showPersonMenuOption : null,
            showPersonMenuOptionLeft: 0,
        }
    },
    methods:{
        personToDisplay(idx){
            if (!this.task.value) return ''
            let names = this.task.value[idx].fullname.split(" ")
            let personShort = names[0].slice(0,1) + names[1].slice(0,1)
            return personShort
        },
        showPersonMenu(el, person) {

            this.showPersonMenuOption = {}
            this.showPersonMenuOption.person = person
            // console.log(showPersonMenuOptionLeft)
            var rect = this.$refs.personCmpRef.getBoundingClientRect()

            this.showPersonMenuOption.posModal = { eltop: el.layerY, left: this.showPersonMenuOptionLeft, rect }
        },
        closeActionsModal() {
            this.showPersonMenuOption = null
        },
        togglePerson(personId) {

        },
    },
    computed: {
        
    },
    components:{
        personSelectionMenu,
    },
}
</script>
<style>
</style>
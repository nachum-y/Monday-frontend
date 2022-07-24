<template>
    <div :class="'task-' + task.type">
        <div class="icon-dapulse-addbtn"></div>
        <div class="bullets-container">
            <div v-for="(person, idx) in task.value" :key="person.id" class="person-bullet">
                <span>
                    {{personToDisplay(idx)}}
                </span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: ['person'],
        props: {
        task: Object
    },
    data() {
        return {
        }
    },
    methods:{
        personToDisplay(idx){
            if (!this.task.value) return ''
            let names = this.task.value[idx].fullname.split(" ")
            let personShort = names[0].slice(0,1) + names[1].slice(0,1)
            return personShort
        }
    },
    computed: {

    },
}
</script>
<style>
</style>
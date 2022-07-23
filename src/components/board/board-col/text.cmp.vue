<template>
    <div class="text-cell" v-if="task">
    <input :value="textToDiaplay" class="text-cell-input"/>
    <div class="text-cell-icon"></div>
    </div>
</template>
<script>
export default {
    name: ['textCmp'],
    props: {
        task: Object
    },

    data() {
        return {

        }
    },
    computed: {
        textToDiaplay(){
            if (!this.task.value) return ''
            return this.task.value
        }
    },
}
</script>

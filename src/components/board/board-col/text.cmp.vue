<template>
    <div v-if="task">
        {{ textToDiaplay }}
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
<style>
</style>
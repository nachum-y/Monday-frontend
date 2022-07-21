<template>
    <div>
        heyyyyy
    </div>
</template>
<script>
export default {
    name: ['creationLog'],
    props: {
        'text': String
    },
    data() {
        return {

        }
    },
    created() {
        console.log('create')
        console.log(this.text)
    },
}
</script>
<style>
</style>
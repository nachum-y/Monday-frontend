<template>
    <div>
        <el-button :plain="true" @click="showUserMsg">message</el-button>
    </div>
</template>
<script lang="ts">
import { ElMessage } from 'element-plus'
export default {
    name: 'user-msg',
    props: {
        msgData: Object
    },
    data() {
        return {
           
        }
    },
    computed: {
        showUserMsg(){
        const showUserMsg = (msgData) => {
        const {message, type} = msgData
            ElMessage({
                showClose: true,
                message,
                type,
            })
        }
        }
    },
    methods:{},
}
</script>


<template >
    <div v-if="date">
        <el-progress type="circle" :width="20" :stroke-width="10" :percentage="percentageCalc" status="success">
        </el-progress>
    </div>
</template>
<script>
import { shallowRef } from 'vue'
import { Check } from '@element-plus/icons-vue'

export default {
    name: ['timeline'],
    props: {
        date: Number
    },
    data() {
        return {
            iconCheck: shallowRef(Check)
        }
    },
    created() {
        console.log(this.date)

    },
    computed: {
        percentageCalc() {
            if (Date.now() > this.date) return 100
            if (this.date > Date.now() + 604800000) return 0
            let prc = (this.date - Date.now()) / 604800000
            return Math.round(100 - ((prc) * 100))


        }
    }
}
</script>
<style>
.el-progress--circle .el-progress__text i,
.el-progress--dashboard .el-progress__text i {
    vertical-align: middle;
    /* display: inline-block; */
    display: flex !important;
    justify-content: flex-start;

}



.el-progress.el-progress--circle.is-success>* {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    align-content: center;
}

.el-progress__text {

    font-size: 12px !important;
    align-items: flex-start;

}

.el-progress__text svg {
    color: #fff;
}

.el-progress--circle .el-progress__text i,
.el-progress--dashboard .el-progress__text i {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
}

.el-input__wrapper {

    background-color: transparent !important;
}

.el-input__prefix {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}

.el-progress-circle {
    height: 34px !important;
    width: 20px !important;
}

</style>
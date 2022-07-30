<template>
    <div class="dashboard-content">
        <div class="dashboard-item-holder">
            <bar-chart></bar-chart>
        </div>
    </div>
</template>

<script>
import barChart from '../components/dashboard-cmps/bar-chart.cmp.vue'
export default {
    components:{
        barChart,
    }
}
</script>

<style>

.dashboard-content{
    padding: 1rem;
    background-color: #f6f7fb;
}

.dashboard-item-holder{
    border: 1px solid #d0d4e4;
    padding: 1rem;
    border-radius: 8px;
    background-color: #fff;
}

</style>
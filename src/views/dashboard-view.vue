<template>
    <div class="dashboard-content">
        <div class="dashboard-item-holder">
            <bar-chart></bar-chart>
        </div>
        <div class="dashboard-item-holder">
            <pie-chart></pie-chart>
        </div>
        <div class="dashboard-item-holder">
            <doughnut-chart></doughnut-chart>
        </div>
    </div>
</template>

<script>
import barChart from '../components/dashboard-cmps/bar-chart.cmp.vue'
import pieChart from '../components/dashboard-cmps/pie-chart.cmp.vue'
import doughnutChart from '../components/dashboard-cmps/doughnut-chart.cmp.vue'
export default {
    components:{
        barChart,
        pieChart,
        doughnutChart,
    }
}
</script>

<style>

.dashboard-content{
    padding: 1rem;
    background-color: #f6f7fb;
    overflow-y: scroll;
}

.dashboard-item-holder{
    border: 1px solid #d0d4e4;
    padding: 1rem;
    border-radius: 8px;
    background-color: #fff;
    margin-bottom: 0.5rem;
}

</style>
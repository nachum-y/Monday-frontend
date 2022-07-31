<template>
    <div class="dashboard-content">
        <div class="dashboard-item-holder">
            <div class="dashboard-item-holder-title"> 
            <span>
                Tasks by status
            </span>
            </div>
            <div class="chart">
                <bar-chart></bar-chart>
            </div>
        </div>

        <div class="dashboard-item-holder">
            <div class="dashboard-item-holder-title"> 
            <span>
                Tasks by lables
            </span>
            </div>
            <div class="chart">
                <pie-chart></pie-chart>
            </div>
        </div>
                <div class="dashboard-item-holder">
            <div class="dashboard-item-holder-title"> 
            <span>
                Tasks by priority
            </span>
            </div>
            <div class="chart">
                <doughnut-chart></doughnut-chart>
            </div>
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



</style>
<template>
    <div class="dashboard-content">

        <div class="dashboard-item-holder dashboard-item-number">
            <div class="dashboard-item-holder-title"> 
            <span>
               Numbers
            </span>
            </div>
            <div class="number-view open">
            <div class="number-view-title"> Open Tasks </div>
            <div class="number-view-number"><span>{{TaskCount.open.num}}/{{TaskCount.all}}</span><span>{{TaskCount.open.pre}}%</span></div>
            </div>
            <div class="number-view closed">
            <div class="number-view-title"> Closed Tasks </div>
            <div class="number-view-number"><span>{{TaskCount.closed.num}}/{{TaskCount.all}}</span><span>{{TaskCount.closed.pre}}%</span></div>

            </div>
        </div>

        <div class="dashboard-item-holder dashboard-item-team">
            <div class="dashboard-item-holder-title"> 
            <span>
               Team
            </span>
            </div>
            <div class="members-view">
                <div class="members-view-member" v-for="(person, index) in members" :key="person.id" v-show="TeamToDisplay.includes(person.id)">
                <div class="img-holder">
                    <img :src="getImg(person.imgUrl)" alt="" srcset="">
                </div>
                <div class="member-name">{{person.name}}</div>
                <div class="member-linkedIn">
                    <a :href="getLink(person.id)" target="_blank">Connect on LinkedIn</a>
                </div>
             </div>
             
            </div>
        </div>
        
        <div class="dashboard-item-holder dashboard-item-task-by-status">
            <div class="dashboard-item-holder-title"> 
            <span>
                Tasks by status
            </span>
            </div>
            <div class="chart">
                <bar-chart></bar-chart>
            </div>
        </div>

        <div class="dashboard-item-holder dashboard-item-task-by-lables">
            <div class="dashboard-item-holder-title"> 
            <span>
                Tasks by lables
            </span>
            </div>
            <div class="chart">
                <pie-chart></pie-chart>
            </div>
        </div>
        <div class="dashboard-item-holder dashboard-item-task-by-priority">
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
    data() {
        return {
            members: this.$store.getters.getBoardMembers,
            TeamToDisplay: ['m101', 'm102', 'm103']
        }
    },
    components:{
        barChart,
        pieChart,
        doughnutChart,
    },
    computed:{
        TaskCount(){
            let taskMap = this.$store.getters.getStatusCount
            let allTasks = Object.values(taskMap).reduce((acc, CurrVal) => acc += CurrVal)
            let closedTasks = taskMap.s101
            let openTasks = allTasks - closedTasks
            
            return ({open: {num: openTasks, pre: parseInt(openTasks/allTasks*100) }, closed:{num: closedTasks, pre: Math.ceil(closedTasks/allTasks*100) }, all: allTasks})
        }
    },
    methods: {
        getImg(url){
            return url  
        },
        getLink(personId){
            let url = '#'
            switch (personId) {
                case 'm101':
                    url = 'https://www.linkedin.com/in/shiran-abir/'
                    break;
                case 'm102':
                    url = 'https://www.linkedin.com/in/meital-twito-65575660/'
                    break;
                default:
                    break;
            }
            return url
        }
    },
}
</script>

<style>



</style>
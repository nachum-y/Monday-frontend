<template>

    <Bar
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
    />

</template>

<script>
import { Bar } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      statusCount: null,
      chartData: {
        labels: [
          'Tasks',
        ],
        datasets: [
          {
            label: 'Done',
            backgroundColor: '#00c875',
            data: [this.$store.getters.getStatusCount.s101]
          },
          {
            label: 'Working on it',
            backgroundColor: '#fdab3d',
            data: [this.$store.getters.getStatusCount.s102]
          },
          {
            label: 'Stuck',
            backgroundColor: '#e2445c',
            data: [this.$store.getters.getStatusCount.s103]
          },
          {
            label: 'Default',
            backgroundColor: '#c4c4c4',
            data: [this.$store.getters.getStatusCount.sDefault]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins:{
          legend:{
            display: false
          }
        }
      }
    }
  },
}
</script>
<template>
    <div ref='groupRowFooter' class=" board-content-group-row-footer">
        <div class="footer-col fixed">
            <div class="task-item">
                <div class="row-menu">

                </div>
                <div class="board-content-group-row-footer-corner"></div>
            </div>
        </div>

        <div class="footer-col" v-for="col in colsOrder.slice(1)" :key="col.type">
            <div v-for="label in getPrcLabel(col.type)" :key="label" class="prc-label-container">
                <div class="prc-label" v-if="label" :style="getStyle(label)"> </div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    props: {
        colsOrder: Array,
        getTasksByStatus: Object,
        groupId: String,
        gropTaskLength: Number
    },
    data() {
        return {
            groupListLabels: null,
            rowsLength: 0,
            statusSum: null
        }
    },
    mounted() {
        let elWidth = this.$refs.groupRowFooter.clientWidth
        this.$emit('groupRowFooter', elWidth)
    },
    created() {
        this.$watch('getTasksByStatus', (newVal) => {
            this.groupListLabels = newVal[this.groupId]
        })
        this.groupListLabels = this.getTasksByStatus[this.groupId]

    },
    methods: {
        getPrcLabel(colType) {
            if (colType !== 'status' && colType !== 'labelCmp' && colType !== 'priority') return
            var uniqs
            switch (colType) {
                case 'status':
                    uniqs = this.groupListLabels.status.reduce((acc, val) => {
                        if (!acc[val.title]) {
                            acc[val.title] = {}
                            acc[val.title].count = 1
                            acc[val.title].color = val.color

                        } else {
                            acc[val.title].count += 1
                        }

                        return acc
                    }, {})
                    return uniqs
                case 'priority':
                    uniqs = this.groupListLabels.priority.reduce((acc, val) => {
                        if (!acc[val.title]) {
                            acc[val.title] = {}
                            acc[val.title].count = 1
                            acc[val.title].color = val.color

                        } else {
                            acc[val.title].count += 1
                        }

                        return acc
                    }, {})
                    return uniqs


                case 'labelCmp':
                    uniqs = this.groupListLabels.label.reduce((acc, val) => {
                        if (!acc[val.title]) {
                            acc[val.title] = {}
                            acc[val.title].count = 1
                            acc[val.title].color = val.color

                        } else {
                            acc[val.title].count += 1
                        }

                        return acc
                    }, {})
                    return uniqs
                default:

                    break
            }

            return []
        },
        getStyle(label) {
            let prcDiv = ((label.count / this.gropTaskLength) * 100)
            return `background-color:${label.color};width:${prcDiv}%; height:100%`
        }

    },
    computed: {

    },
    destroyed() {
        let elWidth = this.$refs.groupRowFooter.clientWidth
        this.$emit('groupRowFooter', elWidth)
    },

}


</script>
<style>
.board-content-group-row-footer-corner {
    width: 8px;
    height: 2.25rem;
    background-color: white;
    position: absolute;
    border-left: 1px solid #d0d4e4;
    border-bottom: 1px solid #d0d4e4;
    box-shadow: -1px 1px 1px rgb(0 0 0 / 10%);
    border-bottom-left-radius: 4px;
    left: 395px;
}

.collapseGroup .board-content-group-row-footer-corner {
    display: none;
}

.prc-label {
    display: inline-block;

}

.prc-label-container {
    height: 100%;
    display: inline;
    width: 100%;
}

.footer-col:not(:first-child) {
    padding: 0.3rem;
}
</style>
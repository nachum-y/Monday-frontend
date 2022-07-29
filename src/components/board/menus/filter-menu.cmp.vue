<template>
    <div class="filter-menu" :style="postionModal">
        <div class="filter-menu-header">
            <div class="filter-menu-header-title">
                Quick filters
            </div>
            <div class="filter-menu-header-clear-btn">
                Clear all
            </div>
            <div class="filter-menu-header-save-btn">
                Save as new view
            </div>
        </div>
        <div class="filter-menu-main-container">
            <div class="filter-menu-filters">
                <div class="filter-menu-filters-title">Status</div>
                <div class="filter-menu-filters-holder">
                    <div class="filter-menu-filters-filter-item" v-for="(status, index) in filterMenuOption.status"
                        :key="index" @click="filterBy('status', status.id)">
                        <div :style="{ backgroundColor: status.color, borderColor: status.color }"
                            class="filter-menu-filters-filter-item-color"></div>
                        <span>{{ status.title }}</span>
                    </div>
                </div>
            </div>

            <div class="filter-menu-filters">
                <div class="filter-menu-filters-title">Labels</div>
                <div class="filter-menu-filters-holder">
                    <div class="filter-menu-filters-filter-item" v-for="(label, index) in filterMenuOption.labels"
                        :key="index" @click="filterBy('label', label.id)">
                        <div
                            :style="{ backgroundColor: label.color, borderColor: label.color }"
                            class="filter-menu-filters-filter-item-color"></div>
                        <span>{{ label.title }}</span>
                    </div>
                </div>
            </div>

            <div class="filter-menu-filters">
                <div class="filter-menu-filters-title">Priority</div>
                <div class="filter-menu-filters-holder">
                    <div class="filter-menu-filters-filter-item" v-for="(priority, index) in filterMenuOption.priority"
                        :key="index" @click="filterBy('priority', priority.id)">
                        <div 
                            :style="{ backgroundColor: priority.color, borderColor: priority.color }"
                            class="filter-menu-filters-filter-item-color"></div>
                        <span>{{ priority.title }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        filterMenuOption: Object,
        pos: Object
    },
    data() {
        return {

        }
    },
    computed: {
        postionModal() {
            const top = this.pos.height
            return `top:${top}px;`
        }
    },
    methods: {
        filterBy(filter, param) {
            console.log(filter)
            this.$emit('filterBy', filter, param)

        },
    },


}
</script>
<style>
.filter-menu {
    position: absolute;
}
</style>
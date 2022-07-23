<template>
    <div>
        <draggable v-model="colsOrderList" tag="div" :dragClass="'drag-header-col'" :ghostClass="'ghost-header-col'"
            :filter="'.filtered'" :draggable="'.item'" :animation="200" class="board-content-group-row-header"
            :item-key="key => key">
            <template #item="{ element }">

                <div v-if="element.title === 'Item'" class="header-col fixed ">
                    <div class="task-item">
                        <div class="row-menu">
                            <div class="row-menu-icon"></div>
                        </div>
                        <div :style="groupColor" class="border header"></div>
                        <div class="item-select">
                            <div @click="toggleAll(group)"
                                :class="selectedGroups.includes(group.id) ? 'checkbox-selected' : 'checkbox'">
                            </div>
                        </div>
                        <div class="item-title">Items</div>
                    </div>
                </div>
                <div v-else class="header-col item">
                    <span>{{ element.title }}</span>
                </div>
            </template>
        </draggable>
    </div>
</template>
<script>
import draggable from 'vuedraggable'

export default {
    props: {
        group: Object,
        selectedGroups: Array
    },
    data() {
        return {

        }
    },
    components: {
        draggable
    },
    methods: {
        toggleAll(group) {
            this.$emit('toggleAll', group)
        }
    },
    computed: {
        colsOrderList: {
            get() {
                return this.$store.getters.colsOrder
            },
            set(value) {

                this.$store.dispatch('updateColsOrder', { value })
            }
        },
        groupColor(){
            return  {backgroundColor: this.group.color}
        }
    },

}
</script>
<style>
</style>
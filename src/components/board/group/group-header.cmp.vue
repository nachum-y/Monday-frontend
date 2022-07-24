<template>
    <div class="group-title-action handle" :class="{ 'isColapse': isColapse }">
        <el-tooltip class="box-item" effect="dark" content="Collapse group" placement="top">
            <font-awesome-icon @click="collapseGroup" :style="groupColor" class="collapsable-icon-button"
                :icon="myIcon" />
        </el-tooltip>
        <h4 ref="groupTitle" :style="groupColor" class="group-header-title" contenteditable="true"
            @blur="editGroup($event.target.innerText, group.id, 'title')">
            {{ group.title }}
        </h4>

        <span class="btn" @click="removeGroup(group.id)">
            <!-- X -->
        </span>
        <div class="handle">
            <!-- DRAG -->
        </div>


        <span class="btn" @click="duplicateGroup(group)">
            <!-- Duplicate group -->
        </span>
        <!-- <label for="color-picker">
            <input @change="editGroup($event.target.value, group.id, 'color')" type="color" id="color-picker">
        </label> -->

        <!-- <button @click="openActionsModal($event, group)" class="btn">...</button> -->

        <!-- <dotsClickActionsMenu v-click-outside="closeActionsModal" v-if="showGroupAction" :group="showGroupAction.group"
            :pos="showGroupAction.posModal">
        </dotsClickActionsMenu> -->

    </div>

</template>
<script>
import dotsClickActionsMenu from './../dots-click-actions-menu.cmp.vue'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


export default {
    props: {
        group: Object,
    },
    emits: ['editGroup', 'removeGroup', 'duplicateGroup', 'collapseGroup'],
    data() {
        return {
            myIcon: faChevronUp,
            isColapse: false
        }
    },
    components: {
        dotsClickActionsMenu,
        FontAwesomeIcon
    },
    methods: {
        closeActionsModal() {

        },
        openActionsModal() {

        },
        duplicateGroup(group) {
            this.$emit('duplicateGroup', group)
        },
        removeGroup(groupId) {
            this.$emit('removeGroup', groupId)
        },
        editGroup(val, groupId, type) {
            this.$emit('editGroup', { val, groupId, type })
        },
        collapseGroup() {

            this.isColapse = !this.isColapse
            this.$emit('collapseGroup', this.group.id)
        }

    },
    computed: {
        groupColor() {
            return { color: this.group.color }
        }
    }


}
</script>
<style>
.group-title-action{
    width:500px;
    position: sticky;
    left: 14px;
}
.group-header-title {
    display: flex;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 25rem;
    font-size: 1.125rem;
    cursor: pointer;
    cursor: text;

}

.group-header-title:hover:not(:focus) {
    outline-offset: 2px;
    outline: 1px solid #d0d4e4;

}


.group-header-title:focus {
    flex-grow: 1;
}

.group-title-action {
    display: flex;
    margin-inline-start: 0.875rem;
    padding: 0.625rem 0;
    align-items: center;
}

.collapsable-icon-button {
    transform-origin: center center;
    transform: rotate(180deg);
    transition: transform .2s;
    font-size: 0.75rem;
    outline: none;
    margin-inline-end: 0.625rem;
    position: relative;
    cursor: pointer;
}

.isColapse .collapsable-icon-button {
    transform: rotate(90deg);
}






</style>

<template>
    <div class="group-title-action handle" :class="{ 'isColapse': isColapse }">

        <div class="group-header-menu">
            <div class="group-header-menu-icon" @click="openActionsModal($event, group)"></div>

        </div>
        <div class="background-hider">

        </div>
        <div class="group-header-border-color" :style="groupBgColor"></div>

        <el-tooltip class="box-item" effect="dark" content="Collapse group" placement="top">
            <font-awesome-icon @click="collapseGroup" :style="groupColor" class="collapsable-icon-button"
                :icon="myIcon" />
        </el-tooltip>

        <div ref="groupTitle" :style="groupColor" class="group-header-title" contenteditable="true"
            @blur="editGroup($event.target.innerText, group.id, 'title')">
            <div @click="toggleColorMenu" :style="{ backgroundColor: group.color }" class="color-indicator-gh">
                <div v-show="isColorMenuOpen" class="group-header-color-menu">
                    <div @click="editGroup(color, group.id, 'color')" v-for="color in colors"
                        :style="{ backgroundColor: color }" :key="color" class="color-option">
                    </div>
                </div>
            </div>
            <span>{{ group.title }}</span>
        </div>
        <dotsClickActionsMenu v-click-outside="closeActionsModal" v-if="showGroupAction" :group="showGroupAction.group"
            :pos="showGroupAction.posModal" @deleteGroup="removeGroup(group.id)"
            @collapseGroup="collapseGroup(group.id)" @duplicateGroup="duplicateGroup(group)">
        </dotsClickActionsMenu>

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
            isColapse: false,
            isColorMenuOpen: false,
            showGroupAction: null,
            colors: [
                '#227f4c',
                '#3ac874',
                '#9cd325',
                '#c9b641',
                '#ffcb00',
                '#784bd1',
                '#a25ddc',
                '#0486c0',
                '#65cbff',
                '#bb3354',
                '#f8168a',
                '#f85ac4',
                '#fb642e',
                '#fdab3d',
                '#7e5347',
                '#c4c4c4',
                '#808080'
            ]
        }
    },
    components: {
        dotsClickActionsMenu,
        FontAwesomeIcon
    },
    methods: {
        closeActionsModal() {
            this.showGroupAction = null
        },
        openActionsModal(el, group) {
            this.showGroupAction = {}
            this.showGroupAction.group = group
            this.showGroupAction.posModal = { eltop: el.layerY, left: el.layerX }

        },
        duplicateGroup(group) {
            this.$emit('duplicateGroup', group)
        },
        removeGroup(groupId) {
            this.$emit('removeGroup', groupId)
        },
        editGroup(val, groupId, type) {
            this.$emit('editGroup', { val, groupId, type })
            this.isColorMenuOpen = false
        },
        collapseGroup() {
            this.isColapse = !this.isColapse
            this.$emit('collapseGroup', this.group.id)
            this.showGroupAction = null
        },
        toggleColorMenu() {
            this.isColorMenuOpen = !this.isColorMenuOpen
        },

    },
    computed: {
        groupColor() {
            return { color: this.group.color }
        },
        groupBgColor() {
            return { backgroundColor: this.group.color }
        }
    }


}
</script>
<style>
.group-title-action {
    width: 400px;
    background-color: white;
    position: sticky;
    left: 0rem;

}

.group-header-title {
    display: flex;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 25rem;
    font-size: 1.125rem;
    cursor: pointer;
    cursor: text;
    height: 26px;
    padding: 0px 4px;
    font-weight: 500;
    align-items: center;

}

.group-header-title:hover:not(:focus) {
    outline-offset: 2px;
    outline: 1px solid #d0d4e4;
    border-radius: 4px;

}

.background-hider {
    width: 2.25rem;
    height: 4.2rem;
    box-shadow: none;
    left: -2.3rem;
    top: -2px;
    position: absolute;
    background-color: white;
    display: none;
}

.group-header-title:focus {
    flex-grow: 1;
    margin-right: 1rem;
}

.group-title-action {
    display: flex;
    padding: 0.625rem 0;
    padding-inline-start: 0.875rem;
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

.color-indicator-gh {
    display: none;
}

.group-header-title:focus .color-indicator-gh {
    display: inline-block;

}

.group-header-title:focus {
    padding-inline-start: 1.5rem;

}
</style>

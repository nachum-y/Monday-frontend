<template>
    <div class="group-title">
        <div class="group-title-menu">
            <div class="group-title-menu-icon" @click="removeGroup(group.id)"></div>
            <div class="handle"> 
            <div class="group-title-menu-collapse">
                <svg :fill="groupColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5303 12.5303L10 12L9.46967 12.5303C9.76256 12.8232 10.2374 12.8232 10.5303 12.5303ZM10 10.9393L6.53033 7.46967C6.23744 7.17678 5.76256 7.17678 5.46967 7.46967C5.17678 7.76256 5.17678 8.23744 5.46967 8.53033L9.46967 12.5303L10 12L10.5303 12.5303L14.5303 8.53033C14.8232 8.23744 14.8232 7.76256 14.5303 7.46967C14.2374 7.17678 13.7626 7.17678 13.4697 7.46967L10 10.9393Z" /></svg>
            </div>
        </div>   
            <div :class="{active: isEdited}" class="group-title-header-container">
                <div class="group-title-header-color-menu"><div class="color"></div></div>
                <div :style="groupColorText" class="group-title-header-name" @click="isEdited = true" ref="groupTitle group-title-header-name" contenteditable="true"
                @blur="editGroup($event.target.innerText, group.id, 'title')">
                {{ group.title }}
                </div>
            </div>

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

export default {
    props: {
        group: Object,
    },
    emits: ['editGroup', 'removeGroup', 'duplicateGroup'],
    data() {
        return {
            isEdited: false,
        }
    },
    components: {
        dotsClickActionsMenu,

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
            this.isEdited = false
        }

    },
    computed:{
     groupColor(){
        return this.group.color
     },
     groupColorText(){
        return {color: this.group.color}
     }
    }

}
</script>
<style>
/* .group-header-title {
    display: flex;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 25rem;
} */
</style>
<template>
    <div class="group-title">
        <span ref="groupTitle" contenteditable="true" @blur="editGroup($event.target.innerText, group.id, 'title')">
            {{ group.title }}
        </span>
        <span class="btn" @click="removeGroup(group.id)">
            X
        </span>
        <div class="handle">
            DRAG
        </div>
        <span class="btn" @click="duplicateGroup(group)">
            Duplicate group
        </span>
        <label for="color-picker">
            <input @change="editGroup($event.target.value, group.id, 'color')" type="color" id="color-picker">
        </label>

        <button @click="openActionsModal($event, group)" class="btn">...</button>

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
        }

    },

}
</script>
<style>
</style>
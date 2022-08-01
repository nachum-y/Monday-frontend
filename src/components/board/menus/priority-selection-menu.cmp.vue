<template>

    <div class="status-picker-view" v-if="priority" :style="postionModal">
        <div class="status-picker-view-title" :style="{ 'background-color': p.color }" v-for="p in priority" :key="p.id"
            @click="selectPriority(p.id)">
            <span class="task-label-display">{{ p.title }}</span>
        </div>
    </div>

</template>
<script>
export default {
    emits: ['changePriority'],
    props: {
        priority: Array,
        pos: Object
    },
    data() {
        return {
            cordsX: null,
            cordsY: null,
        }
    },
    components: {
    },
    methods: {
        escapekeylistener(evt) {
            this.cordsX = evt.pageX
            this.cordsY = evt.pageY
        },
        selectPriority(priorityId) {
            this.$emit('changePriority', priorityId)
        },
    },
    computed: {
        postionModal() {
              let elWidth = this.pos.rect.width
            let maxWidth = this.pos.left
            let elRight = this.pos.rect.x
            const top = this.pos.rect.height
            if ((elRight + elWidth) * 2 > maxWidth) {
                return `top:${top}px; left:${(-elWidth / 2)}px;`

            }
            return `top:${top}px; left:${(-elWidth / 4)}px;`
        }
    },
    created() {
    },
    unmounted() {

    },
    destroyed() {
    }
}

</script>
<style>
.group-labels-actions-menu {
    position: absolute;
    left: 0;
    top: 30px;
    z-index: 100;
    background-color: #fff;
    opacity: 1 !important;
    color: #000;
}

.group-labels-actions-menu:hover {
    z-index: 100;
    background-color: #fff;
    opacity: 1 !important;
}

.right-click-actions-menu {
    width: 18rem;
    font-size: 0.875rem;
    position: absolute;
    z-index: 1000 !important;
    background-color: #fff;
    box-shadow: 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%), 0px 5px 5px -3px rgb(0 0 0 / 20%);
}

.right-click-actions-menu>* {
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
}

.right-click-actions-menu div:hover {
    background-color: #eee;
}

.right-click-actions-menu div>:not(:last-child) {
    margin-inline-end: 0.875rem;
}

.icon-v2-delete-line:before {
    content: "\f2ff";
    font-family: "dapulse";
    font-size: 16px;
}

.action-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.group-labels-actions-menu {
    position: absolute;
    left: 0;
    background-color: #fff;
    opacity: 1;
}
</style>
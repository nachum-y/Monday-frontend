<template >
    <section class="group-header-actions-menu" :style="postionModal" v-if="group">
        <div class="group-header-actions-menu--group-actions">
            <div class="collapse-group" @click="collapseGroup">
                <div class="collapse-group-icon"></div>
                <div class="collapse-group-title">Collapse this group</div>
            </div>
            <div class="delete-group" @click="deleteGroup">
                <div class="delete-group-icon"></div>
                <div class="delete-group-title">Delete this group</div>
            </div>
            <div class="duplicate-group" @click="duplicateGroup">
                <div class="duplicate-group-icon"></div>
                <div class="duplicate-group-title">Duplicate this group</div>
            </div>



        </div>


    </section>
</template>
<script>
export default {
    emits: ['deleteGroup', 'duplicateGroup', 'collapseGroup'],
    props: {
        group: Object,
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
        deleteGroup() {
            this.$emit('deleteGroup')
        },
        duplicateGroup() {
            this.$emit('duplicateGroup')
        },
        collapseGroup() {
            this.$emit('collapseGroup')
        }
    },
    computed: {
        postionModal() {
            let x = window.clientWidth
            const top = this.pos.eltop
            if (this.pos.left + 300 > x) return `top:${top}px; left:${this.pos.left - 300}px;`
            return `top:${top + 10}px; left:${this.pos.left - 10}px;`
        }
    },
    created() {
    },

}

</script>
<style>
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
</style>
<template >
    <section class="right-click-actions-menu" :style="postionModal" v-if="group">
        hey{{group.id}}
        <!-- <div class="delet-action-right-click" @click="$emit('RemoveGroup', group)"><span>
                <svg-icons name="draft" />
            </span><span>Delete</span></div>
        <div v-if="group.isRead" class="delet-action-right-click" @click="$emit('makeAsUnReadGroup', group)"><span>
                <svg-icons name="unread" />
            </span><span> Mark as unread</span></div>
        <div v-if="!group.isRead" class="delet-action-right-click" @click="$emit('makeAsReadGroup', group)"><span>
                <svg-icons name="unread" />
            </span><span> Mark as read</span></div>
        <div v-if="group.categories !== 'social'" class="delet-action-right-click"
            @click="$emit('moveToCet', 'social', group)"><span>
                <svg-icons name="moveTo" />
            </span><span> Move To: Social</span></div>
        <div v-if="group.categories !== 'promotions'" class="delet-action-right-click"
            @click="$emit('moveToCet', 'promotions', group)"><span>
                <svg-icons name="moveTo" />
            </span><span> Move To: Promotions</span></div> -->
    </section>
</template>
<script>
export default {
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
            console.log(evt)
            this.cordsX = evt.pageX
            this.cordsY = evt.pageY
        },
    },
    computed: {
        postionModal() {
            let y = window.innerHeight
            let x = window.clientWidth 
            console.log(this.pos)
            const top = this.pos.eltop
            const left = this.pos.left
            if (this.pos.left + 300 > x) return `top:${top}px; left:${this.pos.left - 300}px;`
            return `top:${top}px; left:${this.pos.left}px;`
        }
    },
    created() {
        console.log('create');
    },
    unmounted() {

    },
    destroyed() {
    }
}

</script>
<style>
.right-click-actions-menu {
    width: 18rem;
    font-size: 0.875rem;
    position: absolute;
    z-index: 100;
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
</style>
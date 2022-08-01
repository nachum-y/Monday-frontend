<template>
    <div class="status-picker-view" v-if="labels" :style="postionModal">
        <div class="status-picker-view-title" :style="{ 'background-color': label.color }" v-for="label in labels"
            :key="label.id" @click="selectLabel(label.id)">
            <span class="task-label-display">{{ label.title }}</span>
        </div>
    </div>
</template>
<script>
export default {
    emits: ['changeLabel', 'closeActionsModal'],
    props: {
        labels: Array,
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
        selectLabel(labelId) {
            this.$emit('changeLabel', labelId)
            this.$emit('closeActionsModal')
        },
    },
    computed: {
        postionModal() {
            let elWidth = this.pos.rect.width
            console.log('elWidth:', elWidth)
            let maxWidth = this.pos.left
            console.log('maxWidth:', maxWidth)
            let elRight = this.pos.rect.x
            console.log(this.pos.rect.x)
            const top = this.pos.rect.height
            if ((elRight + elWidth) * 2 > maxWidth) {
                console.log('heyyy')
                return `top:${top}px; left:${(-elWidth / 2)}px;`

            }
            return `top:${top}px; left:${(-elWidth / 4)}px;`
        }
    },
}

</script>
<style>
.status-picker-view-title.task-label-display {
    color: #fff;
}

.status-picker-view {
    position: absolute;
    top: 0;
    z-index: 100;
    background-color: #fff;
    color: #000;
    opacity: 1;
    padding: 1rem 1.5rem 0.5rem;
    border-radius: 8px;
}

.status-picker-view-title {
    width: 9.5rem;
    height: 2rem;
    padding: 0 0.375rem;
    margin-bottom: 0.5rem;
}

.group-labels-actions-menu:hover {
    z-index: 100;
    background-color: #fff;
}


.status-picker-view {
    display: block;
    background: #FFFFFF;
    border: 1px solid #DDDDDD;
    -o-transition: left 150ms cubic-bezier(0, 0, 0.35, 1);
    transition: left 150ms cubic-bezier(0, 0, 0.35, 1);
    box-shadow: 0 4px 17px 6px rgb(0 0 0 / 10%);
    box-shadow: 0 8px 16px 0 rgb(0 0 0 / 32%);
    font-size: 14px;
    transition: width .1s;
    pointer-events: all;

}

.status-picker-view:before,
.status-picker-view:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 100%;
    width: 0;
    height: 0;
}

.status-picker-view:before {
    left: 92px;
    border: 0.5rem solid transparent;
    border-bottom-color: #ddd;
}

.status-picker-view:after {
    left: 93px;
    border: 0.5rem solid transparent;
    border-bottom-color: #fff;
}
</style>
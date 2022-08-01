<template>
    <div ref="labelCmpRef" v-if="labels.length > 0" class="task-label">
        <div class="task-label-display task-lighten" :style="setLabelStyle" @click="showLabelsMenu($event, labels)">{{
                labelToDisplay
        }}</div>


        <label-selection-menu v-click-outside="closeActionsModal" v-if="showLabelMenuOption"
            :labels="showLabelMenuOption.labels" :pos="showLabelMenuOption.posModal" @changeLabel="changeLabel"
            @closeActionsModal="closeActionsModal">
        </label-selection-menu>


    </div>

</template>
<script>
import labelSelectionMenu from '../menus/label-selection-menu.cmp.vue'
export default {
    emits: ['updateTask'],
    name: ['labelCmp'],
    props: {
        task: Object,
        labels: {
            type: Array,
            required: true
        },
        row: Object,
        status: Array,
        priority: Array,
        boardMembers: Array

    },
    data() {
        return {
            isEdited: false,
            showLabelMenuOption: null,
            showLabelMenuOptionLeft: 0
        }
    },
    computed: {
        labelToDisplay() {
            let labelId = this.task.value
            let label = this.labels.filter(label => label.id === labelId)[0]
            return label.title
        },
        setLabelStyle() {
            let labelId = this.task.value
            let label = this.labels.filter(label => label.id === labelId)[0]
            return { backgroundColor: label.color }
        }
    },
    methods: {
        showLabelsMenu(el, labels) {
            this.showLabelMenuOption = {}
            this.showLabelMenuOption.labels = labels
            var rect = this.$refs.labelCmpRef.getBoundingClientRect()

            this.showLabelMenuOption.posModal = { eltop: el.layerY, left: this.showLabelMenuOptionLeft, rect }
        },
        closeActionsModal() {
            this.showLabelMenuOption = null
        },
        changeLabel(labelId) {
            let newCol = { type: this.task.type, value: labelId }
            let newData = { newCol, taskId: this.row.id, groupId: this.row.groupId }

            this.$emit('updateTask', newData)
        },
    },
    mounted() {
        var rect = this.$refs.labelCmpRef.getBoundingClientRect()
        this.showLabelMenuOptionLeft = window.outerWidth
      
    },
    components: {
        labelSelectionMenu
    },

}
</script>
<style>
.task-label {
    position: relative;
}

/* 
.animated-status.balloon-sprite-animation {
    width: 100%;
    position: absolute;
    left: calc((100% -139px)/2);
    right: calc((100% -139px)/2);
    top: 0;
    bottom: 0;
    background-image: url("https://cdn.monday.com/images/status_animations/balloon_animation.png");
    background-position: left center;
    background-size: calc(139px * 75);
    animation: ballon calc((75s/ 25) steps(75));
    animation-fill-mode: forwards;
}


.status-print-color {
    -webkit-print-color-adjust: exact !important
}

.cell-component.color-cell.navigation-focus-old:after {
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .3);
    background-color: rgba(255, 255, 255, .2)
}

@keyframes confetti {
    0% {
        background-image: url("/images/status_animations/confetti_animation.png")
    }

    99.9% {
        background-image: url("/images/status_animations/confetti_animation.png");
        background-position: calc(100% * -75)
    }
}

.status-cell-component .confetti-sprite-animation.animated-status {
    position: absolute;
    left: calc((100% - 139px)/2);
    right: calc((100% - 139px)/2);
    top: 0;
    bottom: 0;
    background-position: left center;
    background-size: calc(139px * 75);
    animation: confetti calc(75s / 25) steps(75);
    animation-fill-mode: forwards
}

@keyframes on_point {
    0% {
        background-image: url("/images/status_animations/on_point_animation.png")
    }

    99.9% {
        background-image: url("/images/status_animations/on_point_animation.png");
        background-position: calc(100% * -75)
    }
}

.status-cell-component .on-point-sprite-animation.animated-status {
    position: absolute;
    left: calc((100% - 138px)/2);
    right: calc((100% - 138px)/2);
    top: 0;
    bottom: 0;
    background-position: left center;
    background-size: calc(138px * 75);
    animation: on_point calc(75s / 25) steps(75);
    animation-fill-mode: forwards
}

@keyframes love {
    0% {
        background-image: url("/images/status_animations/love_animation.png")
    }

    99.9% {
        background-image: url("/images/status_animations/love_animation.png");
        background-position: calc(100% * -75)
    }
}

.status-cell-component .love-sprite-animation.animated-status {
    position: absolute;
    left: calc((100% - 138px)/2);
    right: calc((100% - 138px)/2);
    top: 0;
    bottom: 0;
    background-position: left center;
    background-size: calc(138px * 75);
    animation: love calc(75s / 25) steps(75);
    animation-fill-mode: forwards
}

@keyframes fireworks {
    0% {
        background-image: url("/images/status_animations/fireworks_animation.png")
    }

    99.9% {
        background-image: url("/images/status_animations/fireworks_animation.png");
        background-position: calc(100% * -75)
    }
}

.status-cell-component .fireworks-sprite-animation.animated-status {
    position: absolute;
    left: calc((100% - 138px)/2);
    right: calc((100% - 138px)/2);
    top: 0;
    bottom: 0;
    background-position: left center;
    background-size: calc(138px * 75);
    animation: fireworks calc(75s / 25) steps(75);
    animation-fill-mode: forwards
}

@keyframes poop {
    0% {
        background-image: url("/images/status_animations/poop_animation.png")
    }

    99.9% {
        background-image: url("/images/status_animations/poop_animation.png");
        background-position: calc(100% * -75)
    }
}

.status-cell-component .poop-sprite-animation.animated-status {
    position: absolute;
    left: calc((100% - 138px)/2);
    right: calc((100% - 138px)/2);
    top: 0;
    bottom: 0;
    background-position: left center;
    background-size: calc(138px * 75);
    animation: poop calc(75s / 25) steps(75);
    animation-fill-mode: forwards
}

@keyframes baby-lama-hop-snizze {
    0% {
        background-image: url("/images/status_animations/baby_lama_hop_snizze_animation.png")
    }

    99.9% {
        background-image: url("/images/status_animations/baby_lama_hop_snizze_animation.png");
        background-position: calc(100% * -75)
    }
}

.status-cell-component .baby-lama-hop-snizze-sprite-animation.animated-status {
    position: absolute;
    left: calc((100% - 139px)/2);
    right: calc((100% - 139px)/2);
    top: 0;
    bottom: 0;
    background-position: left center;
    background-size: calc(139px * 75);
    animation: baby-lama-hop-snizze calc(75s / 25) steps(75);
    animation-fill-mode: forwards
}

@keyframes balloon {
    0% {
        background-image: url("https://cdn.monday.com/images/status_animations/balloon_animation.png")
    }

    99.9% {
        background-image: url("https://cdn.monday.com/images/status_animations/balloon_animation.png");
        background-position: calc(100% * -75)
    }
}

.status-cell-component .balloon-sprite-animation.animated-status {
    position: absolute;
    left: calc((100% - 139px)/2);
    right: calc((100% - 139px)/2);
    top: 0;
    bottom: 0;
    background-position: left center;
    background-size: calc(139px * 75);
    animation: balloon calc(75s / 25) steps(75);
    animation-fill-mode: forwards
}

@keyframes coins {
    0% {
        background-image: url("/images/status_animations/coins_animation.png")
    }

    99.9% {
        background-image: url("/images/status_animations/coins_animation.png");
        background-position: calc(100% * -75)
    }
}

.status-cell-component .coins-sprite-animation.animated-status {
    position: absolute;
    left: calc((100% - 138px)/2);
    right: calc((100% - 138px)/2);
    top: 0;
    bottom: 0;
    background-position: left center;
    background-size: calc(138px * 75);
    animation: coins calc(75s / 25) steps(75);
    animation-fill-mode: forwards
}

@keyframes superbowl {
    0% {
        background-image: url("/images/status_animations/superbowl_animation.png")
    }

    99.9% {
        background-image: url("/images/status_animations/superbowl_animation.png");
        background-position: calc(100% * -75)
    }
}

.superbowl-sprite-animation.animated-status {
    position: absolute;
    left: calc((100% - 139px)/2);
    right: calc((100% - 139px)/2);
    top: 0;
    bottom: 0;
    background-position: left center;
    background-size: calc(139px * 75);
    animation: superbowl calc(75s / 25) steps(75);
    animation-fill-mode: forwards
}

@keyframes crazy_balls {
    0% {
        background-image: url("https://cdn.monday.com/images/status_animations/crazy_balls_animation.png")
    }

    99.9% {
        background-image: url("https://cdn.monday.com/images/status_animations/crazy_balls_animation.png");
        background-position: calc(100% * -75)
    }
}

.crazy-balls-sprite-animation.animated-status {
    position: absolute;
    left: calc((100% - 139px)/2);
    right: calc((100% - 139px)/2);
    top: 0;
    bottom: 0;
    background-position: left center;
    background-size: calc(139px * 75);
    animation: crazy_balls calc(75s / 25) steps(75);
    animation-fill-mode: forwards
}

@keyframes crowd {
    0% {
        background-image: url("/images/status_animations/crowd_animation.png")
    }

    99.9% {
        background-image: url("/images/status_animations/crowd_animation.png");
        background-position: calc(100% * -75)
    }
}

.status-cell-component .crowd-sprite-animation.animated-status {
    position: absolute;
    left: calc((100% - 138px)/2);
    right: calc((100% - 138px)/2);
    top: 0;
    bottom: 0;
    background-position: left center;
    background-size: calc(138px * 75);
    animation: crowd calc(75s / 25) steps(75);
    animation-fill-mode: forwards
}

@keyframes skating {
    0% {
        background-image: url("/images/status_animations/christmas/skating_animation.png")
    }

    99.9% {
        background-image: url("/images/status_animations/christmas/skating_animation.png");
        background-position: calc(100% * -75)
    }
}

.status-cell-component .skating-sprite-animation.animated-status {
    position: absolute;
    left: calc((100% - 139px)/2);
    right: calc((100% - 139px)/2);
    top: 0;
    bottom: 0;
    background-position: left center;
    background-size: calc(139px * 75);
    animation: skating calc(75s / 25) steps(75);
    animation-fill-mode: forwards
}

@keyframes explosion {
    0% {
        background-image: url("/images/status_animations/explosion_animation.png")
    }

    99.9% {
        background-image: url("/images/status_animations/explosion_animation.png");
        background-position: calc(100% * -28)
    }
}

.status-cell-component .explosion-sprite-animation.animated-status {
    position: absolute;
    left: calc((100% - 139px)/2);
    right: calc((100% - 139px)/2);
    top: 0;
    bottom: 0;
    background-position: left center;
    background-size: calc(139px * 28);
    animation: explosion calc(28s / 25) steps(28);
    animation-fill-mode: forwards
}

@keyframes lightning {
    0% {
        background-image: url("/images/status_animations/lightning_animation.png")
    }

    99.9% {
        background-image: url("/images/status_animations/lightning_animation.png");
        background-position: calc(100% * -75)
    }
}

.status-cell-component .lightning-sprite-animation.animated-status {
    position: absolute;
    left: calc((100% - 138px)/2);
    right: calc((100% - 138px)/2);
    top: 0;
    bottom: 0;
    background-position: left center;
    background-size: calc(138px * 75);
    animation: lightning calc(75s / 25) steps(75);
    animation-fill-mode: forwards
}

@keyframes deer {
    0% {
        background-image: url("/images/status_animations/christmas/deer_animation.png")
    }

    99.9% {
        background-image: url("/images/status_animations/christmas/deer_animation.png");
        background-position: calc(100% * -75)
    }
}

.status-cell-component .deer-sprite-animation.animated-status {
    position: absolute;
    left: calc((100% - 139px)/2);
    right: calc((100% - 139px)/2);
    top: 0;
    bottom: 0;
    background-position: left center;
    background-size: calc(139px * 75);
    animation: deer calc(75s / 25) steps(75);
    animation-fill-mode: forwards
}

@keyframes slide {
    0% {
        background-image: url("/images/status_animations/christmas/slide_animation.png")
    }

    99.9% {
        background-image: url("/images/status_animations/christmas/slide_animation.png");
        background-position: calc(100% * -75)
    }
}

.status-cell-component .slide-sprite-animation.animated-status {
    position: absolute;
    left: calc((100% - 139px)/2);
    right: calc((100% - 139px)/2);
    top: 0;
    bottom: 0;
    background-position: left center;
    background-size: calc(139px * 75);
    animation: slide calc(75s / 25) steps(75);
    animation-fill-mode: forwards
}

@keyframes snow {
    0% {
        background-image: url("/images/status_animations/christmas/snow_animation.png")
    }

    99.9% {
        background-image: url("/images/status_animations/christmas/snow_animation.png");
        background-position: calc(100% * -75)
    }
}

.status-cell-component .snow-sprite-animation.animated-status {
    position: absolute;
    left: calc((100% - 139px)/2);
    right: calc((100% - 139px)/2);
    top: 0;
    bottom: 0;
    background-position: left center;
    background-size: calc(139px * 75);
    animation: snow calc(75s / 25) steps(75);
    animation-fill-mode: forwards
}

@keyframes snowman {
    0% {
        background-image: url("/images/status_animations/christmas/snowman_animation.png")
    }

    99.9% {
        background-image: url("/images/status_animations/christmas/snowman_animation.png");
        background-position: calc(100% * -75)
    }
}

.status-cell-component .snowman-sprite-animation.animated-status {
    position: absolute;
    left: calc((100% - 139px)/2);
    right: calc((100% - 139px)/2);
    top: 0;
    bottom: 0;
    background-position: left center;
    background-size: calc(139px * 75);
    animation: snowman calc(75s / 25) steps(75);
    animation-fill-mode: forwards
}

.status-cell-component {
    position: relative;
    height: 100%;
    padding: 0 8px;
    color: #fff;
    text-align: center;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}

.status-cell-component.status-cell-component-double-fix {
    height: 100%
}

.status-cell-component.deadline-indicator-left {
    border-left: 10px solid rgba(255, 255, 255, .3)
}

.status-cell-component.deadline-indicator-right {
    border-right: 10px solid rgba(255, 255, 255, .3)
}

.status-cell-component.with-warning {
    border-left: 12px solid transparent;
    background-image: url("/icons/v2-extra-color-exclamation-mark.svg");
    background-position: -8px 9px;
    background-repeat: no-repeat;
    background-size: 4px
}

.status-cell-component.with-warning:after {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 12px;
    pointer-events: none;
    background: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15) 9px, rgba(255, 255, 255, 0.2) 9px, rgba(255, 255, 255, 0.2) 25px)
}

.status-cell-component.change-type-new-cell {
    box-shadow: inset 0 0 0 20px rgba(204, 233, 255, .5)
}

.status-cell-component.change-type-original-cell {
    box-shadow: inset 0 0 0 20px rgba(245, 246, 248, .5)
}

.status-cell-component .ds-text-component {
    border: 0;
    padding: 0
}

.pulse-component.open .status-cell-component,
.pulse-component.highlight .status-cell-component,
.pulse-component:hover .status-cell-component {
    opacity: .7
}

.status-picker-dialog-tooltip {
    z-index: 0;
    width: 16px;
    height: 16px;
    background-color: var(--secondary-background-color)
} */
</style>
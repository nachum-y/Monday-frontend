<template>
    <div v-if="iconName" class="surface-action-icon-wrapper">
        <div :class="'surface-' + iconName + '-component ' + iconName + 'action'">
            <span>
                <div class="surface-navigation-dialog-item-component" :class="activeTab" :aria-label="iconName"
                    role="button" tabindex="-1">
                    <svg viewBox="0 0 20 20" fill="currentColor" width="23" height="23" aria-hidden="true"
                        class="icon_component surface-item-icon icon_component--no-focus-style">
                        <slot name="svgIcon">

                        </slot>
                    </svg>
                </div>
            </span>
        </div>
        <div class="selected-view-indication" :class="activeTab"></div>
    </div>

</template>
<script>

export default {
    props: {
        iconName: String,
        isActive: Boolean
    },
    created() {

    },
    computed: {
        activeTab() {
            return this.isActive ? 'selected' : ''
        }
    }
}
</script>
<style>
</style>
<template>
    <div class="surface-view-icon-wrapper">
        <div class="surface-navigation-view-item-component surface-homepage-button" :class="{ 'selected': true }">
            <a href="/" class="surface-navigation-view-item-wrapper button_link" aria-label="Home Page" tabindex="-1"
                role="button">
                <img class="surface-item-image" src="https://cdn.monday.com/images/logos/monday_logo_icon.png" alt="">
            </a>
        </div>
        <div class="selected-view-indication" :class="{ 'selected': false }"></div>
    </div>

</template>
<script>
export default {

}
</script>
<style>
</style>
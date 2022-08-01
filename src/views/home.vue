<template>
    <div class="home-page">
        <div class="first-layout">
            <h1 class="header-line">A platform built for a<br> new way of working </h1>
            <h3 class="sub-line">What would you like to manage with taskndrop.com Work OS?</h3>
            <div class="comet-underline"></div>
            <div class="btn-container">
                <router-link class="start" :to="'/boards/' + currBoardId">
                    Get Started
                </router-link>
            </div>
            <div class="star"></div>
            <div class="star2 star"></div>
            <div class="star3 star"></div>
            <div class="star4 star"></div>
            <div class="star5 star"></div>
            <div class="star6 star"></div>
            <div class="star7 star"></div>
            <div class="star8 star"></div>
            <div class="star9 star"></div>
            <div class="star10 star"></div>
            <div class="star11 star"></div>
            <div class="star12 star"></div>
            <div class="star13 star"></div>
            <div class="star14 star"></div>
            <div class="star15 star"></div>
            <div class="star16 star"></div>
            <div class="star17 star"></div>
            <div class="star18 star"></div>
            <div class="star19 star"></div>
            <div class="star20 star"></div>
        </div>
        <div class="home-img"></div>

    </div>
</template>
<script>

export default {
    name: 'homePage',
    data() {
        return {
            currBoardId: ''
        }
    },
    created() {
        this.currBoardId = this.$store.getters.getBoardId
    },
}
</script>
<style>
.application-layers .first-level {
    left: 0;

}

.first-level-content-wrapper.-unpinned {
    margin: 0;
}
</style>
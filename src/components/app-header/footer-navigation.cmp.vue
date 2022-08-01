<template>

    <div class="footer-navigation-items-area">
        <div class="monday-style-divider surface-divider bottom monday-style-divider--horizontal"></div>
        <div class="product-switcher-dialog-wrapper">
            <div class="surface-product-switcher-component">
                <div class="surface-product-switcher-button" style="color: rgb(143, 143, 255);"><svg viewBox="0 0 32 32"
                        fill="currentColor" width="36" height="36" role="button" tabindex="0" aria-hidden="false"
                        class="icon_component icon_component--clickable icon_component--no-focus-style">
                        <path
                            d="M5 7.6551C5 6.19071 6.18712 5 7.65151 5 9.1159 5 10.303 6.19071 10.303 7.6551 10.303 9.11949 9.1159 10.3102 7.65151 10.3102 6.18712 10.3102 5 9.11949 5 7.6551zM5 15.9996C5 14.5352 6.18712 13.3445 7.65151 13.3445 9.1159 13.3445 10.303 14.5352 10.303 15.9996 10.303 17.464 9.1159 18.6547 7.65151 18.6547 6.18712 18.6547 5 17.464 5 15.9996zM7.65151 21.6899C6.18712 21.6899 5 22.8807 5 24.345 5 25.8094 6.18712 27.0001 7.65151 27.0001 9.1159 27.0001 10.303 25.8094 10.303 24.345 10.303 22.8807 9.1159 21.6899 7.65151 21.6899zM13.3333 7.6551C13.3333 6.19071 14.5204 5 15.9848 5 17.4491 5 18.6363 6.19071 18.6363 7.6551 18.6363 9.11949 17.4491 10.3102 15.9848 10.3102 14.5204 10.3102 13.3333 9.11949 13.3333 7.6551zM24.3483 5C22.8839 5 21.6968 6.19071 21.6968 7.6551 21.6968 9.11949 22.8839 10.3102 24.3483 10.3102 25.8127 10.3102 26.9998 9.11949 26.9998 7.6551 26.9998 6.19071 25.8127 5 24.3483 5zM13.3333 15.9996C13.3333 14.5352 14.5204 13.3445 15.9848 13.3445 17.4491 13.3445 18.6363 14.5352 18.6363 15.9996 18.6363 17.464 17.4491 18.6547 15.9848 18.6547 14.5204 18.6547 13.3333 17.464 13.3333 15.9996zM15.9848 21.6897C14.5204 21.6897 13.3333 22.8804 13.3333 24.3448 13.3333 25.8092 14.5204 26.9999 15.9848 26.9999 17.4491 26.9999 18.6363 25.8092 18.6363 24.3448 18.6363 22.8804 17.4491 21.6897 15.9848 21.6897zM21.6667 15.9996C21.6667 14.5352 22.8539 13.3445 24.3183 13.3445 25.7826 13.3445 26.9698 14.5352 26.9698 15.9996 26.9698 17.464 25.7826 18.6547 24.3183 18.6547 22.8539 18.6547 21.6667 17.464 21.6667 15.9996zM24.3183 21.6899C22.8539 21.6899 21.6667 22.8807 21.6667 24.345 21.6667 25.8094 22.8539 27.0001 24.3183 27.0001 25.7826 27.0001 26.9698 25.8094 26.9698 24.345 26.9698 22.8807 25.7826 21.6899 24.3183 21.6899z"
                            fill="currentColor"></path>
                    </svg>
                </div>
            </div>
        </div>
        <div class="surface-avatar-menu-connector-wrapper">
            <div class="user-select" @click="toggleShowModal">
                <img v-if="activeUser" class="user-avatar-app-header" :src="activeUserAvatar.imgUrl" alt="user-avatar">
            </div>
            <div ref="userSelectActiveUser" class="user-select-active">

                <Teleport to="body">
                    <modal-cmp :show="showModal" @close="showModal = false" :posModal="posModal"
                        v-click-outside="closeModal">
                        <template #setActiveUser>
                            <div class="member-list" @click="changeMember(member)" v-for="member in boardMembers"
                                :key="member.id">
                                <span> {{ member.name }}</span>
                            </div>
                        </template>
                    </modal-cmp>
                </Teleport>


            </div>
        </div>

    </div>
</template>
<script>
import modalCmp from '../modal.cmp.vue'
export default {
    props: {
        activeUser: Object,
        boardMembers: Array
    },
    data() {
        return {
            activeUserAvatar: null,
            openMenu: false,
            showModal: false,
            posModal: null
        }
    },
    components: {
        modalCmp
    },
    created() {

        this.activeUserAvatar = this.activeUser
    },
    methods: {
        async changeMember(member) {
            const newActiveUser = await this.$store.dispatch({ type: 'setActive', member })
            this.activeUserAvatar = newActiveUser
            this.closeModal()
        },
        toggleShowModal() {
            this.showModal = !this.showModal
        },
        closeModal() {
            this.showModal = false
        }
    },
    mounted() {
        var rect = this.$refs.userSelectActiveUser.getBoundingClientRect()
        this.posModal = rect
    },


}
</script>
<style>
.user-avatar-app-header {
    width: 44px;
    outline: 2px solid #fff;
    border-radius: 50%;
    aspect-ratio: 1/1;
}

.surface-avatar-menu-connector-wrapper {
    position: relative;
}

.member-list {
    margin: 0.5rem 0;
}

.user-select-active {
    position: relative;
}
</style>
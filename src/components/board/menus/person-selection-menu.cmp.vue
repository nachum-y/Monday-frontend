<template>
        <div class="person-picker-view" >
            <div v-if="!showInvite" class="select-peson-view">
                <div class="search-person-input-holder">
                    <input class="searchPerson-input" type="text" placeholder="Search names">
                    <div class="search-icon-holder"></div>
                </div>
                <div class="suggested-members">
                    <h3>Suggested people</h3>
                    <div class="member-holder" v-for="(member, id) in boardMembers" :key="member.id">    
                        <div class="person-bullet-menu">
                            <img :src="setUserImg(member)" alt="">
                        </div>
                        <span class="memeber-name">{{member.name}}</span>
                    </div>
                </div>
                <div class="person-btn-container">
                    <button class="invite-new-members-btn" @click="showInvitation">
                        <span>Invite new members</span>
                        <div class="new-member-icon">hey</div>
                    </button>
                </div>
            </div>
            <div v-if="showInvite" class="invite-peron-view">
            <div class="title-invite-holder">
                <span>Type in email address to invite</span>
            </div>
            <div class="input-invite-holder">
                <input autofocus type="text" placeholder="Enter email">
            </div>
            <div class="invite-btns-holder">
                <button class="cancel-invite-btn">Cancel</button>
                <button class="invite-this-person-btn">Invite</button>
            </div>
            </div>
        </div>
</template>
<script>
export default {
    emits: ['changeMembers'],
    props: {
        boardMembers: Array,
        // taskMembers: Array,
        pos: Object
    },
    data() {
        return {
            cordsX: null,
            cordsY: null,
            showInvite: false,
        }
    },
    components: {
    },
    methods: {
        escapekeylistener(evt) {
            this.cordsX = evt.pageX
            this.cordsY = evt.pageY
        },
        selectPerson(memberId) {
            this.$emit('changeMember', memberId)
        },
        setUserImg(member){
            console.log(member.imgUrl)
            return member.imgUrl
        },
        showInvitation(){
            this.showInvite = !this.showInvite
        },
    },
    computed: {
        postionModal() {
            let elWidth = this.pos.rect.width
            let maxWidth = this.pos.rect.right
            let elRight = this.pos.rect.x
            // console.log(elRight)
            // console.log(elWidth)
            const top = this.pos.rect.height
            // console.log(top)
            const left = this.pos.rect.width / 4
            // console.log(this.pos)
            // console.log(this.pos.rect)
            // return `top:${top}px; left:0px;`
            if (elRight + 100 > maxWidth) {
                // console.log('heyyy')
                return `top:${top}px; left:${(-elWidth / 2) + 16}px;`
            }
            return `top:${top}px; left:${(-elWidth / 8)}px;`
        },
        
    },
    created() {
    },
    unmounted() {

    },
    destroyed() {
    }
}

</script>
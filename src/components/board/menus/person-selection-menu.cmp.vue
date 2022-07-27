<template>

    <div class="status-picker-view" >
        <div class="search-person-input-holder">
            <input class="searchPerson-input" type="text" placeholder="Search names">
            <div class="search-icon-holder"></div>
        </div>
        <div class="suggested-members">
            <h3>Suggested people</h3>
            <div class="member-holder">    
                <div class="person-bullet">
                    <img src="https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512" alt="">
                </div>
                <span class="memeber-name">Shiran Abir</span>
            </div>
        </div>
        <div class="person-btn-container">
            <button class="invite-new-members-btn">
                <span>Invite new members</span>
                <div class="new-member-icon">hey</div>
            </button>
        </div>
    </div>

</template>
<script>
export default {
    emits: ['changeMembers'],
    props: {
        // boardMembers: Array,
        // taskMembers: Array,
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
        selectPerson(memberId) {
            this.$emit('changeMember', memberId)
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
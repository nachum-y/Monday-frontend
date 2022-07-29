<template>
    <div v-if="taskMembers" class="person-picker-view" :style="postionModal">
        <div v-if="!showInvite" class="select-peson-view">
            <div class="members-to-remove-container">
                <div v-for="(member,idx) in userToDisplay()" :key="member.id" class="memebers-to-remove-holder">
                    <div class="person-remove-img">
                        <img class="person-bullet-mini" :src="member.imgUrl" alt="">
                    </div>
                    <span>{{member.name}}</span>
                    <div class="remove-btn-holder" @click="removePerson(member)">
                        <div class="remove-person-btn"></div>
                    </div>
                </div>
            </div>
            <div class="search-person-input-holder">
                <input class="searchPerson-input" type="text" placeholder="Search names">
                <div class="search-icon-holder"></div>
            </div>
            <div v-if="taskMembers.length < boardMembers.length" class="suggested-members">
                <h3>Suggested people</h3>
                <div @click="selectPerson(member)" v-show="!taskMembers.includes(member.id)" class="member-holder" v-for="(member, id) in boardMembers"
                    :key="member.id">
                    <div class="person-bullet-menu">
                        <img :src="setUserImg(member)" alt="">
                    </div>
                    <span class="memeber-name">{{ member.name }}</span>
                </div>
            </div>
            <div class="person-btn-container">
                <button class="invite-new-members-btn" @click.stop.prevent="showInvitation">
                    <span>Invite new members</span>
                    <div class="new-member-icon">hey</div>
                </button>
            </div>
        </div>
        <div v-if="showInvite" class="invite-person-view">
            <div class="title-invite-holder">
                <span>Type in email address to invite</span>
            </div>
            <div class="input-invite-holder">
                <input autofocus autocomplete="email" required type="email" placeholder="Enter email">
            </div>
            <div class="invite-btns-holder">
                <button @click.stop.prevent="showInvitation" class="cancel-invite-btn">Cancel</button>
                <button class="invite-this-person-btn">Invite</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    emits: ['changeMembers','selectPerson','removePerson'],
    props: {
        boardMembers: Array,
        taskMembers: Array,
        pos: Object
    },
    data() {
        return {
            cordsX: null,
            cordsY: null,
            showInvite: false,
        }
    },
    methods: {
        escapekeylistener(evt) {
            this.cordsX = evt.pageX
            this.cordsY = evt.pageY
        },
        setUserImg(member) {
            return member.imgUrl
        },
        showInvitation() {
            this.showInvite = !this.showInvite
        },
        selectPerson(member) {
            const {id, name, imgUrl} = member
            let personToAdd = {
                    id,
                    fullname: name,
                    imgUrl
                  }
            this.$emit('selectPerson', personToAdd)
        },
        userToDisplay(){
            let membersToRemove = this.boardMembers.filter(member=>{
                return this.taskMembers.includes(member.id)
            })
            return membersToRemove
        },
        removePerson(member){
            const {id,name,imgUrl} = member
            let memberToRemove = {id,fullname:name,imgUrl}
            this.$emit('removePerson', memberToRemove)
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
        },

    },
  
}

</script>
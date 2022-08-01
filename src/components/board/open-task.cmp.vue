<template>
    <div v-if="currTask">
        <el-drawer v-model="drawer" title="I am the title" :lock-scroll="false" :size="'700px'"
            :custom-class="'task-container'" @closed="close" :show-close="true" :with-header="false">
            <div class="conversation-colse-btn-container">
                    <div @click="close" class="conversation-close-btn"></div>
                </div>
            <div>
                <div class="task-open-title">
                    <h2 contenteditable="true" class="task-open-task-name">
                        {{ currTask.cols[0].value }}
                    </h2>
                    <button type="button"
                        class="menu-button--wrapper board-filters-overflow-menu-item menu-button--wrapper--size-32"><svg
                            viewBox="0 0 20 20" fill="currentColor" width="28" height="28" role="img"
                            aria-hidden="true">
                            <path
                                d="M6 10.5C6 11.3284 5.32843 12 4.5 12 3.67157 12 3 11.3284 3 10.5 3 9.67157 3.67157 9 4.5 9 5.32843 9 6 9.67157 6 10.5zM11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12 9.50492 12 8.83334 11.3284 8.83334 10.5 8.83334 9.67157 9.50492 9 10.3333 9 11.1618 9 11.8333 9.67157 11.8333 10.5zM17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12 15.3383 12 14.6667 11.3284 14.6667 10.5 14.6667 9.67157 15.3383 9 16.1667 9 16.9951 9 17.6667 9.67157 17.6667 10.5z"
                                fill="currentColor"></path>
                        </svg></button>
                </div>


                <nav class="monday-board-subsets-tabs monday-board-subsets-tabs">
                    <span>Update</span>
                    <span>Files</span>
                    <span>Activity log</span>

                </nav>


                <div ref="writeUpdateMsg" class="open-update-form" contenteditable="true">
                    <span class="write-update-msg">write an update...</span>
                    <QuillEditor v-model:content="msgHtml" contentType="html" class="update-form" theme="snow"
                        :toolbar="toolbarOptions" />

                </div>
                <div class="action_wrapper">
                    <div class="actions">
                        <span class="icon-action_wrapper"></span>
                        Add files
                        <span class="icon-action_wrapper"></span>
                        Add files
                        <span class="icon-action_wrapper"></span>
                        Add files
                        <span class="icon-action_wrapper"></span>
                        Add files
                        <span>Mention</span>
                    </div>
                    <span @click.stop.prevent="sendMsg" class="update-action">Update

                    </span>
                </div>
                <div v-if="!currTask.conversion">
                    <div class="post_empty_state_image_wrapper"><img
                            src="https://cdn.monday.com/images/pulse-page-empty-state.svg">
                    </div>


                    <div class="post_not_found_text">
                        <h2 class="post_not_found">No updates yet for this item</h2>
                        <p class="post_not_found_subtitle">Be the first one to update about progress, mention someone
                            <br>
                            or
                            upload files to share with your team members
                        </p>
                    </div>
                </div>
                <div v-else class="conversation-container">
                    <div class="conversation-card" v-for="update in currTask.conversion" :key="update.id">
                        <div class="conversation-card-header">
                            <div class="avatar"><img :src="getUrl(update.by.imgUrl)" alt="" srcset=""></div>
                            <div class="full-name">{{ update.by.name }}</div>
                            <div class="activity-indicator">
                                <div @click="removeUpdate(update.id)" class="dot"></div>
                            </div>
                        </div>
                        <div class="conversation-card-inside">
                            <p v-html="update.content"></p>
                        </div>
                        <div class="conversation-card-footer">
                            <div class="conversation-card-footer-btn like">
                                <div class="icon"></div> <span>Like</span>
                            </div>
                            <div class="conversation-card-footer-btn reply">
                                <div class="icon"></div> <span>reply</span>
                            </div>
                        </div>
                    </div>




                </div>
            </div>


        </el-drawer>
    </div>
</template>
<script>
import { boardService } from '../../services/board-service'
import { QuillEditor } from '@vueup/vue-quill'
// import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { socketService, SOCKET_EVENT_CONVERSION, SOCKET_EVENT_BOARD_CHANGE, SOCKET_EMIT_SET_BOARD } from '../../services/socket.service'


export default {
    props: {
        taskId: String
    },
    data() {
        return {
            drawer: true,
            boarId: null,
            task: this.$store.getters.getCurrTask,
            msgHtml: '',
            activeUser: this.$store.getters.getActiveUser,
            toolbarOptions: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean']                                         // remove formatting button
            ]
        }
    },
    created() {
        this.boarId = this.$route.params.boardId
        // this.task =  boardService.getTaskById(this.boarId, this.taskId)
        this.$store.commit({ type: 'setCurrTask', taskId: this.$route.params.taskId })
        socketService.on(SOCKET_EVENT_CONVERSION, (msgs) => {
            this.loadMsg(msgs)
        })
        let currTaskId = this.$route.params.taskId
        socketService.emit('setTopic', currTaskId)

    },
    components: {
        QuillEditor
    },
    methods: {
        loadMsg(msgs) {
            this.$store.commit({ type: 'updateConversion', updatedConversion: msgs })
        },
        close() {
            let boarId = this.$route.params.boardId
            // this.$router.go(-1)
            this.$router.replace({ path: `/boards/${boarId}` })
        },
        sendMsg() {
            let msg = {}
            msg.content = this.msgHtml
            msg.by = this.activeUser
            msg.createdAt = Date.now()
            let currTaskId = this.$route.params.taskId
            this.$store.dispatch({ type: 'conversionAdd', msg })
            this.msgHtml = ''
        },
        getUrl(url) {
            return url
        },
        removeUpdate(updateId) {
            this.$store.dispatch({ type: 'conversionRemove', updateId })
        },

    },

    computed: {
        currTask() {
            return this.$store.getters.getCurrTask
        }

    },
    watch: {
        currTask: {
            handler(newValue, oldValue) {
                // Note: `newValue` will be equal to `oldValue` here
                // on nested mutations as long as the object itself
                // hasn't been replaced.
            },
            deep: true
        }
    }
}
</script>
<style>
.task_container {
    width: 700px;
    background-color: #fff;
    height: 100vh;
    position: absolute;
    top: 0;
    right: 0;
}

.conversation-close-btn::before{
    content: "\f22c";
    font-size: 15px;
    color: #777777;
    font-family: "dapulse";
    position: absolute;
    left: 16px;
    cursor: pointer;
    top: 20px;
}

.task-open-title {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 1rem;
    align-items: center;
    margin-top: 20px;
}

.monday-board-subsets-tabs {
    display: flex;
    align-items: center;
    flex: 1;
    width: 100%;
    min-width: 0px;
    padding: 0 24px;
    border-bottom: 1px solid;
}

.monday-board-subsets-tabs>*:not(:last-child) {
    margin-inline-end: 0.5rem;
}

.monday-board-subset-item-v2:hover:after {
    content: "|";
    height: 16px;
    border-right: 1px solid;
    border-color: #0073ea;
    position: absolute;
    top: 8px;
}

.monday-board-subsets-tabs>* {

    max-width: 180px;
    padding: 8px 24px 8px 12px !important;

}

.action_wrapper {
    color: #0073ea;
    display: flex;
    align-items: center;
    cursor: pointer;
    flex-grow: 1;
    margin: 16px;
}

.action_wrapper .actions>* {
    margin: 0.125rem 0.25rem;
}

.action_wrapper .actions {
    flex-grow: 1;
}

.update-action {
    background-color: #0073ea;
    width: 60.4375px;
    height: 32px;
    color: #fff;
    padding: 4px 8px;
    line-height: 24px;
    border-radius: 4px;
    transition: 50ms transform, .1s cubic-bezier(0, 0, 0.35, 1) min-width;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    box-sizing: border-box;
}

.update-action:hover {
    background-color: #0060b9;
}

.task-open-task-name:focus {
    display: flex;
    flex: 1;
}

.task-container {
    padding: 0.75rem;
    font-size: 0.875rem;
}

.el-drawer__body,
.task-container {
    padding: 0 !important;
    margin: 0 !important;
}



.open-update-form:not(:focus)>*:not(:first-child) {
    display: none !important;
}

.open-update-form:focus .write-update-msg {
    display: none;
}

.update-form.ql-container.ql-snow {
    border: 1px solid #d1d5db;
    height: 9rem;
    cursor: text;
    pointer-events: all;
}

.open-update-form:not(:focus) {
    display: flex;
    justify-content: flex-start;
    font-size: 1rem;
    /* outline: 1px solid #0073ea; */
    /* outline-color: #0073ea; */
    padding: 0.625rem 1.25rem;
    border-radius: 0.5rem;
}

.open-update-form {
    margin: 1rem;
    color: #323338;
    outline: 1px solid #0073ea;


}

.space_view .unread_message {
    font-size: 14px;
    font-weight: 400;
    color: var(--secondary-text-color);
    padding: 15px;
    text-align: center;
}

.pulse_container .posts_list .post_empty_state_image_wrapper,
.new_pulse .posts_list .post_empty_state_image_wrapper {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
}


.pulse_container .posts_list .post_empty_state_image_wrapper img,
.new_pulse .posts_list .post_empty_state_image_wrapper img {

    width: 290px;
}

.post_empty_state_image_wrapper img {
    width: 290px;
    margin: auto;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 5rem 0;
}

.post_not_found_text {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
}

.ql-toolbar.ql-snow {

    cursor: default;
}
</style>
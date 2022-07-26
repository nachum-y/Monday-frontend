<template>
    <el-drawer v-model="drawer" title="I am the title" :lock-scroll="false" :size="'700px'"
        :custom-class="'task-container'" :show-close="true" :with-header="false">
        <div>
            <div class="task-open-title">
                <h2 contenteditable="true" class="task-open-task-name">
                    task name
                </h2>
                <button type="button"
                    class="menu-button--wrapper board-filters-overflow-menu-item menu-button--wrapper--size-32"><svg
                        viewBox="0 0 20 20" fill="currentColor" width="28" height="28" role="img" aria-hidden="true">
                        <path
                            d="M6 10.5C6 11.3284 5.32843 12 4.5 12 3.67157 12 3 11.3284 3 10.5 3 9.67157 3.67157 9 4.5 9 5.32843 9 6 9.67157 6 10.5zM11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12 9.50492 12 8.83334 11.3284 8.83334 10.5 8.83334 9.67157 9.50492 9 10.3333 9 11.1618 9 11.8333 9.67157 11.8333 10.5zM17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12 15.3383 12 14.6667 11.3284 14.6667 10.5 14.6667 9.67157 15.3383 9 16.1667 9 16.9951 9 17.6667 9.67157 17.6667 10.5z"
                            fill="currentColor"></path>
                    </svg></button>
            </div>


            <nav class="monday-board-subsets-tabs monday-board-subsets-tabs">
                <span>Update</span>
                <span>Update</span>
                <span>Update</span>
            </nav>

            <div class="open-update-form" contenteditable="true">
                <span class="write-update-msg">write an update...</span>
                <QuillEditor class="update-form" theme="snow" />
            </div>


            <div class="post_empty_state_image_wrapper"><img
                    src="https://cdn.monday.com/images/pulse-page-empty-state.svg"></div>


            <div class="post_not_found_text">
                <h2 class="post_not_found">No updates yet for this item</h2>
                <p class="post_not_found_subtitle">Be the first one to update about progress, mention someone <br> or
                    upload files to share with your team members</p>
            </div>

        </div>
    </el-drawer>
</template>
<script>
import { boardService } from '../../services/board-service'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
    props: {
        // task: Object
    },
    data() {
        return {
            drawer: true,
            task: null
        }
    },
    components: {
        QuillEditor
    },
    created() {
        const boardId = this.$route.params.boardId
        const taskId = this.$route.params.taskId
        // console.log(boardId)
        // console.log(taskId)
        // boardService.getTaskById(boardId, taskId)

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

.task-open-title {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 1rem;
    align-items: center;

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
    border-color: var(--primary-background-color);
    position: absolute;
    top: 8px;
}

.monday-board-subsets-tabs>* {

    max-width: 180px;
    padding: 8px 24px 8px 12px !important;

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



.open-update-form:not(:focus) {
    display: flex;
    justify-content: center;
    font-size: 1rem;
    outline: 1px solid;
    padding: 0.5rem;

}

.open-update-form {
    margin: 1rem;

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
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 290px;
}

.post_empty_state_image_wrapper img {
    width: 450px;
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
</style>
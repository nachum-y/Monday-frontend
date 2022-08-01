<template>
  <div>
    <el-dialog v-model="dialogTableVisible" title="Shipping address">
      <el-table>
        <el-table-column property="date" label="Date" width="150" />
        <el-table-column property="name" label="Name" width="200" />
        <el-table-column property="address" label="Address" />
      </el-table>
    </el-dialog>
    <el-button text @click="dialogFormVisible = true">
      <span class="invite-icon"></span>
      <span>&nbsp; Invite / 1</span>
    </el-button>
    <el-dialog v-model="dialogFormVisible">
    <h1 class="form-title">Liked our project? Share it we others!</h1>
    <h2 class="form-sub-title">If you enjoyed our project, we invite you to share it with other people who may like it too</h2>
      <el-form :model="form">
        <div class="invite-input-container">
          <el-form-item label="Send invitation to:" :label-width="formLabelWidth">
            <input class="form-invite-input" type="email" v-model="emailTo" autocomplete="on">
          </el-form-item>
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <a :href="'mailto:'+ emailTo + '?subject=Check this amazing poject I found! Site&body=Hey there, I came across this amazing project named TaskNDrop! This project made by Shiran Abir, Meital Twito and Nachum Yosef. They\'ve made an application inspired by Monday. Check it out: https://taskndrop.herokuapp.com'">
            <el-button type="primary" @click="dialogFormVisible = false">Send</el-button>
          </a>  
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'


const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  email: '',
})


</script>
<script>
export default {
    data() {
        return {
          emailTo:null,
        }
    },
    computed: {
    },
    methods: {
    },


}
</script>

<style>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
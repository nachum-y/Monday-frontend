<template>
<div class="kanban-view-content">
            <div class="kanban-list-component">
                <div class="kanban-list-component-header"> <span class="kanban-list-component-header-title">Working on It</span></div>
                <div class="kanban-list-component-inn"> 
                  <div class="color-indicator"></div>
                  <div class="card-holder">
                    <div class="card">
                      <div class="card-title">item</div>
                      <div class="card-data">
                        <div class="card-data-item">
                          <div class="card-data-item-col-icon person"> </div> 
                            <div class="card-data-item-col-title">
                              Person
                            </div>
                            <div class="card-data-item-col-content">
                              dynamic
                            </div>                 
                        </div>
                        <div class="card-data-item ">
                          <div class="card-data-item-col-icon date"> </div> 
                            <div class="card-data-item-col-title">
                              Date
                            </div>
                            <div class="card-data-item-col-content">
                              dynamic
                            </div>                 
                        </div>
                        <div class="card-data-item">
                          <div class="card-data-item-col-icon group"> </div> 
                            <div class="card-data-item-col-title">
                              Group
                            </div>
                            <div class="card-data-item-col-content">
                              dynamic
                            </div>                 
                            
                        </div>

                      </div>
                    </div>
                  </div>
                  <div class="kanban-list-component-add-item"> 
                    <input class="kanban-list-component-add-item-input" placeholder="+Add Item">
                  </div>
                </div>
            </div>
         </div>
</template>
<script>
export default {

created(){
    this.$store.getters.getTasksByStatus
}
}
</script>
<style>
.home-page-title {
    text-align: center;
    margin: auto;
}
</style>
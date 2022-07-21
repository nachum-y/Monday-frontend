<template>
    <div class="board-content">
        <div class="board-content-group">
            <div class="board-content-group-row-header">
                <div class="header-col fixed">
                        <div class="task-item">
                        <div class="row-menu"><div class="row-menu-icon"></div></div>
                        <div class="item-select">
                            <div class="checkbox"></div>
                        </div>
                        <div class="item-title">Items</div>

                    </div>
                </div>
                <div class="header-col">People</div>
                <div class="header-col">Date</div>
                <div class="header-col">Status</div>
                <div class="header-col">Lable</div>
                <div class="header-col">Priority</div>
                <div class="header-col"><span>Creation Log</span></div>
                <div class="header-col">Timeline</div>
                <div class="header-col">Status</div>
                <div class="header-col">Location</div>
            </div>
            <div class="board-content-group-row">
                <div class="col fixed">
                    <div class="task-item">
                        <div class="row-menu"><div class="row-menu-icon"></div></div>
                        <div class="item-select">
                            <div class="checkbox"></div>
                        </div>
                        <div class="item-title">Task</div>
                        <div class="item-conversation">
                            <div class="conversation-icon"></div>
                        </div>
                    </div>
                </div>
                <div class="col">2</div>
                <div class="col">3</div>
                <div class="col">4</div>
                <div class="col">5</div>
                <div class="col">1</div>
                <div class="col">2</div>
                <div class="col">3</div>
                <div class="col">4</div>
                <div class="col">5</div>
            </div>
            <div class="board-content-group-row">
                <div class="col fixed">
                    <div class="task-item">
                        <div class="row-menu"><div class="row-menu-icon"></div></div>
                        <div class="item-select">
                            <div class="checkbox-selected"></div>
                        </div>
                        <div class="item-title"><span>Make sure a very long text looks good</span></div>
                        <div class="item-conversation">
                            <div class="conversation-icon"></div>
                        </div>
                    </div>
                </div>
                <div class="col">2</div>
                <div class="col">3</div>
                <div class="col">4</div>
                <div class="col">5</div>
                <div class="col">1</div>
                <div class="col">2</div>
                <div class="col">3</div>
                <div class="col">4</div>
                <div class="col">5</div>
            </div>
            <div class="board-content-group-row-add-item">
                <div class="add-item-col fixed">
                                            <div class="task-item">
                        <div class="row-menu"><div class="row-menu-icon"></div></div>
                        <div class="item-select">
                            <div class="checkbox"></div>
                        </div>
                        

                    </div>
                </div>
                <div class="add-item-col"></div>
                <div class="add-item-col"></div>
                <div class="add-item-col"></div>
                <div class="add-item-col"></div>
                <div class="add-item-col"></div>
                <div class="add-item-col"></div>
                <div class="add-item-col"></div>
                <div class="add-item-col"></div>
                <div class="add-item-col"></div>
            </div>
            <div class="board-content-group-row-footer">
                <div class="footer-col fixed">
                    
                </div>
                <div class="footer-col">2</div>
                <div class="footer-col">3</div>
                <div class="footer-col">4</div>
                <div class="footer-col">5</div>
                <div class="footer-col">1</div>
                <div class="footer-col">2</div>
                <div class="footer-col">3</div>
                <div class="footer-col">4</div>
                <div class="footer-col">5</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: ['group-list'],
    data() {
        return {

        }
    },

}
</script>
<style>
</style>
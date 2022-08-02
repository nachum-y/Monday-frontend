import { boardService } from "../../services/board-service.js"
import { ElMessage } from 'element-plus'
import { userService } from "../../services/user-service.js"
import { socketService, SOCKET_EVENT_BOARD_CHANGE, SOCKET_EVENT_CONVERSION, SOCKET_EMIT_SET_BOARD } from '../../services/socket.service'
export const boardStore = {
    state: {
        board: null,
        prevGroup: null,
        activeMember: null,
        filterdTask: [],
        kanbanStatus: 'status',
        filtersTasks: {
            all: (board) => board.groups,
            txt: (board, input) => {
                let { groups } = board
                groups = groups.map((g) => {
                    let { tasks, color, title, id } = g
                    tasks = tasks.filter((t) => input.test(t.cols[0].value))
                    return ({ tasks, color, title, id })
                })
                return groups
            }
        },
        activeFilter: 'all',
        activeFilterVal: {
            txt: ''
        },
        activeFilterParam: {
            label: [],
            txt: '',
            person: [],
            status: [],
            priority: []
        },
        sortBy: {
            activeSort: 'createdAt',
            sortDir: 1,
            isAvtice: false
        },
        currTask: null,

    },
    mutations: {
        addGroup(state, { group }) {
            state.board.groups.push(group)
        },
        removeGroup(state, { groupId }) {
            state.board.groups = state.board.groups.filter(group => group.id !== groupId)
        },
        setBoard(state, { board }) {
            state.board = board[0]
        },
        updateBoard(state, { board }) {
            state.board = board
            // state.board = board
        },
        updateGroup(state, { groupId, data }) {
            state.prevGroup = state.board.groups.find((g) => g.id === groupId)
            let groupToUpdate = state.board.groups.find((g) => g.id === groupId)
            groupToUpdate[Object.keys(data)[0]] = data[Object.keys(data)[0]]

        },
        addTask(state, { groupId, newTask }) {
            let groupToUpdate = state.board.groups.find(group => group.id === groupId)
            groupToUpdate.tasks.push(newTask)
        },
        updateColsOrder(state, { value2 }) {
            state.board.colsOrder = value2
        },
        updateRowsOrder(state, { savedTasks, idx }) {
            state.board.groups[idx].tasks = savedTasks.map((task) => {
                task.groupId = state.board.groups[idx].id
                return task
            })
            state.board.groups[idx].tasks = savedTasks
        },
        updateBoardOrderList(state, { value }) {
            state.board.groups = value
        },
        updateGroups(state, { updatedGroups }) {
            state.board.groups = updatedGroups
        },
        searchInput(state, { inputTxt }) {
            state.activeFilterParam.txt = new RegExp(inputTxt, 'i')
        },
        setActiveFilter(state, { filter, param = null }) {

            console.log(filter)
            if (filter === 'txt') {
                state.activeFilterParam[filter] = new RegExp(param, 'i')
                return
            }
            if (!state.activeFilterParam[filter].includes(param)) {
                state.activeFilterParam[filter].push(param)
            } else {
                state.activeFilterParam[filter].pop(param)
            }
        },
        setActiveSortBy(state, { sortByParam }) {
            if (state.sortBy.activeSort === sortByParam) {
                state.sortBy.sortDir *= -1
            } else {
                state.sortBy.activeSort = sortByParam
                state.sortBy.sortDir = 1
            }
        },
        updateTask(state, { newCol, idxs }) {
            const { groupIdx, taskIdx, colIdx } = idxs
            state.board.groups[groupIdx].tasks[taskIdx].cols[colIdx] = newCol
        },
        showUsrMsg(state, { msgType, msg }) {
            ElMessage({
                showClose: true,
                message: msg,
                type: msgType,
                grouping: true,
            })
        },
        setCurrTask(state, { taskId }) {
            console.log(taskId)
            let group = state.board.groups.find((g) => {
                return g.tasks.find((t) =>
                    t.id === taskId)
            })
            state.currTask = group.tasks.find(t => t.id === taskId)
            console.log(state.currTask)
        },
        updateConversion(state, { updatedConversion }) {
            console.log(updatedConversion)
            state.currTask.conversion = updatedConversion
        },
        setKanbanStatus(state, { view }) {
            state.kanbanStatus = view
        },
        setActive(state, { member }) {
            state.activeMember = member
        },
    },
    getters: {
        board({ board }) {
            if (!board) return
            return board
        },
        colsOrder({ board }) {
            if (!board.colsOrder) return
            return board.colsOrder

        },
        rowOrder({ board, activeFilterParam, sortBy }) {
            if (!board) return
            let { groups } = board
            groups = groups.map((g) => {
                let { tasks, color, title, id } = g
                tasks = tasks.filter((t) => {
                    return (!activeFilterParam.txt || activeFilterParam.txt.test(t.cols[0].value)) &&
                        (activeFilterParam.status.length === 0 || activeFilterParam.status.includes(t.cols[t.cols.findIndex((typ) => typ.type === 'status')].value))
                        && (activeFilterParam.label.length === 0 || activeFilterParam.label.includes(t.cols[t.cols.findIndex((typ) => typ.type === 'labelCmp')].value))
                        && (activeFilterParam.priority.length === 0 || activeFilterParam.priority.includes(t.cols[t.cols.findIndex((typ) => typ.type === 'priority')].value))
                })
                if (sortBy.isAvtice) {
                    tasks = tasks.sort((a, b) => {
                        return a[sortBy.activeSort].toString().localeCompare(b[sortBy.activeSort].toString()) * sortBy.sortDir
                    })
                }
                return ({ tasks, color, title, id })
            })

            if (!board.groups) return

            // console.log(sorted)
            return groups
        },
        getLabels({ board }) {
            if (!board.labels) return
            return board.labels
        },
        getStatus({ board }) {
            return board.status
        },
        getPriority({ board }) {
            return board.priority
        },
        getMembers({ board }) {
            return board.members
        },
        getTasksByStatus({ board, kanbanStatus }) {
            let colType = kanbanStatus === 'labels' ? 'labelCmp' : kanbanStatus
            let tasksByStatus = {}
            let Dragablle = board[kanbanStatus].map(status => tasksByStatus[status.id] = { tasks: [], color: status.color, title: status.title, id: status.id })
            board.groups.forEach(group => {
                group.tasks.forEach(task => {
                    const statusId = task.cols.find(col => col.type === colType).value
                    tasksByStatus[statusId].tasks.push(task)
                })
            })
            return Dragablle
        },
        getTasksByStatusD({ board }) {
            let tasksByStatus = {}
            let Dragablle = board.status.map(status => tasksByStatus[status.id] = { tasks: [], color: status.color, title: status.title, id: status.id })
            board.groups.forEach(group => {
                group.tasks.forEach(task => {
                    const statusId = task.cols.find(col => col.type === 'status').value
                    tasksByStatus[statusId].tasks.push(task)
                })
            })
            console.log(Dragablle)
            return Dragablle
        },
        getGroupsByLabels({ board }) {
            let groupByLabels = {}
            board.groups.map(group => groupByLabels[group.id] = {})
            board.groups.forEach(group => {
                groupByLabels[group.id].label = group.tasks.map((task) => {
                    const labelId = task.cols.find(col => col.type === 'labelCmp').value
                    const labelObj = board.labels.find(l => l.id === labelId)
                    return labelObj
                })
                groupByLabels[group.id].status = group.tasks.map((task) => {
                    const statusId = task.cols.find(col => col.type === 'status').value
                    const statusObj = board.status.find(s => s.id === statusId)
                    return statusObj

                })
                groupByLabels[group.id].priority = group.tasks.map((task) => {
                    const priorityId = task.cols.find(col => col.type === 'priority').value
                    const priorityObj = board.priority.find(p => p.id === priorityId)
                    return priorityObj
                })

            })
            return groupByLabels
        },
        getCurrTask({ currTask }) {
            return currTask
        },
        getActiveUser({ activeMember }) {
            return activeMember
        },
        getStatusCount({ board }) {
            let statusCount = {}
            board.status.forEach(status => statusCount[status.id] = 0)
            board.groups.forEach(group => {
                group.tasks.forEach(task => {
                    task.cols.forEach(col => {
                        if (col.type === 'status') {
                            statusCount[col.value] += 1
                        }
                    })
                })
            })
            return statusCount
        },
        getLabelCount({ board }) {
            let labelTitles = []
            let labelColors = []
            let labelsCount = {}
            board.labels.forEach(label => {
                labelsCount[label.id] = 0
                if (!label.title) labelTitles.push('default')
                else labelTitles.push(label.title)
                labelColors.push(label.color)
            })
            board.groups.forEach(group => {
                group.tasks.forEach(task => {
                    task.cols.forEach(col => {
                        if (col.type === 'labelCmp') {
                            labelsCount[col.value] += 1
                        }
                    })
                })
            })
            let labelCountValues = Object.keys(labelsCount).map(key => labelsCount[key])
            return ({ titles: labelTitles, colors: labelColors, count: labelCountValues })
        },
        getPriorityCount({ board }) {
            let priorityTitles = []
            let priorityColors = []
            let priorityCount = {}
            board.priority.forEach(priority => {
                priorityCount[priority.id] = 0
                if (!priority.title) priorityTitles.push('default')
                else priorityTitles.push(priority.title)
                priorityColors.push(priority.color)
            })
            board.groups.forEach(group => {
                group.tasks.forEach(task => {
                    task.cols.forEach(col => {
                        if (col.type === 'priority') {
                            priorityCount[col.value] += 1
                        }
                    })
                })
            })
            let priorityCountValues = Object.keys(priorityCount).map(key => priorityCount[key])
            return ({ titles: priorityTitles, colors: priorityColors, count: priorityCountValues })
        },
        getAllTasksLocation({ board }) {

            let gropsTaskLocationMap = board.groups.map((g) => {
                let groupTask = g.tasks.map((t) => {
                    let location = t.cols.find((tCols) => {
                        return tCols.type === 'location'
                    })
                    let taskLocationObj = {
                        task: t,
                        location,
                    }
                    if (location) return taskLocationObj
                })
                let taskListLocation = groupTask.filter((taskVal) => (taskVal.location.value))

                console.log(taskListLocation)
                return taskListLocation

            })
            console.log(gropsTaskLocationMap.flat())
            let groupTaskLocations = gropsTaskLocationMap.filter((tasks) => tasks.length > 0)
            console.log(groupTaskLocations.flat())
            return groupTaskLocations.flat()
            // return gropsTaskLocationMap.filter((tasks) => tasks.length > 0)
        },
        getBoardMembers({ board }) {
            return board.members
        },
        getBoardId({ board }) {
            return board._id
        }

    },
    actions: {
        async loadBoard({ commit }) {
            const board = await boardService.query()
            commit({ type: 'setBoard', board })
            return board
        },

        async saveGroup({ commit, state }, { group }) {
            const actionType = (group.id) ? 'updateGroup' : 'addGroup'
            try {
                const savedGroup = await boardService.saveGroup(group, state.board._id)
                commit({ type: actionType, group: savedGroup })
                socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')

            } catch (err) {
                console.log(err)
            }

        },
        async updateGroup({ commit, state }, { groupId, data }) {
            console.log('here')
            commit({ type: 'updateGroup', groupId, data })
            const savedGroup = await boardService.updateGroup(groupId, data, state.board._id)
            socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')
        },
        async removeGroup({ commit, state }, { groupId }) {
            try {
                const groupName = await boardService.removeGroup(groupId, state.board._id)
                commit({ type: 'removeGroup', groupId })
                let msg = `${groupName} group was successfully deleted.`
                commit({ type: 'showUsrMsg', msgType: 'success', msg })
                socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')

            }
            catch (err) {
                commit({ type: 'showUsrMsg', msgType: 'error', msg: err })
            }
        },
        async addTask({ commit, state }, { title, groupId }) {
            try {
                const newTask = await boardService.addTask(title, groupId, state.board._id)
                commit({ type: 'addTask', groupId, newTask })
                socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')


            }
            catch (err) {
                console.log(err)
            }
        },
        async saveTask({ commit, state }, { task }) {
            try {
                const newTask = await boardService.saveTask(task, state.board._id)
                const groupId = newTask.groupId
                commit({ type: 'addTask', groupId, newTask })
                socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')

            }
            catch (err) {
                console.log(err)
            }
        },
        async updateTask({ commit, state }, { data }) {
            try {
                const idxs = await boardService.updateTask(data, state.board._id)
                commit({ type: 'updateTask', newCol: data.newCol, idxs })
                socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')

            } catch (error) {
                commit({ type: 'showUsrMsg', msgType: 'error', msg: 'Sorry cannot update task' })
            }
        },
        async removeTasks({ commit, state }, { tasksToRemove }) {
            try {
                const updatedGroups = await boardService.removeTasks(tasksToRemove, state.board._id)
                commit({ type: 'updateGroups', updatedGroups })
                let msg = ` We successfully deleted ${tasksToRemove.length} items`
                commit({ type: 'showUsrMsg', msgType: 'success', msg })
                socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')
            }
            catch (err) {
                let msg = ` Cannot delete ${tasksToRemove.length} items`
                commit({ type: 'showUsrMsg', msgType: 'error', msg })
            }
        },
        async duplicateTasks({ commit, state }, { tasksToDup }) {
            try {
                const updatedGroups = await boardService.duplicateTasks(tasksToDup, state.board._id)
                commit({ type: 'updateGroups', updatedGroups })
                let msg = ` We successfully duplicated ${tasksToDup.length} items`
                commit({ type: 'showUsrMsg', msgType: 'success', msg })
                socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')
            }
            catch (err) {
                let msg = ` Cannot duplicate ${tasksToDup.length} items`
                commit({ type: 'showUsrMsg', msgType: 'error', msg })
            }
        },
        async updateColsOrder({ commit, state }, { value }) {
            commit({ type: 'updateColsOrder', value2: value })
            console.log(value)
            try {
                await boardService.saveColsOrder(value, state.board._id)
                socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')

            } catch (error) {
                console.log(error)
            }


        },
        async updateRowsOrder({ commit, state }, { value, idx }) {
            commit({ type: 'updateRowsOrder', savedTasks: value, idx })
            try {
                const savedTasks = await boardService.saveGroupsRows(state.board)
                socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')


            } catch (error) {
                console.log(error)
            }

        },
        updateBoardOrderList({ commit, state }, { value }) {
            boardService.saveGroups(value, state.board._id)
            commit({ type: 'updateBoardOrderList', value })
            socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')
        },

        searchInput({ commit, state }, { inputTxt }) {
            commit({ type: 'searchInput', inputTxt })
        },
        filterBy({ commit }, { filter, param }) {
            commit({ type: 'setActiveFilter', filter, param })

        },
        async conversionAdd({ commit, state }, { msg }) {
            const ids = {
                groupId: state.currTask.groupId,
                taskId: state.currTask.id,
                boardId: state.board._id,
            }
            try {
                const updatedConversion = await boardService.conversionAdd(ids, msg)
                commit({ type: 'updateConversion', updatedConversion })
                socketService.emit(SOCKET_EVENT_CONVERSION, updatedConversion)
            } catch (error) {
                console.log(error)

            }


        },
        async conversionRemove({ commit, state }, { updateId }) {
            const ids = {
                groupId: state.currTask.groupId,
                taskId: state.currTask.id,
                boardId: state.board._id,
            }
            try {
                const updatedConversion = await boardService.conversionRemove(ids, updateId)
                commit({ type: 'updateConversion', updatedConversion })
                socketService.emit(SOCKET_EVENT_CONVERSION, updatedConversion)
            } catch (error) {
                console.log(error)
            }
        },
        sortBy({ commit }, { sortByParam }) {
            commit({ type: 'setActiveSortBy', sortByParam })
        },


        async setActive({ commit, state }, { member }) {
            try {
                const newActiveUser = await userService.setActiveMember(member)
                commit({ type: 'setActive', member })
                console.log(newActiveUser)
                return newActiveUser

            }
            catch (error) {
                console.log(error)
            }
        },
        async getActive({ commit, state }) {
            try {
                const member = await userService.getActiveMember()
                commit({ type: 'setActive', member })
                return member
            }
            catch (error) {
                console.log(error)
            }
        },
    }
}
import { boardService } from "../../services/board-service.js"
import { ElMessage } from 'element-plus'
export const boardStore = {
    state: {
        board: null,
        prevGroup: null,
        filterdTask: [],
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
            activeSort: 'date',
            sortDir: 1,
            date: 'createdAt',
            name: 'name',
        },

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
            const regex = new RegExp(inputTxt, 'i')
            state.activeFilter = 'txt'
            state.activeFilterParam.txt = regex
            state.activeFilterVal.txt = regex
            // if (!inputTxt) state.activeFilter = 'all'
        },
        setActiveFilter(state, { filter, param = null }) {

            // state.activeFilter = filter
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
        }

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
        rowOrder({ board, activeFilterParam }) {
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
                return ({ tasks, color, title, id })
            })

            if (!board.groups) return
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
            } catch (err) {
                console.log(err)
            }

        },
        async updateGroup({ commit, state }, { groupId, data }) {
            commit({ type: 'updateGroup', groupId, data })
            const savedGroup = await boardService.updateGroup(groupId, data, state.board._id)
        },
        async removeGroup({ commit, state }, { groupId }) {
            try {
                const groupName = await boardService.removeGroup(groupId, state.board._id)
                commit({ type: 'removeGroup', groupId })
                let msg = `${groupName} group was successfully deleted.`
                commit({ type: 'showUsrMsg', msgType: 'success', msg })
            }
            catch (err) {
                commit({ type: 'showUsrMsg', msgType: 'error', msg: err })
            }
        },
        async addTask({ commit, state }, { title, groupId }) {
            try {
                const newTask = await boardService.addTask(title, groupId, state.board._id)
                commit({ type: 'addTask', groupId, newTask })

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
            }
            catch (err) {
                console.log(err)
            }
        },
        async updateTask({ commit, state }, { data }) {
            try {
                const idxs = await boardService.updateTask(data, state.board._id)
                commit({ type: 'updateTask', newCol: data.newCol, idxs })

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
            }
            catch (err) {
                let msg = ` Cannot duplicate ${tasksToDup.length} items`
                commit({ type: 'showUsrMsg', msgType: 'error', msg })
            }
        },
        updateColsOrder({ commit }, { value }) {
            commit({ type: 'updateColsOrder', value2: value })

        },
        async updateRowsOrder({ commit, state }, { value, idx }) {
            commit({ type: 'updateRowsOrder', savedTasks: value, idx })
            try {
                const savedTasks = await boardService.saveGroupsRows(state.board)
            } catch (error) {
                console.log(error)
            }

        },
        updateBoardOrderList({ commit, state }, { value }) {
            boardService.saveGroups(value, state.board._id)
            commit({ type: 'updateBoardOrderList', value })
        },

        searchInput({ commit, state }, { inputTxt }) {
            commit({ type: 'searchInput', inputTxt })
        },
        sortBy({ commit }, { filter, param }) {
            commit({ type: 'setActiveFilter', filter, param })

        }

    }
}
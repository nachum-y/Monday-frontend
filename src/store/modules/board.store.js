import { boardService } from "../../services/board-service.js"

export const boardStore = {
    state: {
        board: null,
        prevGroup: null
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
        updateRowsOrder(state, { value, idx }) {
            state.board.groups[idx].tasks = value

        },
        updateBoardOrderList(state, { value }) {
            state.board.groups = value

        },
        updateGroups(state, { updatedGroups }) {
            state.board.groups = updatedGroups
        },
    },
    getters: {
        board({ board }) {
            return board
        },
        colsOrder({ board }) {
            if (!board.colsOrder) return
            return board.colsOrder

        },
        rowOrder({ board }) {
            if (!board.groups) return
            return board.groups
        }
    },
    actions: {
        async loadBoard({ commit }) {
            const board = await boardService.query()
            commit({ type: 'setBoard', board })
        },

        async saveGroup({ commit, state }, { group }) {
            const actionType = (group.id) ? 'updateGroup' : 'addGroup'
            const savedGroup = await boardService.saveGroup(group, state.board._id)
            commit({ type: actionType, group: savedGroup })
        },
        async updateGroup({ commit, state }, { groupId, data }) {

            commit({ type: 'updateGroup', groupId, data })
            const savedGroup = await boardService.updateGroup(groupId, data, state.board._id)
        },
        async removeGroup({ commit, state }, { groupId }) {
            try {
                console.log(groupId)
                await boardService.removeGroup(groupId, state.board._id)
                commit({ type: 'removeGroup', groupId })
            }
            catch (err) {
                console.log(err)
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
        async saveTask({ commit, state }, { task }){
            try{
                const newTask = await boardService.saveTask(task, state.board._id)
                const groupId = newTask.groupId
                console.log(groupId)
                commit({ type: 'addTask', groupId, newTask })
            }
            catch (err) {
                console.log(err)
            }
        },
        async removeTasks({ commit, state }, { tasksToRemove }) {
            try {
                const updatedGroups = await boardService.removeTasks(tasksToRemove, state.board._id)
                commit({ type: 'updateGroups', updatedGroups })
            }
            catch (err) {
                console.log(err)
            }
        },
        updateColsOrder({ commit }, { value }) {
            commit({ type: 'updateColsOrder', value2: value })

        },
        updateRowsOrder({ commit }, { value, idx }) {
            commit({ type: 'updateRowsOrder', value, idx })
        },
        updateBoardOrderList({ commit, state }, { value }) {
            boardService.saveGroups(value, state.board._id)
            commit({ type: 'updateBoardOrderList', value })
        },

    }
}
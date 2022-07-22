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
            // console.log(groupId)
            // console.log('state.board:', state.board)
            state.board.groups = state.board.groups.filter(group => group.id !== groupId)
            // console.log('state.board:', state.board)
        },
        setBoard(state, { board }) {
            state.board = board[0]
        },
        updateGroup(state, { groupId, data }) {
            state.prevGroup = state.board.groups.find((g) => g.id === groupId)
            let groupToUpdate = state.board.groups.find((g) => g.id === groupId)
            groupToUpdate[Object.keys(data)[0]] = data[Object.keys(data)[0]]
        },
        addTask(state, { groupId, newTask }){
            let groupToUpdate = state.board.groups.find(group=> group.id === groupId)
            groupToUpdate.tasks.push(newTask)
        },
        updateColsOrder(state, { value2 }) {

            state.board.colsOrder = value2
        },
        updateRowsOrder(state, { value }) {
            console.log(state.board.groups[0])
            state.board.groups[0].tasks = value

        },
        updateBoardOrderList(state, { value }) {
            console.log(value)
            console.log(state.board);
            state.board.groups = value

        },
    },
    getters: {
        board({ board }) {
            return board
        },
        colsOrder({ board }) {
            console.log(board.colsOrder)
            return board.colsOrder

        },
        rowOrder({ board }) {
            console.log(board.groups[0].tasks)
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

                await boardService.removeGroup(groupId, state.board._id)
                commit({ type: 'removeGroup', groupId })
            }
            catch (err) {
                console.log(err)
            }
        },
        async addTask({commit,state},{title, groupId}){
            try{
                const newTask = await boardService.addTask(title,groupId,state.board._id)
                commit({ type: 'addTask', groupId , newTask })
            }
            catch(err){
                console.log(err)
            }
        },
        async removeTasks({commit,state},{tasksToRemove}){
            try {
                await boardService.removeTasks(tasksToRemove,state.board._id)
            }
            catch(err){
                console.log(err)
            }
        },
        updateColsOrder({ commit }, { value }) {
            commit({ type: 'updateColsOrder', value2: value })

        },
        updateRowsOrder({ commit }, { value }) {
            commit({ type: 'updateRowsOrder', value })
        },
        updateBoardOrderList({ commit }, { value }) {
            commit({ type: 'updateBoardOrderList', value })
        },
        // toggleStatus({ commit }, { groupId }) {
        //     return groupsService.toggleStatus(groupId)
        //         .then(group => {
        //             commit({ type: 'updateGroup', group })
        //         })
        // },
        // editGroup({ commit }, { groupId }) {
        //     return groupsService.getById(groupId)
        //         .then(group => {
        //             commit({ type: 'setEditGroup', group })
        //         })
        // }

    }
}
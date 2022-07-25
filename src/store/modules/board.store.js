import { boardService } from "../../services/board-service.js"

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
            status: []
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
            state.board.groups[idx].tasks = savedTasks
        },
        updateBoardOrderList(state, { value }) {
            console.log(value)
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

    },
    getters: {
        board({ board }) {
            return board
        },
        colsOrder({ board }) {
            if (!board.colsOrder) return
            return board.colsOrder

        },
        rowOrder({ filtersTasks, activeFilter, board, activeFilterVal, activeFilterParam }) {
            let filterGroups = filtersTasks[activeFilter](board, activeFilterVal[activeFilter])
            // let filterdGroup = filterGroups.filter((tasks) => {
            //     return (activeFilterParam.txt.length === 0 || activeFilterParam.txt.test(tasks.name)) 
            // })
            // console.log(activeFilterParam)
            let { groups } = board
            groups = groups.map((g) => {
                let { tasks, color, title, id } = g
                tasks = tasks.filter((t) => {
                    return (!activeFilterParam.txt || activeFilterParam.txt.test(t.cols[0].value)) &&
                        (activeFilterParam.status.length === 0 || activeFilterParam.status.includes(t.cols[t.cols.findIndex((typ) => typ.type === 'status')].value))
                })
                return ({ tasks, color, title, id })
            })

            if (!board.groups) return
            return groups
        },

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
            console.log(data)
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
        async saveTask({ commit, state }, { task }) {
            try {
                const newTask = await boardService.saveTask(task, state.board._id)
                const groupId = newTask.groupId
                console.log(groupId)
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

                // disppatch({type:error})
                // userMsg
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
            console.log(value, 'updateColsOrder')
            commit({ type: 'updateColsOrder', value2: value })

        },
        async updateRowsOrder({ commit, state }, { value, idx }) {
            let group = state.board.groups[idx]
            console.log(group)

            const savedTasks = await boardService.saveGroupsRows(idx, state.board._id, value)
            commit({ type: 'updateRowsOrder', savedTasks, idx })
            console.log(savedTasks)

        },
        updateBoardOrderList({ commit, state }, { value }) {
            console.log(value, 'updateBoardOrderList')
            boardService.saveGroups(value, state.board._id)
            commit({ type: 'updateBoardOrderList', value })
        },

        searchInput({ commit, state }, { inputTxt }) {
            commit({ type: 'searchInput', inputTxt })
        },
        sortBy({ commit }, { filter, param }) {
            console.log(filter)
            console.log(param)
            commit({ type: 'setActiveFilter', filter, param })

        }

    }
}
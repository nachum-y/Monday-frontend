import { boardService } from "../../services/board-service.js"

export const boardStore = {
    state: {
        board: null,
        prevGroup: null,
        filterdTask: [],
        filtersTasks: {
            all: (board) => board,
            txt: (board, input = '') => {
                // board.groups.map((g) => console.log(g))
                let fillter = {}
                // fillter.push(board)

                // filter((t) => input.test(t.cols[0].value)))
                // input.test(g.tasks.cols[0].value)


                for (let key in board) {
                    // fillter[key]
                    fillter[key] = (board[key])

                }

                let res = fillter.groups.map((g) => g)
                let resb = new Array(res)
                console.log(resb)
                let resu = res.map((t) => t.tasks.filter((ts) => input.test(ts.cols[0].value)))
                for (let index = 0; index < resu.length; index++) {
                    console.log(resu[index])
                    console.log(resb[0][index])
                    // resb[0][index].tasks = resu[index]
                    console.log(resb[index].tasks)
                }

            }
        },
        activeFilter: 'all',
        activeFilterVal: {
            txt: ''
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
        updateRowsOrder(state, { value, idx }) {
            state.board.groups[idx].tasks = value

        },
        updateBoardOrderList(state, { value }) {
            state.board.groups = value

        },
        updateGroups(state, { updatedGroups }) {
            state.board.groups = updatedGroups
        },
        searchInput(state, { inputTxt }) {
            const regex = new RegExp(inputTxt, 'i')
            state.activeFilterVal.txt = regex
            state.activeFilter = 'txt'
            if (!inputTxt) state.activeFilter = 'all'
            console.log(state.activeFilter)
        },
        updateTask(state, { newCol, idxs }){
            const {groupIdx,taskIdx,colIdx } = idxs
            state.board.groups[groupIdx].tasks[taskIdx].cols[colIdx] = newCol
        },

    },
    getters: {
        board({ filtersTasks, activeFilter, board, activeFilterVal }) {

            // let bordToDisplay = { ...board }

 
            // console.log(bordToDisplay.groups[0].tasks.filter((t) => regex.test(t.cols[0].value)))
            // console.log(bordToDisplay.groups[0].tasks)
            // console.log(bordToDisplay.groups[0].tasks.filter((t) => regex.test(t.cols[0].value)))
            // console.log(bordToDisplay.groups[0].tasks.filter((t) => regex.test(t.cols[0].value)))
            // let { groups, byMember, colsOrder, createdAt, members, title, _id } = board
            // let boardToDisplay = { ...board }
            // let { groups } = board
            // groups = groups.map((g) => {
            //     let { tasks, color, title, id } = g
            //     tasks = tasks.filter((t) => regex.test(t.cols[0].value))
            //     return ({ tasks, color, title, id })
            // })
            // console.log(boardToDisplay)
            // boardToDisplay.groups = groups
            // console.log(bordToDisplay)
            // board.gr
            // console.log(filtersTasks[activeFilter](board, activeFilterVal[activeFilter]))
            // return filtersTasks[activeFilter](board, activeFilterVal[activeFilter])
            // console.log(boardToDisplay)
            return board
        },
        colsOrder({ board }) {
            if (!board.colsOrder) return
            return board.colsOrder

        },
        rowOrder({ board }) {
            if (!board.groups) return
            // let regex = new RegExp('css', 'i')
            // let { groups } = board
            // groups = groups.map((g) => {
            //     let { tasks, color, title, id } = g
            //     tasks = tasks.filter((t) => regex.test(t.cols[0].value))
            //     return ({ tasks, color, title, id })
            // })
            // console.log(groups);
            // return groups
            return board.groups
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
        async updateTask({ commit, state }, { data }){
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
            commit({ type: 'updateColsOrder', value2: value })

        },
        updateRowsOrder({ commit }, { value, idx }) {
            commit({ type: 'updateRowsOrder', value, idx })
        },
        updateBoardOrderList({ commit, state }, { value }) {
            boardService.saveGroups(value, state.board._id)
            commit({ type: 'updateBoardOrderList', value })
        },

        searchInput({ commit, state }, { inputTxt }) {
            commit({ type: 'searchInput', inputTxt })
        }

    }
}
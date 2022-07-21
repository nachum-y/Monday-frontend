import { boardService } from "../services/board-service.js"

export const boardStore = {
    state: {
        board: null,
        groupToEdit: null,
    },
    mutations: {
        addGroup(state, { group }) {
            state.board.groups.push(group)
        },
        removeGroup(state, { groupId }) {
            state.board.groups = state.board.groups.filter(group => group._id !== groupId)
        },
        // updateGroup(state, {group}){
        //     const idx = state.board.groups.findIndex(g => g._id === group._id)
        //     state.board.groups.splice(idx, 1, group)
        //     state.groupToEdit = null
        // }
    },
    getters: {
        // todos({todos}){
        //     return todos
        // },
        // todoToEdit({todoToEdit}){
        //     return todoToEdit
        // }
    },
    actions: {
        async loadBoard({commit}){
            const borad = await boardService.query()
            console.log(borad)
                    // commit({ type: 'setTodos', todos })
        },
        saveTodo({commit},{todo}){
            const actionType = (todo._id) ? 'updateTodo' : 'addTodo'
            return todosService.save(todo)
                .then(savedTodo => {
                    commit({type: actionType, todo: savedTodo})
                    return savedTodo
                })
        },
        removeTodos({commit},{todosIds}){
            return todosService.remove(todosIds)
                .then(res => {
                    commit({type: 'removeTodos', todosIds})
                })
        },
        toggleStatus({commit},{todoId}){
            return todosService.toggleStatus(todoId)
                .then(todo => {
                    commit({type: 'updateTodo', todo})
                })
        },
        editTodo({commit}, {todoId}){
            return todosService.getById(todoId)
                .then(todo => {
                    commit({type:'setEditTodo', todo})
                })
        }

    }
}
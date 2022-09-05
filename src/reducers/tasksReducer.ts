import { TaskType } from "../Todolist"


export const tasksReducer = (state: Array<TaskType>, action: tsarType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            // state.filter(t => t.id != id);
            // setTasks(filteredTasks);
            return state.filter(el=>el.id !== action.payload.id)
        }
        default: return state
    }
}

type tsarType = removeTaskACType
type removeTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: { id }
    } as const
}


import { TaskType } from '../../App'
import { FilterValueType } from '../../App'

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void,
    changeFilter: (filter: FilterValueType) => void
}

function ToDoList(props: PropsType) {

    const taskItems = props.tasks.map((task: TaskType) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>del</button>
            </li>
        )
    })

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input placeholder='add' />
                    <button>+</button>
                </div>
                <ul>
                    {taskItems}
                </ul>
                <div>
                    <button onClick={() => props.changeFilter('all')}>All</button>
                    <button onClick={() => props.changeFilter('activ')}>Active</button>
                    <button onClick={() => props.changeFilter('completed')}>Completed</button>
                </div>
            </div>
        </div>
    )
}

export default ToDoList
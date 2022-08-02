import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { TaskType } from '../../App'
import { FilterValueType } from '../../App'

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void,
    changeFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
}

function ToDoList(props: PropsType) {
    const [title, setTitle] = useState('')
    const taskItems = props.tasks.map((task: TaskType) => {

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>del</button>
            </li>
        )
    })

    const onClickAddTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    // const onClikSatFilterAll = () => props.changeFilter('all')
    // const onClikSatFilterAll = () => props.changeFilter('activ')
    // const onClikSatFilterAll = () => props.changeFilter('completed')

    const onClickSetFilterCreator = (filter: FilterValueType) => { // более коротки код
        return () => props.changeFilter(filter)
    }

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={title} // синхронизируем value с начальным состоянием title
                        onChange={onChangeSetTitle} // изменяем начальное состояние положив туда value c input
                        onKeyDown={onKeyDownAddTask}
                    />
                    {/* вызываем при онклик функцию переданную из App */}
                    <button onClick={onClickAddTask}>+</button>
                </div>
                <ul>
                    {taskItems}
                </ul>
                <div>
                    <button onClick={onClickSetFilterCreator('all')}>All</button>
                    <button onClick={onClickSetFilterCreator('activ')}>Active</button>
                    <button onClick={onClickSetFilterCreator('completed')}>Completed</button>
                </div>
            </div>
        </div>
    )
}

export default ToDoList
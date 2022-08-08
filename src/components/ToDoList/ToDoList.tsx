import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { TaskType } from '../../App'
import { FilterValueType } from '../../App'

type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: string
    removeTask: (taskID: string) => void,
    changeFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
    changeTask: (taskID: string, isDone: boolean) => void
}

function ToDoList(props: PropsType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)
    const taskItems = props.tasks.length
        ? props.tasks.map((task: TaskType) => {

            return (
                <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={(e) => props.changeTask(task.id, e.currentTarget.checked)}
                    />
                    <span>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id)}>del</button>
                </li>
            )
        }) : <span>askList is empty</span>

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

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
                        className={error ? 'error' : ''}
                        value={title} // синхронизируем value с начальным состоянием title
                        onChange={onChangeSetTitle} // изменяем начальное состояние положив туда value c input
                        onKeyDown={onKeyDownAddTask}
                    />
                    {/* вызываем при онклик функцию переданную из App */}
                    <button onClick={onClickAddTask}>+</button>
                    {error && <div>Title is required</div>}
                </div>
                <ul>
                    {taskItems}
                </ul>
                <div>
                    <button
                        className={props.filter === 'all' ? 'btn-active' : ''}
                        onClick={onClickSetFilterCreator('all')}>All</button>
                    <button
                        className={props.filter === 'activ' ? 'btn-active' : ''}
                        onClick={onClickSetFilterCreator('activ')}>Active</button>
                    <button
                        className={props.filter === 'completed' ? 'btn-active' : ''}
                        onClick={onClickSetFilterCreator('completed')}>Completed</button>
                </div>
            </div>
        </div>
    )
}

export default ToDoList
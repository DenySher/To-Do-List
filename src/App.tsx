import { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import ToDoList from './components/ToDoList/ToDoList';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'activ' | 'completed'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'RwactJS', isDone: false }
    ])

    const [filter, setFilter] = useState<FilterValueType>('all')

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(task => task.id !== taskID))
    }

    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }

    const addTask = (title: string) => { // получаем value  из input
        // const newTask: TaskType = { // создаем новый объект с таском
        //     id: v1(),
        //     title, // ключ и значение совпадают, по этому можно так напистаь
        //     isDone: false
        // }
        // setTasks([...tasks, newTask]) // положили копию тасков, и запушили новый таск
        setTasks([{id: v1(), title, isDone: false}, ...tasks]) // современное написание!
    }

    let tasksForRender;
    switch (filter) {
        case 'completed':
            tasksForRender = tasks.filter(task => task.isDone)
            break
        case 'activ':
            tasksForRender = tasks.filter(task => !task.isDone)
            break
        default: tasksForRender = tasks
    }

    return (
        <div className='App'>
            <ToDoList
                title={'What to learn'}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;

import { useState } from 'react';
import './App.css';
import ToDoList from './components/ToDoList/ToDoList';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'activ' | 'completed'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'RwactJS', isDone: false }
    ])

    const [filter, setFilter] = useState<FilterValueType>('all')


    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(task => task.id !== taskID))
    }

    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
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
            />
        </div>
    );
}

export default App;

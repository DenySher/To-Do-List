import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodoListType>>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: "HTML&CSS2", isDone: true },
            { id: v1(), title: "JS2", isDone: true },
            { id: v1(), title: "ReactJS2", isDone: false },
            { id: v1(), title: "Rest API2", isDone: false },
            { id: v1(), title: "GraphQL2", isDone: false },
        ]
    });

    function removeTask(todoListID: string, taskId: string) {
        // делаем копию в ручную tasks, перезаписываем по ключу todoListID
        setTasks({ ...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== taskId) })
    }

    function addTask(todoListID: string, title: string) {
        let newTasks = { id: v1(), title: title, isDone: false };
        setTasks({ ...tasks, [todoListID]: [newTasks, ...tasks[todoListID]] })
    }

    function changeStatus(todoListID: string, taskID: string, isDone: boolean) {
        // let task = tasks.find(t => t.id === taskId);
        setTasks({ ...tasks, [todoListID]: tasks[todoListID].map(el => el.id === taskID ? { ...el, isDone: isDone } : el) })
    }

    function changeFilter(todoListID: string, value: FilterValuesType) {
        // map создает новый массив, по этому не делаем копию литералом и не оборачи ваем в []. 
        // Далее сравниваем каждый ID у итема и если находим todoListID делаем копию итема и заменяем значение фильтра на значение  полученного value
        setTodolists(todolists.map(el => el.id === todoListID ? { ...el, filter: value } : el))
    }

    const remoteTodoList = (todoListID: string) => {
        setTodolists(todolists.filter(el => el.id !== todoListID))
        delete tasks[todoListID]
    }

    return (

        <div className="App">
            {todolists.map((el) => {
                let tasksForTodolist = tasks[el.id] // взяли ключ от туду листа

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        key={el.id}
                        todoListID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        remoteTodoList={remoteTodoList}
                    />
                )
            })}
        </div>
    );
}

export default App;

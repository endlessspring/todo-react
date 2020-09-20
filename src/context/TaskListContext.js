import React, {createContext, useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';

export const TaskListContext = createContext()
const TaskListContextProvider = props => {
    const initialState = JSON.parse(localStorage.getItem('tasks')) || []

    const [tasks, setTasks] = useState(initialState)

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const [editItem, setEditItem] = useState(null)

    // Добавить задачу
    const addTask = title => {
        setTasks([...tasks, {title, id: uuidv4()}])
    }

    // Удалить задачу
    const removeTask = id => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    // Очистить задачи
    const clearList = () => {
        setTasks([])
    }

    // Найти задачу
    const findItem = id => {
        const item = tasks.find(task => task.id === id)

        setEditItem(item)
    }
    // Изменить задачу
    const editTask = (title, id) => {
        const newTasks = tasks.map(task => (task.id === id ? {title, id} : task))

        console.log(newTasks)

        setTasks(newTasks)
        setEditItem(null)
    }

    return (
        <TaskListContext.Provider
            value={{
                tasks,
                addTask,
                removeTask,
                clearList,
                findItem,
                editTask,
                editItem
            }}
        >
            {props.children}
        </TaskListContext.Provider>
    )
}

export default TaskListContextProvider
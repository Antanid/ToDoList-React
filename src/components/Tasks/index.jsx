import React from "react";
import axios from "axios";

import editSvg from '../../assets/img/paint.svg';
import './Tasks.scss';
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";






const Tasks = ({ onRemoveTask, list, onEditTitle, onAddTask }) => {


    const EditTitle = () => {
        const newTitle = window.prompt('Название списка', list.name);
        if (newTitle) {
            onEditTitle(list.id, newTitle);
            axios.patch('http://localhost:3002/lists/' + list.id, {
                name: newTitle
            }).catch(() => {
                alert('Не удалось обновить название списка');
            });
        }
    };

    

    return (
        <div className='tasks'>
            <h2 className='tasks__title'>
                {list.name}
                <img onClick={EditTitle} src={editSvg} alt="edit icon" className="" />
            </h2>

            <div className="tasks__items">
                {
                    !list.tasks.length && <h2>Задачи отсутсвуют</h2>
                }
                {list.tasks.map(task => (
                    <Task 
                    list={list}
                    key={task.id}
                     onRemoveTask={onRemoveTask} {...task} />
                ))}

                <AddTaskForm list={list} onAddTask={onAddTask} />
            </div>
        </div>
    )
}

export default Tasks;
import React, { useState } from 'react';
import axios from 'axios';


import './Tasks.scss';
import addSvg from '../../assets/img/add.svg';

const AddTaskForm = ({ list, onAddTask }) => {

    const [visibleForm, setVisibleForm] = useState(false)
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState('');

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm);
        setInputValue('');
    }

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        };
        setIsLoading(true);
        axios.post('http://localhost:3002/tasks', obj).then((data) => {
            onAddTask(list.id, obj);
            toggleFormVisible();
        }).catch(() =>{
          alert('Ошибка при добвалении задачи!');      
        }).finally(() => {
            setIsLoading(false);
        });
    }



    return (
        <div className="tasks__form">
            {!visibleForm ? (<div onClick={toggleFormVisible} className="tasks__form-new">
                <img src={addSvg} alt="plus" />
                <span>Новая задача</span>
            </div>) : <div className='tasks__form-block'>
                <input
                    onChange={e => setInputValue(e.target.value)}
                    value={inputValue}
                    className="field"
                    type="text" placeholder="Текст задачи" />

                <button disabled={isLoading} onClick={addTask} className="button">
                    {isLoading ? 'Добавление...' : "Добавить задачу"}
                </button>
                <button onClick={toggleFormVisible} className="button button--gray">
                    Отмена
                </button>
            </div>}
        </div>
    )
}

export default AddTaskForm;


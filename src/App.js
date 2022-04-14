import React, { useState, useEffect } from 'react';
import listSvg from './assets/img/list.svg';
import axios from 'axios';
import { Route, Link, Routes } from "react-router-dom";


import { List, AddList, Tasks } from './components';


function App() {


  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3002/lists?_expand=color&_embed=tasks').then(({ data }) => {
      setLists(data);
    });
    axios.get('http://localhost:3002/colors').then(({ data }) => {
      setColors(data);
    });
  }, [])

  const onAddList = (obj) => {
    const newLists = [
      ...lists,
      obj
    ];
    setLists(newLists);
  };

  const onAddTask = (listId, taskObj) => {
    const newLists = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newLists);
  };

  const onEditListItem = (id, title) => {
    const newLists = lists.map(item => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newLists);
  }

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm('Вы дейсвительно хотите удалить задачу?')) {
      const newLists = lists.map((item) => {
        if( item.id === listId){
          item.tasks = item.tasks.filter(task => task.id !==task.id);
        }
        return item;
      });
      setLists(newLists);
      axios.delete('http://localhost:3002/tasks/' + taskId).catch(() => {
        alert('Не удалось удалить задачу');
      });
    }
  }

  return (
    <div className="todo">

      <div className='todo__sidebar'>
        <List items={[
          {
            active: true,
            icon: <img src={listSvg} alt='list-icon' />,
            name: 'Все задачи',
          }
        ]}
        />

        {lists ? (
          <List
            items={lists}
            onRemove={id => {
              const newLists = lists.filter(item => item.id !== id);
              setLists(newLists);
            }}
            onClickItem={item => {
              setActiveItem(item);
            }}
            activeItem={activeItem}
            isRemovable
          />
        ) : (
          'Загрузка...'
        )}
        <AddList onAdd={onAddList} colors={colors} />
      </div>

      <div className='todo__tasks'>
        {
          lists && activeItem && <Tasks 
          onRemoveTask={onRemoveTask}
           onAddTask={onAddTask} list={activeItem} onEditTitle={onEditListItem} />
        }

      </div>

    </div>
  );
}

export default App;

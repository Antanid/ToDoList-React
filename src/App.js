import React, { useState, useEffect } from 'react';
import listSvg from './assets/img/list.svg';
import axios from 'axios';

import { List, AddList, Tasks } from './components';


function App() {


  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);

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

  return (
    <div className="todo">

      <div className='todo__sidebar'>
        <List items={[
          {
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
            isRemovable
          />
        ) : (
          'Загрузка...'
        )}
        <AddList onAdd={onAddList} colors={colors} />
      </div>

      <div className='todo__tasks'>
        {
          lists && <Tasks list={lists[1]}/>
        } 
      </div>

    </div>
  );
}

export default App;

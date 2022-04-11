import React, { useEffect, useState } from "react";
import add from '../../assets/img/add.svg';
import List from '../List/index';
import Badge from '../Badge/index';
import close from '../../assets/img/close.svg';
import axios from "axios";


import './AddListButton.scss';
import '../List/List.scss';




const AddList = ({ colors, onAdd }) => {

    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, SelectColor] = useState(3);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
       if (Array.isArray(colors)) {
        SelectColor(colors[0].id);
       }
    }, [colors]);

    
    const onClose = () => {
        setInputValue('');
        setVisiblePopup(false);
        SelectColor(colors[0].id)
    };

    const addList = () => {
        if (!inputValue) {
            alert('Введите название списка');
            return;
        }

        setIsLoading(true);
        axios.post('http://localhost:3002/lists', 
        {
            name: inputValue,
            colorId: selectedColor
        }).then(({data}) => {
            const color = colors.filter (c => c.id === selectedColor)[0].name;
            const  listObj = {...data, color: {name: color} };
            onAdd(listObj);
            onClose();
        })
        .finally(() => {
            setIsLoading(false);
        });


    };
    
    return (
        <div className="add-list">
            <List
                onClick={() => setVisiblePopup(true)}
                items={[
                    {
                        className: 'list__add-button',
                        icon: <img src={add} />,
                        name: 'Добавить список',
                    }
                ]} />

            {visiblePopup && (
                <div className="add-list__popup">
                    <img
                        onClick={onClose}
                        alt="close-img"
                        src={close} className="add-list__popup-close-btn" />

                    <input
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        className="field"
                        type="text" placeholder="Название списка" />

                    <div className="add-list__popup-colors">

                        {
                            colors.map(color => <Badge
                                onClick={() => SelectColor(color.id)}
                                key={color.id}
                                color={color.name}
                                className={selectedColor === color.id && 'active'}
                            />)
                        }
                    </div>
                    <button onClick={addList} className="button">
                        {isLoading ? 'Добавление' : 'Добавить'}
                        </button>
                </div>
            )}

        </div>
    );
}

export default AddList;
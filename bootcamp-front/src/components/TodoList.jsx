import { useState } from 'react';

export default function TodoList(){
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    const handleToggle = (index) => {
        setItems((prevItems) =>
            prevItems.map((item, i) =>
                i === index ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const handleAddItem = () => {
        if (newItem.trim()) {
            setItems([...items, { label: newItem, checked: false }]);
            setNewItem('');
        }
    };

    return (
        <div>
            <h2>Checklist</h2>
            <input
                type="text"
                placeholder="Entrer le nom"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button onClick={handleAddItem}>Ajouter</button>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <label>
                            <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => handleToggle(index)}
                            />
                            {item.label}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};
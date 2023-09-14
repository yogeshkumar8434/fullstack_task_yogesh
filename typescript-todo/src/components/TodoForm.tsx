import React, { useState, ChangeEvent, FormEvent } from 'react';

interface TodoFormProps {
  addTodo: AddTodo;
}

export const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addTodo(newTodo);
    setNewTodo("");
  }

  return (<>

    <form className="todo-form">
      <input type="text" value={newTodo} className="todo-input" placeholder="New Note.." onChange={handleChange} />
        <button type="submit" className="todo-button" onClick={handleSubmit}>
         <img src='/pluscircle-1.svg' alt='icon' className='plus-icon'></img> <span>Add</span>
        </button>
    </form>
    <span className='list-heading'>Notes</span>
    <hr className='hr'></hr>
    </>
  )
};

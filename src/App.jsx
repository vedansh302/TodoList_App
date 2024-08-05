import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Footer from './components/Footer';
import { Analytics } from "@vercel/analytics/react";

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.find(i => i.id === id);
    setTodo(t.todo);
    setIsEditing(true);
    setEditId(id);
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleAddOrSave = () => {
    if (isEditing) {
      let newTodos = [...todos, { id: editId, todo, isCompleted: false }];
      setTodos(newTodos);
      saveToLS(newTodos);
      setIsEditing(false);
      setEditId(null);
    } else {
      let newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      setTodos(newTodos);
      saveToLS(newTodos);
    }
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && todo.trim().length >= 3) {
      handleAddOrSave();
    }
  };

  const isButtonDisabled = todo.trim().length <= 3;

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-7 rounded-xl p-5 bg-violet-100 min-h-[75vh] md:w-[600px] ">
        <h1 className='font-bold text-center text-2xl'>Taskme - Manage your tasks at one place</h1>
        <div className="addTodo my-5">
          <h2 className='text-lg font-bold'>Add a Task</h2>
          <div className='flex justify-between mt-4 gap-5 '>
            <input onChange={handleChange} onKeyDown={handleKeyPress} value={todo} type="text" className='w-full py-1 px-2 rounded-md' />
            <button
              onClick={handleAddOrSave}
              disabled={isButtonDisabled}
              className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-400 transition-all duration-100 px-4 py-2 text-white text-sm font-bold rounded-md w-20'>
              {isEditing ? "Save" : "Add"}
            </button>
          </div>
        </div>
        <div className='flex items-center gap-2'>
        <input className='circle-checkbox cursor-pointer mr-2' onChange={toggleFinished} type="checkbox" checked={showFinished} id='checkbox' />
        <label htmlFor="checkbox" className='select-none cursor-pointer'>Show Finished</label>
        </div>
        <h2 className='text-lg font-bold mt-2'>Your Tasks</h2>
        <div className="todos">
          {todos.length === 0 && <div className='text-center text-lg mt-6'>No Tasks to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex justify-between my-4">
                <div className='flex gap-5 items-center'>
                  <input className='circle-checkbox cursor-pointer' onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 px-4 py-1 text-white text-base font-bold rounded-md mx-2'><FaEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-[#D11A2A]  px-4 py-1 text-white text-base font-bold rounded-md mx-1'><MdDelete /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
      <Analytics />
    </>
  );
}

export default App;

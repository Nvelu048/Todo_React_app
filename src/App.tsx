import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import NetworkClient from './lib/NetworkClient';
import './App.css';
import { Button } from './components';
import TodoForm from './screens/TodoForm';
import { Todo } from './util/Todo';
import TodoItem from './components/uicomponents/TodoItem';
import { Labels, Priority, Status, getIndex } from './util';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
function App() {
  const [open, setOpen] = useState(false);
  const [todoData, setTodoData] = useState<Array<Todo>>([]);
  const [isEditMode, setEditMode] = useState(false);
  const [todoEditData, setTodoEditData] = useState<Todo>();
  function onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }

  async function onSubmit(todoData: Partial<Todo>) {
    console.log('Will save todo');
    try {
      const result = await NetworkClient.sharedInstance.instance.post(
        '/saveTodo',
        todoData
      );
      console.log('Status of save', result);
      await fetchTodos();
      setOpen(false);
    } catch (err) {
      console.log('Error in saving : ' + err);
    }
  }
  async function fetchTodos() {
    try {
      let availableTodos = await NetworkClient.sharedInstance.instance.get(
        '/getTodos',
        {
          params: {
            userId: 'nrajan066',
          },
        }
      );
      availableTodos = availableTodos.data.data;
      availableTodos = availableTodos.map((todo: Todo) => {
        let labelNameIndex = getIndex(Labels, todo.label);
        todo.label = Labels[labelNameIndex].name;
        let priorityIndex = getIndex(Priority, todo.priority);
        todo.priority = Priority[priorityIndex].name;
        let statusIndex = getIndex(Status, todo.status);
        todo.status = Status[statusIndex].name;
        return todo;
      });
      if (availableTodos.length > 0) {
        availableTodos.sort((a: Todo, b: Todo) => a.startDate - b.startDate);
      }
      setTodoData(availableTodos);
      console.log(availableTodos);
    } catch (err) {
      console.log('Error occurred in fetching: ', err);
    }
  }
  useEffect(() => {
    async function getTodos() {
      try {
        let availableTodos = await NetworkClient.sharedInstance.instance.get(
          '/getTodos',
          {
            params: {
              userId: 'nrajan066',
            },
          }
        );
        availableTodos = availableTodos.data.data;
        availableTodos = availableTodos.map((todo: Todo) => {
          let labelNameIndex = getIndex(Labels, todo.label);
          todo.label = Labels[labelNameIndex].name;
          let priorityIndex = getIndex(Priority, todo.priority);
          todo.priority = Priority[priorityIndex].name;
          let statusIndex = getIndex(Status, todo.status);
          todo.status = Status[statusIndex].name;
          return todo;
        });
        if (availableTodos.length > 0) {
          availableTodos.sort((a: Todo, b: Todo) => b.startDate - a.startDate);
        }
        setTodoData(availableTodos);
      } catch (err) {
        console.log('Error occurred in fetching: ', err);
      }
    }
    getTodos();
  }, []);
  async function deleteTodo(todoId: string) {
    try {
      let deleteStatus = await NetworkClient.sharedInstance.instance.delete(
        '/deleteTodo',
        {
          params: {
            todoId,
          },
        }
      );
      console.log(deleteStatus);
      let availableTodos = todoData.filter((todo) => todo._id !== todoId);
      setTodoData(availableTodos);
    } catch (err) {
      console.log(err);
    }
  }
  const todoItems = todoData.map((todo) => (
    <TodoItem
      {...todo}
      key={todo._id!}
      onDelete={() => deleteTodo(todo._id!)}
      onEdit={() => {
        setEditMode(true);
        setTodoEditData(todo);
        setOpen(true);
      }}
    />
  ));
  async function onUpdate(todoId: string, updateObject: Partial<Todo>) {
    try {
      let updatedTodo = await NetworkClient.sharedInstance.instance.post(
        '/updateTodo',
        {
          todoId,
          updateObject,
        }
      );
      let updatedTodoIndex = todoData.map((todo) => todo._id).indexOf(todoId);
      let updatedTodos = todoData;
      updatedTodo = updatedTodo.data.data;
      updatedTodo.label = Labels[getIndex(Labels, updatedTodo.label)].name;
      updatedTodo.priority =
        Priority[getIndex(Priority, updatedTodo.priority)].name;
      updatedTodo.status = Status[getIndex(Status, updatedTodo.status)].name;
      updatedTodos[updatedTodoIndex] = updatedTodo;
      setTodoData(updatedTodos);
    } catch (err) {
      console.log(err);
    }
    setOpen(false);
  }
  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {todoItems}
      </div>
      <Button onClick={onClick} />
      <Modal isOpen={open} onRequestClose={closeModal} style={customStyles}>
        <TodoForm
          onSubmit={onSubmit}
          isEditMode={isEditMode}
          todoData={todoEditData}
          onUpdate={onUpdate}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}

export default App;

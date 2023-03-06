import Head from 'next/head';
import { Inter } from 'next/font/google';
import { useContext, useState } from 'react';
import { TodoListContext, TodoItem } from '@/context/todoListContext';
import { v4 as uuidv4 } from 'uuid';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { todoItems, dispatch } = useContext(TodoListContext);
  const [newTodoItem, setNewTodoItem] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewTodoItem('');
  };

  return (
    <>
      <Head>
        <title>CRUD TODO APP | Next practice</title>
      </Head>
      <main className={inter.className}>
        <h1>CRUD TODO APP</h1>
        <form onSubmit={handleSubmit}>
          <section>
            <input
              type="text"
              placeholder="Enter todo item here"
              value={newTodoItem}
              onChange={(e) => {
                setNewTodoItem(e.target.value);
              }}
            />
            <button
              onClick={() =>
                dispatch({
                  type: 'ADD_TODO',
                  payload: {
                    id: uuidv4(),
                    todoItem: newTodoItem,
                  },
                })
              }
              type="submit"
            >
              Add
            </button>
          </section>

          {todoItems.map((todoItem: TodoItem) => (
            <section key={todoItem.id}>
              <input
                type="text"
                value={todoItem.todoItem}
                disabled={!todoItem.isEditable}
                onChange={(e) =>
                  dispatch({
                    type: 'EDIT_TODO',
                    payload: { ...todoItem, todoItem: e.target.value },
                  })
                }
              />
              {todoItem.isEditable ? (
                <button
                  onClick={() =>
                    dispatch({ type: 'UPDATE_TODO', payload: todoItem })
                  }
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() =>
                    dispatch({
                      type: 'TODO_IS_EDITABLE',
                      payload: { ...todoItem },
                    })
                  }
                >
                  Edit
                </button>
              )}
              <button
                onClick={() =>
                  dispatch({ type: 'DELETE_TODO', payload: todoItem })
                }
              >
                Delete
              </button>
            </section>
          ))}
        </form>
      </main>
    </>
  );
}

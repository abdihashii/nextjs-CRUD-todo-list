import Head from 'next/head';
import { Inter } from 'next/font/google';
import { useContext, useState } from 'react';
import { TodoListContext } from '@/context/todoListContext';
import { v4 as uuidv4 } from 'uuid';
import TodoListItem from '@/components/todoListItem';
import { TodoItem } from '@/types/';

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
      <main className={`${inter.className} flex h-screen`}>
        <div className="bg-white sm:w-6/12 rounded-2xl p-8 flex gap-10 flex-col m-auto">
          <h1 className="font-semibold text-4xl text-center">CRUD TODO APP</h1>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <section className="flex flex-row mx-auto w-10/12 mb-5">
              <input
                autoFocus={true}
                className="text-xl p-2 rounded-lg border-2 border-gray-300 w-10/12 rounded-tr-none rounded-br-none border-r-0"
                type="text"
                placeholder="Enter todo item here"
                value={newTodoItem}
                onChange={(e) => {
                  setNewTodoItem(e.target.value);
                }}
              />
              <button
                className="text-xl p-2 rounded-lg bg-blue-500 text-white w-2/12 rounded-tl-none rounded-bl-none"
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
              <TodoListItem {...{ todoItem, dispatch }} />
            ))}
          </form>
        </div>
      </main>
    </>
  );
}

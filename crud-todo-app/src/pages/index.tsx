import { useRef } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import { v4 as uuidv4 } from 'uuid';
import TodoListItem from '@/components/todoListItem';
import { TodoItem, TodoStore } from '@/types/';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';
import { useTodoStore } from '@/hooks/useTodoStore';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const addTodoInputRef = useRef<any>();
  const state = useTodoStore((state: TodoStore) => state);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodoItem: TodoItem = {
      id: uuidv4(),
      title: addTodoInputRef.current.value,
      isEditable: false,
    };

    state.addTodo(newTodoItem);
    addTodoInputRef.current.value = '';
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    // If the item is dropped outside the list
    if (!destination) {
      return;
    }

    // If the item is dropped in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    state.moveTodo(source.index, destination.index);
  };

  return (
    <>
      <Head>
        <title>CRUD TODO APP | Next practice</title>
      </Head>
      <main className={`${inter.className} flex h-screen`}>
        <div className="m-auto flex flex-col gap-10 rounded-2xl bg-white p-8 sm:w-6/12">
          <h1 className="text-center text-4xl font-semibold">CRUD TODO APP</h1>
          <form
            className="mx-auto mb-5 flex w-10/12 flex-row"
            onSubmit={handleSubmit}
          >
            <input
              autoFocus={true}
              className="w-10/12 rounded-lg rounded-tr-none rounded-br-none border-2 border-r-0 border-gray-300 p-2 text-xl transition duration-100 hover:border-gray-400 focus:outline-none"
              type="text"
              placeholder="Enter todo item here"
              ref={addTodoInputRef}
            />
            <button
              className="w-2/12 rounded-lg rounded-tl-none rounded-bl-none bg-blue-500 p-2 text-xl text-white transition duration-100 hover:bg-blue-600"
              type="submit"
            >
              Add
            </button>
          </form>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="todoItems">
              {(provided) => (
                <section
                  className="flex flex-col p-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {state.todoItems.map((todoItem: TodoItem, index) => (
                    <TodoListItem key={todoItem.id} {...{ index, todoItem }} />
                  ))}

                  {provided.placeholder}
                </section>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </main>
    </>
  );
}

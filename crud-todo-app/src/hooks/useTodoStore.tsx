import { create } from 'zustand';
import type { TodoStore } from '../types';

export const useTodoStore = create<TodoStore>((set) => ({
  todoItems: [],
  addTodo: (todoItem) => {
    set((state) => {
      const newTodoItems = [...state.todoItems, todoItem];

      return {
        ...state,
        todoItems: newTodoItems,
      };
    });
  },
  editTodo: (todoItem) => {
    set((state) => {
      const newTodoItem = {
        ...todoItem,
        isEditable: true,
      };

      const newTodoItems = state.todoItems.map((_todoItem) => {
        if (_todoItem.id === todoItem.id) {
          return newTodoItem;
        } else {
          return _todoItem;
        }
      });

      return {
        ...state,
        todoItems: newTodoItems,
      };
    });
  },
  saveTodo: (todoItem, newTitle) => {
    set((state) => {
      const newTodoItem = {
        ...todoItem,
        title: newTitle,
        isEditable: false,
      };

      const newTodoItems = state.todoItems.map((_todoItem) => {
        if (_todoItem.id === todoItem.id) {
          return newTodoItem;
        } else {
          return _todoItem;
        }
      });

      return {
        ...state,
        todoItems: newTodoItems,
      };
    });
  },
  moveTodo: (sourceIndex, destinationIndex) => {
    set((state) => {
      const newTodoItems = [...state.todoItems];

      const [removedTodo] = newTodoItems.splice(sourceIndex, 1);
      newTodoItems.splice(destinationIndex, 0, removedTodo);

      return {
        ...state,
        todoItems: newTodoItems,
      };
    });
  },
  deleteTodo: (index) => {
    set((state) => {
      const newTodoItems = [...state.todoItems];

      newTodoItems.splice(index, 1);

      return {
        ...state,
        todoItems: newTodoItems,
      };
    });
  },
}));

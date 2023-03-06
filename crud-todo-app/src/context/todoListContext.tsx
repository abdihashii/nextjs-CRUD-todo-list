import { createContext, useReducer } from 'react';

export type TodoItem = {
  id: number;
  todoItem: string;
  isEditable: boolean;
};

export type TodoItems = TodoItem[];

type ReducerAction = {
  type: string;
  payload: TodoItem;
};

interface ContextType {
  todoItems: TodoItems;
  dispatch: React.Dispatch<ReducerAction>;
}

const todoListReducer = (todoItems: TodoItems, action: ReducerAction) => {
  switch (action.type) {
    case 'ADD_TODO': {
      const newTodoItem = { ...action.payload };
      console.log(newTodoItem);
      return [...todoItems, newTodoItem];
    }

    case 'TODO_IS_EDITABLE': {
      const newTodoItems = todoItems.map((todoItem) => {
        if (todoItem.id === action.payload.id) {
          action.payload.isEditable = !action.payload.isEditable;
          return { ...action.payload };
        }
        return todoItem;
      });
      return newTodoItems;
    }

    case 'EDIT_TODO': {
      const newTodoItems = todoItems.map((todoItem) => {
        if (todoItem.id === action.payload.id) {
          return { ...action.payload };
        }
        return todoItem;
      });
      return newTodoItems;
    }

    case 'UPDATE_TODO': {
      const newTodoItems = todoItems.map((todoItem) => {
        if (todoItem.id === action.payload.id) {
          action.payload.isEditable = !action.payload.isEditable;
          return { ...action.payload };
        }
        return todoItem;
      });
      return newTodoItems;
    }

    case 'DELETE_TODO': {
      const newTodoItems = todoItems.filter(
        (todoItem) => todoItem.id !== action.payload.id,
      );
      return newTodoItems;
    }

    default:
      throw new Error('Invalid action type');
  }
};

export const TodoListContext = createContext<ContextType | null>(null);

const TodoListContextProvider = ({ children }: any) => {
  const [todoItems, dispatch] = useReducer(todoListReducer, []);

  return (
    <TodoListContext.Provider value={{ todoItems, dispatch }}>
      {children}
    </TodoListContext.Provider>
  );
};

export default TodoListContextProvider;

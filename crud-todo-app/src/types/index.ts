type TodoItem = {
  id?: string;
  title?: string;
  isEditable?: boolean;
  destinationIndex?: number;
  sourceIndex?: number;
};

type TodoStore = {
  todoItems: TodoItem[];
  addTodo: (todoItem: TodoItem) => void;
  editTodo: (todoItem: TodoItem) => void;
  saveTodo: (todoItem: TodoItem, newTitle: string) => void;
  moveTodo: (sourceIndex: number, destinationIndex: number) => void;
  deleteTodo: (index: number) => void;
};

type TodoItems = TodoItem[];

type ReducerAction = {
  type: string;
  payload: TodoItem;
};

type TodoItemProps = {
  index: number;
  todoItem: TodoItem;
};

export type { TodoItem, TodoStore, TodoItems, ReducerAction, TodoItemProps };

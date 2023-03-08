type TodoItem = {
  id: string;
  todoItem: string;
  isEditable?: boolean;
};

type TodoItems = TodoItem[];

type ReducerAction = {
  type: string;
  payload: TodoItem;
};

type TodoItemProps = {
  todoItem: TodoItem;
  dispatch: React.Dispatch<ReducerAction>;
};

export type { TodoItem, TodoItems, ReducerAction, TodoItemProps };

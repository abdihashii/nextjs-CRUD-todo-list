type TodoItem = {
  id?: string;
  todoItem?: string;
  isEditable?: boolean;
  destinationIndex?: number;
  sourceIndex?: number;
};

type TodoItems = TodoItem[];

type ReducerAction = {
  type: string;
  payload: TodoItem;
};

type TodoItemProps = {
  index: number;
  todoItem: TodoItem;
  dispatch: React.Dispatch<ReducerAction>;
};

export type { TodoItem, TodoItems, ReducerAction, TodoItemProps };

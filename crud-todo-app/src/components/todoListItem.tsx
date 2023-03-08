import { TodoItemProps } from '@/types/';

const TodoListItem = ({ todoItem, dispatch }: TodoItemProps) => {
  return (
    <section className="flex flex-row justify-between" key={todoItem.id}>
      <input
        className="w-7/12 rounded-lg border-2 border-gray-300 p-2 disabled:bg-gray-300"
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
          className="w-2/12 rounded-lg bg-green-500 p-2 text-white"
          onClick={() => dispatch({ type: 'UPDATE_TODO', payload: todoItem })}
        >
          Save
        </button>
      ) : (
        <button
          className="w-2/12 rounded-lg bg-yellow-500 p-2 text-white"
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
        className="w-2/12 rounded-lg bg-red-500 p-2 text-white"
        onClick={() => dispatch({ type: 'DELETE_TODO', payload: todoItem })}
      >
        Delete
      </button>
    </section>
  );
};

export default TodoListItem;

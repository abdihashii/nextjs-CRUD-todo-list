import { TodoItemProps } from '@/types/';
import { RxDragHandleDots2 } from 'react-icons/rx';

const TodoListItem = ({ todoItem, dispatch }: TodoItemProps) => {
  return (
    <section className="flex flex-row justify-between items-center" key={todoItem.id}>
      <RxDragHandleDots2 size={35} />
      <input
        className="transition duration-100 enabled:hover:border-gray-400 focus:outline-none w-7/12 rounded-lg border-2 border-gray-300 p-2 disabled:bg-gray-300"
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
          className="hover:bg-green-600 transition duration-100 w-2/12 rounded-lg border border-green-500 bg-green-500 p-2 text-white"
          onClick={() => dispatch({ type: 'UPDATE_TODO', payload: todoItem })}
        >
          Save
        </button>
      ) : (
        <button
          className="hover:bg-yellow-600 transition duration-100 w-2/12 rounded-lg border border-yellow-500 bg-yellow-500 p-2 text-white"
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
        className="hover:bg-red-600 transition duration-100 w-2/12 rounded-lg bg-red-500 p-2 text-white"
        onClick={() => dispatch({ type: 'DELETE_TODO', payload: todoItem })}
      >
        Delete
      </button>
    </section>
  );
};

export default TodoListItem;

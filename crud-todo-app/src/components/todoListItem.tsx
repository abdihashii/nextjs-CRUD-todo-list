import { useRef } from 'react';
import { TodoItemProps } from '@/types/';
import { Draggable } from 'react-beautiful-dnd';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { useTodoStore } from '@/hooks/useTodoStore';

const TodoListItem = ({ index, todoItem }: TodoItemProps) => {
  const state = useTodoStore((state) => state);
  const editInputRef = useRef<any>();

  const onSaveEdit = () => {
    state.saveTodo(todoItem, editInputRef.current.value);
  };

  return (
    <Draggable key={todoItem.id} draggableId={todoItem.id!} index={index}>
      {(provided) => (
        <div
          className="-ml-2 mb-5 flex flex-row items-center justify-between"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <RxDragHandleDots2 size={35} />
          <input
            className="w-7/12 rounded-lg border-2 border-gray-300 p-2 transition duration-100 focus:outline-none enabled:hover:border-gray-400 disabled:bg-gray-300"
            type="text"
            disabled={!todoItem.isEditable}
            ref={editInputRef}
            defaultValue={todoItem.title}
          />
          {todoItem.isEditable ? (
            <button
              className="w-2/12 rounded-lg border border-green-500 bg-green-500 p-2 text-white transition duration-100 hover:bg-green-600"
              onClick={onSaveEdit}
            >
              Save
            </button>
          ) : (
            <button
              className="w-2/12 rounded-lg border border-yellow-500 bg-yellow-500 p-2 text-white transition duration-100 hover:border-yellow-600 hover:bg-yellow-600"
              onClick={() => state.editTodo(todoItem)}
            >
              Edit
            </button>
          )}
          <button
            className="w-2/12 rounded-lg border border-red-500 bg-red-500 p-2 text-white transition duration-100 hover:border-red-600 hover:bg-red-600"
            onClick={() => state.deleteTodo(index)}
          >
            Delete
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default TodoListItem;

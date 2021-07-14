import React from 'react';
import { useDispatch } from 'react-redux';
import { FaTimesCircle } from 'react-icons/fa';
import { removeTask } from './stopwatchSlice';

export const Task = ({ task }) => {
  // Access the removeTask action
  const dispatch = useDispatch();

  //   Individual Task Component
  return (
    <li data-testid='individual-task'>
      {task.taskName} took {task.time}s{' '}
      <button
        onClick={() => dispatch(removeTask(task))}
        style={{
          border: 'none',
          background: 'none',
          cursor: 'pointer',
        }}
      >
        <FaTimesCircle />
      </button>
    </li>
  );
};
